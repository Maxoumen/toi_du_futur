const form = document.getElementById('messageForm');
const confirmation = document.getElementById('confirmation');
const audioList = document.getElementById('audioList');
let mediaRecorder;
let audioChunks = [];

document.getElementById('startRecording').addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  audioChunks = [];

  mediaRecorder.addEventListener('dataavailable', event => {
    audioChunks.push(event.data);
  });

  mediaRecorder.addEventListener('stop', () => {
    const audioBlob = new Blob(audioChunks);
    const audioURL = URL.createObjectURL(audioBlob);

    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = audioURL;
    audioList.innerHTML = '';
    audioList.appendChild(audio);

    // Sauvegarde dans le localStorage
    const date = document.getElementById('date').value;
    const messages = JSON.parse(localStorage.getItem('futurVoiceMessages') || '[]');
    messages.push({ date, audio: audioURL });
    localStorage.setItem('futurVoiceMessages', JSON.stringify(messages));
  });

  setTimeout(() => {
    mediaRecorder.stop();
  }, 30000); // Enregistrement de 5 secondes
});

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
