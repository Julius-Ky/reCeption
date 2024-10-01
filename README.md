![reCEPTION](https://github.com/user-attachments/assets/775b68ac-564e-42fb-b7d5-177943ed8995)

# reCEPTION (Web3.0 reCAPTCHA)

reCEPTION is an **`AI-powered security platform`** that offers functionality similar to **reCAPTCHA**, providing automated verification solutions for both **`Web2 and Web3 environments`**. 
The project aims to enhance the **`security`** and **`quality of smart contracts`** and **`provide automated validation solutions for users and developers`**.

## Key Features
1. **AI-Based Smart Contract Analysis**:
    - Users upload their smart contract code for analysis, where AI identifies security vulnerabilities, code flaws, and potential scams.
2. **Automated Security Checks and Corrections**:
    - Based on the analysis, the AI suggests and implements modifications, including security patches and performance optimizations.
    - Provides a feature to automatically deploy the modified code within the platform.
3. **Detailed Reporting**:
    - Generates comprehensive reports detailing the issues found, modifications made, and explanations to help users understand improvements.
    - Reports are available for download in CSV and PDF formats.
4. **Admin Console**:
    - An admin console allows administrators to set up and manage reCeption features on their own websites.
    - Supports reCAPTCHA-like functionality for security validation on web pages.
5. **API Provision**:
    - Offers API access to analysis results and data, enabling e-commerce platforms or Web3 applications to use these as security solutions.
  
## Process
```mermaid
sequenceDiagram
participant User
participant E-Commerce as E-Commerce (Platform)
participant reCeption
participant NEAR

User ->> E-Commerce: 1. Login
E-Commerce -->> E-Commerce: Response the user info
User ->> E-Commerce: 2. Product Purchase (Cryptocurrency)
E-Commerce ->> reCeption: 3. Send Smart Contract (Payment)
reCeption ->> NEAR: 4. Smart Contract Analysis (NEAR AI)
NEAR -->> NEAR: Smart contract data save
NEAR ->> reCeption: 5. Return Analysis result
reCeption ->> User: 6. Return Safety Judgment
User ->> E-Commerce: 7. Share whether to run (Check Box or Payment Approve)
E-Commerce -->> E-Commerce: Response payment
E-Commerce ->> NEAR: 8. Save contract data (Normal/Abnormal Classification)
```

## Competition
We are different from them.

<a href="https://www.walletguard.app/" height="5" width="10" target="_blank">
	<img src="https://cdn.prod.website-files.com/653c60995304b515c2f8f3f6/65a758a1767a906d4ebcde44_wallet%20guard%20logo.png" width="200" height="60">
<a><a href="https://www.anchain.ai/" height="5" width="10" target="_blank">
	<img src="https://github.com/user-attachments/assets/ca988dbf-b869-4524-a7ff-127a3618ae4d" width="200" height="35">
<a>

- We do not secure the wallet itself, but the **`contract code itself`**.
- We do not detect transactions that occur through contracts via AI by being installed in the wallet itself, but we analyze the contract code itself that generates transactions by loading the contract code **`from the website itself through AI`**.
- We are not restricted by the wallet, and we analyze only the contract code itself to find vulnerabilities in the code and inform the user of the presence or absence of transactions. Furthermore, if we **`modify and supplement the contract code, we provide a report on the analysis results to prevent secondary crimes`**.
- Even if users do not download our service separately as a browser extension or wallet snap, if the **`website admin generally install`** and operate our **`API service`**, anyone can easily use our service to make **`safe transactions`**.
