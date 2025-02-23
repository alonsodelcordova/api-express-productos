const { Model, DataTypes } = require("sequelize");


class Inventario extends Model {
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
                fecha_actualizacion: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },{
                sequelize, modelName: "inventario"
            }
        )
    }
}

module.exports = { Inventario };