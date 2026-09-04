const express = require('express');
const cors = require('cors');
const QuantumQ = require('./quantumQ');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const quantumQ = new QuantumQ();

// Chat route
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || userMessage.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await quantumQ.process(userMessage);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  res.json({ status: 'online' });
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`QUOS Intelligence is running on port ${port}`);
});