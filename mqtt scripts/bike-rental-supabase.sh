# !/bin/bash
# Made by: Ricardo Danganan Jnr
# Made in: 23/04/2023

# Description: This script is used to insert data into the Supabase database.
# It subscribes to the MQTT topic my-event-log and parses the messages.
# The messages are in the form of a JSON object.
# The script extracts the data from the JSON object and inserts it into the Supabase database.
# The script is used in the bike-rental-supabase.sh script.


# Set up Supabase URL, key, and API endpoint
SUPABASE_URL="https://muctatxynqfjximhcyty.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y3RhdHh5bnFmanhpbWhjeXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4ODU3NDQsImV4cCI6MTk5MjQ2MTc0NH0.CzbdMc-mUqOR_pu2O-sf_d9oD8Ls6YuuIbKWPhvfYfg"
# The API endpoint for access to a db table.
# This will be appended to the SUPABASE_URL
API_ENDPOINT="/rest/v1/bikeshops" # TODO: change to /rest/v1/bikeshops (bikeshops table) and add the id to the URL

MY_APP='my-event-log'

# HTTP Header parameters
# Data will be JSON
REQ_HEADER='Content-type: application/json'

# Saving data to API via POST request
REQ_METHOD='POST'

echo 'starting...'

# mosquitto_sub -v -h localhost -t myapp/# | while read line
mosquitto_sub -v -h 172.18.0.2 -t $MY_APP/# | while read line
do
        # first all we do is echo the line (topic + message) to the screen
        echo $line

        # assume topic has 6 fields in form field1/field2/field3/etc...
        # cut them out of the topic and put into vars 1-3

        # id
        topic1=`echo $line|cut -f2 -d/`
        echo $topic1

        # latitude
        topic2=`echo $line|cut -f3 -d/`
        echo $topic2

        # longitude
        topic3=`echo $line|cut -f4 -d/`
        echo $topic3

        # shop_name
        topic4=`echo $line|cut -f5 -d/`
        echo $topic4

        # location_name
        topic5=`echo $line|cut -f6 -d/`
        echo $topic5

        # bike_availables
        topic6=`echo $line|cut -f7 -d/`
        echo $topic6

        #opening
        topic7=`echo $line|cut -f8 -d/`
        echo $topic7

        #rating
        topic8=`echo $line|cut -f9 -d/`
        echo $topic8

        #image_url
        topic9=`echo $line|cut -f10 -d/`
        echo $topic9

        #reviews
        topic10=`echo $line|cut -f11 -d/`
        echo $topic10

        #email
        topic11=`echo $line|cut -f12 -d/`
        echo $topic11

        #contact_number
        topic12=`echo $line|cut -f13 -d/`
        echo $topic12

        # next, read  the message values for each topic
        # assume message has 6 fields in form field1,field2,field3, etc...
        # cut them out of the msg and put into vars
        msg=`echo $line|cut -f2 -d' '`

        id=`echo $msg|cut -f1 -d,` # id
        echo $id

        latitude=`echo $msg|cut -f2 -d,` # latitude
        echo $latitude

        longitude=`echo $msg|cut -f3 -d,` # longitude
        echo $longitude

        shop_name=`echo $msg|cut -f4 -d,` # shop_name
        echo $shop_name

        location_name=`echo $msg|cut -f5 -d,` # location_name
        echo $location_name

        bike_availables=`echo $msg|cut -f6 -d,` # bike_availables
        echo $bike_availables

        opening=`echo $msg|cut -f7 -d,` # opening
        echo $opening

        rating=`echo $msg|cut -f8 -d,` # rating
        echo $rating

        image_url=`echo $msg|cut -f9 -d,` # image_url
        echo $image_url

        reviews=`echo $msg|cut -f10 -d,` # reviews
        echo $reviews

        email=`echo $msg|cut -f11 -d,` # email
        echo $email

        contact_number=`echo $msg|cut -f12 -d,` # contact_number
        echo $contact_number

        #
        # add the event to the DB
        #
        # Data to be sent in JSON format
        JSON='{
            "id": "'"$id"'",
            "latitude": "'"$latitude"'",
            "longitude": "'"$longitude"'",
            "shop_name": "'"$shop_name"'",
            "location_name": "'"$location_name"'",
            "bike_availables": "'"$bike_availables"'",
            "opening": "'"$opening"'",
            "rating": "'"$rating"'",
            "image_url": "'"$image_url"'",
            "reviews": "'"$reviews"'",
            "email": "'"$email"'",
            "contact_number": "'"$contact_number"'"
            }'

        
        # echo to check that it looks correct
        echo $JSON

        # Use CURL to send POST request + data
        response=$(curl -X  $REQ_METHOD $SUPABASE_URL$API_ENDPOINT -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY" -H "$REQ_HEADER" -d "$JSON")

        # Show response
        echo $response

done

# test

# this script
# ./insert.sh
# test pub message
# mosquitto_pub -h 172.18.0.2 -t my-event-log/id/latitude/longtitude/shop_name/location_name/bike_availables/opening/rating/image_url/reviews/email/contact_number/ -m 1,53.32516015352174,-6.254500679725526,Ranelagh_bikes,Ranelagh,10,19:03:35.908788,4,https://www.pasadenastarnews.com/wp-content/uploads/migration/2016/201612/NEWS_161219676_AR_0_WXSZMVROQHNY.jpg?w=535,,ranelagh_bikes@gmail.com,+35374567890

echo "run this script (./bike-rental-supabase.sh) in one terminal"
echo "To publish, open another terminal, then:"
echo "mosquitto_pub -h 172.18.0.2 -t my-event-log/id/latitude/longtitude/shop_name/location_name/bike_availables/opening/rating/image_url/reviews/email/contact_number/ -m 1,53.32516015352174,-6.254500679725526,Ranelagh_bikes,Ranelagh,10,19:03:35.908788,4,https://www.pasadenastarnews.com/wp-content/uploads/migration/2016/201612/NEWS_161219676_AR_0_WXSZMVROQHNY.jpg?w=535,,ranelagh_bikes@gmail.com,+35374567890"
echo "check the first terminal and your database for results"