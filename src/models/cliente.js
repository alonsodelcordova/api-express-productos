const { Model, DataTypes } = require("sequelize");


class Cliente extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nombre: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                direccion: {
                    type: DataTypes.TEXT,
                },
                telefono: {
                    type: DataTypes.STRING(20),
                },
                fecha_creacion: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },{
                sequelize, modelName: "cliente"
            }
        )
    }
}

module.exports = { Cliente };