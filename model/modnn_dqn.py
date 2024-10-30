import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, MaxPooling1D, LSTM, Dense, Flatten, Dropout
from collections import deque
import random

# Example opcode input (Convert the given opcode into integers first)
opcode_sequence = [96, 128, 96, 64, 82, 52, 128, 21, 96, 14, 87, 95, 95, 253, 91, 80, 97, 5, 251, 128, 97, 0, 28, 95, 57, 95, 243, 254, 96, 128, 96, 64, 82, 96, 4, 54, 16, 97, 0, 62, 87, 95, 53, 96, 224, 28, 128, 99, 18, 6, 95, 224, 20, 97, 0, 66, 87, 128, 99, 39, 226, 53, 227, 20, 97, 0, 108, 87, 128, 99, 46, 26, 125, 77, 20, 97, 0, 168, 87, 128, 99, 208, 227, 13, 176, 20, 97, 0, 208, 87, 91, 95, 95, 253, 91, 52, 128, 21, 97, 0, 77, 87, 95, 95, 253, 91, 80, 97, 0, 86, 97, 0, 218, 86, 91, 96, 64, 81, 97, 0, 99, 145, 144, 97, 3, 26, 86, 91, 96, 64, 81, 128, 145, 3, 144, 243, 91, 52, 128, 21, 97, 0, 119, 87, 95, 95, 253, 91, 80, 97, 0, 146, 96, 4, 128, 54, 3, 129, 1, 144, 97, 0, 141, 145, 144, 97, 3, 145, 86, 91, 97, 1, 29, 86, 91, 96, 64, 81, 97, 0, 159, 145, 144, 97, 3, 26, 86, 91, 96, 64, 81, 128, 145, 3, 144, 243, 91, 52, 128, 21, 97, 0, 179, 87, 95, 95, 253, 91, 80, 97, 0, 206, 96, 4, 128, 54, 3, 129, 1, 144, 97, 0, 201, 145, 144, 97, 3, 230, 86, 91, 97, 1, 49, 86, 91, 0, 91, 97, 0, 216, 97, 2, 174, 86, 91, 0, 91, 95, 95, 95, 51, 115, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 22, 115, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 22, 129, 82, 96, 32, 1, 144, 129, 82, 96, 32, 1, 95, 32, 84, 144, 80, 144, 86, 91, 95, 96, 32, 82, 128, 95, 82, 96, 64, 95, 32, 95, 145, 80, 144, 80, 84, 129, 86, 91, 128, 95, 95, 51, 115, 255, 255]

# Initialize environment and agent parameters
state_size = len(opcode_sequence)  # Length of opcode sequence
action_size = 6  # Number of vulnerability classes (including Self-Destruct)
vocab_size = 300   # Size of opcode dictionary (arbitrary number)
embedding_dim = 128  # Dimensionality for embeddings
input_length = state_size  # Length of opcode sequence

# Define the DQN model with the MODNN as feature extractor
class DQNAgent:
    def __init__(self, state_size, action_size, vocab_size, embedding_dim, input_length):
        self.state_size = state_size  # Opcode sequence length
        self.action_size = action_size  # Number of vulnerability types
        self.memory = deque(maxlen=2000)
        self.gamma = 0.95  # Discount factor
        self.epsilon = 1.0  # Exploration rate
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.learning_rate = 0.001
        self.vocab_size = vocab_size
        self.embedding_dim = embedding_dim
        self.input_length = input_length
        self.model = self._build_model()

    def _build_model(self):
        # Building the model with MODNN architecture as the base
        model = Sequential()
        # Embedding Layer
        model.add(Embedding(input_dim=self.vocab_size, output_dim=self.embedding_dim, input_length=self.input_length))

        # Convolutional Layer
        model.add(Conv1D(filters=64, kernel_size=3, activation='relu'))
        model.add(MaxPooling1D(pool_size=2))

        # LSTM Layer to learn the sequential nature of opcode
        model.add(LSTM(64, return_sequences=True))
        model.add(Dropout(0.2))

        # Another Conv Layer to extract higher-level features
        model.add(Conv1D(filters=128, kernel_size=3, activation='relu'))
        model.add(MaxPooling1D(pool_size=2))

        # Flatten before Dense layers
        model.add(Flatten())

        # Dense Layer
        model.add(Dense(64, activation='relu'))
        model.add(Dropout(0.3))

        # Output Layer for Q-values (actions)
        model.add(Dense(self.action_size, activation='linear'))

        # Compile the model
        model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=self.learning_rate),
                      loss='mse')
        return model

    def remember(self, state, action, reward, next_state, done):
        self.memory.append((state, action, reward, next_state, done))

    def act(self, state):
        # Epsilon-greedy action selection
        if np.random.rand() <= self.epsilon:
            return random.randrange(self.action_size)
        act_values = self.model.predict(state)
        return np.argmax(act_values[0])

    def replay(self, batch_size):
        # Experience replay
        minibatch = random.sample(self.memory, batch_size)
        for state, action, reward, next_state, done in minibatch:
            target = reward
            if not done:
                target = (reward + self.gamma *
                          np.amax(self.model.predict(next_state)[0]))
            target_f = self.model.predict(state)
            target_f[0][action] = target
            self.model.fit(state, target_f, epochs=1, verbose=0)  # Suppress training output
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay

    def load(self, name):
        self.model.load_weights(name)

    def save(self, name):
        self.model.save_weights(name)

# Initialize agent
agent = DQNAgent(state_size, action_size, vocab_size, embedding_dim, input_length)

# Example state (opcode sequence reshaped for input)
opcode_sequence = np.array(opcode_sequence)  # Convert list to NumPy array
state = opcode_sequence.reshape(1, state_size)

# Define a simulated expected action (vulnerability class label)
correct_label = 1  # Example: Reentrancy is class 1




# Continue assigning correct labels for other vulnerabilities

# Add more vulnerability classes
vulnerability_classes = ["Overflow", "Reentrancy", "Frontrunning", "Unauthorized Access", "Gas Efficiency", "Self-Destruct", "Incorrect Calculations"]

ep=1000 #number of episodes

# Training loop
for e in range(ep):  # Increase number of episodes
    done = False
    total_reward = 0  # Track the total reward for the episode
    while not done:
        # Agent takes action
        action = agent.act(state)
        
        # Simulate environment: Reward based on correct vulnerability classification (example)
        reward = 1 if action == correct_label else -1  # Reentrancy is the correct action (class 1)
        next_state = state  # In a real environment, this would be the result of taking the action
        total_reward += reward
        
        done = True  # Simplified episode end condition
        agent.remember(state, action, reward, next_state, done)
        
        # Train with replay
        if len(agent.memory) > 32:
            agent.replay(32)

    # Track the agent's performance
    predicted_class = vulnerability_classes[action]
    
    print(f"Episode {e}/{ep} - Predicted Class: {predicted_class} - Total Reward: {total_reward} - Epsilon: {agent.epsilon}")
    
    # Check if the agent is consistently predicting the correct class
    if action == correct_label:
        print(f"Reentrancy correctly classified in Episode {e}")


# Save the trained model
agent.save('dqn_modnn_vulnerability_detection.weights.h5')
