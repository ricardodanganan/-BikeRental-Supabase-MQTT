# !/bin/bash
# Made by: Ricardo Danganan Jnr
# Made in: 23/04/2023

# Description: This script is used to increase the number of bikes availables for a given shop using the table bikeshops in the supabase.
# It subscribes to the MQTT topic bike_availability_increase and parses the messages.
# The messages are in the form of a JSON object.
# The script extracts the data from the JSON object and updates the Supabase database.
# The script is used in the bike-rental-supabase.sh script.


# Set up Supabase URL, key, and API endpoint
SUPABASE_URL="https://muctatxynqfjximhcyty.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg"
API_ENDPOINT="/rest/v1/bikeshops" # TODO: change to /rest/v1/bikeshops (bikeshops table) and add the id to the URL

# Set the MQTT topic prefix for this application 
MY_APP='bike_availability_increase'

# Set request header and method for Supabase API 
REQ_HEADER='Content-type: application/json'
REQ_METHOD='PATCH' # PATCH or PUT (PUT will replace the whole row)

echo 'starting...'

# Subscribe to MQTT messages and parse them 
mosquitto_sub -v -h 172.18.0.2 -t $MY_APP/# | while read line
do
    echo $line

    # Extract topic and ID from the MQTT message topic and check if it is a valid ID (integer)
    topic=`echo $line|cut -f1 -d' '`
    id=$(echo $topic | awk -F '/' '{print $2}')
    if ! [[ "$id" =~ ^[0-9]+$ ]]; then
        echo "Invalid ID: $id"
        continue
    fi
    echo $id

    # Extract the increment value from the MQTT message payload and check if it is a valid increment (integer)
    msg=`echo $line|cut -f2 -d' '`
    increment=`echo $msg`
    echo $increment

    # Check if the increment is a valid integer 
    API_ENDPOINT_ID="$API_ENDPOINT?id=eq.$id"

    # Get the current number of bikes availables for the shop with the given ID 
    current_bike_availables=$(curl -X GET $SUPABASE_URL$API_ENDPOINT_ID -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY" -H "$REQ_HEADER" | python3 parse_json_bikes.py)

    if [ -z "$current_bike_availables" ]
    then
        echo "No shop found with the given ID" # TODO: send MQTT message to the client to notify the error 
        continue
    fi

    # Check if the increment is a valid integer 
    echo "Current bikes available: $current_bike_availables"

    # Update the number of bikes availables for the shop with the given ID 
    new_bike_availables=$(($current_bike_availables + $increment))

    echo "New bikes available: $new_bike_availables"

    # Update the number of bikes availables for the shop with the given ID 
    JSON='{
        "bike_availables": '$new_bike_availables'
    }'

    echo $JSON 

    # Send the API request to update the number of available bikes for the specific bike shop ID  
    response=$(curl -X $REQ_METHOD $SUPABASE_URL$API_ENDPOINT_ID -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY" -H "$REQ_HEADER" -d "$JSON")

    echo $response

done

# test
# this script
# Increase the bikes available the bike-availables-increase script
# mosquitto_pub -h 172.18.0.2 -t bike_availability_increase/<id#> -m <#> of increased availability>