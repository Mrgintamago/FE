# 📚 HƯỚNG DẪN DEPLOY CHI TIẾT LÊN VERCEL

**Cập nhật:** 27/12/2025  
**Dự án:** TQN Figure - E-commerce MERN Stack  
**Tác giả:** Hướng dẫn từ workspace thực tế

---

## 📋 MỤC LỤC

1. [Kiến trúc Hiện Tại](#1-kiến-trúc-hiện-tại)
2. [Chuẩn Bị Trước Deploy](#2-chuẩn-bị-trước-deploy)
3. [Cấu Hình Backend](#3-cấu-hình-backend)
4. [Cấu Hình Frontend](#4-cấu-hình-frontend)
5. [Deploy Backend](#5-deploy-backend-lên-vercel)
6. [Deploy Frontend](#6-deploy-frontend-lên-vercel)
7. [Cấu Hình Database](#7-cấu-hình-mongodb)
8. [Cấu Hình Environment Variables](#8-cấu-hình-biến-môi-trường)
9. [Test & Troubleshooting](#9-test--troubleshooting)
10. [Tối Ưu Hóa](#10-tối-ưu-hóa)

---

## 1. KIẾN TRÚC HIỆN TẠI

### 1.1 Cấu Trúc Thư Mục

```
Shop (Root Folder)
├── BE/                          ← Backend (Node.js + Express)
│   ├── server.js               ← Entry point
│   ├── app.js                  ← Express app configuration
│   ├── package.json            
│   ├── config.env              ← Development environment variables
│   ├── .env.production         ← Production environment variables
│   ├── vercel.json             ← Vercel configuration (CẦN CẬP NHẬT)
│   ├── controllers/            ← Route handlers
│   ├── models/                 ← Mongoose schemas
│   ├── routes/                 ← API routes
│   ├── middleware/             ← Express middleware
│   ├── utils/                  ← Helper functions
│   └── views/                  ← EJS templates (admin panel)
│
├── FE/                          ← Frontend (React + Vite)
│   ├── src/
│   │   ├── main.jsx            ← React entry point
│   │   ├── App.jsx             ← Root component
│   │   ├── api/                ← API calls (axiosClient.js)
│   │   ├── components/         ← React components
│   │   ├── page/               ← Page components
│   │   ├── module/             ← Feature modules
│   │   ├── redux/              ← Redux store
│   │   └── styles/             ← SCSS/CSS files
│   ├── index.html              ← HTML template
│   ├── package.json
│   ├── vite.config.js          ← Vite configuration
│   ├── tailwind.config.cjs      ← Tailwind CSS config
│   ├── postcss.config.cjs       ← PostCSS config
│   ├── .env                     ← Development env variables
│   ├── .env.local              ← Local overrides (GIT IGNORED)
│   ├── .gitignore
│   └── vercel.json             ← Vercel configuration (CẦN CẬP NHẬT)
│
└── README.md

```

### 1.2 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.2.0 |
| **Build Tool** | Vite | 3.1.0 |
| **Styling** | Tailwind CSS + SCSS | 3.1.8 |
| **State Management** | Redux Toolkit | 1.8.6 |
| **HTTP Client** | Axios | 1.1.3 |
| **Backend** | Node.js | 18.x |
| **Framework** | Express.js | 4.18.2 |
| **Database** | MongoDB | 7.0.0 |
| **ODM** | Mongoose | 6.6.5 |
| **Authentication** | JWT | 9.0.3 |
| **Encryption** | bcryptjs | 2.4.3 |

### 1.3 API Base URL

**Development (hiện tại):**
- Frontend: `http://localhost:5173` (Vite dev server)
- Backend: `http://localhost:3000` (Express server)
- API: Frontend gọi `http://localhost:3000/api/v1/*`

**Production (sau deploy):**
- Frontend: `https://tqn-figure-fe.vercel.app` (Vercel)
- Backend: `https://tqn-ecommerce-api.vercel.app` (Vercel)
- API: Frontend gọi `https://tqn-ecommerce-api.vercel.app/api/v1/*`

---

## 2. CHUẨN BỊ TRƯỚC DEPLOY

### 2.1 Yêu Cầu Tiên Quyết

```bash
✅ Node.js v18+ (kiểm tra: node --version)
✅ npm v9+ (kiểm tra: npm --version)
✅ Git đã cài đặt (kiểm tra: git --version)
✅ Tài khoản GitHub hoặc GitLab
✅ Tài khoản Vercel (đăng ký tại https://vercel.com)
✅ MongoDB Atlas cluster (hoặc database MongoDB khác)
```

### 2.2 Chuẩn Bị Code

#### Step 1: Kiểm tra & Commit Code

```bash
# Di chuyển vào root folder
cd e:\Shop

# Kiểm tra status
git status

# Add tất cả file
git add .

# Commit
git commit -m "Prepare for Vercel deployment"

# Push lên GitHub
git push origin main
```

#### Step 2: Cấu Hình Git (nếu chưa)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 3. CẤU HÌNH BACKEND

### 3.1 Cập Nhật `BE/package.json`

**Hiện tại:**
```json
{
  "main": "server.js",
  "scripts": {
    "start": "nodemon server.js",
    "dev": "nodemon server.js"
  }
}
```

**Cần Thay Đổi:**
```json
{
  "name": "tech-ecommerce-api",
  "version": "1.0.0",
  "description": "TQN Figure E-commerce API",
  "main": "server.js",
  "type": "commonjs",
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'Build complete - no build step needed for Node.js'"
  },
  "dependencies": {
    // ... giữ nguyên tất cả dependencies
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
}
```

**Lý do thay đổi:**
- `"start": "node server.js"` - Vercel sẽ chạy script `start` trên production
- `"build"` script - Bắt buộc phải có (không cần build, chỉ install dependencies)
- `"engines"` - Chỉ định phiên bản Node.js

### 3.2 Cập Nhật `BE/vercel.json`

**Hiện tại:**
```json
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "server.js" }
  ]
}
```

**Cần Thay Đổi Thành:**
```json
{
  "version": 2,
  "name": "tech-ecommerce-api",
  "buildCommand": "npm install",
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node",
      "config": {
        "maxLambdaSize": "50mb",
        "nodeVersion": "18.x"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 3.3 Cập Nhật `BE/.env.production`

**Hiện tại:**
```dotenv
NODE_ENV=production
FRONTEND_URL=https://your-vercel-domain.vercel.app
MONGODB_URI=${MONGODB_URI}
JWT_SECRET=${JWT_SECRET}
# ... etc
```

**Cần Thay Đổi Thành:**
```dotenv
# Environment
NODE_ENV=production

# Port (Vercel sẽ gán động)
PORT=${PORT:-3000}

# Frontend URL - THAY your-fe-domain bằng domain Frontend thực tế
FRONTEND_URL=https://tqn-figure-fe.vercel.app

# Database - sẽ lấy từ Vercel Environment Variables
MONGODB_URI=${MONGODB_URI}

# JWT Secrets - sẽ lấy từ Vercel Environment Variables
JWT_SECRET=${JWT_SECRET}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
JWT_EXPIRES_IN=30m
JWT_COOKIE_EXPIRES_IN=1

# Email Configuration - sẽ lấy từ Vercel Environment Variables
EMAIL_USERNAME=${EMAIL_USERNAME}
EMAIL_PASSWORD=${EMAIL_PASSWORD}
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_FROM=${EMAIL_USERNAME}

# Cloudinary - sẽ lấy từ Vercel Environment Variables
CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}

# TinyMCE API Key - sẽ lấy từ Vercel Environment Variables
TINYMCE_API_KEY=${TINYMCE_API_KEY}

# Stream Chat - sẽ lấy từ Vercel Environment Variables
STREAM_API_KEY=${STREAM_API_KEY}
STREAM_API_SECRET=${STREAM_API_SECRET}
STREAM_APP_ID=${STREAM_APP_ID}

# PayOS Payment Gateway - sẽ lấy từ Vercel Environment Variables
PAYOS_CLIENT_ID=${PAYOS_CLIENT_ID}
PAYOS_API_KEY=${PAYOS_API_KEY}
PAYOS_CHECKSUM_KEY=${PAYOS_CHECKSUM_KEY}

# Meta - sẽ lấy từ Vercel Environment Variables
META_APP_ID=${META_APP_ID}
META_APP_SECRET=${META_APP_SECRET}
```

### 3.4 Kiểm Tra `BE/app.js` - CORS Configuration

**Kiểm tra hiện tại (dòng 36-58):**
```javascript
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "https://tqn-figure-fe.vercel.app"
];
```

**✅ Tốt!** Nhưng cần cập nhật để thêm dynamic domain:

Thay thế bằng:
```javascript
const allowedOrigins = [
  // Development
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  
  // Production - từ environment variable
  process.env.FRONTEND_URL,
  
  // Fallback
  "https://tqn-figure-fe.vercel.app"
].filter(Boolean); // Loại bỏ undefined values
```

### 3.5 Kiểm Tra `BE/server.js` - MongoDB Connection

**Kiểm tra hiện tại:**
```javascript
const DB = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/TQN";

mongoose.connect(DB)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch(err => console.log('❌ DB Connection Error:', err));
```

**✅ Tốt!** Nhưng cần thêm retry logic:

Thay thế bằng:
```javascript
const DB = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tqn_figure_shop";

const mongooseOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  retryWrites: true,
  w: 'majority'
};

mongoose.connect(DB, mongooseOptions)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log(`📍 Database: ${DB.split('/').pop()}`);
  })
  .catch(err => {
    console.error('❌ DB Connection Error:', err.message);
    // Không exit process - cho Vercel handle
  });
```

---

## 4. CẤU HÌNH FRONTEND

### 4.1 Cập Nhật `FE/vite.config.js`

**Hiện tại:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
```

**Cần Thay Đổi Thành:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemap trên production để giảm size
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux': ['redux', '@reduxjs/toolkit', 'react-redux'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
```

### 4.2 Cập Nhật `FE/package.json`

**Kiểm tra scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**✅ Tốt!** Nhưng cần thêm `"engines"`:

```json
{
  "name": "tqn-figure-fe",
  "version": "1.0.0",
  "description": "TQN Figure E-commerce Frontend",
  "type": "module",
  "private": true,
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    // ... giữ nguyên
  }
}
```

### 4.3 Cập Nhật `FE/vercel.json`

**Hiện tại:**
```json
{
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/"
    }
  ]
}
```

**Cần Thay Đổi Thành:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite_api_url"
  },
  "routes": [
    {
      "src": "/[^.]+$",
      "dest": "/index.html",
      "status": 200
    },
    {
      "src": "/.*",
      "dest": "$0"
    }
  ],
  "headers": [
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ]
}
```

### 4.4 Tạo `FE/.env.production`

Tạo file mới tại `e:\Shop\FE\.env.production`:

```dotenv
VITE_API_URL=https://tqn-ecommerce-api.vercel.app
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_FIREBASE_API_KEY=your-firebase-api-key
NODE_ENV=production
```

### 4.5 Cập Nhật `FE/src/api/axiosClient.js`

**Hiện tại:**
```javascript
import axios from "axios";
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
```

**✅ Tốt!** Không cần thay đổi - đã hỗ trợ environment variables.

Nhưng thêm error handling:

```javascript
import axios from "axios";

const apiBaseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

console.log("📡 API Base URL:", apiBaseURL);
console.log("🌍 Environment:", import.meta.env.MODE);

const axiosClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout
});
```

---

## 5. DEPLOY BACKEND LÊN VERCEL

### 5.1 Chuẩn Bị GitHub Repository

```bash
# 1. Vào folder root
cd e:\Shop

# 2. Khởi tạo git (nếu chưa)
git init

# 3. Thêm remote (thay YOUR_USERNAME và YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/tqn-figure-shop.git

# 4. Tạo branch main (nếu cần)
git checkout -b main

# 5. Add files
git add .

# 6. Commit
git commit -m "Initial commit - Ready for Vercel deployment"

# 7. Push
git push -u origin main
```

### 5.2 Deploy qua Vercel Dashboard

#### Bước 1: Tạo Project

1. Vào [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Tìm repo `tqn-figure-shop` và click **"Import"**

#### Bước 2: Configure Project

Màn hình "Configure Project" sẽ hiện:

| Cài Đặt | Giá Trị | Ghi Chú |
|--------|--------|--------|
| **Project Name** | `tqn-ecommerce-api` | Tên project trên Vercel |
| **Framework** | `Other` (hoặc `Node.js`) | Backend không cần framework preset |
| **Root Directory** | `BE` | ⚠️ **QUAN TRỌNG** - Chọn folder BE |
| **Build Command** | `npm install` | Không cần build, chỉ install |
| **Output Directory** | (Leave empty) | Node.js không cần output folder |
| **Install Command** | `npm install` | Default OK |

**✅ Nhấn "Deploy"**

#### Bước 3: Thêm Environment Variables

Sau khi deployment hoàn tất (thường fail ở bước này vì chưa có env vars):

1. Vào **"Settings"** → **"Environment Variables"**
2. Thêm từng biến (copy từ `BE/config.env`):

```
MONGODB_URI = mongodb+srv://user:password@cluster.mongodb.net/tqn_figure_shop?retryWrites=true&w=majority
JWT_SECRET = d40d5e72f5726f3e242faa28864d0b8e389d6a54b876ad6be79a38959ff12734a098f6f7e47df65ae7ccc40f0ec8566ea23d3a7d7dc1dcd4252d05732d20c8cb
JWT_REFRESH_SECRET = refresh_token_secret_key_change_this_in_production_12345
JWT_EXPIRES_IN = 30m
JWT_COOKIE_EXPIRES_IN = 1
EMAIL_USERNAME = quynhnhu255910@gmail.com
EMAIL_PASSWORD = rpsgfrmjbrsfuucb
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_FROM = quynhnhu255910@gmail.com
CLOUDINARY_CLOUD_NAME = dtnqj2ryv
CLOUDINARY_API_KEY = 995915643573919
CLOUDINARY_API_SECRET = aESur6_b-ZiMzAwUapa2VePkMQs
TINYMCE_API_KEY = s3jqlrtkzjtb5pv5adqjjpujujpny20m3zvdhts4lrun1g2w
FRONTEND_URL = https://tqn-figure-fe.vercel.app
NODE_ENV = production
STREAM_API_KEY = be663rcvfsw2
STREAM_API_SECRET = b24pb2qca7m46ca2y69fp3ffyqqaepdndzxtg2j2fbu2rzs2dks6y3ftts6fxcm3
STREAM_APP_ID = 1457616
PAYOS_CLIENT_ID = 8490b16d-513f-453b-9202-83cf58a4edf7
PAYOS_API_KEY = 6a5f0e7b-f1a5-425a-98c3-4b52977c1c40
PAYOS_CHECKSUM_KEY = a9e359f39e92e02e04404d2851e786f08395253ebb6b8d86704abf4c71c2c756
META_APP_ID = 1426590479080920
META_APP_SECRET = f986d488fc718be4a5c7fc3942ad43b6
```

3. Sau khi thêm xong, click **"Redeploy"** để trigger deploy lại

#### Bước 4: Xác Nhận Deployment

Khi thành công, bạn sẽ nhận được URL:
```
https://tqn-ecommerce-api.vercel.app
```

**Test API:**
```bash
curl https://tqn-ecommerce-api.vercel.app/api/v1/products
```

---

## 6. DEPLOY FRONTEND LÊN VERCEL

### 6.1 Chuẩn Bị Frontend

#### Bước 1: Cập Nhật API URL

Tại `FE/src/api/axiosClient.js` - đã cập nhật ở **phần 4.5**

#### Bước 2: Commit Changes

```bash
cd e:\Shop

git add .
git commit -m "Update frontend for Vercel deployment"
git push origin main
```

### 6.2 Deploy Frontend

#### Bước 1: Tạo Project Frontend

1. Vào [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import repo `tqn-figure-shop` lần nữa
4. **Root Directory**: Chọn `FE`
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. Click **"Deploy"**

#### Bước 2: Thêm Environment Variables cho Frontend

Vào **Settings** → **Environment Variables**, thêm:

```
VITE_API_URL = https://tqn-ecommerce-api.vercel.app
VITE_GOOGLE_CLIENT_ID = your-actual-google-client-id
VITE_FIREBASE_API_KEY = your-actual-firebase-key
NODE_ENV = production
```

#### Bước 3: Redeploy

Click **"Redeploy"** để sử dụng biến môi trường mới

**Frontend URL:**
```
https://tqn-figure-fe.vercel.app
```

---

## 7. CẤU HÌNH MONGODB

### 7.1 Tạo MongoDB Atlas Cluster (Cloud Database)

#### Bước 1: Đăng Ký MongoDB Atlas

1. Vào https://www.mongodb.com/cloud/atlas
2. Click **"Sign Up"** → Đăng ký tài khoản
3. Verify email

#### Bước 2: Tạo Organization & Project

1. Tạo **Organization** → Tên: `TQN Figure`
2. Tạo **Project** → Tên: `tqn-ecommerce`

#### Bước 3: Tạo Cluster

1. Click **"Create"** → Chọn **Free Tier (M0)**
2. **Cloud Provider**: AWS
3. **Region**: ap-southeast-1 (Singapore) hoặc ap-northeast-1 (Tokyo)
4. **Cluster Name**: `tqn-cluster`
5. Click **"Create Cluster"** → Đợi 2-3 phút

#### Bước 4: Tạo Database User

1. Vào **Database Access** (menu bên trái)
2. Click **"Add New Database User"**
3. **Authentication Method**: Password
4. **Username**: `tqn_admin`
5. **Password**: Tạo password mạnh (copy lưu lại!)
6. **Database User Privileges**: `readWriteAnyDatabase`
7. Click **"Create Database User"**

#### Bước 5: Whitelist IP Address

1. Vào **Network Access**
2. Click **"Add IP Address"**
3. **IP Address**: `0.0.0.0/0` (cho phép tất cả - cho Vercel)
4. **Comment**: `Vercel Deployment`
5. Click **"Confirm"**

#### Bước 6: Lấy Connection String

1. Vào **Clusters** → Click cluster `tqn-cluster`
2. Click **"Connect"**
3. Chọn **"Drivers"** → **Node.js** → **Version 4.1+**
4. Copy connection string:
   ```
   mongodb+srv://tqn_admin:<password>@tqn-cluster.xxxxx.mongodb.net/tqn_figure_shop?retryWrites=true&w=majority
   ```
5. **⚠️ THAY `<password>` bằng password thực tế!**

### 7.2 Test Connection Locally

```bash
cd BE

# Tạo file test-connection.js
cat > test-connection.js << 'EOF'
const mongoose = require('mongoose');

const DB = 'mongodb+srv://tqn_admin:YOUR_PASSWORD@tqn-cluster.xxxxx.mongodb.net/tqn_figure_shop?retryWrites=true&w=majority';

mongoose.connect(DB)
  .then(() => {
    console.log('✅ MongoDB Atlas connection successful!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  });
EOF

# Chạy test
node test-connection.js

# Xóa file test
rm test-connection.js
```

---

## 8. CẤU HÌNH BIẾN MÔI TRƯỜNG

### 8.1 Tóm Tắt Tất Cả Biến Cần Thiết

| Biến | Loại | Giải Thích | Giá Trị Ví Dụ |
|------|------|-----------|--------------|
| `MONGODB_URI` | Backend | Kết nối MongoDB Atlas | `mongodb+srv://tqn_admin:pass@cluster.mongodb.net/tqn_figure_shop?retryWrites=true&w=majority` |
| `JWT_SECRET` | Backend | Secret key cho JWT | Random 64 ký tự |
| `JWT_REFRESH_SECRET` | Backend | Secret key cho Refresh Token | Random 64 ký tự |
| `JWT_EXPIRES_IN` | Backend | Thời hạn Access Token | `30m` |
| `JWT_COOKIE_EXPIRES_IN` | Backend | Thời hạn Cookie | `1` (1 ngày) |
| `FRONTEND_URL` | Backend | Domain frontend | `https://tqn-figure-fe.vercel.app` |
| `NODE_ENV` | Backend | Environment | `production` |
| `EMAIL_USERNAME` | Backend | Gmail account | `quynhnhu255910@gmail.com` |
| `EMAIL_PASSWORD` | Backend | Gmail app password | `rpsgfrmjbrsfuucb` |
| `EMAIL_HOST` | Backend | SMTP server | `smtp.gmail.com` |
| `EMAIL_PORT` | Backend | SMTP port | `587` |
| `CLOUDINARY_CLOUD_NAME` | Backend | Cloudinary account | `dtnqj2ryv` |
| `CLOUDINARY_API_KEY` | Backend | Cloudinary API key | `995915643573919` |
| `CLOUDINARY_API_SECRET` | Backend | Cloudinary secret | `aESur6_b-ZiMzAwUapa2VePkMQs` |
| `TINYMCE_API_KEY` | Backend | TinyMCE editor API | `s3jqlrtkzjtb5pv5adqjjpujujpny20m3zvdhts4lrun1g2w` |
| `STREAM_API_KEY` | Backend | Stream Chat API | `be663rcvfsw2` |
| `STREAM_API_SECRET` | Backend | Stream Chat Secret | `b24pb2qca7m46ca2y69fp3ffyqqaepdndzxtg2j2fbu2rzs2dks6y3ftts6fxcm3` |
| `STREAM_APP_ID` | Backend | Stream Chat App ID | `1457616` |
| `PAYOS_CLIENT_ID` | Backend | PayOS Client ID | `8490b16d-513f-453b-9202-83cf58a4edf7` |
| `PAYOS_API_KEY` | Backend | PayOS API Key | `6a5f0e7b-f1a5-425a-98c3-4b52977c1c40` |
| `PAYOS_CHECKSUM_KEY` | Backend | PayOS Checksum | `a9e359f39e92e02e04404d2851e786f08395253ebb6b8d86704abf4c71c2c756` |
| `META_APP_ID` | Backend | Meta/Facebook App ID | `1426590479080920` |
| `META_APP_SECRET` | Backend | Meta/Facebook Secret | `f986d488fc718be4a5c7fc3942ad43b6` |
| `VITE_API_URL` | Frontend | Backend API URL | `https://tqn-ecommerce-api.vercel.app` |
| `VITE_GOOGLE_CLIENT_ID` | Frontend | Google OAuth Client ID | (cần lấy từ Google Console) |
| `VITE_FIREBASE_API_KEY` | Frontend | Firebase API Key | (cần lấy từ Firebase) |

### 8.2 Sinh Random Secret Key (Optional - nếu muốn đổi)

```bash
# Sử dụng Node.js để sinh random key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output ví dụ:
# a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

---

## 9. TEST & TROUBLESHOOTING

### 9.1 Kiểm Tra Deployment Status

#### Backend

```bash
# Xem logs deployment
curl https://tqn-ecommerce-api.vercel.app/

# Kiểm tra API sống
curl https://tqn-ecommerce-api.vercel.app/api/v1/products

# Xem chi tiết error
curl -v https://tqn-ecommerce-api.vercel.app/health
```

#### Frontend

```bash
# Truy cập frontend
curl https://tqn-figure-fe.vercel.app

# Kiểm tra HTML
curl https://tqn-figure-fe.vercel.app | head -20
```

### 9.2 View Logs

**Vercel Dashboard:**
1. Vào project
2. **Deployments** tab
3. Click deployment mới nhất
4. **Logs** → xem thông tin build và runtime

**Command Line:**
```bash
# Cần install Vercel CLI
npm install -g vercel

# Login
vercel login

# Xem logs real-time (chỉ với Vercel Pro)
vercel logs tqn-ecommerce-api --follow
```

### 9.3 Common Issues & Solutions

#### ❌ **CORS Error**

**Triệu chứng:**
```
Access to XMLHttpRequest at 'https://tqn-ecommerce-api.vercel.app/...' 
from origin 'https://tqn-figure-fe.vercel.app' has been blocked by CORS policy
```

**Giải pháp:**
1. Cập nhật `FRONTEND_URL` ở Backend
2. Thêm domain FE vào `allowedOrigins` ở `BE/app.js`
3. Redeploy backend

```javascript
// BE/app.js (dòng 36-50)
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5173",
  "https://tqn-figure-fe.vercel.app"  // ← Thêm dòng này
];
```

#### ❌ **MongoDB Connection Timeout**

**Triệu chứng:**
```
MongooseError: connect ECONNREFUSED 127.0.0.1:27017
```

**Giải pháp:**
1. Kiểm tra `MONGODB_URI` format
2. Whitelist IP `0.0.0.0/0` ở MongoDB Atlas
3. Kiểm tra password không có ký tự đặc biệt chưa encode

```bash
# Kiểm tra connection string
echo "MONGODB_URI: $MONGODB_URI"

# Test với MongoDB Atlas thẳng
mongo "mongodb+srv://user:password@cluster.mongodb.net/tqn_figure_shop"
```

#### ❌ **Build Failed - Cannot find module**

**Triệu chứng:**
```
Error: Cannot find module 'express'
```

**Giải pháp:**
1. Kiểm tra `package.json` có tất cả dependencies
2. Xóa `package-lock.json` và `node_modules/`
3. Run `npm install`
4. Commit lại

```bash
cd BE
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push origin main
```

#### ❌ **Environment Variable Not Found**

**Triệu chứng:**
```
TypeError: Cannot read property 'MONGODB_URI' of undefined
```

**Giải pháp:**
1. Vào Vercel Dashboard → Settings → Environment Variables
2. Kiểm tra biến đã được thêm
3. Kiểm tra biến được set cho environment đúng (Production)
4. Redeploy project

#### ❌ **Frontend Shows 404**

**Triệu chứng:**
- Vào `https://tqn-figure-fe.vercel.app/about/us` → 404

**Giải pháp:**
- Kiểm tra `FE/vercel.json` routes config
- Phải có rule redirect `/[^.]+$` → `/index.html`

```json
{
  "routes": [
    {
      "src": "/[^.]+$",
      "dest": "/index.html",
      "status": 200
    }
  ]
}
```

#### ❌ **API Request Returns 500**

**Triệu chứng:**
```json
{
  "status": "error",
  "message": "Internal Server Error"
}
```

**Giải pháp:**
1. Vào Vercel Logs xem chi tiết error
2. Kiểm tra database connection
3. Kiểm tra environment variables
4. Test API endpoint locally trước

```bash
# Test local
cd BE
npm run dev

# Test endpoint
curl http://localhost:3000/api/v1/products
```

---

## 10. TỐI ƯU HÓA

### 10.1 Performance Optimization

#### Backend

**Thêm vào `BE/vercel.json`:**
```json
{
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node",
      "config": {
        "maxLambdaSize": "50mb",
        "nodeVersion": "18.x",
        "includeFiles": "config.env",
        "excludeFiles": "uploads/**"
      }
    }
  ]
}
```

#### Frontend

**Vercel sẽ tự optimize:**
- ✅ Image optimization
- ✅ CSS minification
- ✅ JavaScript minification
- ✅ Code splitting

### 10.2 Caching Strategy

**Frontend (`FE/vercel.json`):**
```json
{
  "headers": [
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 10.3 Database Optimization

```javascript
// BE/server.js
const mongooseOptions = {
  maxPoolSize: 10,      // Connection pooling
  minPoolSize: 5,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  retryWrites: true,
  w: 'majority'
};
```

### 10.4 Monitoring

**Vercel Analytics:**
1. Dashboard → Analytics
2. Xem Web Vitals
3. Xem Request/Response times

**MongoDB Atlas Monitoring:**
1. Cloud Console → Metrics
2. Xem Database latency
3. Xem operation count

---

## 📝 FINAL CHECKLIST

- [ ] **Backend**
  - [ ] `BE/package.json` cập nhật (start script, engines)
  - [ ] `BE/vercel.json` cập nhật
  - [ ] `BE/.env.production` cập nhật
  - [ ] `BE/app.js` CORS config OK
  - [ ] `BE/server.js` MongoDB connection OK
  - [ ] Code committed & pushed lên GitHub

- [ ] **Frontend**
  - [ ] `FE/vite.config.js` cập nhật
  - [ ] `FE/package.json` cập nhật (engines)
  - [ ] `FE/vercel.json` cập nhật
  - [ ] `FE/.env.production` tạo
  - [ ] `FE/src/api/axiosClient.js` hỗ trợ env vars
  - [ ] Code committed & pushed lên GitHub

- [ ] **Infrastructure**
  - [ ] MongoDB Atlas cluster + user + IP whitelist
  - [ ] Lấy Connection String
  - [ ] Test connection locally

- [ ] **Vercel Deployment**
  - [ ] Backend project created & deployed
  - [ ] All environment variables added
  - [ ] Frontend project created & deployed
  - [ ] All environment variables added
  - [ ] Test API endpoints
  - [ ] Test frontend pages

- [ ] **Post-Deploy**
  - [ ] Test user registration/login
  - [ ] Test product listing
  - [ ] Test add to cart
  - [ ] Test payment (PayOS)
  - [ ] Test email sending
  - [ ] Test image upload (Cloudinary)
  - [ ] Check logs for errors

---

## 🎉 HOÀN THÀNH!

Nếu làm theo hướng dẫn này, website của bạn sẽ sống:

- **Frontend:** https://tqn-figure-fe.vercel.app
- **Backend API:** https://tqn-ecommerce-api.vercel.app
- **Database:** MongoDB Atlas

---

## 📞 CONTACT & SUPPORT

Nếu gặp vấn đề:
1. Xem lại [phần Troubleshooting](#9-test--troubleshooting)
2. Kiểm tra Vercel Logs
3. Kiểm tra MongoDB Atlas logs
4. Test local trước

**Happy Deployment! 🚀**
