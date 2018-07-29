# Take Home Coding Test

## What next

There are a couple of areas where this needs to be improved.
- Implement tests for relevent areas
- Change the geocode services to return back standardised address information, perhaps implementing a better interface for the new return data as currently only the latitude and longitude are returned however structured data about the address as is documented would be better.
- I think that the project could be structured better, but I've tried to keep relevent information together. I'm not sure on the best practice for TypeScript, particularly where I should define interfaces.
- I have implemented the search term as a url parameter, I was and still am torn as to whether this should have been a query parameter instead. Probably.
- There is no validation on the incoming geojson data

### Implementation

`GET /v1/servicearea/{search_term}` Performing a GET request to the service area validates the provided search term and returns the search term plus the result if it is processed.

**Example A**
Invalid search parameter: Only accepts alphanumeric or spaces
`GET /v1/servicearea/ 422 Unprocessable Entity`
```json
{
    "status": "ERROR",
    "reason": "Invalid Search Term"
}
```


Valid search for the first line of an address
`GET /v1/servicearea/10%20downing%20street 200 OK`
```json
{
    "status": "OK",
    "search": "10 downing street",
    "location": {
        "lat": 51.5033635,
        "lng": -0.1276248,
        "serviceArea": "LONCENTRAL"
    }
}
```

Valid search but not matching service area or unable to find location
`GET /v1/servicearea/110%20sherwood%20cresent 404 Not Found`
```json
{
    "status": "NOT_FOUND",
    "search": "110 sherwood crescent"
}
```

