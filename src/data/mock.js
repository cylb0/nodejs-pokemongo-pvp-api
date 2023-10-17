const pokemons = [
    {
        "pokemon_id": 1,
        "pokemon_name": "Bulbasaur",
        "pokemon_name_fr": "Bulbizarre"
    },
    {
        "pokemon_id": 2,
        "pokemon_name": "Ivysaur",
        "pokemon_name_fr": "Herbizarre"
    },
    {
        "pokemon_id": 3,
        "pokemon_name": "Venusaur",
        "pokemon_name_fr": "Florizarre"
    }
]

const forms = [
    {
        "pokemonId": 1,
        "form": "Normal",
        "base_attack": 118,
        "base_defense": 111,
        "base_stamina": 128
    },
    {
        "pokemonId": 2,
        "form": "Normal",
        "base_attack": 151,
        "base_defense": 143,
        "base_stamina": 155
    },
    {
        "pokemonId": 3,
        "form": "Normal",
        "base_attack": 198,
        "base_defense": 189,
        "base_stamina": 190
    }  
]

module.exports = { pokemons, forms }