const { Model, DataTypes } = require("sequelize");


class Pedido extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                fecha_pedido: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                total: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                estado: {
                    type: DataTypes.STRING(50),
                    defaultValue: 'pendiente',
                },
            },{
                sequelize, modelName: "pedido"
            }
        )
    }
}

class DetallePedido extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                cantidad: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                precio_unitario: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
            },{
                sequelize, modelName: "detalle_pedido"
            }
        )
    }
}


module.exports = { Pedido, DetallePedido };