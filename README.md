# Library Management API

This is a simple REST API for managing a library system. The API allows users to perform basic operations such as registering, login in, adding books, borrowing books, returning books, and viewing available books. The API is built using **Node.js** and **Express.js**, with **MongoDB** as the database.

### Features

- **User authentication** using JWT (JSON Web Tokens)
- **Authorization** to ensure that only authorized users can add books, while others can only borrow/return books.
- **Add a book** to the library
- **Borrow a book** (mark it as borrowed)
- **Return a book** (mark it as available again)
- **View all available books** in the library

---

## Requirements

- **Node.js** 
- **MongoDB** running locally 
- **Postman** for testing API endpoints

---

## Procedure to Run the Code

Follow the steps below to run the Library Management API on your local machine:

### 1. Clone the Repository

Start by cloning the repository to your local machine using Git:

git clone https://github.com/Nellybii/LibraryManagementSystem.git 
cd LibraryManagementSystem

### 2.Install Dependencies
Install all dependencies using the following command:

npm install

This will install Express.js, MongoDB, JWT, and other necessary packages required to run the API.

### 3. Set Up MongoDB

To run MongoDB locally, make sure you have it installed. After installation, run MongoDB by using the following command in your terminal:

### 4. Start the Server

Once everything is set up, you can start the server by running the following command:

npm start
// or 
npm run dev
This will start the server on http://localhost:3000.

###5. Test the API
To test the API, you can use Postman or thunderClient to make requests to the following endpoints:

Register a User: POST /api/auth/register
Login a User: POST /api/auth/login
Add a Book : POST /api/books
Borrow a Book: PUT /api/books/:id/borrow
Return a Book: PUT /api/books/:id/return
View All Available Books: GET /api/books
