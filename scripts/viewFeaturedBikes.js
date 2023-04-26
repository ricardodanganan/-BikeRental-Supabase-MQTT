// asynchroneous function to fetch featured bikes from the database
async function setupBikeShop() {
    // initialize the supabase client using the API key and URL 
    const supabaseUrl = 'https://muctatxynqfjximhcyty.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg';
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // function to get the featured bikes from the database 
    async function fetchFeaturedBikes() {
        const { data, error } = await supabaseClient
            .from('bike_list') // Select the bike_list table
            .select('*') // Select all columns
            .limit(3); // Fetch only 3 bikes

        // Check if there was an error fetching the featured bikes from the database
        if (error) {
            console.error('Error fetching featured bikes:', error);
        } else {
            return data;
        }
    }

    // function to display a notification with a message and error status 
    function showFeaturedBikesOverlay(imageSrc) {
        const overlay = document.createElement('div');
        overlay.classList.add('featured-bikes-overlay');

        // Create an image element and set the source to the imageSrc parameter
        const overlayImage = document.createElement('img');
        overlayImage.src = imageSrc;

        // Append the image element to the overlay div
        overlay.appendChild(overlayImage);
        document.body.appendChild(overlay);

        // Add an event listener to the overlay div to remove it from the DOM when clicked
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    }

    // function to render the featured bikes 
    function renderFeaturedBikes(bikes) {
        const featuredBikesContainer = document.getElementById('featured-bikes');
        featuredBikesContainer.innerHTML = '';
        featuredBikesContainer.classList.add('featured-bikes-container');

        // Loop through the bikes array and create a div for each bike 
        bikes.forEach(bike => {
            // Create a div element to hold the bike card and set the data-aos attribute
            const bikeCard = document.createElement('div');
            bikeCard.classList.add('bike-card');
            bikeCard.setAttribute('data-aos', 'zoom-in-down');

            // Create an image element and set the source to the image_url property of the bike object
            const bikeImage = document.createElement('img');
            bikeImage.src = bike.image_url;
            bikeImage.alt = bike.name;

            // Create a div element to hold the bike information
            const bikeInfo = document.createElement('div');
            bikeInfo.classList.add('bike-info');

            // Create an h3 element to hold the bike name and a p element to hold the bike category and rent per hour
            const bikeName = document.createElement('h3');
            bikeName.textContent = bike.name;

            const bikeCategory = document.createElement('p');
            bikeCategory.textContent = `Category: ${bike.category}`;

            const bikeRentPerHour = document.createElement('p');
            bikeRentPerHour.textContent = `Rent per hour: €${bike.rent_per_hour}`;

            // Append the bike name, category, and rent per hour to the bike info div
            bikeInfo.appendChild(bikeName);
            bikeInfo.appendChild(bikeCategory);
            bikeInfo.appendChild(bikeRentPerHour);

            bikeCard.appendChild(bikeImage);
            bikeCard.appendChild(bikeInfo);

            bikeImage.addEventListener('click', () => {
                showFeaturedBikesOverlay(bike.image_url);
            });

            featuredBikesContainer.appendChild(bikeCard);
        });
    }
    // Fetch and render featured bikes
    const featuredBikes = await fetchFeaturedBikes();
    renderFeaturedBikes(featuredBikes);
}

setupBikeShop(); // Call the setupBikeShop function
