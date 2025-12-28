# Website Bán mô hình TQN Figure

## 📋 Mô tả dự án

Dự án là một hệ thống thương mại điện tử (E-commerce) chuyên bán mô hình figure/anime figure trực tuyến, được xây dựng với kiến trúc MERN Stack (MongoDB, Express.js, React, Node.js). Hệ thống cung cấp đầy đủ các tính năng từ phía khách hàng đến quản trị viên, hỗ trợ quản lý sản phẩm mô hình (Scale Figure, Nendoroid, Figma, v.v.), đơn hàng, người dùng và nhiều tính năng nâng cao khác.

## ✨ Tính năng chính

### 👤 Tính năng người dùng (Frontend)

#### Xác thực và bảo mật
- ✅ Đăng ký tài khoản với xác thực qua email
- ✅ Đăng nhập/Đăng xuất
- ✅ Đăng nhập bằng Google OAuth 2.0
- ✅ Quên mật khẩu và đặt lại mật khẩu
- ✅ Xác thực email khi đăng ký

#### Quản lý tài khoản
- ✅ Quản lý thông tin cá nhân
- ✅ Quản lý địa chỉ giao hàng
- ✅ Quản lý người nhận hàng
- ✅ Xem lịch sử đơn hàng và chi tiết đơn hàng
- ✅ Cập nhật mật khẩu

#### Sản phẩm và mua sắm
- ✅ Xem danh sách tất cả mô hình figure
- ✅ Xem chi tiết sản phẩm với đầy đủ thông tin (scale, series, character, material, kích thước, v.v.)
- ✅ Tìm kiếm sản phẩm bằng từ khóa
- ✅ Tìm kiếm và lọc nâng cao:
  - Lọc theo khoảng giá
  - Lọc theo tên sản phẩm
  - Lọc theo màu sắc
  - Lọc theo loại figure (Scale Figure, Nendoroid, Figma, v.v.)
  - Lọc theo series/anime (One Piece, Naruto, Dragon Ball, Genshin Impact, v.v.)
  - Lọc theo thương hiệu/nhà sản xuất
  - Lọc theo trạng thái (Pre-order, In-stock)
- ✅ So sánh thông số giữa 2 sản phẩm
- ✅ Giỏ hàng và thanh toán

#### Đánh giá và tương tác
- ✅ Đánh giá sản phẩm bằng sao và nhận xét (sau khi mua hàng)

#### Thanh toán
- ✅ Thanh toán qua PayOS
- ✅ Thanh toán khi nhận hàng (COD)

#### Khác
- ✅ Xem tin tức và bài viết
- ✅ Đăng ký trở thành đối tác
- ✅ Chat hỗ trợ (tích hợp Stream Chat)
- ✅ Liên hệ và hỗ trợ khách hàng

### 🔧 Tính năng quản trị (Backend Admin)

#### Quản lý sản phẩm
- ✅ CRUD sản phẩm mô hình figure (Tạo, Đọc, Sửa, Xóa)
- ✅ Quản lý hình ảnh sản phẩm (upload lên Cloudinary)
- ✅ Quản lý thông tin chi tiết figure
- ✅ Quản lý danh mục (Categories)
- ✅ Quản lý thương hiệu/nhà sản xuất (Brands)
- ✅ Quản lý nhập kho (Imports)

#### Quản lý đơn hàng
- ✅ Xem danh sách đơn hàng
- ✅ Cập nhật trạng thái đơn hàng
- ✅ Xem chi tiết đơn hàng

#### Quản lý người dùng
- ✅ Xem danh sách người dùng
- ✅ Quản lý quyền hạn (Roles)
- ✅ Tạo/Sửa/Xóa tài khoản admin

#### Quản lý nội dung
- ✅ Quản lý đánh giá (Reviews)
- ✅ Quản lý tin tức (News)
- ✅ Quản lý đăng ký đối tác (Partner Registrations)

#### Báo cáo và phân tích
- ✅ Dashboard với thống kê tổng quan
- ✅ Analytics và báo cáo doanh thu
- ✅ Thống kê sản phẩm, đơn hàng, người dùng

