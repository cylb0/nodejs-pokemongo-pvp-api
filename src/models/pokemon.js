module.exports = ( sequelize, DataTypes ) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            validate: {
                isInt: { msg: 'id field must be an int.' },
                min: { 
                    args: [1],
                    msg: 'id field must be greater than or equal to 1.'
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
        }
    }, 
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}