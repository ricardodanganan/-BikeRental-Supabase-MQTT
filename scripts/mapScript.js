// Initialize Supabase client and create a global variable to store the client
const { createClient } = supabase;
supabase = createClient(
  "https://muctatxynqfjximhcyty.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg"
);

// Initialize the map and the array of markers to store the markers on the map
let map;
let markers = [];

// Function Initialize the map centered on Dublin and add the markers to the map 
function initMap() {
  const dublin = { lat: 53.3498, lng: -6.2603 };
  // Create the map centered on Dublin
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: dublin,
    mapId: "8b7771a1e0749c87",
  });

  // Add click event listener to map to hide sidebar when map is clicked on so that the sidebar is not shown when the map is clicked on
  google.maps.event.addListener(map, "click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none";
  });


  // Function to generate star rating
  function generateStarRating(rating) {
    // Create an empty string to store the generated star rating 
    let stars = '';
    // Loop through the number of stars to generate the star rating 
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) { // If the current star is less than or equal to the rating value then show a filled star icon else show an empty star icon
        stars += '<img src="./img/star.png" alt="Filled Star" width="20" height="20">';
      } else {
        stars += '<img src="./img/star2.png" alt="Empty Star" width="20" height="20">';
      }
    }
    return stars; // Return the generated star rating
  }

  // Function to create sidebar content for each bikeshop marker on the map 
  function createSidebarContent(bikeshop, openStatus) {
    // Return the HTML content for the sidebar for each bikeshop 
    return ` 
      <div class="card">
        <img src="${bikeshop.image_url}" class="card-img-top" alt="Location Image">
        <div class="card-body">
          <h5 class="card-title">${bikeshop.shop_name}</h5>
          <p class="card-text">
            <img src="./img/navigation.png" alt="Another Icon" width="20" height="20">
            Location: ${bikeshop.location_name}
          </p>
          <p class="card-text">
            <img src="./img/bicycle.png" alt="Bike Icon" width="20" height="20">
            ${bikeshop.bike_availables} available Bikes
          </p>
          <p class="card-text">
            <img src="./img/phone.png" alt="Phone Icon" width="20" height="20">
            Phone: ${bikeshop.contact_number}
          </p>
          <p class="card-text">
            <img src="./img/email.png" alt="Email Icon" width="20" height="20">
            Email: <a href="mailto:${bikeshop.email}">${bikeshop.email}</a>
          </p>
          <p class="card-text">
            <img src="./img/time.png" alt="Clock Icon" width="20" height="20">
            Opening Hours: 10:00-17:00 (${openStatus})
          </p>
          <p class="card-text">Rating: ${generateStarRating(bikeshop.rating)}</p>
        </div>
      </div>
    `;
  }

  // Get all bikeshops from Supabase and add markers to the map for each bikeshop 
  supabase
    .from("bikeshops") // Select the bikeshops table
    .select("*") // Select all columns
    .then(({ data: bikeshops, error }) => {
      if (error) { // If there is an error then log it to the console
        console.error(error);
        return;
      }

      // Add markers for each bikeshop
      bikeshops.forEach((bikeshop) => {
        // Create a marker for each bikeshop and add it to the map 
        const location = { lat: bikeshop.latitude, lng: bikeshop.longitude };
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: bikeshop.shop_name,
          animation: google.maps.Animation.DROP, // Set the animation for the marker to drop
        });

        // Add click event listener to each marker to show sidebar with bikeshop information
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentFormattedTime = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

        // Opening and closing times for each bikeshop
        const openingTime = "10:00";
        const closingTime = "17:00";

        // Check if the current time is between the opening and closing times
        const isOpen = currentFormattedTime >= openingTime && currentFormattedTime <= closingTime;
        const openStatus = isOpen ? "Open" : "Closed";

        // Create the sidebar content for each bikeshop
        const infoWindow = new google.maps.InfoWindow({
          content: createSidebarContent(bikeshop, openStatus),
        });

        // Add click event listener to each marker to show sidebar with bikeshop information and reviews 
        marker.addListener("click", () => {
          map.setZoom(15);
          map.setCenter(marker.getPosition());
          infoWindow.open(map, marker);

          // Show the sidebar with updated content for the selected bikeshop 
          const sidebar = document.getElementById("sidebar");
          const sidebarContent = sidebar.querySelector(".sidebar-content");
          const reviewsContainer = sidebar.querySelector(".reviews"); // Add this line
          sidebarContent.innerHTML = createSidebarContent(bikeshop, openStatus);
          sidebar.style.display = "block";

          // Add reviews to the sidebar for the selected bikeshop 
          if (bikeshop.reviews) {
            // Get the reviews for the selected bikeshop 
            const reviews = bikeshop.reviews;
            let reviewsHTML = "<h4>Reviews:</h4>";
            reviews.forEach((review) => {
              reviewsHTML += `
                <div class="review">
                  <p><strong>${review.name}</strong> - ${review.rating} Stars</p>
                  <p>${review.comment}</p>
                </div>
                <hr>
              `;
            });
            reviewsContainer.innerHTML = reviewsHTML;
          } else { // If there are no reviews then show a message saying there are no reviews
            reviewsContainer.innerHTML = "<p>No reviews available.</p>";
          }
        });

        marker.addListener("mouseover", () => { // Add mouseover event listener to each marker to show the info window
          infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", () => { // Add mouseout event listener to each marker to hide the info window
          infoWindow.close();
        });

        // Add a custom icon to each marker 
        const icon = {
          url: `https://chart.googleapis.com/chart?chst=d_bubble_text_small_withshadow&chld=bb|${bikeshop.bike_availables}|FFC107|000000`,
          labelOrigin: new google.maps.Point(10, -10),
          scaledSize: new google.maps.Size(35, 35),
          anchor: new google.maps.Point(12, 22),
          shadow: {
            url: "https://www.gstatic.com/mapfiles/ms2/micons/msmarker.shadow.png",
            anchor: new google.maps.Point(0, 18),
            size: new google.maps.Size(22, 18),
          },
        };
        marker.setIcon(icon); // Set the icon for the marker 

        // Change the icon when the mouse hovers over the marker 
        marker.addListener("mouseover", () => {
          marker.setIcon({
            url: `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${bikeshop.bike_availables}|FF0000|000000`,
            labelOrigin: new google.maps.Point(10, -10),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 40),
            origin: new google.maps.Point(0, 0),
            shadow: {
              url: "https://maps.gstatic.com/mapfiles/shadow50.png",
              anchor: new google.maps.Point(10, 34),
              size: new google.maps.Size(37, 34),
              origin: new google.maps.Point(0, 0),
            },
          });
        });
        marker.addListener("mouseout", () => {
          marker.setIcon(icon);
        });
        markers.push(marker); // Add the marker to the markers array
      });

      // Handle search input keypress event to search for a location by name and zoom to it on the map if found
      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("keypress", (e) => {
        // If the user presses the enter key then search for the location and zoom to it on the map
        if (e.key === "Enter") {
          const searchValue = searchInput.value.toLowerCase();
          const bikeshop = bikeshops.find((b) => b.location_name.toLowerCase() === searchValue);
          if (bikeshop) { // If the location is found then zoom to it on the map
            const location = { lat: bikeshop.latitude, lng: bikeshop.longitude };
            const marker = markers.find((m) => m.title === bikeshop.shop_name);
            if (marker) {
              map.setZoom(15);
              map.setCenter(marker.getPosition());
              google.maps.event.trigger(marker, "click");
            }
          } else { // If the location is not found then show an alert message
            alert("Location not found.");
          }
          searchInput.blur();
        }
      });
      // Handle search input blur event to clear the input value when the user clicks outside of it
      searchInput.addEventListener("blur", () => {
        searchInput.value = "";
      });
    });
}