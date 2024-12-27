from flask import Flask, request, jsonify, render_template
import numpy as np
from collections import Counter
import random
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, MaxPooling1D, LSTM, Dropout, Flatten, Dense
from solcx import compile_source

app = Flask(__name__)

API_KEY = 'Df8qoDj4XCVVYaHsX27Nm4p1YuCLA2ZoowJ1bSipegw8'

# Functions (pad_opcode_sequence, convert_source_code_to_opcode, etc.) remain the same
def pad_opcode_sequence(opcode_sequence, target_length=341):
    if len(opcode_sequence) < target_length:
        # Pad with zeros if the length is less than the target
        opcode_sequence += [0] * (target_length - len(opcode_sequence))
    elif len(opcode_sequence) > target_length:
        # Truncate if the length is more than the target
        opcode_sequence = opcode_sequence[:target_length]
    return opcode_sequence


def convert_source_code_to_opcode(source_code):
    try:
        # Compile the Solidity source code
        compiled_sol = compile_source(source_code)

        # Extract bytecode from the compiled output
        # Replace 'YourContractName' with the actual contract name
        bytecode = compiled_sol['<stdin>:YourContractName']['bin']  

        # Convert bytecode to opcode sequence
        opcode_sequence = []
        for i in range(0, len(bytecode), 2):  # Iterate through bytecode in steps of 2
            hex_byte = bytecode[i:i + 2]  # Get two hex digits
            opcode = int(hex_byte, 16)  # Convert hex to decimal
            opcode_sequence.append(opcode)  # Add the decimal opcode to the list

        return opcode_sequence
    except Exception as e:
        print(f"Error converting source code to opcode: {str(e)}")
        return []


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check for API key in request headers
        api_key = request.headers.get('x-api-key')
        if api_key != API_KEY:
            return jsonify({"error": "Invalid API key."}), 403
        
        data = request.json
        contract_source_code = data['contract_source_code']
        
        # Convert source code to opcode sequence
        opcode_sequence = convert_source_code_to_opcode(contract_source_code)
        opcode_sequence = pad_opcode_sequence(opcode_sequence)

        if len(opcode_sequence) != 341:
            return jsonify({"error": "Invalid input: opcode sequence must be exactly 341 in length."}), 400

        # Initialize environment and agent parameters
        state_size = len(opcode_sequence)
        action_size = 6
        vocab_size = 300
        embedding_dim = 128
        input_length = state_size
        confidence_threshold = 0.8

        # Agent class definition remains the same

        class DQNAgent:
            def __init__(self, state_size, action_size, vocab_size, embedding_dim, input_length):
                self.state_size = state_size
                self.action_size = action_size
                self.vocab_size = vocab_size
                self.embedding_dim = embedding_dim
                self.input_length = input_length
                self.gamma = 0.95
                self.epsilon = 0.5
                self.epsilon_min = 0.05
                self.epsilon_decay = 0.99
                self.learning_rate = 0.001
                self.memory = []
                self.model = self._build_model()  # Build the model with the specified input shape

            def _build_model(self):
                model = Sequential()
                model.add(Embedding(input_dim=self.vocab_size, output_dim=self.embedding_dim, input_length=self.input_length))
                model.add(Conv1D(filters=64, kernel_size=3, activation='relu'))
                model.add(MaxPooling1D(pool_size=2))
                model.add(LSTM(64, return_sequences=True))
                model.add(Dropout(0.2))
                model.add(Conv1D(filters=128, kernel_size=3, activation='relu'))
                model.add(MaxPooling1D(pool_size=2))
                model.add(Flatten())
                model.add(Dense(64, activation='relu'))
                model.add(Dropout(0.3))
                model.add(Dense(self.action_size, activation='linear'))

                model.build(input_shape=(None, self.input_length))
                model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=self.learning_rate), loss='mse')
                return model

            def remember(self, state, action, reward, next_state, done):
                self.memory.append((state, action, reward, next_state, done))

            def act(self, state):
                if np.random.rand() <= self.epsilon:
                    return random.randrange(self.action_size)
                act_values = self.model.predict(state)
                return np.argmax(act_values[0])

            def replay(self, batch_size):
                minibatch = random.sample(self.memory, batch_size)
                for state, action, reward, next_state, done in minibatch:
                    target = reward
                    if not done:
                        target = (reward + self.gamma * np.amax(self.model.predict(next_state)[0]))
                    target_f = self.model.predict(state)
                    target_f[0][action] = target
                    self.model.fit(state, target_f, epochs=1, verbose=0)
                if self.epsilon > self.epsilon_min:
                    self.epsilon *= self.epsilon_decay

            def predict_confidence(self, state):
                act_values = self.model.predict(state)
                return tf.nn.softmax(act_values[0]).numpy()

            def load(self, name):
                self.model.load_weights(name)

            def save(self, name):
                self.model.save_weights(name)


        # Initialize agent and load weights
        agent = DQNAgent(state_size, action_size, vocab_size, embedding_dim, input_length)
        agent.load('dqn_modnn_vulnerability_detection.weights.h5')

        # Prepare state
        opcode_sequence = np.array(opcode_sequence)
        state = opcode_sequence.reshape(1, state_size)
        correct_label = 1

        vulnerability_classes = ["Overflow", "Reentrancy", "Frontrunning", "Unauthorized Access", "Gas Efficiency", "Self-Destruct", "Incorrect Calculations"]
        classification_counter = Counter()
        ep = 100

        # Training loop
        for e in range(ep):
            done = False
            total_reward = 0
            while not done:
                action = agent.act(state)
                action_confidences = agent.predict_confidence(state)
                confidence = action_confidences[action]

                reward = 1 if action == correct_label else -1
                next_state = state
                total_reward += reward
                done = True
                agent.remember(state, action, reward, next_state, done)
                if len(agent.memory) > 32:
                    agent.replay(32)

            predicted_class = vulnerability_classes[action]
            classification_counter[predicted_class] += 1

        highest_vulnerability = None
        highest_percentage = 0

        for vulnerability, count in classification_counter.items():
            percentage = (count / ep) * 100
            if percentage > highest_percentage:
                highest_percentage = percentage
                highest_vulnerability = vulnerability

        return jsonify({"predicted_class": highest_vulnerability, "confidence": highest_percentage})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=7081)
