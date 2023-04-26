// Function to open the registration form overlay
function openRegistrationOverlay() {
  // Set the display style of the registration overlay element to 'block' to make it visible
  document.getElementById('registration-overlay').style.display = 'block';
}

// Function to close the registration form overlay
function closeRegistrationOverlay() {
  // Set the display style of the registration overlay element to 'none' to hide it
  document.getElementById('registration-overlay').style.display = 'none';
}

// Add an event listener for the 'submit' event on the registration form
document.getElementById('registration-form').addEventListener('submit', function (event) {
  // Prevent the default form submission behavior (e.g., page refresh) to allow for custom handling
  event.preventDefault();
});
