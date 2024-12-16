# Placement_Tracking_system


This is a **Placement Tracking System** project built using **Node.js** (backend) and **React.js** (frontend). The system helps manage and track placement processes efficiently.

---

## Features

- **User Management:** Admins can manage users, such as students.
- **Placement Updates:** placement progress.
- **Authentication:** Secure login and registration using JWT.
- **Responsive Design:** Accessible across all devices.
- **RESTful APIs:** Backend APIs for data handling.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Backend Setup (Node.js)](#backend-setup-nodejs)
4. [Frontend Setup (React.js)](#frontend-setup-reactjs)
5. [Running the Application](#running-the-application)
6. [Project Structure](#project-structure)
7. [Contributing](#contributing)
8. [License](#license)

---

## Technologies Used

### Backend:
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Token (JWT) for authentication

### Frontend:
- React.js
- React Router
- React Fetches for API calls

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites:

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed
- [MongoDB](https://www.mongodb.com/) set up locally or cloud MongoDB URI (e.g., MongoDB Atlas)

### Clone the Repository:
```bash
git clone https://github.com/NebiyatHassen/Placement_Tracking_system.git
cd Placement_Tracking_system
```

---

## Backend Setup (Node.js)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and configure the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend should now run on `http://localhost:3001`.

---

## Frontend Setup (React.js)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend should now run on `http://localhost:3000`.

---

## Running the Application

Start both the backend and frontend servers simultaneously:

1. In one terminal, run the backend server:
   ```bash
   cd backend
   npm start
   ```

2. In another terminal, run the frontend server:
   ```bash
   cd frontend
   npm start
   ```

3. Open the application in your browser at `http://localhost:3001`.

---

## Project Structure

### Backend:
```
backend/
|-- models/          # Database models (e.g., User, JobPost)
|-- routes/          # API routes
|-- controllers/     # Request handlers
|-- middlewares/     # Middleware for authentication, error handling
|-- server.js        # Entry point
```

### Frontend:
```
frontend/
|-- src/
    |-- components/  # Reusable React components
    |-- pages/       # Main application pages
    |-- App.js       # Main React component
    |-- index.js     # ReactDOM render
```

---
## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

