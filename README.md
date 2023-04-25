# Bike Rental Website with Supabase Integration

A responsive, user-friendly bike rental website that allows users to browse, book, subscribe to newsletters, and manage bike rentals. The website features an interactive map connected to the Google Maps API for an enhanced browsing experience and real-time updates on bike availability and prices using MQTT. All data is managed through Supabase, a scalable and powerful backend-as-a-service.

## Features

- Browse available bikes
- Newsletter subscription
- Mobile-responsive design
- User registration and login using Supabase
- Integration with Custom Google Maps API for map browsing
- Display bike rental locations fetched from the Supabase database on the map
- Book and manage bike rentals
- Real-time updates on database such as bike availability, prices etc. using MQTT

## Technologies Used

- HTML, CSS, JavaScript
- Supabase for backend data storage and management
- MQTT protocol with Mosquitto broker for real-time updates
- Docker for running Mosquitto broker in an isolated container using Google Cloud Console
- Other libraries and frameworks (e.g., jQuery, Owl Carousel, etc.)
- Google Maps API for map integration
- MQTT Integration

## MQTT Integration

The website uses the MQTT protocol to receive real-time updates on bike availability and prices from a Mosquitto broker running in a Docker container on Google Cloud Console. MQTT clients can publish and subscribe to topics such as bike availability, price changes, and other relevant information. This enables the website to display up-to-date information and provide a seamless user experience.

## Example MQTT Topics

bikeshop/availability: Updates on the availability of bikes at a specific bike shop
bikeshop/prices: Updates on the prices of bike rentals at a specific bike shop

## Real-time Data Updates

Using the MQTT integration, the website can efficiently update the map with real-time information on bike availability and prices. This ensures that users always have access to the most recent information when browsing and booking bike rentals.

## Docker Configuration on Google Cloud Console

A Docker container is used to run the Mosquitto MQTT broker on Google Cloud Console, providing an isolated environment for managing MQTT connections and topics. The Docker configuration file (e.g., docker-compose.yml) should include the necessary settings for running the Mosquitto broker and exposing the required ports. Deploying the container on Google Cloud Console ensures scalability and reliability for your application.






