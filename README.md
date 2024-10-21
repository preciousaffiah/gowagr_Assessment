# YouChat CHAT APPLICATION

A chat app with WebSockets is a real-time communication application that enables bidirectional, instantaneous messaging between users through a web interface. It utilizes WebSockets, a protocol allowing continuous, duplex communication between a client (usually a web browser) and a server over the web.

## Technologies Used

- Express.js: A web application framework for Node.js used for building the backend server and handling HTTP requests.

- Socket.IO: A JavaScript library for real-time web applications that enables bidirectional communication between clients and servers.

- HTML/JavaScript: Frontend technologies used for building the user interface and enhancing interactivity.

- npm: The package manager for Node.js used for installing and managing project dependencies.

## Features

- Add Contacts

- Create Group

- Join Group

- User Authentication: Supports both HTTP and websocket user authentication via auth token to ensure access to platform

- Messaging: Utilizes WebSocket technology through Socket.IO to enable instant messaging between users

## Future Enhancements

- Notification

- Message encryption

- File upload

- Read receipt

- Frontend: move user interface from HTML/javascript to ReactJs

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/preciousaffiah/youchat.git

2. Change to the project directory:

   ```bash
   cd YouChat

3. install project dependencies:

   ```bash
   npm install

4. Create a `.env` file in the project root with the following environment variables:

   ```dotenv
   # Server
   PORT=
  
   # JWT Token
   JWT_SECRET=
  
   # Database
   MONGODB_URI=

Update the values with yours.

4.  Build and Start the application:

    ```bash
    npm run prod

## API Documentation

1.  In the project folder, you'll see a folder called `postman_doc`

2.  Open your postman and import both files in the folder

3.  In the newly exported collection, set the environment to the newly exported one called `dev`

4.  Endpoints that require `auth_token` and `auth_token_reg` will be automatically set via a script that will be ran when you either login or register

5.  The postman requests have already been populated with placeholder data

6.  Go ahead and make other requests!
