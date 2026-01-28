# Economic Plan Generation Platform

A full-stack web platform for students and teachers to create, manage, and export economic plans for entrepreneurship projects with automatic Word document generation.

## 🏗️ Architecture

- **Frontend**: Astro + React + TypeScript + TailwindCSS
- **Backend**: Express.js + TypeScript + Prisma ORM
- **Database**: MySQL
- **Authentication**: JWT + bcrypt
- **Document Generation**: docxtemplater + PizZip

## 📁 Project Structure

```
/Proyecto_creatividad
├── backend/           # Express API
│   ├── src/
│   ├── prisma/
│   ├── templates/
│   └── uploads/
├── frontend/          # Astro project
│   ├── src/
│   └── public/
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. Set up database:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

   Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:4321`

## 📋 Features

- ✅ User authentication (JWT-based)
- ✅ Role-based access control (Student, Teacher, Admin)
- ✅ Entrepreneurship management
- ✅ Multi-step economic plan wizard
- ✅ Automatic Word document generation
- ✅ Plan versioning and history
- ✅ Responsive design

## 🔑 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Users
- `GET /users/me` - Get current user profile

### Entrepreneurships
- `POST /entrepreneurships` - Create entrepreneurship
- `GET /entrepreneurships` - List user's entrepreneurships
- `GET /entrepreneurships/:id` - Get specific entrepreneurship

### Plans
- `POST /plans` - Create economic plan
- `GET /plans` - List user's plans
- `GET /plans/:id` - Get specific plan
- `PUT /plans/:id` - Update plan
- `POST /plans/:id/export` - Generate Word document

### Documents
- `GET /documents/:id` - Download generated document

## 🎨 Design

The platform features a modern, professional design with:
- Clean, intuitive interface
- Responsive layout for all devices
- Progressive form wizard with validation
- Real-time data visualization
- Accessible components

## 📄 License

MIT License
