// Execute the function when the document is ready
$(document).ready(function () {
  // Initialize the slick carousel for the sponsors section
  $('.sponsors-carousel-container').slick({
    dots: false, // Disable dots pagination
    infinite: true, // Set the carousel to infinite looping
    speed: 300, // Set the animation speed
    slidesToShow: 3, // Set the number of slides to show at once
    slidesToScroll: 1, // Set the number of slides to scroll at once
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set the autoplay speed
    responsive: [
      {
        breakpoint: 1024, // Set the breakpoint for screen width
        settings: {
          slidesToShow: 2, // Set the number of slides to show at once for the specific breakpoint
          slidesToScroll: 1 // Set the number of slides to scroll at once for the specific breakpoint
        }
      },
      {
        breakpoint: 600, // Set the breakpoint for screen width
        settings: {
          slidesToShow: 1, // Set the number of slides to show at once for the specific breakpoint
          slidesToScroll: 1 // Set the number of slides to scroll at once for the specific breakpoint
        }
      }
    ]
  });
});
