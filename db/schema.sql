CREATE DATABASE IF NOT EXISTS online_shop;
USE online_shop;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  role VARCHAR(20) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(150),
  description TEXT,
  price INT,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total_price INT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  price INT
);

USE online_shop;


-- DATA CATEGORIES

INSERT INTO categories (name, description) VALUES
('Elektronik', 'HP, laptop, aksesoris elektronik'),
('Pakaian', 'Baju, celana, jaket, dll'),
('Makanan & Minuman', 'Snack, minuman, makanan ringan'),
('Olahraga', 'Peralatan dan pakaian olahraga'),
('Kecantikan', 'Skincare, makeup, perawatan tubuh');


-- DATA USERS

INSERT INTO users (name, email, password, role) VALUES
('Budi Santoso', 'budi@gmail.com', '123456', 'customer'),
('Siti Rahayu', 'siti@gmail.com', '123456', 'customer'),
('Agus Permana', 'agus@gmail.com', '123456', 'customer'),
('Dewi Lestari', 'dewi@gmail.com', '123456', 'customer'),
('Admin Toko', 'admin@gmail.com', 'admin123', 'admin');


-- DATA PRODUCTS

INSERT INTO products (category_id, name, description, price, stock) VALUES
-- Elektronik
(1, 'Samsung Galaxy A15', 'HP Android layar 6.5 inch, RAM 4GB', 2500000, 10),
(1, 'Laptop Asus Vivobook', 'Laptop Intel Core i5, RAM 8GB, SSD 512GB', 7000000, 5),
(1, 'Earphone Bluetooth JBL', 'Earphone wireless, baterai 20 jam', 350000, 25),
(1, 'Charger USB Type-C', 'Charger cepat 33W, kabel 1 meter', 85000, 50),
-- Pakaian
(2, 'Kaos Polos Putih', 'Kaos katun combed 30s, adem dan nyaman', 85000, 100),
(2, 'Celana Jeans Slim Fit', 'Celana jeans pria warna biru gelap', 180000, 40),
(2, 'Jaket Hoodie Abu', 'Jaket hoodie tebal, cocok musim hujan', 250000, 30),
(2, 'Kemeja Flannel Kotak', 'Kemeja flannel motif kotak warna merah', 160000, 35),
-- Makanan
(3, 'Chitato Sapi Panggang', 'Keripik kentang rasa sapi panggang 68g', 15000, 200),
(3, 'Indomie Goreng', 'Mie instan goreng original, 1 dus isi 40', 120000, 50),
(3, 'Teh Botol Sosro 350ml', 'Minuman teh manis dalam botol', 5000, 300),
(3, 'Kopi Kapal Api Sachet', 'Kopi hitam sachet isi 10 pcs', 25000, 150),
-- Olahraga
(4, 'Sepatu Running Nike', 'Sepatu lari ringan dan nyaman', 850000, 15),
(4, 'Bola Futsal', 'Bola futsal standar ukuran 4', 150000, 20),
-- Kecantikan
(5, 'Wardah Sunscreen SPF50', 'Sunscreen pelindung kulit dari sinar UV', 65000, 60),
(5, 'Pond s Face Wash', 'Sabun cuci muka untuk kulit berminyak', 35000, 80);


-- DATA CARTS

INSERT INTO carts (user_id, product_id, quantity) VALUES
(1, 1, 1),   -- Budi mau beli Samsung Galaxy
(1, 5, 2),   -- Budi mau beli 2 Kaos Putih
(1, 9, 3),   -- Budi mau beli 3 Chitato
(2, 7, 1),   -- Siti mau beli Jaket Hoodie
(2, 15, 2),  -- Siti mau beli 2 Sunscreen
(3, 2, 1),   -- Agus mau beli Laptop
(3, 3, 1);   -- Agus mau beli Earphone


-- DATA ORDERS

INSERT INTO orders (user_id, total_price, status) VALUES
(1, 2670000, 'paid'),      -- Order Budi sudah bayar
(2, 315000, 'pending'),    -- Order Siti belum bayar
(3, 7350000, 'shipped'),   -- Order Agus sudah dikirim
(4, 205000, 'completed');  -- Order Dewi sudah selesai


-- DATA ORDER ITEMS

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
-- Order 1 (Budi)
(1, 1, 1, 2500000),   -- Samsung Galaxy A15
(1, 5, 2, 85000),     -- 2x Kaos Putih
-- Order 2 (Siti)
(2, 7, 1, 250000),    -- Jaket Hoodie
(2, 15, 1, 65000),    -- Sunscreen
-- Order 3 (Agus)
(3, 2, 1, 7000000),   -- Laptop Asus
(3, 3, 1, 350000),    -- Earphone JBL
-- Order 4 (Dewi)
(4, 6, 1, 180000),    -- Celana Jeans
(4, 9, 1, 15000),     -- Chitato
(4, 11, 2, 5000);     -- 2x Teh Botol