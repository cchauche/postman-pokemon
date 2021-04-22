# Post-Mon Workshop

This repo is designed to be used in tandem with a workshop/live demo for students on how to use [Postman](https://www.postman.com/)

## Table of Contents

- [Requirements](#requirements)

- [What is Postman?](#what-is-postman?)

- [Start Local Pokemon Server](#start-local-pokemon-server)

- [Creating your first request](#creating-your-first-request)

- [Make more requests](#make-more-requests)

- [Adding shared authentication to your requests](#adding-shared-authentication-to-your-requests)

- [Using variables to hide sensitive information](#using-variables-to-hide-sensitive-information)

- [Using different environments](#using-different-environments)

- [Creating tests](#creating-tests)

- [Creating a mock server](#creating-a-mock-server)

- [More Exploration](#more-exploration)

- [API Reference](#api-reference)

## Requirements

- Please sign up for an account at [Postman](https://www.postman.com/)
- Download and install the [Postman Desktop](https://www.postman.com/downloads/) app for your system
  - _If you prefer not to download the app you may use Postman's web interface_
- Node v14.0.0 or greater

## What is Postman?

Postman is a tool designed to help test and build APIs. It has a ton of features but for our purposes we are most interested in Postman's tools for generating HTTP requests and displaying the result/response of those requests. Postman makes it easy to create a new request, assign it a Method (GET, POST etc.) and a URL then within seconds you can be sending an HTTP request and see a nicely formatted output of the response. Postman also supports adding all kinds of parameters and gives you an easy interface for modifying/adding/subtracting parameters.

### Why use Postman?

When you are working on a server or building out some kind of API its essential to be able to test out your routes quickly. Postman gives you simple interface to generate HTTP requests and test out your routes. It also saves the requests so you can easily come back to your old requests over and over again as your project develops.

It is also an easy and fast way to test out a new API that you may not have used before. Since there is no coding involved you can just open up a new request in Postman and start testing out the various endpoints of an API you aren't familiar with.

## Start Local Pokemon Server

This repo includes a simple server with a RESTful API that interacts with a database that contains the 151 original Pokemon. To practice using Postman we are going to create requests for this Pokemon API.

1. From the repo's root directory enter the command:

```
npm install
```

2. Next start the server with the command:

```
npm run start-dev
```

3. This will start the repo using _nodemon_ in debugger mode so Chrome's DevTools can be attached
4. You should see output on your command line informing you of the URL the server is running on. By default it is `http://localhost:3000`

Now lets start testing out our server with Postman!

## Creating your first request

In Postman

- Create a new workspace and call it 'Postman Pokemon'
- Create a new collection and call it 'Pokemon'
- Inside the 'Pokemon' collection add a new `GET` request to `/api/pokemon` and call it 'Get All Pokemon'. Don't forget to include the host `http://localhost:3000` in all your request URLs
  - After trying out the request add a query parameter called 'type' and use the value 'Psychic'
    > Keeping your requests organized in folders is a good idea because it can help simplify adding authentication and you might want to revisit some of your requests later.

## Make more requests

- Make a `GET` request to `/api/pokemon/:number`
  - Notice the different in adding a query parameters vs a path variable
  - Send a request asking for Pokemon number 1
- Make a new `DELETE` request to `/api/pokemon/:number`
  - Send a request to delete Pokemon number 1
- Make a new `POST` request to `/api/pokemon`
  - Add the following to the POST request body:
  ```JSON
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
  - Add the following to the PUT request body:
  ```JSON
  {
    "name":"Knot-A-Mon",
    "types": ["Normal"]
  }
  ```
- Make a new `GET` request to `/api/reset`
  - This endpoint restores the Pokemon database back to the original 151 Pokemon

## Adding shared authentication to your requests

- Update Server Code
  1. Follow the instructions in `server/apiKey.example.js` to create an API key for your server
  2. In `server/index.js` uncomment line 23 then save all your changes. The server should restart automatically since nodemon is watching the files
  3. You can test if the API key validation is working by sending one of your previously made requests. The request's response should have an error code with a message along the lines of _'Invalid API key!'_
- Add your API key to your existing `GET /api/pokemon` request
  - The server is looking for a header parameter key of 'api_key' and a value matching the string you entered in the `server/apiKey.js` file
  - You can add header parameters in the 'Headers' tab of a request
- Add authentication to the entire 'Pokemon' collection so you don't have to edit the API key in each request.
  - Select the 'Pokemon' collection and navigate to the 'Authorization' tab
  - In the 'Type' dropdown select 'API Key'
  - For the 'Key' field enter 'api_key'
  - For the 'Value' field enter your API Key
  - From the 'Add to' dropdown select 'Header'

## Using variables to hide sensitive information

- Instead of hard coding the api key use a global variable
  - Create a global variable and call it 'pmApiKey'
  - Navigate back to the 'Authorization' tab of the 'Pokemon' collection and replace the contents of the 'Value' field with `{{pmApiKey}}`
  - The double curly brackets is how you use variables in Postman

## Using different environments

- Change the host address of your `GET /api/pokemon` request to the deployed Pokemon API at https://gen1-pokemon.herokuapp.com (Ask me for the API key)
- Make a local environment with two variables 'host' and 'apiKey'
  - For 'host' use the host address of your local server - `http://localhost:3000`
  - For 'apiKey' use the API key you created for your server
- Refactor your requests to use the new variables
  - You can now use `{{host}}` instead of `http://localhost:3000` in your request URL
  - Don't forget to replace the authentication 'Value' field with your new environment variable `{{apiKey}}`
- Make a deployed environment with two variables 'host and 'apiKey'
  - Set the variables to suit the deployed server

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

# API Reference

Here you can find documentation for the Pokemon server. Note that the deployed version only supports two routes.

- [Local Pokemon API](#local-pokemon-api)

- [Deployed Pokemon API](#deployed-pokemon-api)

## Local Pokemon API

- [List All Pokemon](#list-all-Pokemon)

- [Get Pokemon By Number](#get-pokemon-by-number)

- [Create A New Pokemon](#create-a-new-pokemon)

- [Update A Pokemon](#update-a-pokemon)

- [Delete A Pokemon](#delete-a-pokemon)

- [Reset Pokemon Data](#reset-pokemon-data)

### List All Pokemon

`GET /api/pokemon` Retrieves a list of Pokemon

Parameters

| Parameters | Type   | In    | Description                                         |
| ---------- | ------ | ----- | --------------------------------------------------- |
| type       | string | query | Specify a Pokemon type ex "Psychic". Case sensitive |
|            |        |       |                                                     |

Response

`Status: 200 OK`

```JSON
[
  {
    "number": 1,
    "name": "Bulbasaur",
    "types": [
        "Grass",
        "Poison"
    ],
    "imageUrl": "http://exampleImage.com/bulbasaur"
  },
  {
    "number": 2,
    "name": "Ivysaur",
    "types": [
        "Grass",
        "Poison"
    ],
    "imageUrl": "http://exampleImage.com/ivysaur"
  },
  ...
]
```

### Get Pokemon By Number

`GET /api/pokemon/:number` Retrieves a list of Pokemon

Parameters

| Parameters | Type   | In   | Description                         |
| ---------- | ------ | ---- | ----------------------------------- |
| type       | number | path | Return Pokemon with matching number |
|            |        |      |                                     |

Response

`Status: 200 OK`

```JSON
{
  "number": 1,
  "name": "Bulbasaur",
  "types": [
      "Grass",
      "Poison"
  ],
  "imageUrl": "http://exampleImage.com/bulbasaur"
}
```

### Create A New Pokemon

`POST /api/pokemon` Create a new Pokemon

Parameters

| Parameters | Type     | In   | Description                          |
| ---------- | -------- | ---- | ------------------------------------ |
| number     | number   | body | Number for the new Pokemon           |
| name       | string   | body | Name for the new Pokemon             |
| types      | [string] | body | Array of types to assign new Pokemon |
| imageURL   | string   | body | URL for an image of the new Pokemon  |

Response

`Status: 201 CREATED`

```JSON
{
  "number": 201,
  "name": "Knot-A-Mon",
  "types": [
    "Grass",
    "Rock"
  ],
    "imageUrl": "http://exampleImage.com/knot-a-mon"
}

```

### Update A Pokemon

`PUT /api/pokemon/:number` Update the Pokemon with matching number

Parameters

| Parameters | Type     | In   | Description                                                       |
| ---------- | -------- | ---- | ----------------------------------------------------------------- |
| number     | number   | path | Number for the Pokemon to update                                  |
| name       | string   | body | [Optional] Updated name                                           |
| types      | [string] | body | [Optional] Array of types for update. Replaces all existing types |
| imageURL   | string   | body | [Optional] Updated URL for Pokemon image                          |

Response

`Status: 201 CREATED`

```JSON
{
  "number": 201,
  "name": "Knot-A-Mon",
  "types": [
    "Normal"
  ],
    "imageUrl": "http://exampleImage.com/knot-a-mon-updated"
}


```

### Delete A Pokemon

`DELETE /api/pokemon/:number` Deletes the Pokemon with matching number

Parameters

| Parameters | Type   | In   | Description                     |
| ---------- | ------ | ---- | ------------------------------- |
| type       | number | path | Number of the Pokemon to delete |

Response

`Status: 204 NO CONTENT`

### Reset Pokemon Data

`GET /api/reset` Reset the data in the database to the original 151 Pokemon

Parameters

No Parameters

Response

`Status: 204 NO CONTENT`

## Deployed Pokemon API

The API is deployed on a free tier account of Heroku, this means that the first time you try to send a request to the API it could take a while to respond while Heroku wakes up the service.

### URL

```
https://gen1-pokemon.herokuapp.com
```

### Authentication

API Key: `So5aVM3sYecOwHrjSp67sKUFDXtvVYF6`

Authentication should be added to the request header at the key `api_key`

### Routes

The deployed API only supports two routes

- [List All Pokemon](#list-all-Pokemon)

- [Get Pokemon By Number](#get-pokemon-by-number)
