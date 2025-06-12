function loadItems() {
    fetch('/items',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const itemsContainer = document.getElementById('items-container');
            itemsContainer.innerHTML = '';
            data.items.forEach(entry => {
                const itemElement = document.createElement('p');
                const nickname = entry.nickname || 'Untitled';
                itemElement.textContent = `${nickname}: ${entry.item}`;
                itemsContainer.appendChild(itemElement);
            });
        })
        .catch(error => {
            document.getElementById('items-container').innerHTML = '<p>error loading items.</p>';
            console.error('error fetching items:', error);
        });
}

loadItems();

document.addEventListener('DOMContentLoaded', () => {
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
        document.getElementById('nickname').value = savedNickname;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
        document.getElementById('nickname').value = savedNickname;
    }
});

document.getElementById('item-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const itemInput = document.getElementById('item');
    const nicknameInput = document.getElementById('nickname');

    let item = itemInput.value.trim();
    let nickname = nicknameInput.value.trim();

    if (!nickname) nickname = 'Untitled';

    //hi again
    localStorage.setItem('nickname', nickname);

    //hiiii 
    const xssPattern = /[<>]/;

    if (xssPattern.test(item)) {
        alert('your item contains illegal characters')
        return;
    }

    if (item !== '') {
        fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item, nickname }),
        })
            .then(response => response.json())
            .then(() => {
                loadItems();
                itemInput.value = '';
            })
            .catch(error => {
                console.error('error submitting item:', error)
            });
    }
});