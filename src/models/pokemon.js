module.exports = ( sequelize, DataTypes ) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pokemon_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        en_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fr_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        form: {
            type: DataTypes.STRING,
            allowNull: false
        },
        base_attack: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        base_defense: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        base_stamina: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}