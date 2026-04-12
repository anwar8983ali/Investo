# 🚀 Investo - Stock Trading Platform (Zerodha Clone)

Investo is a full-stack stock trading web application built using the MERN stack. It simulates real-world trading features like holdings, positions, and order management, along with secure authentication.

---

## 🌐 Live Demo

* 🔗 Frontend: https://investo-ecr9.vercel.app
* 🔗 Dashboard: https://investo-dashboard.vercel.app
* 🔗 Backend API: https://investo-hdsy.onrender.com

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Authentication

* JWT (JSON Web Token)
* HTTP-only Cookies

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## ✨ Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Protected routes
* Logout functionality

### 📊 Dashboard

* View Holdings (long-term investments)
* View Positions (active trades)
* View Orders history

### 💹 Trading System

* Buy & Sell stocks
* Automatic updates for:

  * Holdings
  * Positions
  * Orders

### 🌍 Full Stack Integration

* REST API integration
* CORS handling
* Environment-based configuration

---

## 📂 Project Structure

```
Investo/
│
├── frontend/        # Landing page (Login/Signup)
├── dashboard/       # Trading dashboard
├── backend/         # Express server & APIs
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
MONGO_URL=your_mongodb_connection
TOKEN_KEY=your_secret_key
```

### Frontend (.env)

```
REACT_APP_API_URL=https://investo-hdsy.onrender.com
```

---

## 🚀 Installation & Setup

### 1. Clone Repository

```
git clone https://github.com/anwar8983ali/Investo.git
cd Investo
```

---

### 2. Backend Setup

```
cd backend
npm install
npm start
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm start
```

---

### 4. Dashboard Setup

```
cd dashboard
npm install
npm start
```

---

## 🔒 Authentication Flow

1. User logs in → JWT token generated
2. Token stored in HTTP-only cookie
3. Backend verifies token using middleware
4. Protected routes accessible only if authenticated
5. Logout clears cookie

---

## 🧠 Key Concepts Implemented

* REST API design
* JWT Authentication & Authorization
* CORS handling for multiple frontends
* State management with React hooks
* CRUD operations with MongoDB
* Secure cookie handling

---

## 📌 Challenges Solved

* CORS issues between Vercel & Render
* Handling multiple frontend deployments
* Secure authentication using cookies
* Real-time update of trading data
* Debugging API integration issues

---

## 🚀 Future Improvements

* Real-time stock price integration (WebSockets)
* Charts & analytics
* Portfolio performance tracking
* Dark mode UI
* Mobile responsiveness

---

## 👨‍💻 Author

**Anwar Ali**

* GitHub: https://github.com/anwar8983ali

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
