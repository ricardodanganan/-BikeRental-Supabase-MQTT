// Function to register a new user
async function registerUser() {
    // Initialize Supabase client with the given URL and key
    const supabaseUrl = 'https://muctatxynqfjximhcyty.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg';
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get user input values from the registration form
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Check if the entered passwords match
    if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
    }

    try {
        // Insert the new user's data into the 'registered_users' table
        const { data: userData, error: userDataError } = await supabaseClient.from('registered_users').insert([
            {
                email: email,
                password_hash: password,
                first_name: firstName,
                last_name: lastName,
            },
        ], { returning: 'minimal' }).single();

        // Check for errors during insertion
        if (userDataError) {
            throw userDataError;
        }

        // If successful, display a success message
        alert('Registration successful!');
    } catch (error) {
        // Log and display an error message if the registration fails
        console.error('Error during registration:', error.message);
        alert('Registration failed. Please try again.');
    }
}

// Event listener for the register button click event
const registerBtn = document.querySelector('.register-btn');
registerBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    await registerUser();
});
