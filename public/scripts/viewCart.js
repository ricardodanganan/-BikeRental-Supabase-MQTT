// Async function to fetch the cart items from the database 
async function viewCartButton() {
    // Initialize the Supabase client 
    const supabaseUrl = 'https://muctatxynqfjximhcyty.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg';
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Function to fetch the cart items from the cart_items table 
    async function fetchCartItems() {
        const { data, error } = await supabaseClient.from('cart_items').select('*');

        // Check if there was an error fetching the cart items from the cart_items table
        if (error) {
            console.error('Error fetching cart items:', error); // Log the error to the console
        } else {
            return data; // Return the cart items
        }
    }

    // Function to render the cart items to the DOM 
    function renderCartItems(cartItems) {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';

        // Loop through the cart items and render them to the DOM 
        cartItems.forEach(cartItem => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            // Create the image element for the cart item
            const cartItemImage = document.createElement('img');
            cartItemImage.src = cartItem.image_url;
            cartItemImage.alt = cartItem.name;

            // Create the info element for the cart item
            const cartItemInfo = document.createElement('div');
            cartItemInfo.classList.add('cart-item-info');

            // Create the name, category and rent per hour elements for the cart item
            const cartItemName = document.createElement('h2');
            cartItemName.textContent = cartItem.name;

            // Create the category element for the cart item
            const cartItemCategory = document.createElement('p');
            cartItemCategory.textContent = `Category: ${cartItem.category}`;

            const cartItemRentPerHour = document.createElement('p');
            cartItemRentPerHour.textContent = `Rent per hour: €${cartItem.rent_per_hour}`;

            // Create the remove button for the cart item 
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button', 'pretty-remove-button');
            // Add the event listener for the remove button 
            removeButton.addEventListener('click', async () => {
                await removeCartItem(cartItem.id);
                // Refetch and rerender the cart items after removal
                const updatedCartItems = await fetchCartItems();
                renderCartItems(updatedCartItems);
            });

            // Append the elements to the cart item element 
            cartItemElement.appendChild(removeButton);
            cartItemInfo.appendChild(cartItemName);
            cartItemInfo.appendChild(cartItemCategory);
            cartItemInfo.appendChild(cartItemRentPerHour);
            cartItemElement.appendChild(cartItemImage);
            cartItemElement.appendChild(cartItemInfo);
            cartList.appendChild(cartItemElement);
        });
    }
    // Function to remove a cart item from the cart_items table 
    async function removeCartItem(itemId) {
        // Delete the cart item from the cart_items table
        const { error } = await supabaseClient
            .from('cart_items') // Select the cart_items table
            .delete() // Delete the cart item
            .eq('id', itemId); // Select the cart item with the specified id

        if (error) {
            console.error('Error removing cart item:', error);
        }
    }

    // Function to show the cart modal
    function showModal() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = 'block';

        // Add the event listener for the close button
        document.getElementById('cart-close-button').addEventListener('click', hideModal);

        // Add the event listener for clicking outside the modal content
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                hideModal();
            }
        });
    }

    // Function to hide the cart modal 
    function hideModal() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = 'none';
    }
    // Add the event listener for the view cart button
    document.getElementById('view-cart').addEventListener('click', async () => {
        const cartItems = await fetchCartItems();
        renderCartItems(cartItems);
        showModal();
    });
}

// Call the viewCartButton function
viewCartButton();