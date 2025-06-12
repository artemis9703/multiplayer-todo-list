const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(cors({
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('.'));
const filePath = path.join(__dirname, 'items.json');
function saveMessages(items) {
    return new Promise((resolve, reject) => {
        const jsonData = JSON.stringify({ items }, null, 2);
        fs.writeFile(filePath, jsonData, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
app.get('/items', async (req, res) => {
    try {
        const data = await loadMessages();
        res.json(data);
    } catch (err) {
        console.error('Error reading messages:', err);
        res.status(500).json({ error: 'Error reading messages' });
    }
});

app.post('/items', async (req, res) => {
    let { item, nickname } = req.body;
    if (!item || typeof item !== 'string') {
        return res.status(400).json({ error: 'Invalid message' });
    }
    if (!nickname || typeof nickname !== 'string' || nickname.trim() === '') {
        nickname = 'Untitled';
    }
    try {
        const data = await loadMessages();
        const items = data.items || [];
        // Ensure no more than 5 messages
        if (items.length >= 5) {
            items.shift(); // Remove the oldest message
        }
        items.push({ nickname, item });
        await saveMessages(items);
        res.json({ items });
    } catch (err) {
        console.error('Error adding message:', err);
        res.status(500).json({ error: 'Error adding message' });
    }
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});