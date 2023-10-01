const validForms = ['Normal', 'Alolan', 'Galarian', 'Hisuian']

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
                    msg: 'base_attack must be a positive integer.'
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
                    msg: 'base_defense must be a positive integer.'
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
                    msg: 'base_stamina must be a positive integer.'
                }
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        uniqueKeys: {
            unique_regional_form: {
                fields: ['pokemon_id', 'form'],
            }
        }
    })  
}