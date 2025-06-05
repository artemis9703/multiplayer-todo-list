function loadMessages() {
    fetch('/messages',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const messagesContainer = document.getElementById('messgaes-container');
            messagesContainer.innerHTML = '';
            data.messages.forEach(entry => {
                const messagesElement = document.createElement('p');
                const nickname = entry.nickname || 'Untitled';
                messagesElement.textContent = `${nickname}: ${entry.message}`;
                messagesContainer.appendChild(messageElement);
            });
        })
        .catch(error => {
            document.getElementById('messages-container').innerHTML = '<p>Error loading list.</p>';
            console.error('Error fetching list:', error);
        });
}

loadMessages();

