// Initialize the Supabase client and fetch the bike items
async function setupBikeShop() {
    const supabaseUrl = 'https://muctatxynqfjximhcyty.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg';
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // function to display a notification with a message and error status 
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;

        // Add the notification to the DOM and display it for 3 seconds
        document.body.appendChild(notification);
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
            document.body.removeChild(notification);
        }, 3000);
    }

    // Function to add a bike item to the cart 
    async function addCartItem(bike) {
        // Insert the bike item into the cart_items table 
        const { error } = await supabaseClient
            .from('cart_items')
            .insert([
                {
                    bike_id: bike.id,
                    name: bike.name,
                    rent_per_hour: bike.rent_per_hour,
                    image_url: bike.image_url,
                    category: bike.category
                }
            ]);

        // Check if there was an error inserting the bike item into the cart_items table 
        if (error) {
            console.error('Error adding item to cart:', error); // Log the error to the console
        } else {
            showNotification('Bike has been successfully booked!'); // Display a notification to the user
        }
    }

    // Function to fetch the bike items from the bike_list table 
    async function fetchBikeItems(category = 'all', minRent = 0) {
        // Fetch the bike items from the bike_list table 
        const { data, error } = await supabaseClient
            .from('bike_list')
            .select('*')
            .filter('category', category === 'all' ? 'neq' : 'eq', category)
            .filter('rent_per_hour', minRent === 0 ? 'gte' : 'gte', minRent);

        // Check if there was an error fetching the bike items from the bike_list table 
        if (error) {
            console.error('Error fetching bike items:', error); // Log the error to the console
        } else {
            return data;
        }
    }

    // Function to render the bike items in the DOM 
    function renderBikeItems(bikeItems) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        // Loop through the bike items and render them in the DOM 
        bikeItems.forEach(bike => {
            const bikeItem = document.createElement('div');
            bikeItem.classList.add('bike-item');

            // Create the bike image element
            const bikeImage = document.createElement('img');
            bikeImage.src = bike.image_url;
            bikeImage.alt = bike.name;

            // Create the bike info element
            const bikeInfo = document.createElement('div');
            bikeInfo.classList.add('bike-info');

            // Create the bike name, category, rent per hour, and book button elements
            const bikeName = document.createElement('h2');
            bikeName.textContent = bike.name;

            // Create the bike category element
            const bikeCategory = document.createElement('p');
            bikeCategory.textContent = `Category: ${bike.category}`;

            // Create the bike rent per hour element
            const bikeRentPerHour = document.createElement('p');
            bikeRentPerHour.textContent = `Rent per hour: €${bike.rent_per_hour}`;

            // Create the book button element
            const bookButton = document.createElement('button');
            bookButton.textContent = 'Book';
            bookButton.classList.add('book-button');
            bookButton.addEventListener('click', () => {
                addCartItem(bike);
            });

            // Append the bike name, category, rent per hour, and book button elements to the bike info element
            bikeInfo.appendChild(bikeName);
            bikeInfo.appendChild(bikeCategory);
            bikeInfo.appendChild(bikeRentPerHour);
            bikeInfo.appendChild(bookButton);

            bikeItem.appendChild(bikeImage);
            bikeItem.appendChild(bikeInfo);

            productList.appendChild(bikeItem);
        });
    }

    // Function to show the modal, modal is shown when the user clicks the view bikes button
    function showModal() {
        const modal = document.getElementById('shop-modal');
        modal.style.display = 'block';
    }

    // Function to hide the modal, modal is hidden when the user clicks outside of the modal 
    function hideModal() {
        const modal = document.getElementById('shop-modal');
        modal.style.display = 'none';
    }

    // Add an event listener to the view bikes button to fetch the bike items and render them in the DOM 
    document.getElementById('view-bikes').addEventListener('click', async () => {
        const bikeItems = await fetchBikeItems();
        renderBikeItems(bikeItems);
        showModal();
    });

    // Add an event listener to the close button to hide the modal 
    function updateBikeItems() {
        const categoryFilter = document.getElementById('category-filter');
        const rentFilter = document.getElementById('rent-filter');

        // Fetch the bike items from the bike_list table based on the category and rent filters
        fetchBikeItems(categoryFilter.value, parseInt(rentFilter.value))
            .then(renderBikeItems);
    }

    // Add an event listener to the category and rent filters to update the bike items in the DOM
    const categoryFilter = document.getElementById('category-filter');
    const rentFilter = document.getElementById('rent-filter');

    categoryFilter.addEventListener('change', updateBikeItems);
    rentFilter.addEventListener('change', updateBikeItems);
}

// Function to setup the bike shop 
setupBikeShop();



