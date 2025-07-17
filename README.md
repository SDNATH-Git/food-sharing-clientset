# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---------------------------------------------------------------------------------
# 🍽️ Food Sharing Website

A full-stack web application that allows users to share surplus food with others in need. Users can donate food, request food, and manage their food listings with a simple and responsive interface.

## 🌐 Live URL

🔗 [Visit the Live Website](https://food-sharing-1821c.web.app/)

---

## 🎯 Project Purpose

Food waste is a global problem. The purpose of this application is to reduce food waste and promote sharing within the community. It connects donors with people who need food through a convenient online platform.

---

## 🚀 Key Features

✅ **User Authentication**
- Register/Login with Email & Password
- Google OAuth Login
- JWT-based route protection

✅ **Food Management**
- Add food with image, quantity, location, expiry, and notes
- Update or delete own listed food
- View all available food items
- Filter by status

✅ **Food Request**
- Request available food
- Prevent multiple requests for same item
- View requested items

✅ **Dynamic Dashboard**
- "Manage My Foods" for donors
- "My Requests" for receivers

✅ **Responsive UI**
- Fully responsive and mobile-friendly design
- Attractive sections with Tailwind CSS and animations

---

## 📦 Technologies & NPM Packages Used

### 💻 Frontend
- `React`
- `React Router DOM`
- `Tailwind CSS`
- `Framer Motion` – for animation
- `SweetAlert2` – for beautiful alerts
- `Lottie React` – for animated illustrations
- `Axios` – for HTTP requests
- `@tanstack/react-query` – for data fetching and caching
- `React Hook Form` *(optional)*

### 🔐 Authentication & Backend
- `Firebase Authentication`
- `JWT (jsonwebtoken)`
- `Express.js`
- `MongoDB` + `MongoDB Atlas`
- `cors`, `dotenv`, `nodemon`

---

## 🛠️ How to Run Locally

### Prerequisites:
- Node.js and npm installed
- MongoDB URI & Firebase Config set in `.env`

### Steps:
```bash
# Clone the repo
git clone https://github.com/your-username/food-sharing-app.git
cd food-sharing-app

# Install dependencies
npm install

# Run frontend
npm run dev

# Start server in backend directory
cd server
npm install
node index.js
