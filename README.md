<h1 align="center">✨ Fullstack Chat ✨</h1>

> MERN Stack Project: Responsive Chat App with Node.js, Socket.io and MongoDB

Highlights:

- 🌐 Real-time Messaging
- 🔐 JWT Authentication & Protected Routes
- ⚡ Tech Stack: React + Express + MongoDB + TailwindCSS + Shadcn/ui + Typescript
- 🧠 Global State Management with Zustand
- 🚨 Error Handling (Frontend & Backend)
- 🚀 Free Deployment with Docker
- ⏳ And much more!

---

## 🧪 .env Setup

### Backend

Database [MongoDB Atlas](https://www.mongodb.com/) is recommended.

```
PORT=8000 # You should keep it the same as Vite proxy port
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
```

## 🎯 Develop and Run the Project

### Installation

```sh
pnpm install
```

### 🔧 Run the Backend

```sh
pnpm dev:server
```

### 💻 Run the Frontend

```sh
pnpm dev:client
```

## 🌍 Deploy

### Build (Both for Backend and Frontend)

```sh
pnpm build # Output folder at `dist`, frontend resources at `dist/public`
```

### Serve Locally

```sh
pnpm start # Project runs on `http://localhost:8000/`
```

## 🐳 Containerizing

```sh
docker-compose up
```
