const db = require('../config/db');

function getAll(req, res) {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;

  db.query(`SELECT * FROM orders LIMIT ? OFFSET ?`, [limit, offset], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
}

function getOne(req, res) {
  db.query(`SELECT * FROM orders WHERE id = ?`, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (results.length === 0) return res.status(404).json({ success: false, message: 'Order tidak ditemukan' });

    let order = results[0];
    db.query(`SELECT * FROM order_items WHERE order_id = ?`, [order.id], (err2, items) => {
      if (err2) return res.status(500).json({ success: false, message: err2.message });
      order.items = items;
      res.json({ success: true, data: order });
    });
  });
}

function create(req, res) {
  let { user_id, items } = req.body;
  // items contoh: [{product_id: 1, quantity: 2, price: 50000}]
  if (!user_id || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'user_id dan items wajib diisi' });
  }

  let total_price = 0;
  for (let item of items) {
    total_price += item.price * item.quantity;
  }

  db.query(`INSERT INTO orders (user_id, total_price) VALUES (?, ?)`, [user_id, total_price], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    let order_id = result.insertId;
    let selesai = 0;

    for (let item of items) {
      db.query(`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [order_id, item.product_id, item.quantity, item.price], (err2) => {
          if (err2) return res.status(500).json({ success: false, message: err2.message });
          selesai++;
          if (selesai === items.length) {
            res.status(201).json({ success: true, message: 'Order berhasil dibuat', id: order_id, total_price });
          }
        });
    }
  });
}

function update(req, res) {
  let { status } = req.body;
  db.query(`UPDATE orders SET status = ? WHERE id = ?`, [status, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Order tidak ditemukan' });
    res.json({ success: true, message: 'Status order berhasil diupdate' });
  });
}

function remove(req, res) {
  db.query(`DELETE FROM orders WHERE id = ?`, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Order tidak ditemukan' });
    res.json({ success: true, message: 'Order berhasil dihapus' });
  });
}

module.exports = { getAll, getOne, create, update, remove };