const db = require('../config/db');

function getAll(req, res) {
  let q = req.query.q || '';
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;

  db.query(`SELECT * FROM categories WHERE name LIKE ? LIMIT ? OFFSET ?`, [`%${q}%`, limit, offset], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
}

function getOne(req, res) {
  db.query(`SELECT * FROM categories WHERE id = ?`, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (results.length === 0) return res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
    res.json({ success: true, data: results[0] });
  });
}

function create(req, res) {
  let { name, description } = req.body;
  if (!name) return res.status(400).json({ success: false, message: 'name wajib diisi' });
  db.query(`INSERT INTO categories (name, description) VALUES (?, ?)`, [name, description], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.status(201).json({ success: true, message: 'Category berhasil dibuat', id: result.insertId });
  });
}

function update(req, res) {
  let { name, description } = req.body;
  db.query(`UPDATE categories SET name = ?, description = ? WHERE id = ?`, [name, description, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
    res.json({ success: true, message: 'Category berhasil diupdate' });
  });
}

function remove(req, res) {
  db.query(`DELETE FROM categories WHERE id = ?`, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
    res.json({ success: true, message: 'Category berhasil dihapus' });
  });
}

module.exports = { getAll, getOne, create, update, remove };