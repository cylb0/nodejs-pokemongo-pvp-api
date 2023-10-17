module.exports = ( sequelize, DataTypes ) => {
    return sequelize.define('Pokemon', {
        pokemon_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            validate: {
                isInt: { msg: 'pokemon_id field must be an int.' },
                min: { 
                    args: [1],
                    msg: 'pokemon_id field must be greater than or equal to 1.'
                }
            }
        },
        pokemon_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'pokemon_name field cannot be empty.' },
                notNull: { msg: 'pokemon_name field is required.' }
            },
            unique: {
                msg: 'This pokemon_name is already used.'
            }
        },
        pokemon_name_fr: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'pokemon_name_fr field cannot be empty.' },
                notNull: { msg: 'pokemon_name_fr field is required.' }
            },
            unique: {
                msg: 'This pokemon_name_fr is already used.'
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}