const db = require('../config/db');

// GET semua users
function getAll(req, res) {
  let q = req.query.q || '';
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;

  let sql = `SELECT * FROM users WHERE name LIKE ? LIMIT ? OFFSET ?`;
  db.query(sql, [`%${q}%`, limit, offset], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
}

// GET user by ID
function getOne(req, res) {
  let sql = `SELECT * FROM users WHERE id = ?`;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (results.length === 0) return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    res.json({ success: true, data: results[0] });
  });
}

// POST buat user baru
function create(req, res) {
  let { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'name, email, password wajib diisi' });
  }
  let sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, email, password, role || 'customer'], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.status(201).json({ success: true, message: 'User berhasil dibuat', id: result.insertId });
  });
}

// PUT update user
function update(req, res) {
  let { name, email, password, role } = req.body;
  let sql = `UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?`;
  db.query(sql, [name, email, password, role, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    res.json({ success: true, message: 'User berhasil diupdate' });
  });
}

// DELETE hapus user
function remove(req, res) {
  let sql = `DELETE FROM users WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    res.json({ success: true, message: 'User berhasil dihapus' });
  });
}

module.exports = { getAll, getOne, create, update, remove };