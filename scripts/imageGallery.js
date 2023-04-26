// Execute the function when the document is ready
jQ(document).ready(function () {
    // Initialize the owlCarousel for the gallery section
    jQ('.gallery').owlCarousel({
        items: 3, // Set the number of items to display at once
        margin: 10, // Set the margin between items
        loop: true, // Set the carousel to loop infinitely
        nav: true, // Enable navigation buttons
        responsive: {
            0: { // Set the breakpoint for screen width
                items: 1 // Set the number of items to display at once for the specific breakpoint
            },
            600: { // Set the breakpoint for screen width
                items: 2 // Set the number of items to display at once for the specific breakpoint
            },
            1000: { // Set the breakpoint for screen width
                items: 3 // Set the number of items to display at once for the specific breakpoint
            }
        }
    });

    // Initialize the BaguetteBox lightbox gallery for the '.gallery' class
    baguetteBox.run('.gallery');
});
