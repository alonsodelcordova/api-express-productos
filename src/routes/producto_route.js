const { Router } = require("express");
const { getProductos, crearProducto, saveImagenProducto, getCategorias, saveCategoria } = require("../services/productos_service");

const router = Router();


//---------- CATEGORIA -----------------------------
router.get('/categoria', async (req,res)=>{
  const data = await getCategorias();
  res.json({
    mensaje: 'Exito',
    data
  })
});


router.post("/categoria", async (req, res) => {
  var datos = req.body;
  const respuesta = await saveCategoria(datos);
  if (respuesta.isSuccess) {
    res.json(respuesta);
  } else {
    res.status(400).json(respuesta);
  }
});


//---------- PRODUCTO ------------------------------
router.get("/", (req, res) => {
  const data = getProductos();
  res.json({
    mensaje: "Exito",
    data,
  });
});


router.post("/", async (req, res) => {
  var datos = req.body;
  const respuesta = await crearProducto(datos);
  if (respuesta.isSuccess) {
    res.json(respuesta);
  } else {
    res.status(400).json(respuesta);
  }
});

router.post("/imagen/:id", async (req, res) => {
  const id = req.params.id;

  if (req.files && Object.keys(req.files).length !== 0) {
    const imagen = req.files.imagen
    console.log("nombre:"+imagen.name);
    imagen.mv(__dirname + `/public/images/${id}.jpg`, function(err) {
      if (err) {
        console.log(err);
      }
    });
    /*const respuesta = await saveImagenProducto(id, imagen);
    if (respuesta.isSuccess) {
      res.json(respuesta);
    } else {
      res.status(400).json(respuesta);
    }*/
    res.json({
      mensaje: "Imagen guardada",
      msg: imagen.name
    })
  } else {
    res.status(400).json({
      mensaje: "No se ha enviado ninguna imagen",
      isSuccess: false,
    });
  }
 
  /*const respuesta = await saveImagenProducto(id, imagen);
  if (respuesta.isSuccess) {
    res.json(respuesta);
  } else {
    res.status(400).json(respuesta);
  }*/
});


module.exports = router;