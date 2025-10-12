---

# 🖥️ ElevatePC

A full-stack application for **custom PC building, product management, and e-commerce functionality**.
Built with **Node.js + Express + PostgreSQL** for the backend and **React** for the frontend.

---

## 📂 Project Structure

```
ElevatePC/
│
├── backend/                # Express + PostgreSQL API
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth middleware (JWT)
│   │   ├── models/         # DB structure (optional if using controllers only)
│   │   ├── routes/         # API routes
│   │   └── server.js       # App entry point
│   ├── package.json
│   └── .env
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Screens (Home, Login, Build, Cart, etc.)
│   │   ├── services/       # API calls (Axios/Fetch)
│   │   └── App.js
│   ├── package.json
│   └── .env
│
├── README.md               # This file
└── .gitignore
```

---

## ⚙️ Backend (Express + PostgreSQL)

### Features

* 🔐 Authentication with **JWT**
* 👤 User roles: `user`, `admin`
* 🛠️ PC Build system (custom builds with components)
* 🛒 Shopping cart with add/update/delete
* 📦 Product management (CRUD by admin)
* 💾 PostgreSQL database hosted on **Neon**

### Installation

```bash
cd backend
npm install
```

### Run Server

```bash
npm run dev
```

### .env (backend)

```env
PORT=4000
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
JWT_SECRET=your_secret_key
```

---

## 🎨 Frontend (React + Vite/CRA)

### Features

* 🔑 User login/register
* 🖥️ Build your own PC flow
* 📋 Product browsing & filtering
* 🛒 Cart management
* 🎛️ Admin dashboard (manage products/builds)

### Installation

```bash
cd frontend
npm install
```

### Run Frontend

```bash
npm start
```

### .env (frontend)

```env
REACT_APP_API_URL=http://localhost:4000/api
```

---

## 🗄️ Database Schema (PostgreSQL)

### `users`

| id | name | email | password | role |
| -- | ---- | ----- | -------- | ---- |
| 1  | John | ...   | hashed   | user |

### `products`

| id | name | price | images (JSONB) | category | brand | details (JSONB) |

### `builds`

| id | name | user_id | status | created_at |

### `build_products`

| id | build_id | product_id | category |

### `cart`

| id | user_id |

### `cart_items`

| id | cart_id | product_id | quantity |

---

## 📡 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/logout` *(frontend handled)*

### Products

* `GET /api/products/all`
* `GET /api/products/:id`
* `POST /api/products/add` *(admin)*
* `PUT /api/products/update/:id`
* `DELETE /api/products/delete/:id`

### Builds

* `GET /api/builds/all` *(admin)*
* `GET /api/builds/user` *(logged-in user)*
* `POST /api/builds/create`
* `PUT /api/builds/update/:id`
* `DELETE /api/builds/delete/:id`

### Cart

* `GET /api/cart/:userId`
* `POST /api/cart/:userId/add`
* `PUT /api/cart/:userId/update`
* `DELETE /api/cart/:userId/remove/:productId`

---

## 🚀 Deployment

* Backend → [Render/Heroku/Vercel functions]
* DB → [Neon PostgreSQL]
* Frontend → [Vercel/Netlify]

---

## 🛠️ Tech Stack

* **Frontend**: React, TailwindCSS, Axios
* **Backend**: Node.js, Express, JWT, bcrypt
* **Database**: PostgreSQL (Neon)
* **Tools**: Git, Postman, pgAdmin  

---

## 📌 Todo

* [ ] Mobile responsiveness 
* [ ] Order Page
* [ ] Order history
* [ ] Build recommendations with compatibility checks
* [ ] Wishlist feature
* [ ] Payment integration (Stripe/PayPal)

--- 
    
