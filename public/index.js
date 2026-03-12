// public/index.js
window.addEventListener('DOMContentLoaded', (event) => {
    const list = document.querySelector('.todo-list');
    const input = document.querySelector('.input-text');
    const addButton = document.querySelector('.add-button');
    const counter = document.querySelector('.todo-count');

    function updateCount() {
        counter.textContent = `残り： ${list.children.length}`;
    }

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

    //追加
    document.querySelector('.add-button').addEventListener('click', async(event) => {
        //inputが空のときは追加しない
        const text = input.value.trim();
        if(!text) return;

        const res = await fetch('/api/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: text })
        });

        const data = await res.json();

        const newElement = document.createElement('li');
        newElement.dataset.id = data.id;
        newElement.innerHTML = `${text} <button class="delete-button">削除</button>`;
        list.appendChild(newElement);

        input.value = '';
        updateCount();
    });

    //削除
    list.addEventListener('click', async (event) => {
        if (!event.target.classList.contains('delete-button')) return;

        const li = event.target.parentElement;
        const id = li.dataset.id;

        await fetch(`/api/todo/${id}`, {
        method: 'DELETE'
        });

        li.remove();
        updateCount();
    });
    updateCount();
});