# PokemongoAPI

PokemonGoAPI is a simple API allowing consumers to obtain pvp stats for each pokemon in the mobile game pokemon GO.

## How to use

### GET /api/pokemon_names.json - Retrieve all available pokemon names
You may retrieve every available Pokemon data by making a GET request to '/api/pokemon_names.json'. It returns a JSON response containing an array of pokemon records. Each pokemon record is represented as a JSON object containing its ID and names.
### Example of data :
```json
[
	{
		"pokemon_id": 1,
		"pokemon_name": "Bulbasaur",
		"pokemon_name_fr": "Bulbizarre"
	},
	{
		"pokemon_id": 2,
		"pokemon_name": "Ivysaur",
		"pokemon_name_fr": "Herbizarre"
	}
]
``` 

### GET /api/pokemon_stats.json - Retrieve all available pokemon stats
You may retrieve every available Pokemon stats by making a GET request to '/api/pokemon_stats.json'. It returns a JSON response containing JSON objects for each Pokemon. 
### Example of data :
```json
[
	{
		"pokemon_id": 1,
		"pokemon_name": "Bulbasaur",
		"pokemon_name_fr": "Bulbizarre",
		"from": "Normal",
		"base_attack": 118,
		"base_defense": 111,
		"base_stamina": 128
	},
	{
		"pokemon_id": 2,
		"pokemon_name": "Ivysaur",
		"pokemon_name_fr": "Herbizarre",
		"from": "Normal",
		"base_attack": 151,
		"base_defense": 143,
		"base_stamina": 155
	}
]
```

### GET /api/pokemon_evolutions.json - Retrieve every pokemon and their evolutions
You may retrieve every pokemon and their evolutions data by making a GET request to '/api/pokemon_evolutions.json'. It returns an array of JSON objects that contains data for every Pokemon.
### Example of data
```json
[
	...,
	{
		"pokemon_id": 133,
		"pokemon_name": "Eevee",
		"pokemon_name_fr": "Évoli",
		"form": "Normal",
		"evolutions": [
			{
				"pokemon_id": 134,
				"pokemon_name": "Vaporeon",
				"pokemon_name_fr": "Aquali",
				"form": "Normal"
			},
			{
				"pokemon_id": 135,
				"pokemon_name": "Jolteon",
				"pokemon_name_fr": "Voltali",
				"form": "Normal"
			},
			{
				"pokemon_id": 136,
				"pokemon_name": "Flareon",
				"pokemon_name_fr": "Pyroli",
				"form": "Normal"
			}
		]
	},
	...
]
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

Enjoy using this API and start exploring the world of Pokemon !