# MERU — Fashion & Lifestyle Ecommerce

**MERU** is a full-stack fashion and lifestyle ecommerce platform built with the **MERN stack and Next.js**, designed around a premium, minimal shopping experience.

The project combines a modern responsive storefront with a Node.js/Express backend, MongoDB database, secure authentication, email verification, password recovery, product management, shopping features, and a scalable architecture for future payment processing and real-time functionality.

> **MERU — Fashion & Lifestyle**
> *Quietly premium. Grounded in style.*

---

## 🌐 Live Application

**Frontend:**
https://merufashion.vercel.app

**Backend API:**
https://meru-fashion-ecommerce-backend.vercel.app

---

## ✨ Overview

MERU is being developed as a production-oriented ecommerce platform for fashion and lifestyle products, targeting both **women and men in Pakistan**.

The platform focuses on:

* Premium minimal UI
* Responsive shopping experience
* Secure user authentication
* Product discovery
* Categories and filtering
* Shopping cart
* Wishlist
* Checkout
* Order management
* Payment integration
* Admin management
* Real-time order updates
* Notifications

The application is being developed incrementally, with features organized into weekly development milestones.

---

## 🛠️ Technologies Used

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Lucide React**
* **Next Image Optimization**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**

### Authentication & Security

* **JWT**
* **HttpOnly Cookies**
* **bcrypt**
* **CORS**
* Password hashing
* Email verification
* Password reset tokens

### Email

* **Brevo Transactional Email API**

### Deployment

* **Vercel**
* MongoDB database hosted remotely

### Planned Technologies

* Stripe
* WebSockets
* Firebase Cloud Messaging
* Cloudinary

---

## 🎨 Design Direction

MERU follows a **premium minimal** design philosophy rather than a conventional ecommerce template.

The visual identity is inspired by:

* Sacred mountains
* Elevation
* Groundedness
* Quiet strength
* Simplicity
* Individuality

### Color Palette

| Color  | Hex       |
| ------ | --------- |
| Stone  | `#F3F1EC` |
| Dark   | `#24231F` |
| Muted  | `#6B6863` |
| Accent | `#A08B5E` |
| Slate  | `#3E4145` |
| Border | `#DDD8CC` |

The interface uses a warm neutral palette with subtle gold accents and typography designed to maintain a refined fashion-oriented appearance.

---

# 🚀 Features

## Authentication

The authentication system is fully implemented.

* User registration
* Secure password hashing
* JWT authentication
* HttpOnly authentication cookies
* Login
* Logout
* Protected routes
* Current-user authentication
* Email verification
* Forgot password
* Password reset
* Role support for users and administrators
* Production CORS configuration

### Authentication API

