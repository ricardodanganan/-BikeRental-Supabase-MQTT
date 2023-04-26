# Made by: Ricardo Danganan Jnr
# Made in: 23/04/2023
# Description: Parse JSON data from the API and print the number of bikes availables

import sys
import json

data = json.load(sys.stdin)

try:
    print(data[0]['bike_availables'])
except KeyError as e:
    print(f"KeyError: {e}")
    print(f"Data: {data}")

# how to use in the docker container
# docker exec -it <container_name> python3 parse_json_bikes.py < data.json
# alternatively, you can upload this file in your container and run it with 
# you can copy it with docker cp parse_json_bikes.py <dockerID>:.