#!/bin/bash

# Set up Supabase URL, key, and API endpoint
SUPABASE_URL="https://muctatxynqfjximhcyty.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg"
API_ENDPOINT="/rest/v1/bikeshops"

# Set the MQTT topic prefix
MY_APP='bike-rating-change'

# Set request header and method for Supabase API
REQ_HEADER='Content-type: application/json'
REQ_METHOD='PATCH'

echo 'starting...'

# Subscribe to MQTT messages
mosquitto_sub -v -h 172.18.0.2 -t $MY_APP/# | while read line
do
    echo $line

    # Extract topic and ID from the MQTT message
    topic=`echo $line|cut -f1 -d' '`
    id=$(echo $topic | awk -F '/' '{print $2}')
    if ! [[ "$id" =~ ^[0-9]+$ ]]; then
        echo "Invalid ID: $id"
        continue
    fi
    echo $id

    # Extract new rating value from the MQTT message
    msg=`echo $line|cut -f2 -d' '`
    new_rating=`echo $msg`
    echo $new_rating

    # Prepare API endpoint for the specific bike shop ID
    API_ENDPOINT_ID="$API_ENDPOINT?id=eq.$id"

    # Update the rating of the bike shop
    JSON='{
        "rating": '$new_rating'
    }'

    echo $JSON

    # Send the API request to update the rating
    response=$(curl -X $REQ_METHOD $SUPABASE_URL$API_ENDPOINT_ID -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY" -H "$REQ_HEADER" -d "$JSON")

    echo $response

done
