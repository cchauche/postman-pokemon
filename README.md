# Post-Mon Workshop
### This repo is designed to be used for a workshop to teach students how to use [Postman](https://www.postman.com/)

## Before Starting
- Please sign up for an account at [Postman](https://www.postman.com/)
- Download and install the [Postman Desktop](https://www.postman.com/downloads/) app for your system
  * *If you prefer not to download the app you may use Postman's web interface*
- Clone this repo to your local machine

## How to Run this Repo
1. From the repo's root directory enter the command:  
```
npm install
```
2. Once the installation is complete we have to initialize the JSON database file by running the command:  
```
npm run restoredb
```
2. Next start the server with the command:  
 ```
 npm run start-dev
 ```
3. This will start the repo using *nodemon* in debug mode so chromes dev-tools can be attached
4. You should see output on your command line informing you of the URL the server is running on. By default it is `http://localhost:3000`

# Postman Workshop

[Creating your first request](#creating-your-first-request)

[Make more requests](#make-more-requests)

[Adding shared authentication to your requests](#adding-shared-authentication-to-your-requests)

[Using variables to hide sensitive information](#using-variables-to-hide-sensitive-information)

[Using different environments](#using-different-environments)

[Creating tests](#creating-tests)

[Creating a mock server](#creating-a-mock-server)

[More Exploration](#more-exploration)

## Creating your first request
- Create a new workspace and call it 'Postman Pokemon'
- Create a new collection and call it 'Pokemon'
- Inside the 'Pokemon' collection add a new `GET` request to `/api/pokemon` and call it 'Get All Pokemon'. Don't forget to include the host `http://localhost:3000` in all your request URLs
  * After trying out the request add a query parameter called 'type' and use the value 'Psychic'
## Make more requests
- Make a `GET` request to `/api/pokemon/:number`
  * Notice the different in adding a query parameters vs a path variable
  * Send a request asking for Pokemon number 1
- Make a new `DELETE` request to `/api/pokemon/:number`
  * Send a request to delete Pokemon number 1
- Make a new `POST` request to `/api/pokemon`
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
- Make a new `PUT` request to `/api/pokemon/:number`
  * Add the following to the PUT request body:  
  ``` JSON
  {
    "name":"Knot-A-Mon",
    "types": ["Normal"],
  }
  ```
- Make a new `GET` request to `/api/reset`
  * This endpoint restores the Pokemon database back to the original 151 Pokemon
## Adding shared authentication to your requests
- Update Server Code
  1. Follow the instructions in `server/apiKey.example.js` to create an API key for your server
  2. In `server/index.js` uncomment line 23 then save all your changes. The server should restart automatically since nodemon is watching the files
  3. You can test if the API key validation is working by sending one of your previously made requests.  The request's response should have an error code with a message along the lines of *'Invalid API key!'*
- Add your API key to your existing `GET /api/pokemon` request
  * The server is looking for a header parameter key of 'api_key' and a value matching the string you entered in the `server/apiKey.js` file
  * You can add header parameters in the 'Headers' tab of a request
- Add authentication to the entire 'Pokemon' collection so you don't have to edit the API key in each request.
  * Select the 'Pokemon' collection and navigate to the 'Authorization' tab
  * In the 'Type' dropdown select 'API Key'
  * For the 'Key' field enter 'api_key'
  * For the 'Value' field enter your API Key
  * From the 'Add to' dropdown select 'Header'

## Using variables to hide sensitive information
- Instead of hard coding the api key use a global variable
  * Create a global variable and call it 'pmApiKey'
  * Navigate back to the 'Authorization' tab of the 'Pokemon' collection and replace the contents of the 'Value' field with `{{pmApiKey}}`
  * The double curly brackets is how you use variables in Postman
## Using different environments
- Change the host address of your `GET /api/pokemon` request to the deployed Pokemon API at https://gen1-pokemon.herokuapp.com (Ask me for the API key)
- Make a local environment with two variables 'host' and 'apiKey'
  * For 'host' use the host address of your local server - `http://localhost:3000`
  * For 'apiKey' use the API key you created for your server
- Refactor your requests to use the new variables
  * You can now use `{{host}}` instead of `http://localhost:3000` in your request URL
  * Don't forget to replace the authentication 'Value' field with your new environment variable `{{apiKey}}`
- Make a deployed environment with two variables 'host and 'apiKey'
  * Set the variables to suit the deployed server
## Creating tests
- Switch back to your local environment in Postman
- Send a `GET /api/reset` request to restore the DB back to its original state
- In your `GET /api/pokemon` request add a test that confirms the response message is 200
- Add a second test that confirms the response is an array of length 151
## Creating a mock server
- In Postman create a new mock server in your Pokemon workspace
- Create a new environment called 'mock' with one variable 'host' which is the address of your new mock server.
- Make a new example response from your `GET /api/pokemon` request
- Change to the 'mock' environment and test if you get the example response

# More Exploration
- You can find the Postman workspace I made for this workshop [here](https://www.postman.com/altimetry-astronomer-34778570/workspace/public-postman-pokemon/overview)
- [Postman Learning Center](https://learning.postman.com/docs/getting-started/introduction/)
- [Postman Variables Quick Start](https://learning.postman.com/docs/sending-requests/variables/)
- [Postman Environment Quick Start](https://learning.postman.com/docs/sending-requests/managing-environments/)
- [Postman Writing Tests](https://learning.postman.com/docs/writing-scripts/test-scripts/)
