# PokemongoAPI

PokemonGoAPI is a simple API allowing consumers to obtain pvp stats for each pokemon in the mobile game pokemon GO.

## How to use

### GET /api/pokemon - Retrieve all data
You may retrieve every available Pokemon data by making a GET request to '/api/pokemon'. It returns a JSON response containing a message and a data array of pokemon records. Each pokemon record is represented as a JSON object. 

### GET /api/pokemon?id=1 - Search by pokemon ID
You can search for a specific Pokemon using its ID using the 'id' query parameter.
Please note that when searching by ID, you may receive multiple results if the Pokemon has different available regional forms.
#### Example of data
```json
{
	"message": "1 pokemons found.",
	"data": [
		{
			"id": 1,
			"pokemon_id": 1,
			"name": "Bulbasaur",
			"form": "Normal",
			"base_attack": 118,
			"base_defense": 111,
			"base_stamina": 128,
			"created": "2023-10-03T00:52:52.000Z"
		}
	]
}
```

### GET /api/pokemon?name=saur - Search by name
You can search for a Pokemon by its name using the 'name' query parameter. Please note that you can use partial names.
Please also note that when searching by name, you may receive multiple results if the Pokemon has different available regional forms.
#### Example of data
```json
{
	"message": "3 pokemons found.",
	"data": [
		{
			"id": 1,
			"pokemon_id": 1,
			"name": "Bulbasaur",
			"form": "Normal",
			"base_attack": 118,
			"base_defense": 111,
			"base_stamina": 128,
			"created": "2023-10-02T21:11:02.000Z"
		},
		{
			"id": 2,
			"pokemon_id": 2,
			"name": "Ivysaur",
			"form": "Normal",
			"base_attack": 151,
			"base_defense": 143,
			"base_stamina": 155,
			"created": "2023-10-02T21:11:02.000Z"
		},
		{
			"id": 3,
			"pokemon_id": 3,
			"name": "Venusaur",
			"form": "Normal",
			"base_attack": 198,
			"base_defense": 189,
			"base_stamina": 190,
			"created": "2023-10-02T21:11:02.000Z"
		}
	]
}
```

### GET /api/pokemon?name=Raichu&form=Alolan - Search for specific regional form
If you're looking for a specific form of a Pokemon, you can provide a 'form' query parameter in addition to an ID or name.
Available regional forms only include 'Normal', 'Alola', 'Galarian', 'Hisuian'
Please note that some Pokemons only have a Normal form.
Please also note that you need to combine this query parameter with either 'id' or 'name' query parameter but not both.
#### Example of data
```json
{
	"message": "1 pokemons found.",
	"data": [
		{
			"id": 4,
			"pokemon_id": 26,
			"name": "Raichu",
			"form": "Alolan",
			"base_attack": 201,
			"base_defense": 154,
			"base_stamina": 155,
			"created": "2023-10-02T21:17:33.000Z"
		}
	]
}
```

### GET /api/available_pokemons - Get a list of every available pokemon
You can search for every unique available pokemon. It will return an JSON response containing an array of JSON objects representing pokemons.
#### Example of data
```json
{
	"message": "Available pokemons have been successfully retrieved.",
	"data": [
		{
			"pokemon_id": 1,
			"name": "Bulbasaur"
		},
		{
			"pokemon_id": 2,
			"name": "Ivysaur"
		},
		{
			"pokemon_id": 3,
			"name": "Venusaur"
		}
	]
}
``` 

## Authentication
Authentication is required for access to certain features like creating, updating or deleting data.

### POST /api/login - Obtaining an Authentication Token
Include your username and password in the request body as JSON

```json
{
  "username": "your_username",
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
To access protected endpoints, you need to include the obtained token in the Authorization header of your request.

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