#### Quản lý địa điểm
- ✅ Quản lý địa chỉ giao hàng (Locations)

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18** - Thư viện UI
- **Vite** - Build tool và dev server
- **React Router DOM** - Điều hướng
- **Redux Toolkit** - Quản lý state
- **Tailwind CSS** - Framework CSS
- **SCSS/SASS** - CSS preprocessor
- **Axios** - HTTP client
- **React Hook Form** - Quản lý form
- **Yup** - Validation schema
- **PayOS SDK** - Tích hợp thanh toán PayOS
- **Firebase** - Dịch vụ backend (nếu có)
- **Stream Chat** - Chat real-time
- **React Icons** - Icon library
- **React Toastify** - Thông báo
- **SweetAlert2** - Modal đẹp
- **Swiper** - Carousel/Slider
- **Moment.js** - Xử lý ngày tháng

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM cho MongoDB
- **JWT** - Xác thực token
- **Passport.js** - Authentication middleware
- **Passport Google OAuth2** - Đăng nhập Google
- **Bcryptjs** - Mã hóa mật khẩu
- **Multer** - Upload file
- **Cloudinary** - Lưu trữ hình ảnh
- **Nodemailer** - Gửi email
- **Express Rate Limit** - Giới hạn request
- **Helmet** - Bảo mật HTTP headers
- **CSRF Protection (csurf)** - Chống CSRF attacks
- **Express Validator** - Validation input
- **Password Validator** - Kiểm tra độ mạnh mật khẩu
- **Axios** - HTTP client (cho PayOS API calls)
- **Crypto** - HMAC-SHA256 signature generation (cho PayOS)
- **XSS Clean** - Chống XSS
- **Mongo Sanitize** - Chống NoSQL injection
- **HPP** - Chống parameter pollution
- **EJS** - Template engine (cho admin panel)
- **TinyMCE** - Rich text editor

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 10.0.0
- MongoDB (local hoặc Atlas)
- npm hoặc yarn

### Bước 1: Clone repository

```bash
# Clone repository frontend và backend (repository hiện tại)
git clone <...>

### Bước 2: Cài đặt Backend

```bash
cd BE
npm install
```

### Bước 3: Cấu hình Backend

Tạo file `BE/config.env` với nội dung:

```env
NODE_ENV=development
PORT=3000

# Database
DATABASE=mongodb+srv://<username>:<PASSWORD>@cluster.mongodb.net/dbname?retryWrites=true&w=majority
DATABASE_PASSWORD=your_password

# JWT (Dual-Token System)
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_EXPIRES_IN=30m
JWT_COOKIE_EXPIRES_IN=1

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@hc.vn

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/users/auth/google/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PayOS REST API (không dùng SDK - Direct API calls)
PAYOS_CLIENT_ID=your_payos_client_id
PAYOS_API_KEY=your_payos_api_key
PAYOS_CHECKSUM_KEY=your_payos_checksum_key (HMAC-SHA256 for signatures)
```

**Lưu ý về PayOS:**
- Sử dụng **REST API Direct** (không dùng SDK)
- Tạo chữ ký HMAC-SHA256 manual bằng Node.js crypto
- Endpoint: `POST https://api-merchant.payos.vn/v2/payment-requests`
- QR code được generate tự động từ response

### Bước 4: Chạy Backend

```bash
cd BE
npm start
```

Server sẽ chạy tại `http://localhost:3000`

### Bước 5: Cài đặt Frontend

```bash
cd FE
npm install
```

### Bước 6: Cấu hình Frontend

Cập nhật file `FE/src/api/axiosClient.js` để trỏ đến đúng backend URL:

```javascript
const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  // ...
});
```

### Bước 7: Chạy Frontend

```bash
cd FE
npm run dev
```

Frontend sẽ chạy tại `http://localhost:5173`

## 👥 Hệ thống phân quyền Admin

Hệ thống hỗ trợ 4 role chính cho trang quản trị:

### 1. Super Admin
- ✅ Full access - Quản lý tất cả chức năng
- ✅ Quản lý users (tạo, sửa, xóa, phân quyền)
- ✅ Quản lý products, categories, brands
- ✅ Quản lý orders, imports
- ✅ Quản lý reviews, comments, news
- ✅ Quản lý partner registrations
- ✅ Xem analytics & dashboard
- ✅ Quản lý locations

