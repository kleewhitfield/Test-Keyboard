const keys = document.querySelectorAll('.key');
const activeKeys = {}; // To keep track of active keys

function playSound(key) {
  const audio = document.querySelector(`audio[data-key="${key.toUpperCase()}"]`);
  const keyElement = document.querySelector(`.key[data-key="${key.toUpperCase()}"]`);
  if (keyElement) {
    animateKey(keyElement);
  }
  if (!audio) return;

  keyElement.classList.add('active');
  audio.currentTime = 0; // Rewind to the start
  audio.play();
}

function stopSound(key) {
  const audio = document.querySelector(`audio[data-key="${key.toUpperCase()}"]`);
  const keyElement = document.querySelector(`.key[data-key="${key.toUpperCase()}"]`);
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  if (keyElement) {
    keyElement.classList.remove('active');
  }
}

window.addEventListener('keydown', function(event) {
  if (!activeKeys[event.key]) { // Check if the key is not already active
    activeKeys[event.key] = true;
    playSound(event.key);
  }
});

window.addEventListener('keyup', function(event) {
  activeKeys[event.key] = false; // Mark the key as not active anymore
  stopSound(event.key);
});

keys.forEach(key => {
  key.addEventListener('click', function() {
    const keyAttribute = this.getAttribute('data-key');
    playSound(keyAttribute);
  });

  key.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Prevent the default touch behavior, like scrolling
    const keyAttribute = this.getAttribute('data-key');
    playSound(keyAttribute);
  });

  key.addEventListener('touchend', function(e) {
    e.preventDefault(); // Prevent the default touch behavior, like scrolling
    const keyAttribute = this.getAttribute('data-key');
    stopSound(keyAttribute);
  });
});

function animateKey(key) {
  key.animate([
    // Keyframes
    { transform: 'scale(1)', backgroundColor: '#333' },
    { transform: 'scale(1.1)', backgroundColor: '#ffc600' },
    { transform: 'scale(1)', backgroundColor: '#333' }
  ], {
    // Timing options
    duration: 100,
    iterations: 1
  });
}

const soundSelect = document.getElementById('sound-set-select');
soundSelect.addEventListener('change', function(event) {
  const selectedSound = event.target.value;
  const key = event.target.getAttribute('data-key');
  const audioElement = document.getElementById(key);
  if (audioElement) {
    audioElement.src = selectedSound;
  }
});
