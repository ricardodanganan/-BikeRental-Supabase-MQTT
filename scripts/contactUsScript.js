// Function to open the contact form overlay
function openContactUsOverlay() {
    console.log('Opening contact form overlay');
    document.getElementById('contactUsOverlay').style.display = 'block';
}

// Function to close the contact form overlay
function closeContactUsOverlay() {
    console.log('Closing contact form overlay');
    document.getElementById('contactUsOverlay').style.display = 'none';
}

// Function to submit the form data to the backend
async function submitForm() {
    console.log('Submitting form data');
    // Supabase URL and key
    const supabaseUrl = 'https://muctatxynqfjximhcyty.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg';

    // Create Supabase client
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Collect form data
    const form = document.querySelector('#contact-form');
    // Get all the form inputs
    const formInputs = form.querySelectorAll('input, select, textarea');
    // Create an object to store the form data
    let submission = {};
    formInputs.forEach(element => {
        // Get the value and name of the input
        const { value, name } = element;
        if (value) {
            submission[name] = value;
        }
    });
    // Log the form data to the console
    console.log('Form data:', submission);

    // Submit the form data to Supabase
    const { error } = await supabaseClient.from('entries').insert([submission], { returning: 'minimal' });

    // Handle the submission response
    if (error) {
        alert('There was an error please try again');
    } else {
        alert('Thanks for contacting us');
        form.reset();
        closeContactUsOverlay();
    }
}

// Attach event listener to the form submission
const form = document.querySelector('#contact-form');
form.addEventListener('submit', async (event) => {
    console.log('Form submitted');
    event.preventDefault();
    await submitForm();
});

