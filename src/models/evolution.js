module.exports = ( sequelize, DataTypes ) => {
    return sequelize.define('Evolution', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fromId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'forms',
                key: 'id'
            },
            validate: {
                isInt: { msg: 'fromId must be an integer.' },
                notNull: { msg: 'fromId is required.' },
                min: {
                    args: [1],
                    msg: 'fromId must be superior or equal to one.'
                }
            }
        },
        toId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'forms',
                key: 'id'
            },
            validate: {
                isInt: { msg: 'toid must be an integer.' },
                notNull: { msg: 'toId is required.' },
                min: {
                    args: [1],
                    msg: 'toId must be superior or equal to one.'
                }
            }
        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        uniqueKeys: {
            unique_from_to: {
                fields: ['fromId', 'toId'],
            }
        }
    })
}