### README

**README.md**
```markdown
# Tassc - Task Management Application

Tassc is a task management application designed to streamline task organization for individuals and teams by providing a user-friendly interface and robust backend functionality.

## Features

- User registration and authentication
- Create, read, update, and delete tasks
- Task status management
- Task due date auto-deletion
- Password reset and change email functionality
- PDF export of task list

## Technologies Used

- Frontend: React, TypeScript, Axios, React Router, Formik, Yup, React Toastify
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Nodemailer
- Other: jsPDF

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Azterix101/tassc.git
   cd tassc
   ```

2. Set up the server:
   ```sh
   cd server
   npm install
   ```

3. Set up the client:
   ```sh
   cd ../client
   npm install
   ```

4. Create a `.env` file in the `server` directory with the following content:
   ```env
   MONGO_URI=mongodb://localhost:27017/yourdatabase
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

5. Start the server:
   ```sh
   cd server
   npm start
   ```

6. Start the client:
   ```sh
   cd ../client
   npm start
   ```

## Usage

1. Register a new user.
2. Log in with the registered user.
3. Manage tasks (create, edit, delete, view).
4. Change email or password.
5. Export tasks to PDF.

## API Documentation

See [API Documentation](./docs/api-documentation.md) for detailed API information.

## High-Level Design

See [High-Level Design](./docs/high-level-design.md) for a high-level overview of the system architecture.

## License

This project is licensed under the MIT License.


### Summary

1. **README.md**: Provides an overview of the project, installation instructions, usage, and links to documentation.
2. **API Documentation**: Detailed documentation of the available API endpoints.
3. **High-Level Design**: An overview of the system architecture, components, data flow, database schema, and future enhancements.


