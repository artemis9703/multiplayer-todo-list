document.getElementById('notepad').addEventListener('submit', function(e) {
    e.preventDefault();
    const nickname = document.getElementById('nickname').value;
    const message = document.getElementById('message').value;
    fetch('/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, nickname }),
    })
    .then(response => response.json())
    .then(() => {
        loadMessages();
        document.getElementById('message').value = '';
    })
    .catch(error => {
        console.error('Error submitting message:', error);
    });
});