# 🛍️ E-commerce-store 🚀

<p align="center">
  <img src="https://img.shields.io/github/repo-size/hilla10/e-commerce-store" alt="Repo Size" />
  <img src="https://img.shields.io/github/languages/top/hilla10/e-commerce-store" alt="Top Language" />
  <img src="https://img.shields.io/github/issues/hilla10/e-commerce-store" alt="Open Issues" />
  <img src="https://img.shields.io/github/forks/hilla10/e-commerce-store" alt="Forks" />
  <img src="https://img.shields.io/github/stars/hilla10/e-commerce-store" alt="Stars" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
</p>

**Build fast, scalable, and interactive web apps effortlessly.**

A modern E-commerce web application built with **React** and **Node.js**, designed to provide a seamless shopping experience.

---

<p align="center">
    <a href="https://resume-eta-swart.vercel.app/">
    <img src="frontend/public/images/login-page.png" alt="Login Page" width="500" />
  </a>
  <a href="https://resume-eta-swart.vercel.app/">
    <img src="frontend/public/images/home-page.png" alt="Home Page" width="500" />
  </a>
  <a href="https://resume-eta-swart.vercel.app/">
    <img src="frontend/public/images/admin-page.png" alt="Admin page" width="500" />
  </a>

  
</p>

---

<p align="center">
  <a href="https://e-commerce-store-r1ub.onrender.com/">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen" alt="Live Demo" width="200" />
  </a>
</p>

---



## 📑 Table of Contents

- [📝 E-commerce-store](#-E-commerce-store)
  - [📑 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [⚙️ Getting Started](#️-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Environment Variables](#environment-variables)
    - [Backend .env:](#backend-env)
    - [Frontend .env:](#frontend-env)
    - [Backend (dev)](#backend-dev)
    - [Frontend (dev)](#frontend-dev)
  - [📂 Folder Structure](#-folder-structure)

---


## ⚙️ Tech Stack

### 🧩 Frontend  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Confetti](https://img.shields.io/badge/React_Confetti-FFDD00?style=for-the-badge&logo=react&logoColor=black)

### ⚙️ Backend  
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

### 🗄️ Database  
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### 🔐 Authentication  
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-003B57?style=for-the-badge)

### 🧰 Other Tools  
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white)


---

## ✨ Features

✅ User authentication with JWT  
✅ Responsive UI with Tailwind CSS  
✅ RESTful API integration  
✅ CRUD operations for products and users  
✅ Payment Integration
✅ Role-based access control  
✅ Deployment-ready setup



---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)


## 🧩 Installation

```bash
# Clone repository
git clone https://github.com/hilla10/e-commerce-store.git

# Navigate to project

# Install backend dependencies
cd e-commerce-store
npm install

# Install frontend dependencies
cd ../frontend 
npm install
```

## Environment Variables

### Backend .env:
```bash
MONGODB_URI =your_mongodb_uri
UPSTASH_REDIS_URL=your_upstash_url
ACCESS_TOKEN_SECRET=your_access_token
REFRESH_TOKEN_SECRET=your_refresh_token
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_key
CLIENT_URL=your_client_url
NODE_ENV = development

```
### Backend (dev)

```bash
cd e-commerce-store
npm run dev
```


### Frontend (dev)

```bash
cd frontend
npm run dev
```


## 📂 Folder Structure

```

e-commerce-store/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── app/
│   │   ├── api/
│   │   └── App.jsx
├── README.md
└── package.json
```

📄 License

MIT License

👤 Contact

<p align="left"> <a href="https://github.com/hilla10">GitHub</a> • <a href="https://www.linkedin.com/in/hailemichaelnegusse/">LinkedIn</a> </p>
