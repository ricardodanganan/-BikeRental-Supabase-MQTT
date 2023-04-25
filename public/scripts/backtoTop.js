// Wait for the DOM content to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Get the 'backToTop' button element by its ID
    const backToTopButton = document.getElementById("backToTop");

    // Add a scroll event listener to the window object
    window.addEventListener("scroll", function () {
        // If the window is scrolled down more than 300 pixels from the top
        if (window.pageYOffset > 300) {
            // Set the display of the 'backToTop' button to 'block', making it visible
            backToTopButton.style.display = "block";
        } else {
            // If not, set the display of the 'backToTop' button to 'none', hiding it
            backToTopButton.style.display = "none";
        }
    });

    // Add a click event listener to the 'backToTop' button
    backToTopButton.addEventListener("click", function () {
        // On click, smoothly scroll the window back to the top
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
