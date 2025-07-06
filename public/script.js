const form = document.getElementById('chat-form');
const chat = document.getElementById('chat');
const input = document.getElementById('prompt');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const userInput = input.value.trim();
  if (!userInput) return;

  appendMessage('user', userInput);
  input.value = '';

  const botMessage = appendMessage('bot', 'Typing...');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput })
    });
    const data = await res.json();
    updateMessage(botMessage, data.reply || '🤖 No reply received.');
  } catch (err) {
    updateMessage(botMessage, '🤖 Error: Could not fetch reply.');
  }
});

function appendMessage(role, text) {
  const message = document.createElement('div');
  message.className = `message ${role}`;

  const icon = document.createElement('div');
  icon.className = 'icon';
  icon.textContent = role === 'user' ? '🧑‍💻' : '🤖';

  const content = document.createElement('div');
  content.className = 'message-content';
  content.textContent = text;

  message.appendChild(icon);
  message.appendChild(content);
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;

  return content;
}

function updateMessage(contentElement, newText) {
  contentElement.textContent = newText;
}
