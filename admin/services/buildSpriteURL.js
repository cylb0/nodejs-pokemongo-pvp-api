export default function buildSpriteURL(pokemon) {
    if (pokemon.form === 'Alolan') {
        pokemon.form = 'Alola'
    }
    const base = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm';
    const isMega = pokemon.mega_name;
    const form = pokemon.form !== 'Normal' ? (isMega ? `_${pokemon.form}` : `.f${pokemon.form.toUpperCase()}`) : '';
    return `${base}${pokemon.pokemon_id}${isMega ? '.fMEGA' : ''}${form}.icon.png`;
}