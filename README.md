# Premium Multi-Agent Membership Commerce Platform

A high-end, membership-based platform connecting local businesses, agents, and customers.

## Features
- **Premium UI/UX**: Modern, clean, and responsive design with Light/Dark mode.
- **Multi-Role System**: 9 distinct roles (Admin, State Agent, District Agent, Division Agent, Pincode Agent, Category Agent, Shop Owner, User, Delivery Partner).
- **Membership Platform**: Tiered membership plans (₹5k - ₹100k) with varying local benefits.
- **Agent Network**: Structured hierarchy for local management and onboarding.
- **Shop System**: Service and Product based shop management with trial periods.
- **KYC System**: Mandatory verification for agents and shop owners.
- **Full-Stack**: Node.js/Express backend with MongoDB/Mongoose.
- **Security**: JWT Authentication and Bcrypt password hashing.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, React Router, Recharts, Lucide React, Axios.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Multer.

## Setup Instructions

### Backend
1. `cd multi-agent-platform/backend`
2. `npm install`
3. Create a `.env` file (template provided in `backend/.env`)
4. `npm start` (or `node server.js`)

### Frontend
1. `cd multi-agent-platform/frontend`
2. `npm install`
3. `npm run dev`
4. Access at `http://localhost:5173`

## Directory Structure
- `backend/models`: Database schemas.
- `backend/controllers`: Business logic.
- `frontend/src/context`: Global state (Theme, Auth).
- `frontend/src/dashboards`: Role-specific dashboard layouts.
- `frontend/src/components/landing`: Modular landing page sections.
