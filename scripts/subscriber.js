// Function to validate email format
function isValidEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}

// Function to display a notification with a message and error status
function displayNotification(message, isError) {
    // Create a div element and set its properties
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px';
    notification.style.backgroundColor = isError ? '#f44336' : '#4CAF50';
    notification.style.color = '#ffffff';
    notification.style.zIndex = '1000';
    notification.style.borderRadius = '5px';
    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to submit the newsletter subscription form 
async function submitNewsletter() {
    // Initialize Supabase client 
    const supabaseUrl = 'https://muctatxynqfjximhcyty.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg';
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get the email input value
    const emailInput = document.getElementById('newsletter1');
    const email = emailInput.value.trim();

    if (email && isValidEmail(email)) {
        const submission = { email };
        const { error } = await supabaseClient.from('subscribers').insert([submission], { returning: 'minimal' });
        // Check if there was an error inserting the subscriber into the database
        if (error) {
            console.error('Failed to insert subscriber:', error.message);
            displayNotification('Failed to subscribe, please try again.', true);
        } else { // If no error, display a success message
            console.log('Subscriber inserted successfully');
            displayNotification('Thank you for subscribing!', false);
            emailInput.value = '';
        }
    } else { // If the email is invalid, display an error message 
        console.log('Invalid email address');
        displayNotification('Invalid email address', true);
    }
}

// Add an event listener to the submit button to call the submitNewsletter function when clicked 
const subscribeBtn = document.getElementById('subscribeBtn');
subscribeBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    await submitNewsletter();
});