### 2. Admin
- ✅ Quản lý products (tạo, sửa, xóa)
- ✅ Quản lý categories, brands
- ✅ Quản lý orders (xem, cập nhật)
- ✅ Quản lý imports (tạo, sửa, xóa)
- ✅ Quản lý reviews, comments (xem, cập nhật, xóa)
- ✅ Quản lý news (tạo, sửa, xóa)
- ✅ Xem users (chỉ xem)
- ✅ Xem partner registrations (xem, cập nhật)
- ✅ Xem analytics & dashboard
- ✅ Quản lý locations

### 3. Manager
- ✅ Xem báo cáo & analytics
- ✅ Duyệt đơn hàng (xem, cập nhật)
- ✅ Duyệt đăng ký đối tác (xem, cập nhật)
- ✅ Xem users, products, categories, brands
- ✅ Xem imports (chỉ xem)
- ✅ Xem reviews, comments, news
- ✅ Xem dashboard

### 4. Sales Staff
- ✅ Xử lý đơn hàng (xem, cập nhật)
- ✅ Xem thông tin khách hàng (users)
- ✅ Xem products, categories, brands
- ✅ Xem imports, reviews, comments, news
- ✅ Xem partner registrations (chỉ xem)
- ✅ Xem analytics & dashboard

### Tạo tài khoản test

Để tạo các tài khoản test cho từng role:

```bash
cd BE
npm run create-test-accounts
```

**Thông tin đăng nhập test:**

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@test.com | superadmin123 |
| Admin | admin@test.com | admin123 |
| Manager | manager@test.com | manager123 |
| Sales Staff | salesstaff@test.com | sales123 |

Chi tiết về hệ thống phân quyền xem tại: [BE/ROLE_SYSTEM.md](BE/ROLE_SYSTEM.md)

## 📡 API Endpoints

### Authentication
- `POST /api/v1/users/signup` - Đăng ký
- `POST /api/v1/users/login` - Đăng nhập
- `GET /api/v1/users/logout` - Đăng xuất
- `POST /api/v1/users/forgotPassword` - Quên mật khẩu
- `PATCH /api/v1/users/resetPassword/:token` - Đặt lại mật khẩu
- `GET /api/v1/users/auth/google` - Đăng nhập Google

### Products
- `GET /api/v1/products` - Lấy danh sách sản phẩm
- `GET /api/v1/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/v1/products` - Tạo sản phẩm (Admin)
- `PATCH /api/v1/products/:id` - Cập nhật sản phẩm (Admin)
- `DELETE /api/v1/products/:id` - Xóa sản phẩm (Admin)

### Orders
- `GET /api/v1/orders` - Lấy danh sách đơn hàng
- `GET /api/v1/orders/:id` - Lấy chi tiết đơn hàng
- `POST /api/v1/orders` - Tạo đơn hàng
- `PATCH /api/v1/orders/:id` - Cập nhật đơn hàng

### Reviews & Comments
- `GET /api/v1/reviews` - Lấy danh sách đánh giá
- `POST /api/v1/reviews` - Tạo đánh giá
- `GET /api/v1/comments` - Lấy danh sách bình luận
- `POST /api/v1/comments` - Tạo bình luận

### Users
- `GET /api/v1/users` - Lấy danh sách users (Admin)
- `GET /api/v1/users/:id` - Lấy thông tin user
- `PATCH /api/v1/users/updateMe` - Cập nhật thông tin cá nhân
- `PATCH /api/v1/users/updateMyPassword` - Đổi mật khẩu

*Và nhiều endpoints khác...*

## 🔒 Bảo mật

- ✅ JWT Authentication
- ✅ Password hashing với bcryptjs
- ✅ Rate limiting
- ✅ XSS protection
- ✅ NoSQL injection protection
- ✅ HTTP parameter pollution protection
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Data sanitization

## 📝 Scripts hữu ích

### Backend
```bash
npm start              # Chạy server (development với nodemon)
npm run start:prod     # Chạy server (production)
npm run create-test-accounts  # Tạo tài khoản test
```

### Frontend
```bash
npm run dev            # Chạy development server
npm run build          # Build production
npm run preview        # Preview production build
```

## 🔒 Bảo mật (Security Features)

