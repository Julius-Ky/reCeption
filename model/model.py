import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, MaxPooling1D, LSTM, Dense, Flatten, Dropout
from collections import deque
import random

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

   