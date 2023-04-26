// Immediately invoked function expression (IIFE) to create a local scope and avoid polluting the global scope
(function () {
  // Navbar JavaScript
  var menuHolder = document.getElementById('menuHolder');
  var siteBrand = document.getElementById('siteBrand');

  // Function to toggle the 'drawMenu' class on the menuHolder element
  function menuToggle() {
    menuHolder.classList.toggle("drawMenu");
  }

  // Function to update the site brand text based on the window width
  function updateSiteBrand() {
    if (window.innerWidth < 420) {
      siteBrand.textContent = "AMIGOS BIKE RENTAL";
    } 
  }

  // Update siteBrand text on page load
  updateSiteBrand();

  // Attach event listeners
  // Update siteBrand text when the window is resized
  window.addEventListener('resize', updateSiteBrand);

  // Expose the menuToggle function to the global scope
  window.menuToggle = menuToggle;
})();
