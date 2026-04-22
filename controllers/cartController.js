const db = require('../config/db');

function getAll(req, res) {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;

  db.query(`SELECT * FROM carts LIMIT ? OFFSET ?`, [limit, offset], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
}

function getOne(req, res) {
  db.query(`SELECT * FROM carts WHERE id = ?`, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (results.length === 0) return res.status(404).json({ success: false, message: 'Cart tidak ditemukan' });
    res.json({ success: true, data: results[0] });
  });
}

function create(req, res) {
  let { user_id, product_id, quantity } = req.body;
  if (!user_id || !product_id) return res.status(400).json({ success: false, message: 'user_id dan product_id wajib diisi' });
  db.query(`INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)`,
    [user_id, product_id, quantity || 1], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.status(201).json({ success: true, message: 'Cart berhasil dibuat', id: result.insertId });
    });
}

function update(req, res) {
  let { quantity } = req.body;
  db.query(`UPDATE carts SET quantity = ? WHERE id = ?`, [quantity, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Cart tidak ditemukan' });
    res.json({ success: true, message: 'Cart berhasil diupdate' });
  });
}

function remove(req, res) {
  db.query(`DELETE FROM carts WHERE id = ?`, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Cart tidak ditemukan' });
    res.json({ success: true, message: 'Cart berhasil dihapus' });
  });
}

module.exports = { getAll, getOne, create, update, remove };