# Online Shop API

Web Server berbasis Node.js + Express + MySQL2 untuk operasi CRUD pada domain Online Shop.

---

## Anggota Kelompok

| NIM | Nama |
|-----|------|
| 241111617 | Shalvendraan |
| 241111850 | Aditya Pratama |
| 241111379 | Felix Winata |

---

## Struktur Proyek

```
online-shop-api/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   ├── categoryController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
├── routes/
│   ├── userRoutes.js
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
├── middlewares/
│   └── errorHandler.js
├── db/
│   └── schema.sql
├── .env
├── app.js
├── package.json
└── README.md
```

---

##  Panduan Setup

### 1. Clone Project
```bash
git clone https://github.com/username/online-shop-api.git
cd online-shop-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Buat Database
- Buka phpMyAdmin: `http://localhost/phpmyadmin`
- Klik tab SQL
- Copy paste isi file `db/schema.sql` lalu klik Go

### 4. Setting File `.env`
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=online_shop
PORT=3000
```

### 5. Jalankan Server
```bash
node app.js
```
Server jalan di: `http://localhost:3000`

---

## Akun Uji

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | admin123 |
| Customer | budi@gmail.com | 123456 |
| Customer | siti@gmail.com | 123456 |

---

## Endpoint

### Users `/api/users`
| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/users` | Ambil semua users |
| GET | `/api/users/:id` | Ambil user by ID |
| POST | `/api/users` | Buat user baru |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Hapus user |

Query params: `?q=nama&page=1&limit=10`

### Categories `/api/categories`
| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/categories` | Ambil semua kategori |
| GET | `/api/categories/:id` | Ambil kategori by ID |
| POST | `/api/categories` | Buat kategori baru |
| PUT | `/api/categories/:id` | Update kategori |
| DELETE | `/api/categories/:id` | Hapus kategori |

### Products `/api/products`
| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/products` | Ambil semua produk |
| GET | `/api/products/:id` | Ambil produk by ID |
| POST | `/api/products` | Buat produk baru |
| PUT | `/api/products/:id` | Update produk |
| DELETE | `/api/products/:id` | Hapus produk |

Query params: `?q=nama&page=1&limit=10`

### Carts `/api/carts`
| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/carts` | Ambil semua cart |
| GET | `/api/carts/:id` | Ambil cart by ID |
| POST | `/api/carts` | Tambah ke cart |
| PUT | `/api/carts/:id` | Update quantity |
| DELETE | `/api/carts/:id` | Hapus dari cart |

### Orders `/api/orders`
| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/orders` | Ambil semua order |
| GET | `/api/orders/:id` | Ambil order by ID + items |
| POST | `/api/orders` | Buat order baru |
| PUT | `/api/orders/:id` | Update status order |
| DELETE | `/api/orders/:id` | Hapus order |

---

## Contoh Request & Response

### POST `/api/users`
Request:
```json
{
  "name": "Rizky Ramadhan",
  "email": "rizky@gmail.com",
  "password": "rizky123",
  "role": "customer"
}
```
Response:
```json
{
  "success": true,
  "message": "User berhasil dibuat",
  "id": 6
}
```

### POST `/api/orders`
Request:
```json
{
  "user_id": 1,
  "items": [
    { "product_id": 1, "quantity": 1, "price": 2500000 },
    { "product_id": 5, "quantity": 2, "price": 85000 }
  ]
}
```
Response:
```json
{
  "success": true,
  "message": "Order berhasil dibuat",
  "id": 5,
  "total_price": 2670000
}
```

---

## Contoh Error Response

404 - Data tidak ditemukan:
```json
{
  "success": false,
  "message": "User tidak ditemukan"
}
```

400 - Validasi gagal:
```json
{
  "success": false,
  "message": "name, email, password wajib diisi"
}
```

500 - Server error:
```json
{
  "success": false,
  "message": "ER_DUP_ENTRY: Duplicate entry..."
}
```

---

## 👥 Pembagian Tugas

| NIM | Nama | Tugas |
|-----|------|-------|
| 241111617 | Shalvendraan | Setup project, config DB, app.js, resource orders, README|
| 241111850 | Aditya Pratama | Resource users, categories, error handling |
| 241111379 | Felix Winata | Resource products, carts|
