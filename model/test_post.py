import requests
import json

# Define the URL for the Flask app
url = 'http://127.0.0.1:5000/predict'

# Example opcode sequence
data = {
    "opcode_sequence": [96, 128, 96, 64, 82, 52, 128, 21, 96, 14, 87, 95, 95, 253, 91, 80, 97, 5, 251, 128, 97, 0, 28, 95, 57, 95, 243, 254, 96, 128, 96, 64, 82, 96, 4, 54, 16, 97, 0, 62, 87, 95, 53, 96, 224, 28, 128, 99, 18, 6, 95, 224, 20, 97, 0, 66, 87, 128, 99, 39, 226, 53, 227, 20, 97, 0, 108, 87, 128, 99, 46, 26, 125, 77, 20, 97, 0, 168, 87, 128, 99, 208, 227, 13, 176, 20, 97, 0, 208, 87, 91, 95, 95, 253, 91, 52, 128, 21, 97, 0, 77, 87, 95, 95, 253, 91, 80, 97, 0, 86, 97, 0, 218, 86, 91, 96, 64, 81, 97, 0, 99, 145, 144, 97, 3, 26, 86, 91, 96, 64, 81, 128, 145, 3, 144, 243, 91]
}

# Send POST request
headers = {'Content-Type': 'application/json'}
response = requests.post(url, data=json.dumps(data), headers=headers)

# Print response
print(f"Response: {response.json()}")