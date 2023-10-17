const validForms = ['Normal', 'Alolan', 'Galarian', 'Hisuian', 'Mega']

module.exports = ( sequelize, DataTypes ) => {
    return sequelize.define('Form', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pokemonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemons',
                key: 'pokemon_id'
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
        },
    }, 
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        uniqueKeys: {
            unique_regional_form: {
                fields: ['pokemonId', 'form'],
            }   
        }
    })
}