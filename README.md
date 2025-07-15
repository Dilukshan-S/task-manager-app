# 📝 Task Manager App

A full-stack task management application built with **React**, **Node.js (Express)**, **MongoDB**, and **JWT Authentication**. The app allows users to register, log in, and manage their personal tasks with features like task creation, editing, completion tracking, search, sorting, and timestamp recording.

---

## 📌 Features

- 🔐 User Registration & Login (JWT-protected routes)
- ✅ Create, Edit, Complete, and Delete Tasks
- 🔍 Search and Sort Tasks (A–Z / Z–A)
- 🕒 Task Start and End Timestamps
- 🌗 Light/Dark Theme Toggle
- 📦 Dockerized Setup (MongoDB, Frontend, Backend)
- 🧪 Secure API with middleware authorization
- ⚙️ Easily deployable and scalable

---

## 🚀 Tech Stack

| Frontend     | Backend        | Database | DevOps              |
|--------------|----------------|----------|---------------------|
| React, CSS   | Node.js, Express | MongoDB  | Docker, Docker Compose |

---

## 📦 Prerequisites

Make sure you have installed:

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

## 🛠️ How to Run (in any machine)

### 1. Clone the Repository

```bash
git clone https://github.com/Dilukshan-S/task-manager.git
cd task-manager

2. Create .env file for backend
Inside the backend folder, create a file named .env and add:

PORT=5000
MONGO_URI=mongodb://mongo:27017/taskmanager
JWT_SECRET=your_jwt_secret

3. Start All Services with Docker

docker compose up --build

This will:

Spin up MongoDB, backend, and frontend containers

Automatically serve the app at: http://localhost:3000


🧪 Testing the App
Once the app is running:

Go to http://localhost:3000

Register a new account

Add, complete, and delete tasks

Search and sort tasks using the top input/select

⏱ Task Timestamps
Each task automatically tracks:

createdAt: When the task was added

completedAt: When the task was marked as completed

These values are stored and handled by the backend.

🛑 Stop the App
To stop the containers:

docker compose down

To also remove volumes (MongoDB data):

docker compose down -v

🧼 Clean Up Docker (Optional)

docker system prune -a
docker volume prune


✨ Future Improvements
 Two-Factor Authentication (TOTP / Google Authenticator)

 Fully responsive UI for mobile and tablet

 Role-based access control

 Unit & Integration testing

 CI/CD pipeline (GitHub Actions)


📜  License
MIT License © 2025