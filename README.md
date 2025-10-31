# 🚀 Node.js, React & Clerk Integration Demo

This project demonstrates a **full-stack integration** between a **React (Vite)** client and a **Node.js (Express)** server.
It uses the following technologies:

* 🔐 **Clerk** for authentication
* 🗄️ **Prisma** with **PostgreSQL** for database access
* ⚡ **Inngest** to handle Clerk webhooks (`user.created`) and sync them to the local DB


## 🧰 Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [npm](https://www.npmjs.com/) (or yarn / pnpm)
* A running **PostgreSQL** database server

---

## ⚙️ Setup Instructions

Follow these steps to get both the **client** and **server** running.


### 🖥️ 1. Server Setup

Set up the backend server and database.

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the `server` directory and add your PostgreSQL connection string:

   ```env
   # .env
   DATABASE_URL=<YOUR_DB_URL>
   ```

   > 💡 Make sure this connection string points to your running PostgreSQL instance.

4. **Run database migrations:**
   This will create the `User` table based on the `prisma/schema.prisma` file.

   ```bash
   npx prisma migrate dev
   ```

### 💻 2. Client Setup

Set up the React frontend.

1. **Navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the `client` directory and add your Clerk publishable key:

   ```env
   # .env
   VITE_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
   ```

   > 🔑 This key is used in `client/src/main.tsx` to initialize Clerk.


## 🏃 Running the Application

You will need **three terminals** to run the full stack (server, client, and Inngest dev server).


### 🧩 Terminal 1: Run the Server

```bash
# From the /server directory
npm run dev
```

Server will start at:
👉 `http://localhost:3000`


### 🌐 Terminal 2: Run the Client

```bash
# From the /client directory
npm run dev
```

Client will start at:
👉 `http://localhost:5173` *(or another available port)*


### ⚙️ Terminal 3: Run Inngest Dev Server

Used to receive Clerk webhooks locally.

```bash
# Can be run from anywhere
npx inngest-cli dev -u http://localhost:3000/api/inngest
```

This will generate a **public URL** — add it in your **Clerk Dashboard → Webhooks** section to send `user.created` events.


## 🔄 How It Works

1. 🧑 A new user signs up on the React client (`http://localhost:5173`) using Clerk.
2. 🔔 Clerk fires a `user.created` webhook event.
3. 🌍 The Inngest dev server captures the event and forwards it to your local server (`http://localhost:3000/api/inngest`).
4. ⚡ The `syncUserFromClerk` function in `server/src/lib/inngest.ts` runs.
5. 🗃️ A new `User` record is created in your PostgreSQL database.

## 📚 Tech Stack Summary

| Layer        | Technology        |
| ------------ | ----------------- |
| Frontend     | React + Vite      |
| Backend      | Node.js + Express |
| Auth         | Clerk             |
| Database ORM | Prisma            |
| Database     | PostgreSQL        |
| Webhooks     | Inngest           |


