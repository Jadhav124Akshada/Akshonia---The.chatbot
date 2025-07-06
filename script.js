const form = document.getElementById('chat-form');
const chat = document.getElementById('chat');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const userInput = document.getElementById('prompt').value.trim();
  if (!userInput) return;

  appendMessage('user', userInput);
  form.reset();

  appendMessage('bot', 'Typing...');

  try {
    const res = await fetch('https://akshonia-api.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput })
    });
    const data = await res.json();
    updateLastMessage('bot', data.reply || 'No reply');
  } catch (err) {
    updateLastMessage('bot', 'Error: Could not fetch reply.');
  }
});

function appendMessage(who, text) {
  const div = document.createElement('div');
  div.className = `message ${who}`;
  div.innerHTML = `
    <div class="icon">${who === 'user' ? '🧑‍💻' : '🤖'}</div>
    <div class="message-content">${text}</div>
  `;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function updateLastMessage(who, text) {
  const messages = chat.getElementsByClassName('message');
  const last = messages[messages.length - 1];
  if (last && last.classList.contains(who)) {
    last.querySelector('.message-content').textContent = text;
  }
}
