# PokemongoAPI

PokemonGoAPI is a simple API allowing consumers to obtain pvp stats for each pokemon in the mobile game pokemon GO.

## How to use

### GET /api/pokemon - Retrieve all data
You may retrieve every available Pokemon data by making a GET request to '/api/pokemon'. It returns a JSON response containing a message and a data array of pokemon records. Each pokemon record is represented as a JSON object. 

### GET /api/pokemon?id=26 - Search by pokemon ID
You can search for a specific Pokemon using its ID using the 'id' query parameter.
Please note that when searching by ID, you may receive multiple results if the Pokemon has different available regional forms.

### GET /api/pokemon?name=Raichu - Search by name
You can search for a Pokemon by its name using the 'name' query parameter.
Please note that when searching by name, you may receive multiple results if the Pokemon has different available regional forms.

### GET /api/pokemon?name=Raichu&form=Alolan - Search for specific regional form
If you're looking for a specific form of a Pokemon, you can provide a 'form' query parameter.
Available regional forms only include 'Normal', 'Alola', 'Galarian', 'Hisuian'
Please note that some Pokemons only have a Normal form.
Please also note that you need to combine this query parameter with either 'id' or 'name' query parameter but not both.

### GET /api/available_pokemons - Get a list of every available pokemon
You can search for every unique available pokemon. It will return an JSON response containing an array of JSON objects representing pokemons. 

## Authentication
Authentication is required for access to certain features like creating, updating or deleting data.

### POST /api/login - Obtaining an Authentication Token
Include your username and password in the request body as JSON

```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```
You will receive an authentication token in the response if login is successful.

```json
{
  "token": "your_token"
}
```

### Sending requests with authentication
To access protected endpoints, you need to include to obtained token in the Authorization header of your request.

```
Authorization: Bearer your_token
```

### POST /api/pokemon
Create a new pokemon

### POST /api/pokemon/:id
Update an existing pokemon

### DELETE /api/pokemon/:id
Delete an existing pokemon

## Error handling
- If you provide an invalid or negative ID, you will receive a 404 error with a message explaining the issue.
- If you provide both 'id' and 'name' query parameters, you will receive a 400 error with a message instructing to provide either one.
- If you search for a Pokemon providing an invalid 'form' query parameter, you will receive a 404 error with a message listing valid forms.

Enjoy using this API and start exploring the world of Pokemon !