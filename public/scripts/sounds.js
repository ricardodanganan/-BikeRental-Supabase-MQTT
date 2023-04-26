var audioElement = document.getElementById("customSound");
var playPauseButton = document.getElementById("playPauseSound");

playPauseButton.addEventListener("click", function () {
  if (audioElement.paused) {
    audioElement.play();
  } else {
    audioElement.pause();
  }
});

// Your existing back to top button's JavaScript code
