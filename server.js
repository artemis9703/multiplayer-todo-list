const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

async function loadMessages() {
    try {
        const data = await fs.readFile('messages.json', utf8);
        return JSON.parse(data);
    } catch (e) {
        return { messages: [] };
    }
}

