module.exports = ( sequelize, DataTypes ) => {
    return sequelize.define('Pokemon', {
        pokemon_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            validate: {
                isInt: { msg: 'The #ID field must be an int.' },
                min: { 
                    args: [1],
                    msg: 'The #ID field must be greater than or equal to 1.'
                }
            }
        },
        pokemon_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Pokemon name field cannot be empty.' },
                notNull: { msg: 'Pokemon name field is required.' }
            },
            unique: {
                msg: 'This pokemon name is already used.'
            }
        },
        pokemon_name_fr: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'French pokemon name field cannot be empty.' },
                notNull: { msg: 'French pokemon name field is required.' }
            },
            unique: {
                msg: 'This french pokemon name is already used.'
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}