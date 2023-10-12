module.exports = ( sequelize, DataTypes ) => {
    const Evolution = sequelize.define('Evolution', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        from_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemons',
                key: 'id'
            }
        },
        to_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemons',
                key: 'id'
            }
        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        uniqueKeys: {
            unique_from_to: {
                fields: ['from_id', 'to_id'],
            }
        }
    })

    return Evolution
}