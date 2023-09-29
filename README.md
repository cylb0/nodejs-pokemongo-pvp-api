# PokemongoAPI BY GRETABELIKE

PokemonGoAPI is a simple API allowing consumers to obtain pvp stats for each pokemon in the mobile game pokemon GO.

## How to use

### Getting all data
You may retrieve every available Pokemon by making a GET request to '/api/pokemon'.

### Searching pokemons by ID
You can search for a specific Pokemon using its ID using the 'id' query parameter.
Please note that when searching by ID, you may receive multiple results if the Pokemon has different available regional forms. 
#### Example
For the famous Pikachu which has id #25, make a GET request to '/api/pokemon?id=25'.

### Searching pokemons by names
You can search for a Pokemon by its name using the 'name' query parameter.
Please note that when searching by name, you may receive multiple results if the Pokemon has different available regional forms. 
#### Example
For Pikachu, make a GET request to '/api/pokemon?name=Pikachu'.

### Searching pokemons by regional forms
If you're looking for a specific form of a Pokemon, you can provide a 'form' query parameter.
Available regional forms only include 'Normal', 'Alola', 'Galarian', 'Hisuian'
Please note that some Pokemons only have a Normal form.
Please also note that you need to combine this query parameter with either 'id' or 'name' query parameter but not both.
#### Example
For Raichu which has id #26, make a GET request to '/api/pokemon?id=26&form=Alola'.

## Error handling
- If you provide an invalid or negative ID, you will receive a 404 error with a message explaining the issue.
- If you provide both 'id' and 'name' query parameters, you will receive a 400 error with a message instructing to provide either one.
- If you search for a Pokemon providing an invalid 'form' query parameter, you will receive a 404 error with a message listing valid forms.

Enjoy using this API and start exploring the world of Pokemon !