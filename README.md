# GoWagr Assessment- Money Transfer API

This project is a RESTful API developed using **ExpressJS** and **TypeScript** for a simple money transfer system. It allows users to register, check their balance, and transfer money to other users. **PostgreSQL** is used as the database.

## Technologies Used

- **Express.js**: A web application framework for building the backend server and handling HTTP requests.
- **Prisma ORM**: For database management and migration.
- **PostgreSQL**: The database for storing users, transfers, and balances.
- **JWT (JSON Web Token)**: For secure user authentication and authorization.
- **TypeScript**: Adds static typing to JavaScript for better code organization and safety.
- **Jest**: For writing unit tests.
- **Postman**: For API documentation generation.

## API Endpoints

### Auth
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login an existing user.
  
### Users
- `GET /users/:id`: Retrieve user details, including balance, by user ID.
- `GET /users/username/:username`: Retrieve user details by username.

### Transfers
- `POST /transfers`: Initiate a money transfer.
- `POST /transfers/history`: List a user's transfers with pagination support.

## Features

- **User Registration**: Allows new users to register with a first name, last name, username, email, mobile and password.
- **Balance Checking**: Users can view their current balance.
- **Money Transfer**: Allows users to transfer money to others by providing their usernames. 
- **Locking and Race Condition Handling**: Ensure data consistency during transfers.
- **Transfer Filtering**: Add filtering options to the transfer history endpoint.
- **JWT Authentication**: Ensures secure access to protected routes using tokens.
- **Error Handling and Validation**: Proper error handling and input validation for all endpoints.

## Prerequisites

Make sure you have the following installed:

- **Node.js**: Download and install Node.js from [here](https://nodejs.org).
- **Yarn**: You can install Yarn using the following command:
  
  ```bash
  npm install --global yarn

- **PostgreSQL**: Ensure you have a running instance of PostgreSQL for the database.

## Installation

1. Clone the repository:
  
     ```bash
     git clone https://github.com/preciousaffiah/gowagr_Assessment.git

2. Change to the project directory:
  
     ```bash
     cd gowagr_Assessment

3. Install project dependencies:
  
     ```bash
     yarn install
     
4. Set up the `.env` file in the project root:
  
      ```dotenv
      # Server
      PORT=
      
      # JWT Secret
      JWT_SECRET=
      
      # Database
      DATABASE_URL=   

  -   Update the values with your configuration.

6. Run the Prisma migrations:
  
     ```bash
     yarn prisma:init
     yarn prisma:migrate

7. Generate Prisma Client:
  
     ```bash
     yarn prisma:generate

8. Start the server:
  
     ```bash
     yarn dev
  

## Unit Tests
   Unit tests are written using Jest. To run the tests:
   
    yarn test

## API Documentation
### Postman Collection
*Placeholder data has already been set in each of the requests with status examples, just follow these steps to get started and make requests!*

1. In the root of the project folder, you will find a folder named `postman_collection`. This contains:
     - The **Postman collection** for testing the API endpoints.
     - The **Postman environment** file.
  
       ![postman_folder](https://github.com/user-attachments/assets/956435a3-55ff-4d73-b303-a9506c9e2a83)

2. Open **Postman**, and import the collection:
     - Click on `Import`.
     - Select the `postman_collection` folder.
     - Import the `GoWagr.postman_collection.json` and `gowagr_dev.postman_environment.json`.
  
       ![postman_import](https://github.com/user-attachments/assets/36838a76-df48-4609-80c1-d50516ba7f7b)

3. Set the environment:
     - In Postman, click the gear icon next to **Environment**.
     - Set the environment to the newly exported one called `gowagr_dev`

       ![postman_environment](https://github.com/user-attachments/assets/ba0d7430-131f-4b7e-8ad4-ee8e73c4b01b)

  
  
  

     
