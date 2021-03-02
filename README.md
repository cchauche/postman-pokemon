# Postman Workshop Pokemon API
### This repo is designed to be used for a workshop to teach students how to use [Postman](https://www.postman.com/). 

## Before The Workshop
- Please sign up for an account at [Postman](https://www.postman.com/).
- Download and install the [Postman Desktop](https://www.postman.com/downloads/) app for your system.
  * *If you prefer not to download the app you may use Postman's web interface*
- Clone this repo to your local machine

## How to Run this Repo
1. From the repo's root directory enter the command:  
```
npm install
```
2. Once the installation has we have to initialize the JSON database file by running the command:  
```
npm run restoredb
```
2. Next start the server with the command:  
 ```
 npm run start-dev
 ```
3. This will start the repo using *nodemon* in debug mode so chromes dev-tools can be attached
4. You should see output on your command line informing you the URL that the server is running on. The default is ```http://localhost:3000```

# Postman Workshop
## Creating your first request
- Make a ```GET``` request to ```/api/pokemon``` and call it 'Get All Pokemon'
  * Add a query parameter called 'type' and use the value 'Psychic'.
## Make more requests
- Make a ```GET``` request to ```/api/pokemon/:number```
  * Notice how its different when you add a path variable
  * Send a request asking for pokemon number 1
- Make a ```DELETE``` request to ```/api/pokemon/:number```
- Make a ```POST``` request to ```/api/pokemon```
  * Add the following to the POST request body:  
  ``` JSON
  {
    "number": 1,
    "name": "Bulbasaur",
    "types": [
        "Grass",
        "Poison"
    ],
    "imageUrl": "http://vignette4.wikia.nocookie.net/nintendo/images/4/43/Bulbasaur.png/revision/latest?cb=20141002083518&path-prefix=en"
  }
  ```
- Make a ```PUT``` request to ```/api/pokemon/:number```
  * Add the following to the PUT request body:  
  ``` JSON
  {
    "name":"Knot-A-Mon",
    "types": ["Normal"],
  }
  ```
- Make a ```GET``` request to ```/api/reset```
  * This endpoint restores the pokemon database back to the original 151 pokemon.
## Adding shared authentication to your quests
### Update Server Code
1. Follow the instructions in ```server/apiKey.example.js``` to create an API key for your server.
2. In ```server/index.js``` uncomment line 23
3. The server should restart automatically.  You can test if the API key validation is working by sending one of your previously made requests.  They should get an error code with a message along the lines of *'Invalid API key!'*
## Using variables to hide sensitive formation
## Using different environments
## Creating tests
## Creating a mock server
