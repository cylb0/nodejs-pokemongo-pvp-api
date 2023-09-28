module.exports = (pokemons, regionalForms) => {
    return pokemons.filter(pokemon => regionalForms.includes(pokemon.form))
}