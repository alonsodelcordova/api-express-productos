const { Model, DataTypes } = require("sequelize");


class Categoria extends Model {
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
                descripcion: {
                    type: DataTypes.TEXT,
                },
                fecha_creacion: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            { sequelize, modelName: "categorias" }
        );
    }
}

// Define User model
class Producto extends Model{

    static init(sequelize){
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
                descripcion: {
                    type: DataTypes.TEXT,
                },
                precio: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                imagen: {
                    type: DataTypes.STRING(255),
                },
                fecha_creacion: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                fecha_actualizacion: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },

            },
            { sequelize, modelName: "productos" }
        );
    }

}



module.exports = { Producto, Categoria };