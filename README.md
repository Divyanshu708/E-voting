# 🗳️ E-Voting

**Blockchain-Inspired E-Voting System built with MERN & Socket.IO**

A secure, real-time voting platform inspired by blockchain principles.
Each vote is linked like a block in a chain, making tampering easy to detect during re-evaluation.

## 🚀 Features

- 🔐 Secure authentication for **Admin** and **Users**
- 🧱 **Blockchain-inspired vote storage**
- 🔎 **Re-evaluation system** to detect tampered votes
- ⚡ **Real-time updates** using Socket.IO
- 🗳️ One-vote-per-user per campaign
- 👑 Admin-only controls for managing campaigns

## 🏗️ Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Realtime:** Socket.IO
- **Auth:** JWT + Cookies

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/e-voting.git
cd e-voting
```

---

### 2️⃣ Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3️⃣ Environment setup

Create a `config.env` file in the **backend** folder:

```env
NODE_ENV=development
PORT=8000
DB=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

Create a `.env` file in the **frontend** folder:

```env
VITE_API_URL=http://localhost:8000
```

---

### 4️⃣ Run the project

#### Start backend

```bash
npm start
```

#### Start frontend

```bash
npm run dev
```

---

## 🔑 Login Credentials

### 🔹 Admin Login

```
Username: admin001
Password: pass1234
```

### 🔹 User Login

There are **40 pre-saved users** for testing.

```
Username format: VOTER001 → VOTER040
Password: pass1234
```

Examples:

```
VOTER001 / pass1234
VOTER015 / pass1234
VOTER040 / pass1234
```

---

## 🗳️ Voting Rules

### 👤 Users

- Must be **logged in** to vote
- Can vote **only once per campaign**
- Cannot vote again in the same campaign
- To vote again, log in with **another user account**

---

## 👑 Admin Capabilities

Admins **cannot vote**.
They can only:

- ➕ Add campaigns
- ❌ Delete campaigns
- 👥 Manage candidates
- 🔎 **Re-evaluate blocks** to check for tampering

---

## 🔐 How the Blockchain-Inspired System Works

- Every vote is saved as a **block**
- Each block is linked to the previous one
- If someone tampers with a vote:
  - The chain becomes invalid
  - The **re-evaluation system** detects it instantly

This ensures:

- Transparency
- Tamper detection
- Trust in the voting process

---

## 🌐 Deployment

The project supports deployment on:

- **Frontend:** Netlify / Vercel
- **Backend:** Render

Make sure to configure:

- CORS
- Cookies (`secure: true`, `sameSite: "none"`)
- Environment variables

---

## 📸 Screenshots

<img width="1919" height="902" alt="image" src="https://github.com/user-attachments/assets/94db0a46-28ee-4db2-8ebd-ff455c588495" />

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📜 License

This project is for **educational & experimental purposes**.
Feel free to use and modify.

---

## ⭐ Support

If you like this project, give it a **star ⭐** on GitHub!
