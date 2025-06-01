const form = document.getElementById('messageForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const message = document.getElementById('message').value;
  const date = document.getElementById('date').value;

  const messages = JSON.parse(localStorage.getItem('futurMessages') || '[]');
  messages.push({ message, date });
  localStorage.setItem('futurMessages', JSON.stringify(messages));

  form.reset();
  confirmation.classList.remove('hidden');

  setTimeout(() => {
    confirmation.classList.add('hidden');
  }, 4000);
});
