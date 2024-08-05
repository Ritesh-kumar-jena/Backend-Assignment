# Backend Blog App

- This is a backend application for a simple blog system. It provides APIs for managing blog posts, comments, and user authentication.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Blog Posts**: Users can create, read, update, and delete their blog posts.
- **Comments**: Users can comment on blog posts.
- **Authorization**: Role-based access control ensures that only authenticated users can perform certain actions, and only authorized users can modify their own content.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js.
- **Mongoose**: Mongo Atlas object modeling tool for Node.js.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **bcrypt.js**: Library for hashing passwords securely.
- **dotenv**: Module for loading environment variables from a .env file.