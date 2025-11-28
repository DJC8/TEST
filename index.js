
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let products = [
  { id: 1, name: 'Laptop', stock: 5, price: 1200 },
  { id: 2, name: 'Phone', stock: 0, price: 800 },
  { id: 3, name: 'Headphones', stock: 10, price: 150 }
];
let cart = [];

app.get('/products', (req, res) => res.json(products));

app.post('/cart', (req, res) => {
  const product = products.find(p => p.id === req.body.productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (product.stock === 0) return res.status(400).json({ error: 'Out of stock' });
  cart.push(product);
  res.json({ message: 'Added to cart', productId: product.id });
});

app.get('/cart', (req, res) => res.json(cart));

app.listen(3000, () => console.log('Server running on port 3000'));
