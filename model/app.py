from flask import Flask, request, jsonify
import numpy as np
from model import DQNAgent # type: ignore

app = Flask(__name__)

# Load the trained DQN model
# state_size = 100  # Adjust this as per your input size
# action_size = 6   # Number of vulnerability classes
# vocab_size = 300
# embedding_dim = 128
# input_length = state_size

# # Initialize agent
# agent = DQNAgent(state_size, action_size, vocab_size, embedding_dim, input_length)
# agent.load('dqn_modnn_vulnerability_detection.weights.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Expecting a JSON payload
        opcode_sequence = data['opcode_sequence']
        
         # Example opcode input (Convert the given opcode into integers first)
        # opcode_sequence = [96, 128, 96, 64, 82, 52, 128, 21, 96, 14, 87, 95, 95, 253, 91, 80, 97, 5, 251, 128, 97, 0, 28, 95, 57, 95, 243, 254, 96, 128, 96, 64, 82, 96, 4, 54, 16, 97, 0, 62, 87, 95, 53, 96, 224, 28, 128, 99, 18, 6, 95, 224, 20, 97, 0, 66, 87, 128, 99, 39, 226, 53, 227, 20, 97, 0, 108, 87, 128, 99, 46, 26, 125, 77, 20, 97, 0, 168, 87, 128, 99, 208, 227, 13, 176, 20, 97, 0, 208, 87, 91, 95, 95, 253, 91, 52, 128, 21, 97, 0, 77, 87, 95, 95, 253, 91, 80, 97, 0, 86, 97, 0, 218, 86, 91, 96, 64, 81, 97, 0, 99, 145, 144, 97, 3, 26, 86, 91, 96, 64, 81, 128, 145, 3, 144, 243, 91, 52, 128, 21, 97, 0, 119, 87, 95, 95, 253, 91, 80, 97, 0, 146, 96, 4, 128, 54, 3, 129, 1, 144, 97, 0, 141, 145, 144, 97, 3, 145, 86, 91, 97, 1, 29, 86, 91, 96, 64, 81, 97, 0, 159, 145, 144, 97, 3, 26, 86, 91, 96, 64, 81, 128, 145, 3, 144, 243, 91, 52, 128, 21, 97, 0, 179, 87, 95, 95, 253, 91, 80, 97, 0, 206, 96, 4, 128, 54, 3, 129, 1, 144, 97, 0, 201, 145, 144, 97, 3, 230, 86, 91, 97, 1, 49, 86, 91, 0, 91, 97, 0, 216, 97, 2, 174, 86, 91, 0, 91, 95, 95, 95, 51, 115, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 22, 115, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 22, 129, 82, 96, 32, 1, 144, 129, 82, 96, 32, 1, 95, 32, 84, 144, 80, 144, 86, 91, 95, 96, 32, 82, 128, 95, 82, 96, 64, 95, 32, 95, 145, 80, 144, 80, 84, 129, 86, 91, 128, 95, 95, 51, 115, 255, 255]

        # Initialize environment and agent parameters
        state_size = len(opcode_sequence)  # Length of opcode sequence
        action_size = 6  # Number of vulnerability classes (including Self-Destruct)
        vocab_size = 300   # Size of opcode dictionary (arbitrary number)
        embedding_dim = 128  # Dimensionality for embeddings
        input_length = state_size  # Length of opcode sequence

        # Initialize agent
        agent = DQNAgent(state_size, action_size, vocab_size, embedding_dim, input_length)

        # Example state (opcode sequence reshaped for input)
        opcode_sequence = np.array(opcode_sequence)  # Convert list to NumPy array
        state = opcode_sequence.reshape(1, state_size)

        # Define a simulated expected action (vulnerability class label)
        correct_label = 1  # Example: Reentrancy is class 1

        # Example: Update correct_label dynamically for each episode (use real labels here)




        # Continue assigning correct labels for other vulnerabilities

        # Add more vulnerability classes
        vulnerability_classes = ["Overflow", "Reentrancy", "Frontrunning", "Unauthorized Access", "Gas Efficiency", "Self-Destruct", "Incorrect Calculations"]

        # Training loop
        for e in range(50):  # Increase number of episodes
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
            
            print(f"Episode {e}/{50} - Predicted Class: {predicted_class} - Total Reward: {total_reward} - Epsilon: {agent.epsilon}")
            
            # Check if the agent is consistently predicting the correct class
            if action == correct_label:
                print(f"Reentrancy correctly classified in Episode {e}")


        # Save the trained model
        agent.save('dqn_modnn_vulnerability_detection.weights.h5')
        return jsonify({"predicted_class": predicted_class})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)