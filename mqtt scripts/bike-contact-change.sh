# !/bin/bash
# Made by: Ricardo Danganan Jnr
# Made in: 23/04/2023

# Description: This script subscribes to the MQTT topic "bike-contact-change/#" and updates the contact number of the bike shop in the Supabase database when a new contact number is received.
# The script expects the MQTT message to be in the format "bike-contact-change/<id> <new_contact_number>".
# The script will extract the bike shop ID and the new contact number from the MQTT message and update the contact number of the bike shop in the Supabase database.

SUPABASE_URL="https://muctatxynqfjximhcyty.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg"
API_ENDPOINT="/rest/v1/bikeshops"

# Set the MQTT topic prefix
MY_APP='bike-contact-change'

REQ_HEADER='Content-type: application/json'
REQ_METHOD='PATCH'

echo 'starting...'

mosquitto_sub -v -h 172.18.0.2 -t $MY_APP/# | while read line
do
    echo $line

    topic=`echo $line|cut -f1 -d' '`
    id=$(echo $topic | awk -F '/' '{print $2}')
    if ! [[ "$id" =~ ^[0-9]+$ ]]; then
        echo "Invalid ID: $id"
        continue
    fi
    echo $id

    msg=`echo $line|cut -f2 -d' '`
    new_contact_number=`echo $msg`
    echo $new_contact_number

    API_ENDPOINT_ID="$API_ENDPOINT?id=eq.$id"

    JSON='{
        "contact_number": "'$new_contact_number'"
    }'

    echo $JSON

    response=$(curl -X $REQ_METHOD $SUPABASE_URL$API_ENDPOINT_ID -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY" -H "$REQ_HEADER" -d "$JSON")

    echo $response

done
