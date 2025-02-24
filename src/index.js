const express = require("express");
const morgan = require("morgan");
const fileUpload = require('express-fileupload'); 
const { crearInstanceSequelize } = require("./db/db");
const cors = require('cors')


function inicio(port) {
    
    const app = express();
    //Configuraciones
    app.set("port", port);
    app.set("json spaces", 2);

    //Middleware
    app.use(morgan("dev"));
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(fileUpload()); //para subir archivos

   //Database
    crearInstanceSequelize();

    //Routes
    app.use('/', require("./routes/index"));
    app.use('/users',require("./routes/user_route"));
    app.use('/productos',require("./routes/producto_route"));
    app.use('/pedidos',require("./routes/pedido_route"));

    app.use('/public', express.static(__dirname + '/public'));  
    app.use(express.static(__dirname + '/public')); 
    return app;
}
module.exports = { inicio };