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

<img width="1347" height="601" alt="image" src="https://github.com/user-attachments/assets/7533b543-fa3e-4f65-8d51-75b00f4c3382" />
<img width="1288" height="687" alt="image" src="https://github.com/user-attachments/assets/2b355ea2-9873-426a-a505-391ac1547c7b" />
<img width="515" height="92" alt="image" src="https://github.com/user-attachments/assets/0feb3dd5-26e8-4d87-9079-551fff5a1a97" />
<img width="362" height="368" alt="image" src="https://github.com/user-attachments/assets/c8763f78-5e9c-4dfd-9fea-ed284e8d919f" />
<img width="391" height="476" alt="image" src="https://github.com/user-attachments/assets/b610e4d5-311a-43ed-a11c-4202e79a9fbe" />
<img width="400" height="616" alt="image" src="https://github.com/user-attachments/assets/94d4fe25-8c60-41ea-ae17-8188efffda95" />
<img width="1350" height="550" alt="image" src="https://github.com/user-attachments/assets/6152b9e8-8aa2-40ac-9e9a-d33e851cbc92" />
<img width="638" height="492" alt="image" src="https://github.com/user-attachments/assets/966ab8f6-80a6-4a83-9632-159fe41b6ac9" />  - edit task
<img width="629" height="322" alt="image" src="https://github.com/user-attachments/assets/7fc15154-f190-4acd-923b-cc0da8478c8e" />
<img width="638" height="652" alt="image" src="https://github.com/user-attachments/assets/03da8c4c-92f8-4748-8279-870bb8cbb954" />
<img width="645" height="484" alt="image" src="https://github.com/user-attachments/assets/89f381c8-2c9c-4f20-a33c-e193af147ad3" />
<img width="628" height="624" alt="image" src="https://github.com/user-attachments/assets/26784f4e-6727-4f44-b607-f789a7509b44" />