```text
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
GET  /api/auth/verify-email/:token
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

---

## 🛍️ Storefront

The storefront currently includes:

* Responsive navigation
* Hero section
* Category section
* Featured products
* Product cards
* Wishlist UI
* Add-to-cart UI
* About MERU section
* Responsive footer
* Login and signup experience

---

## 📦 Product System

The product module is being developed to support:

* Product listings
* Product details
* Product categories
* Product images
* Product pricing
* Product stock
* Product search
* Product filtering
* Pagination
* Featured products

---

## 🗂️ Categories

Current MERU categories include:

* Women
* Men
* Beauty
* Accessories

The category system is designed to support additional categories in the future.

---

## 🛒 Shopping Experience

Planned and progressively implemented shopping functionality includes:

* Shopping cart
* Quantity management
* Wishlist
* Product selection
* Checkout
* Order creation
* Order history

---

## 💳 Payments

Payment functionality is planned for the payment and order development phase.

Planned features:

* Stripe Checkout
* Payment success handling
* Payment failure handling
* Payment verification
* Order confirmation
* Invoice generation

---

## 👨‍💼 Admin Dashboard

The admin system is planned to provide:

* Dashboard overview
* User management
* Product management
* Category management
* Order management
* Analytics
* Statistics
* Administrative authorization

---

## 🔔 Real-Time Features

Planned real-time functionality includes:

* Live order status updates
* Real-time notifications
* Admin notifications
* Firebase push notifications
* Promotional notifications
* WebSocket communication

---

# 📅 Development Roadmap

## Week 1 — Project Setup & Authentication

### Frontend

* [x] Next.js + TypeScript setup
* [x] Project structure
* [x] Layout
* [x] Responsive Navbar
* [x] Footer
* [x] Landing Page
* [x] Login
* [x] Signup
* [x] Protected Routes

### Backend

* [x] MongoDB setup
* [x] User Schema
* [x] Authentication APIs
* [x] JWT Authentication
* [x] Password Hashing
* [x] Email Verification
* [x] Forgot Password
* [x] Password Reset
* [x] Authentication Context

### Deployment

* [x] Backend deployed on Vercel
* [x] Frontend deployed on Vercel
* [x] Production environment variables
* [x] Production authentication testing

---

## Week 2 — Products, Categories & Shopping

### Frontend

* [ ] Product Listing
* [ ] Product Details
* [ ] Categories
* [ ] Search Bar
* [ ] Filters
* [ ] Pagination
* [ ] Cart
* [ ] Wishlist
* [ ] Quantity Management
* [ ] Checkout UI

### Backend

* [ ] Product CRUD
* [ ] Category CRUD
* [ ] Product Images
* [ ] Search API
* [ ] Filter API
* [ ] Cart APIs
* [ ] Wishlist APIs
* [ ] Order APIs

---

## Week 3 — Payments, Orders & Admin

* [ ] Stripe Checkout
* [ ] Payment Success
* [ ] Payment Failure
* [ ] Payment Verification
* [ ] Order Confirmation
* [ ] Invoice Generation
* [ ] Order History
* [ ] Admin Dashboard
* [ ] User Management
* [ ] Product Management
* [ ] Category Management
* [ ] Order Management
* [ ] Analytics
* [ ] Admin Authorization
* [ ] Dashboard APIs
* [ ] Statistics APIs

---

## Week 4 — Real-Time Features, Testing & Production

* [ ] WebSocket Integration
* [ ] Real-Time Notifications
* [ ] Live Order Status
* [ ] Admin Notifications
* [ ] Firebase Push Notifications
* [ ] Promotional Notifications
* [ ] Contact Us
* [ ] Newsletter Subscription
* [ ] Profile Management
* [ ] Bug Fixes
* [ ] Refactoring
* [ ] Performance Optimization
* [ ] SEO Optimization
* [ ] Error Handling
* [ ] Loading States
* [ ] Form Validation
* [ ] Security Improvements
* [ ] Production Testing

---

# 📁 Project Structure

The repository uses a single-repository full-stack architecture.

```text
meru-fashion-ecommerce/
│
├── backend/
│   ├── api/
│   │   └── index.js
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   └── authRoutes.js
│   │   │
│   │   ├── services/
│   │   │   └── emailService.js
│   │   │
│   │   ├── app.js
│   │   └── index.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   ├── categories/
│   │   └── images/
│   │       └── products/
│   │
│   └── src/
│       ├── app/
│       ├── components/
│       ├── context/
│       └── data/
│
├── .gitignore
└── README.md
```

The structure will evolve as the product, cart, wishlist, order, payment, and admin modules are added.

---

# ⚙️ Local Development

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB account/database
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/hafiz-anas0/meru-fashion-ecommerce.git

cd meru-fashion-ecommerce
```

---

# 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_NAME=MERU
BREVO_SENDER_EMAIL=your_verified_sender_email

FRONTEND_URL=http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

The backend should run on:

```text
http://localhost:5000
```

You can test the API using:

```text
http://localhost:5000/
```

Expected response:

```json
{
  "message": "MERU API is running"
}
```

---

# 💻 Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

# 🔐 Environment Variables

## Backend

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

BREVO_API_KEY=
BREVO_SENDER_NAME=
BREVO_SENDER_EMAIL=

