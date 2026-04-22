require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Online Shop API is running!' });
});

app.use('/api/users',      require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products',   require('./routes/productRoutes'));
app.use('/api/carts',      require('./routes/cartRoutes'));
app.use('/api/orders',     require('./routes/orderRoutes'));

app.use(require('./middlewares/errorHandler'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server jalan di port ' + PORT);
});

