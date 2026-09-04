// Chat Trigger - Standalone
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || userMessage.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Send to QuantumQ (your AI agent)
  const response = await quantumQ.process(userMessage);

  res.json({ response });
});

module.exports = app;