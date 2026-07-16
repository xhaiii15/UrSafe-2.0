# UrSafe 📝🔒

**UrSafe** is a secure, cloud-based note-taking web application. This is my very first deployed full-stack web project, designed to give users a private and protected space to write, save, and manage their personal notes online. 

The application focuses on secure user authentication and seamless data persistence across a modern MERN architecture.

---

## 🚀 Live Demo & Deployment
* **Live Link:** [Insert your deployed URL here, e.g., Vercel or Render link]
* **Frontend Hosting:** [e.g., Vercel / Netlify]
* **Backend Hosting:** [e.g., Render / Railway]

---

## ✨ Features

* **User Authentication:** Secure sign-up, login, and logout functionality to keep notes strictly private to each user.
* **CRUD Operations:** Complete freedom to **C**reate, **R**ead, **U**pdate, and **D**elete notes in real-time.
* **Responsive Dashboard:** A clean, minimal, and mobile-friendly user interface optimized for both desktop and mobile screens.
* **Instant Cloud Sync:** Notes are safely stored in a cloud database, allowing users to access their files from any device at any time.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
* **React.js** – Built with a component-based UI for a smooth, single-page application (SPA) experience.
* **Tailwind CSS** – Used for modern, clean, and fully responsive styling.
* **React Router Dom** – For seamless page transitions and client-side routing.

### **Backend & Database**
* **Node.js & Express.js** – To build a fast, robust RESTful API handling authentication and note management.
* **MongoDB & Mongoose** – A NoSQL document-based database used to securely store and structure user accounts and note records.
* **JSON Web Tokens (JWT)** – Implemented for secure, stateless user session authorization.
* **Bcrypt.js** – Used to securely hash and salt passwords before storing them in the database.

---

## 🔑 Key Security Implementations

Since this application is called **UrSafe**, security is built directly into its core:
1. **Password Hashing:** Passwords are never saved in plain text. They are securely encrypted using `bcrypt` algorithms.
2. **Protected API Routes:** Backend endpoints for managing notes are locked behind a custom JWT authentication middleware. Only users with a valid token can access their data.
3. **CORS Configuration:** Configured to strictly allow requests only from authorized frontend origins to prevent cross-site scripting vulnerabilities.

---

## 📁 Project Structure

```text
ursafe/
├── backend/            # Express.js API, JWT middleware, models, and DB configurations
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── frontend/           # React SPA, Axios fetch requests, Tailwind layouts, and pages
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
