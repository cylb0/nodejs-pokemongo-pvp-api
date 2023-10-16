const pokemons = [
    {
        "pokemon_id": 19,
        "pokemon_name": "Rattata"
    },
    {
        "pokemon_id": 20,
        "pokemon_name": "Raticate"
    },
    {
        "pokemon_id": 133,
        "pokemon_name": "Eevee"
    },
    {
        "pokemon_id": 134,
        "pokemon_name": "Vaporeon"
    },
    {
        "pokemon_id": 135,
        "pokemon_name": "Jolteon"
    },
    {
        "pokemon_id": 136,
        "pokemon_name": "Flareon"
    }
]

const forms = [
    {
        "pokemonId": 19,
        "form": "Normal",
        "base_attack": 103,
        "base_defense": 70,
        "base_stamina": 102
    },
    {
        "pokemonId": 19,
        "form": "Alolan",
        "base_attack": 103,
        "base_defense": 70,
        "base_stamina": 102
    },
    {
        "pokemonId": 20,
        "form": "Normal",
        "base_attack": 161,
        "base_defense": 139,
        "base_stamina": 146
    },
    {
        "pokemonId": 20,
        "form": "Alolan",
        "base_attack": 135,
        "base_defense": 154,
        "base_stamina": 181
    },
    {
        "pokemonId": 133,
        "form": "Normal",
        "base_attack": 104,
        "base_defense": 114,
        "base_stamina": 146
    },
    {
        "pokemonId": 134,
        "form": "Normal",
        "base_attack": 205,
        "base_defense": 161,
        "base_stamina": 277
    },
    {
        "pokemonId": 135,
        "form": "Normal",
        "base_attack": 232,
        "base_defense": 182,
        "base_stamina": 163
    },
    {
        "pokemonId": 136,
        "form": "Normal",
        "base_attack": 246,
        "base_defense": 179,
        "base_stamina": 163
    }
    
]

module.exports = { pokemons, forms }