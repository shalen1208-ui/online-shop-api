const db = require('../config/db');

function getAll(req, res) {
  let q = req.query.q || '';
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;

  db.query(`SELECT * FROM products WHERE name LIKE ? LIMIT ? OFFSET ?`, [`%${q}%`, limit, offset], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
}

function getOne(req, res) {
  db.query(`SELECT * FROM products WHERE id = ?`, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (results.length === 0) return res.status(404).json({ success: false, message: 'Product tidak ditemukan' });
    res.json({ success: true, data: results[0] });
  });
}

function create(req, res) {
  let { category_id, name, description, price, stock } = req.body;
  if (!name || !price) return res.status(400).json({ success: false, message: 'name dan price wajib diisi' });
  db.query(`INSERT INTO products (category_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)`,
    [category_id, name, description, price, stock || 0], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.status(201).json({ success: true, message: 'Product berhasil dibuat', id: result.insertId });
    });
}

function update(req, res) {
  let { category_id, name, description, price, stock } = req.body;
  db.query(`UPDATE products SET category_id = ?, name = ?, description = ?, price = ?, stock = ? WHERE id = ?`,
    [category_id, name, description, price, stock, req.params.id], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Product tidak ditemukan' });
      res.json({ success: true, message: 'Product berhasil diupdate' });
    });
}

function remove(req, res) {
  db.query(`DELETE FROM products WHERE id = ?`, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Product tidak ditemukan' });
    res.json({ success: true, message: 'Product berhasil dihapus' });
  });
}

module.exports = { getAll, getOne, create, update, remove };