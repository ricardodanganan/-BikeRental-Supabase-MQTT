// Function to fetch bike types from Supabase
async function getBikeTypes() {
  // Supabase URL and key
  const supabaseUrl = 'https://muctatxynqfjximhcyty.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg';
  // Create Supabase client
  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  try {
    // Fetch bike types data from Supabase
    const { data, error } = await supabaseClient
      .from('bike_types')
      .select('*');
    // Check for any errors during data fetching
    if (error) {
      console.error('Error fetching bike types:', error);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching bike types:', error);
    return [];
  }
}

// Function to create a bike card using a bike object
function createBikeCard(bike) {
  // Return HTML markup for the bike card
  return `
    <div class="col-md-6 col-lg-3 mb-4 d-flex justify-content-center" data-aos="zoom-in-up">
      <div class="biketype-card text-center custom-card">
        <img src="${bike.image_url}" class="card-img-top bike-image" alt="${bike.bike_type}">
        <div class="biketype-card-body">
          <h5 class="card-title">${bike.bike_type}</h5>
          <p class="card-text">Starts from €${bike.rent_per_hour} per hour</p>
        </div>
      </div>
    </div>
  `;
}

// Function to display bike cards on the page
async function displayBikeCards() {
  // Fetch bike types and create bike cards
  const bikeTypes = await getBikeTypes();
  const bikeCards = bikeTypes.map(createBikeCard).join('');
  // Add the bike cards to the page
  document.querySelector('#bike-types-container .row').innerHTML = bikeCards;
}

// Wait for the DOM content to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', displayBikeCards);

