const validForms = ['Normal', 'Alolan', 'Galarian', 'Hisuian']
const { Op, ValidationError } = require('sequelize');

module.exports = ( sequelize, DataTypes ) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pokemon_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `The pokemon_id must be an integer.` },
                notNull: { msg: `The pokemon_id is required.` },
                min: {
                    args: [1],
                    msg: `The pokemon_id must be a positive integer.`
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Name field cannot be empty.' },
                notNull: { msg: 'Name field is required.' }
            }
        },
        form: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isFormValid(value){
                    if(!value){
                        throw new Error('A pokemon needs a form.')
                    }
                    if (!validForms.includes(value)){
                        throw new Error(`Form is invalid, valid forms are ${validForms.join(', ')}`)
                    }
                }
            }
        },
        base_attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'base_attack must be an integer.' },
                notNull: { msg: 'base_attack is required.' },
                min: {
                    args: [1],
                    msg: 'base_attack must be superior or equal to one.'
                }
            }
        },
        base_defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'base_defense must be an integer.' },
                notNull: { msg: 'base_defense is required.' },
                min: {
                    args: [1],
                    msg: 'base_defense must be superior or equal to one.'
                }
            }
        },
        base_stamina: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'base_stamina must be an integer.' },
                notNull: { msg: 'base_stamina is required.' },
                min: {
                    args: [1],
                    msg: 'base_stamina must be superior or equal to one.'
                }
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        validate: {
            uniquePokemonIdForAName() {
                const Pokemon = this.sequelize.models.Pokemon
                return Pokemon.findAll({
                    where: {
                        [Op.or]: [
                            {
                                pokemon_id: this.pokemon_id,
                                name: { [Op.ne]: this.name }
                            },
                            {
                                name: this.name,
                                pokemon_id: { [Op.ne]: this.pokemon_id }
                            }
                        ]
                    }
                })
                    .then(pokemons => {
                        if (pokemons.some(pokemon => pokemon.pokemon_id === this.pokemon_id && pokemon.name !== this.name)) {
                            throw new Error('A pokemon already exists for this pokemon_id but it has a different name.')
                        } else if (pokemons.some(pokemon => pokemon.name === this.name && pokemon.pokemon_id !== this.pokemon_id)) {
                            throw new Error('A pokemon already exists for this name but it has a different pokemon_id.')
                        }
                    })
            }
        },
        uniqueKeys: {
            unique_regional_form: {
                fields: ['pokemon_id', 'form'],
            }
        }
    })  
}