// ===== An Evening in Vientiane =====

// Get the elements from the page
let audio = document.getElementById("soundscape");
let image = document.getElementById("sceneImage");
let title = document.getElementById("sceneTitle");
let playButton = document.getElementById("playButton");

// Remembers which scene is showing, so we only change the picture when needed
let currentScene = 1;

// Play or pause the audio
function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Jump to a part of the soundscape (in seconds)
function jumpTo(seconds) {
  audio.currentTime = seconds;
  audio.play();
}

// Change the volume with the slider
function changeVolume() {
  audio.volume = document.getElementById("volumeSlider").value;
}

// Show a new picture with a fade
function showScene(number, file, text) {
  if (currentScene !== number) {
    currentScene = number;
    image.classList.add("fade");          // fade out
    setTimeout(function () {
      image.src = "images/" + file;
      image.alt = text;
      title.textContent = text;
      image.classList.remove("fade");     // fade back in
    }, 400);
  }
}

// Every time the audio moves forward, pick the picture for that moment
audio.addEventListener("timeupdate", function () {
  let time = audio.currentTime;

  if (time < 20) {
    showScene(1, "1-temple.svg", "Sunset at the temple");
  } else if (time < 45) {
    showScene(2, "2-market.svg", "Evening in the village");
  } else if (time < 70) {
    showScene(3, "3-rain.svg", "A sudden rainstorm");
  } else {
    showScene(4, "4-night.svg", "Night by the Mekong");
  }
});

// When the audio plays, the picture gently pulses and the button says Pause
audio.addEventListener("play", function () {
  image.classList.add("playing");
  playButton.textContent = "Pause";
});

// When the audio stops, the pulsing stops and the button says Play
audio.addEventListener("pause", function () {
  image.classList.remove("playing");
  playButton.textContent = "Play";
});
