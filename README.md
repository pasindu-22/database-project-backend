# **Bank Transaction and Loan Processing System**

A core banking solution designed for a private bank in Seychelles, featuring branch management, internal fund transfers, loan processing, and customer account management.

This is the backend for our project for CS3043 - Database systems. 

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Database Structure](#database-structure)
6. [Project Structure](#project-structure-of-backend)
7. [API Endpoints](#api-endpoints)
   

## **Project Overview**

This project is a core banking solution developed as a proof of concept (PoC) for a small, private bank. The system is designed to handle key banking functionalities such as customer account management, internal fund transfers, and loan processing. 

The system will support:
- Multiple branches, including a head office.
- Different account types (savings, checking, fixed deposits).
- Loan applications and processing for personal and business loans.
- Basic report generation for branch managers.

## **Features**

- **Branch Management**: Manage bank branches, including employees and customers.
- **Account Management**: Create and manage savings and checking accounts. Support for different plans based on customer age group.
- **Fund Transfers**: Internal bank transfers between accounts.
- **Fixed Deposits**: Support for creating Fixed Deposit (FD) accounts and calculating monthly interest.
- **Loan Processing**: Apply for loans at branches or via an online portal.
  - Manual loans (branch approval required).
  - Online loans (instant approval based on FD balance).
- **Reporting**: Generate transaction and loan reports per branch for branch managers.

## **Technologies Used**

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Others**: Axios (for API requests), Sequelize (ORM for MySQL), JSON Web Token (JWT) for authentication, bcrypt for password hashing.

git clone https://github.com/ovindu-a/database-project-backend.git

## **Installation**  

### **Prerequisites** 

- **Node.js** (version >= 14) : 
  - First Install NodeJs if you haven't.( https://nodejs.org/dist/v20.16.0/node-v20.16.0-x64.msi)
- **MySQL** (version >= 8)
- **Git** (for cloning the repository)

### **Setup Steps**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/banking-system.git
   cd banking-system
   ```
2. **Install dependencies**
- After cloning repositary, open a terminal and navigate to folder and run "npm install" to install node modules automatically.

   ```bash
   npm install
   ```
3. **Database Setup**
- Create a new MySQL database.
-	Update the .env file with your database credentials:
   ```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=banking_system
```

4. **To run in dev mode**
```
npm run dev
```

## **Database Structure**

### **Tables**

- Branch: Stores information about branches, including the head office.

- Manager: Contains details about branch managers.
  
- Employee: Information about employees working at each branch.

- Customer: Stores customer information, both individual and business.

  - Business Customer: Specific details for business customers.

  - Individual Customer: Specific details for individual customers.

- Account: Information on savings and checking accounts for both individuals and businesses.

- Transaction: Records internal transactions between accounts.

- Fixed Deposit: Details of fixed deposits linked to savings accounts.

- Loan: Details about loans taken by customers.

- Loan Application: Information about loan applications.

- Loan Installment: Manages loan repayment installments.

- Online Loan to FD: Information about online loans linked to fixed deposits.


## **ER Diragram**

[ER Diagram.pdf](https://github.com/user-attachments/files/17530929/Group8.ER.Diagram.pdf)

<img width="1030" alt="Screenshot 2024-10-26 at 19 57 20" src="https://github.com/user-attachments/assets/cb22f864-0811-47ea-b59b-d9fddd1aad21" align ="centre">

## **Project Structure of backend**
```
banking-system/
├── controllers/     # Contains route handler functions (business logic)
├── models/          # Database models (e.g., Account, Customer, Loan)
├── routes/          # Route definitions for API endpoints
├── config/          # Configuration files (database, server)
├── middlewares/     # Custom middleware (e.g., authentication)
├── utils/           # Helper functions and utilities
├── public/          # Static files (if any)
├── views/           # Frontend templates (if using server-side rendering)
├── .env             # Environment variables
├── app.js           # Main server setup file
└── README.md        # Project documentation
```

## **API Endpoints**