### Hệ thống xác thực (Authentication)
- ✅ **Dual-Token System** - Access token (30 phút) + Refresh token (7 ngày)
- ✅ **HTTPOnly Secure Cookies** - Ngăn chặn XSS attacks
- ✅ **JWT Verification** - Xác thực tất cả protected routes
- ✅ **Password Hashing** - Bcryptjs với salt rounds
- ✅ **JWT Blacklist / Token Revocation** - Tokens added to blacklist on logout, checked on every protected request
  - TTL auto-cleanup: Blacklisted tokens deleted after 90 days
  - Reasons tracked: USER_LOGOUT, FORCE_LOGOUT, PASSWORD_CHANGED, ADMIN_REVOKE, SECURITY_INCIDENT

### Bảo vệ chống tấn công
- ✅ **Helmet.js** - HTTP security headers (X-Frame-Options, X-Content-Type-Options, HSTS)
- ✅ **CSRF Protection** - csurf middleware cho POST/PUT/DELETE requests
- ✅ **XSS Protection** - xss-clean + React auto-escape
- ✅ **NoSQL Injection Prevention** - express-mongo-sanitize
- ✅ **Parameter Pollution Prevention** - hpp middleware

### Validation & Input Sanitization
- ✅ **Email Validation** - Regex pattern matching
- ✅ **Phone Number Validation** - Vietnamese format (10-11 digits)
- ✅ **Password Strength Policy** - Min 8 chars, uppercase, lowercase, numbers, symbols
- ✅ **File Upload Validation** - MIME type + file extension + size limit (5MB)
- ✅ **Input Whitelist Validation** - express-validator

### Authorization & Access Control
- ✅ **Role-Based Access Control** - super_admin, admin, manager, sales_staff, user, employee
- ✅ **Object-Level Authorization** - Users can only access their own resources
- ✅ **Permission System** - Granular permission management per resource
- ✅ **Account Lockout Policy** - After 5 failed login attempts, account locked for 15 minutes
  - Prevents brute force attacks
  - Automatic unlock after lockout period

### Rate Limiting & DDoS Protection
- ✅ **Express Rate Limit** - 1000 requests/hour per IP
- ✅ **Request Size Limits** - 10MB maximum (increased from 100KB for file uploads)
  - Payload validation middleware enforces hard limit
  - Returns 413 Payload Too Large if exceeded

### Data Protection
- ✅ **Password Hashing** - bcryptjs (not stored in plain text)
- ✅ **Secure Headers** - Content Security Policy, X-XSS-Protection
- ✅ **CORS Configuration** - Dynamic origin validation with strict whitelist callback
  - Only approved domains allowed: frontend URL + specified domains
  - Credentials mode enabled (cookies allowed)
  - Preflight requests handled

### Audit Logging & Monitoring
- ✅ **Audit Log System** - All critical actions logged with details
  - Tracks: Login (success/failure), orders, payments, user management, admin actions
  - Auto-retention: 90-day TTL with automatic cleanup
  - Data captured: userId, action, resourceType, statusCode, IP address, user agent
  - Use case: Security monitoring, compliance, incident investigation

**Security Level: DVWA Impossible (15/15)** 🎯
- 10 Original security measures
- 5 New advanced security enhancements (this session)
  1. CORS Hardening (Dynamic origin validation)
  2. Request Size Limits (10MB with validation)
  3. Account Lockout System (Brute force protection)
  4. JWT Blacklist (Token revocation on logout)
  5. Audit Logging (Comprehensive action tracking)

## 🌐 Deployment

### Frontend
- Có thể deploy lên Vercel, Netlify, hoặc bất kỳ hosting nào hỗ trợ static site
- File `vercel.json` đã được cấu hình sẵn cho Vercel

### Backend
- Có thể deploy lên Heroku, Railway, DigitalOcean, hoặc VPS
- Đảm bảo cấu hình đúng các biến môi trường
- MongoDB có thể dùng MongoDB Atlas (cloud)

**Lưu ý:** Đảm bảo đã cấu hình đúng tất cả các biến môi trường trước khi chạy dự án. Đặc biệt là database connection string, JWT secret, và các API keys (Google OAuth, Cloudinary, PayOS).
