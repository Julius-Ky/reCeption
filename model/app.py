from flask import Flask, request, jsonify
import numpy as np
from collections import Counter
import random
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, MaxPooling1D, LSTM, Dropout, Flatten, Dense

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Expecting a JSON payload
        opcode_sequence = data['opcode_sequence']

         # Check if the length of opcode_sequence is 341
        if len(opcode_sequence) != 341:
            return jsonify({"error": "Invalid input: opcode sequence must be exactly 341 in length at the moment only identification Reentrancy."}), 400

        # Initialize environment and agent parameters
        state_size = len(opcode_sequence)  # Length of opcode sequence
        action_size = 6  # Number of vulnerability classes (including Self-Destruct)
        vocab_size = 300   # Size of opcode dictionary (arbitrary number)
        embedding_dim = 128  # Dimensionality for embeddings
        input_length = state_size  # Length of opcode sequence
        confidence_threshold = 0.8 #MODIFIED

        class DQNAgent:
            def __init__(self, state_size, action_size, vocab_size, embedding_dim, input_length):
                self.state_size = state_size
                self.action_size = action_size
                self.vocab_size = vocab_size
                self.embedding_dim = embedding_dim
                self.input_length = input_length
                self.gamma = 0.95
                self.epsilon = 1.0
                self.epsilon_min = 0.01
                self.epsilon_decay = 0.995
                self.learning_rate = 0.001
                self.memory = []
                self.model = self._build_model()  # Build the model with the specified input shape

            def _build_model(self):
                # Building the model with MODNN architecture as the base
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
                    
                    # Build the model explicitly with an input shape
                    model.build(input_shape=(None, self.input_length))
                    
                    #model.summary()
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

            def predict_confidence(self, state):#MODIFIED

                act_values = self.model.predict(state) #MODIFIED
                return tf.nn.softmax(act_values[0]).numpy()  # Convert to probabilities for each class #MODIFIED

            

            def load(self, name):
                self.model.load_weights(name)

            def save(self, name):
                self.model.save_weights(name)

        # Initialize agent and load weights
        agent = DQNAgent(state_size, action_size, vocab_size, embedding_dim, input_length)
        agent.load('dqn_modnn_vulnerability_detection.weights.h5')

        # Prepare state
        opcode_sequence = np.array(opcode_sequence)  # Convert list to NumPy array
        state = opcode_sequence.reshape(1, state_size)
        correct_label = 1  # Example: Reentrancy is class 1
        # Set a confidence threshold for printing
   

        vulnerability_classes = ["Overflow", "Reentrancy", "Frontrunning", "Unauthorized Access", "Gas Efficiency", "Self-Destruct", "Incorrect Calculations"]
        ##LINES FOR FUTURE DEVELOPMENT FOR CORRECTLY IDENTIFYING NO ERRORS
        ##LINES FOR FUTURE DEVELOPMENT FOR CORRECTLY IDENTIFYING NO ERRORS
        ##LINES FOR FUTURE DEVELOPMENT FOR CORRECTLY IDENTIFYING NO ERRORS
        ##LINES FOR FUTURE DEVELOPMENT FOR CORRECTLY IDENTIFYING NO ERRORS


        classification_counter = Counter() 
        ep=1000 #number of episodes
        # Training loop
        for e in range(ep):  # Increase number of episodes
            done = False
            total_reward = 0
            while not done:
                action = agent.act(state)

                action_confidences = agent.predict_confidence(state) #MODIFIED
                confidence = action_confidences[action]  # Confidence for chosen action MODIFIED


                reward = 1 if action == correct_label else -1
                next_state = state
                total_reward += reward
                done = True
                agent.remember(state, action, reward, next_state, done)
                if len(agent.memory) > 32:
                    agent.replay(32)

            predicted_class = vulnerability_classes[action]
            classification_counter[predicted_class] += 1

            print(f"Episode {e+1}/{ep} - Predicted Class: {predicted_class} - Total Reward: {total_reward} - Epsilon: {agent.epsilon}")

        print("\nClassification Report:")
        highest_vulnerability = None
        highest_percentage = 0

      
        for vulnerability, count in classification_counter.items():
            percentage = (count / ep) * 100
            print(f"{vulnerability}: {percentage:.2f}%")
        
            if percentage > highest_percentage:
                highest_percentage = percentage
                highest_vulnerability = vulnerability

      # Send only the highest scoring vulnerability
        return jsonify({"predicted_class": highest_vulnerability, "confidence": highest_percentage})

       
        #return jsonify({"predicted_class": predicted_class})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
