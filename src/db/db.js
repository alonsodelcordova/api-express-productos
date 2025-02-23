const { Sequelize, Model, DataTypes } = require("sequelize");
const { User, Token } = require("../models/users");
const { Producto, Categoria } = require("../models/productos");
const { Cliente } = require("../models/cliente");
const { Inventario } = require("../models/inventario");
const { DetallePedido, Pedido } = require("../models/pedido");

DB_URL = "./src/db/database.sqlite";

const crearInstanceSequelize = () => {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: DB_URL,
  });

  //conection
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  // Initialize models
  User.init(sequelize);
  Token.init(sequelize);
  Categoria.init(sequelize);
  Producto.init(sequelize);
  Cliente.init(sequelize);
  Inventario.init(sequelize);
  DetallePedido.init(sequelize);
  Pedido.init(sequelize);


  // Relacion : Token  -> User
  Token.belongsTo(User, {foreignKey: "user_id"})
  User.hasMany(Token, {foreignKey: 'user_id'})

  // Relación: Producto -> Categoría
  Producto.belongsTo(Categoria, { foreignKey: "categoria_id" });
  Categoria.hasMany(Producto, { foreignKey: "categoria_id" });

  // Relación: Inventario -> Producto
  Inventario.belongsTo(Producto, { foreignKey: "producto_id" });
  Producto.hasOne(Inventario, { foreignKey: "producto_id" });

  // Relación: Pedido -> Cliente
  Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });
  Cliente.hasMany(Pedido, { foreignKey: "cliente_id" });

  // Relación: DetallePedido -> Pedido
  DetallePedido.belongsTo(Pedido, { foreignKey: "pedido_id" });
  Pedido.hasMany(DetallePedido, { foreignKey: "pedido_id" });

  // Relación: DetallePedido -> Producto
  DetallePedido.belongsTo(Producto, { foreignKey: "producto_id" });
  Producto.hasMany(DetallePedido, { foreignKey: "producto_id" });

  // Sync models with database
  sequelize
    //.sync({ force: true }) // `force: true` elimina y recrea las tablas
    .sync()
    .then(() => {
      console.log("Tablas creadas correctamente.");
    })
    .catch((error) => {
      console.error("Error al crear las tablas:", error);
    });

  return sequelize;
};

module.exports = { User, Token, crearInstanceSequelize };