FRONTEND_URL=
```

## Frontend

```env
NEXT_PUBLIC_API_URL=
```

### Production

Frontend:

```env
NEXT_PUBLIC_API_URL=https://meru-fashion-ecommerce-backend.vercel.app
```

Backend:

```env
FRONTEND_URL=https://merufashion.vercel.app
```

> Never commit real API keys, database credentials, JWT secrets, or other sensitive environment variables to GitHub.

---

# ☁️ Deployment

MERU uses Vercel for deployment.

## Frontend

The Vercel project uses:

```text
Root Directory: frontend
```

The frontend environment variable:

```env
NEXT_PUBLIC_API_URL=https://meru-fashion-ecommerce-backend.vercel.app
```

## Backend

The backend is deployed separately.

Production API:

```text
https://meru-fashion-ecommerce-backend.vercel.app
```

Backend environment variables must be configured in Vercel.

---

# 🔒 Security

The authentication system follows several security practices:

* Passwords are hashed before storage
* JWTs are stored in HttpOnly cookies
* Authentication cookies use secure production settings
* Password reset tokens are hashed before database storage
* Password reset tokens expire
* Email verification is required before login
* Sensitive environment variables are kept outside source control
* CORS is configured for the production frontend
* Protected API routes validate JWT authentication

---

# 🗃️ Database

MongoDB is used as the primary database.

The application is designed around MongoDB collections for:

* Users
* Products
* Categories
* Cart
* Wishlist
* Orders
* Future payment/order records

The database architecture will expand as the remaining ecommerce modules are implemented.

---

# 📡 API Architecture

The backend follows a REST-style API architecture using Express.

Example structure:

```text
/api/auth
/api/products
/api/categories
/api/cart
/api/wishlist
/api/orders
/api/admin
```

Authentication endpoints are currently implemented under:

```text
/api/auth
```

Additional endpoints will be introduced as the corresponding Week 2–4 modules are completed.

---

# 🧪 Testing

Testing is performed incrementally during development.

Current authentication testing includes:

* User registration
* Duplicate email handling
* Email verification
* Login
* Invalid credentials
* Unverified account protection
* Authenticated user retrieval
* Logout
* Forgot password
* Password reset
* Protected route access
* Production CORS
* Production cookie authentication

Future testing will cover:

* Product APIs
* Search
* Filters
* Pagination
* Cart
* Wishlist
* Orders
* Payments
* Admin permissions
* Real-time features

---

# 🚧 Current Status

**Project Status: Active Development**

### Completed

* Full project setup
* Responsive storefront foundation
* Authentication system
* JWT authentication
* Secure password hashing
* Email verification
* Password recovery
* Protected routes
* Production deployment
* Production authentication testing

### Currently Developing

**Week 2 — Products, Categories & Shopping Experience**

The next major milestone is connecting the storefront to MongoDB-backed products and categories and implementing the complete product browsing and shopping flow.

---

# 🔮 Future Enhancements

Planned improvements include:

* Cloud-based product image storage
* Advanced product variants
* Inventory management
* Stripe payments
* Automated invoices
* Advanced admin analytics
* Real-time order tracking
* Firebase notifications
* Promotional campaigns
* SEO improvements
* Performance optimization
* Automated testing
* Enhanced security
* Production monitoring

---

# 📚 Documentation

Complete project documentation will cover:

* Project Overview
* Architecture
* Folder Structure
* Technologies
* API Documentation
* Database Schema
* Installation Guide
* Environment Variables
* Deployment Guide
* Features
* Development Roadmap
* Challenges
* Future Enhancements

Documentation will be expanded alongside the development of the remaining modules.

---

# 👨‍💻 Developer

**Hafiz Muhammad Anas Majid**

AI & Full-Stack Developer
MERN Stack · Next.js · AI/LLM Integration

### Connect

* LinkedIn: https://linkedin.com/in/hafiz-m-anas-majid-256359300
* GitHub: https://github.com/hafiz-anas0
* Portfolio: https://hafizanasmajid.vercel.app

---

# 📄 License

This project is currently being developed as an internship/project application.

The source code is available for educational and portfolio purposes.

```
