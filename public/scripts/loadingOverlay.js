// Add an event listener to the window load event
window.addEventListener('load', function () {
  // Get the loading overlay element by its ID
  var loadingOverlay = document.getElementById('loading-overlay');
  // Set the display style of the loading overlay to 'none' to hide it
  loadingOverlay.style.display = 'none';
});

// Using jQuery, add an event listener to the window load event
$(window).on('load', function () {
  // Fade out the loading overlay with a slow animation
  $('#loading-overlay').fadeOut('slow');
});
