# Neerza Amul Ice Cream Parlour 🍦

A modern, mobile-first e-commerce website for Neerza Amul Ice Cream Parlour — a local dairy and ice cream shop in Mansarovar, Jaipur.

## 🌟 Features

### Customer Features
- 📱 **Mobile-first design** inspired by Blinkit/Zepto
- 🔍 **Product search & filter** by category, price, availability
- 🛒 **Cart** with live price calculation
- 💬 **WhatsApp ordering** — generates formatted order message
- ❤️ **Wishlist** (saved in localStorage)
- ⭐ **Customer reviews**
- 📍 **Store info & map**

### Admin Dashboard
- 📊 Dashboard with stats & alerts
- 📦 Product CRUD management
- 📁 Category management
- 🖼️ Banner management
- 📈 Inventory management with bulk stock update
- 🔐 JWT authentication

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React, Tailwind CSS v4 |
| Animations | Framer Motion |
| Backend | Express.js, Node.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Images | Cloudinary (with local fallback) |

## 📁 Project Structure

```
├── frontend/          # Next.js app (port 3000)
│   ├── src/app/       # Pages (App Router)
│   ├── src/components # React components
│   ├── src/context    # Cart, Wishlist, Auth contexts
│   ├── src/lib        # API client, WhatsApp utils
│   └── public/images  # Product images
│
├── backend/           # Express.js API (port 5000)
│   ├── src/models     # MongoDB schemas
│   ├── src/routes     # REST API endpoints
│   ├── src/controllers
│   └── src/middleware  # Auth, upload, error handling
│
└── Project2/          # Original static site (preserved)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Frontend

```bash
cd frontend
npm install
npm run dev          # → http://localhost:3000
```

### Backend

```bash
cd backend
cp .env.example .env  # Edit with your MongoDB URI
npm install
npm run seed          # Seed database with sample data
npm run dev           # → http://localhost:5000
```

## 📱 WhatsApp Ordering Flow

1. Customer browses & adds products to cart
2. Clicks "Order on WhatsApp"
3. Enters name & phone number
4. App generates formatted order message
5. Opens WhatsApp with pre-filled message to store number
6. Store confirms order via WhatsApp

## 🎨 Design System

| Color | Hex | Usage |
|-------|-----|-------|
| Amul Red | `#ED1C24` | CTAs, accents |
| Cream | `#FFF8E7` | Page backgrounds |
| Sky Blue | `#87CEEB` | Secondary accents |
| Light Yellow | `#FFFDE7` | Highlights |

## 📄 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/products | — | List products |
| GET | /api/products/:id | — | Get product |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| GET | /api/categories | — | List categories |
| POST | /api/auth/login | — | Admin login |
| GET | /api/analytics/dashboard | Admin | Dashboard stats |

## 🔮 Future Roadmap

- [ ] Online payments (UPI/Cards)
- [ ] Delivery tracking
- [ ] Push notifications
- [ ] Subscription milk delivery
- [ ] Rider management

## 📞 Contact

**Neerza Amul Ice Cream Parlour**
- 📍 Shop 69/396, Madhyam Marg, Mansarovar, Jaipur
- 📱 +91 82095 24367
- 📧 neerzicecreamparlour@gmail.com
- 📸 [@neerzaamulicecream](https://instagram.com/neerzaamulicecream)
