const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 2026;

app.use(cors());
app.use(bodyParser.json());

// Dummy admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';

// Dummy token
const FAKE_TOKEN = 'fake-jwt-token-123456789';

// Correct route: api/v1/admin/login
app.post('/api/v1/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      message: 'Login successful',
      token: FAKE_TOKEN
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
