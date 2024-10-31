import requests
import json

# Define the URL of the Flask app's endpoint 
url = 'http://127.0.0.1:5000/predict'

# Define the API key to use for the request (make sure it’s one of the authorized keys in your Flask app) api_key = "Df8qoDj4XCVVYaHsX27Nm4p1YuCLA2ZoowJ1bSipegw8" 
api_key = 'Df8qoDj4XCVVYaHsX27Nm4p1YuCLA2ZoowJ1bSipegw8'
# Define the JSON payload with Solidity source code 
data = { 
       "contract_source_code": """ 
        pragma solidity ^0.8.0; 
        contract ReentrancyVulnerable {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] -= amount;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
} """
 } 

# Define headers, including the API key
headers = {
	 "Content-Type": "application/json", 
         "X-API-KEY": api_key 
} 

# Send the POST request 
response = requests.post(url, data=json.dumps(data), headers=headers)



# Print the response from the server 
print(f"Response: {response.json()}")
