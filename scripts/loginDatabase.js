// Define an asynchronous function to handle user login
async function loginUser() {
    // Set up the Supabase URL and API key for accessing the database
    const supabaseUrl = 'https://muctatxynqfjximhcyty.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg';
    // Create a Supabase client using the URL and API key
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get the email and password input values
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    try {
        // Query the registered_users table for the email and password combination
        const { data: userData, error: userDataError } = await supabaseClient
            .from('registered_users')
            .select('*')
            .eq('email', email)
            .eq('password_hash', password)
            .single();

        // If there's an error with the query, throw the error
        if (userDataError) {
            throw userDataError;
        }

        // If no matching user data is found, throw an error
        if (!userData) {
            throw new Error('Invalid email or password');
        }

        // If login is successful, show an alert and update the UI
        alert('Login successful!');
        closeLoginOverlay();
        document.getElementById('logged-out').classList.add('d-none');
        document.getElementById('logged-in').style.display = 'inline';
    } catch (error) {
        // Log the error message and details in the console
        console.error('Error during login:', error.message);
        console.log('Error during login:', error); // add this line
        // Show an alert to the user that the login has failed
        alert('Login failed. Please try again.');
    }
}


// Event listener for the "Log in" button
const loginBtn = document.querySelector('#login-btn');
loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openLoginOverlay();
});

// Event listener for the login form submission
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await loginUser();
});

// Function to close the login overlay and update the UI based on the user's login status
function closeLoginOverlay() {
    // Get the email input value
    const emailInput = document.getElementById('login_email');
    const email = emailInput ? emailInput.value : null;

    // If the user is logged in, update the UI and set up event listener for logout button
    if (email) {
        alert('You are logged in as: ' + email);
        document.getElementById('logged-out').classList.add('d-none');
        document.getElementById('logged-in').style.display = 'inline';
        const logoutBtn = document.querySelector('#logout-btn');
        logoutBtn.classList.remove('d-none');
        document.querySelector('#login-btn').classList.add('d-none');
        logoutBtn.addEventListener('click', async () => {
            const { error } = await supabaseClient.auth.signOut();
            if (error) console.log('Error signing out:', error.message);
            else {
                alert('You have been logged out.');
                closeLoginOverlay();
            }
        });
    } else {
        // If the user is not logged in, update the UI
        document.getElementById('logged-out').classList.remove('d-none');
        document.getElementById('logged-in').style.display = 'none';
        const loginBtn = document.querySelector('#login-btn');
        loginBtn.classList.remove('d-none');
        document.querySelector('#logout-btn').classList.add('d-none');
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openLoginOverlay();
        });
    }

    // Hide the login overlay
    document.getElementById('login-overlay').style.display = 'none';
}

// Event listener for the logout button click
document.querySelector('#logout-btn').addEventListener('click', () => {
    closeLoginOverlay();
});



// Function to log out the user and update the UI accordingly
function logoutUser() {
    // Show the logged-out state and hide the logged-in state
    document.getElementById('logged-out').classList.remove('d-none');
    document.getElementById('logged-in').style.display = 'none';

    // Hide the logout button and show the login button
    document.querySelector('#logout-btn').classList.add('d-none');
    document.querySelector('#login-btn').classList.remove('d-none');

    // Show a message to inform the user they have been logged out
    alert('You have been logged out.');
}

// Event listener for the logout button click
document.querySelector('#logout-btn').addEventListener('click', () => {
    logoutUser();
});






