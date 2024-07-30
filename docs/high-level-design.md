**docs/high-level-design.md**
```markdown
# High-Level Design

## Overview

Tassc is a task management application designed to streamline task organization for individuals and teams by providing a user-friendly interface and robust backend functionality. The system follows a client-server architecture with a frontend built using React and a backend using Node.js and Express. MongoDB is used as the database for storing user and task data.

## Architecture Diagram

```plaintext
Client (React) ----> Server (Node.js + Express) ----> Database (MongoDB)
```

## Components

### Frontend

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the backend.
- **Formik & Yup**: For form handling and validation.
- **React Router**: For client-side routing.
- **React Toastify**: For displaying notifications.
- **jsPDF**: For generating PDF files of tasks.

### Backend

- **Node.js & Express**: For building the backend API.
- **MongoDB & Mongoose**: For database and ORM.
- **JWT**: For user authentication.
- **Bcrypt**: For password hashing.
- **Nodemailer**: For sending emails.

## Data Flow

1. **User Registration and Authentication**:
   - Users register and log in using their email and password.
   - Passwords are hashed using Bcrypt before being stored in the database.
   - JWT tokens are issued for authenticated sessions.

2. **Task Management**:
   - Users can create, read, update, and delete tasks.
   - Each task has a name, description, status, due date, and is associated with a user.
   - Tasks are automatically deleted if the due date has passed.

3. **Email and Password Management**:
   - Users can request password resets.
   - Password reset links are sent via email.
   - Users can change their email and password from their profile.

4. **PDF Export**:
   - Users can export their tasks to a PDF file using jsPDF.

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **POST /api/auth/reset-password-request**: Request a password reset.
- **POST /api/auth/reset-password/:token**: Reset the password using a token.

### User

- **POST /api/user/change-password**: Change the user's password.
- **POST /api/user/change-email**: Change the user's email.

### Tasks

- **POST /api/tasks**: Create a new task.
- **GET /api/tasks**: Get all tasks for the authenticated user.
- **PUT /api/tasks/:id**: Update a task by ID.
- **DELETE /api/tasks/:id**: Delete a task by ID.

## Database Schema

### User

```json
{
  "_id": "ObjectId",
  "email": "string",
  "password": "string",
  "resetPasswordToken": "string",
  "resetPasswordExpires": "Date"
}
```

### Task

```json
{
  "_id": "ObjectId",
  "taskName": "string",
  "description": "string",
  "status": "string",
  "dueDate": "Date",
  "userId": "ObjectId"
}
```


## Conclusion

Tassc is a comprehensive task management solution designed to help individuals and teams manage their tasks efficiently. With a robust backend and user-friendly frontend, Tassc provides a seamless user experience for task management.
```