const { Router } = require("express");
const { getPedidos, getPedido, crearPedido } = require("../services/pedidos_service");

const router = Router();

//---------- PEDIDO -----------------------------
router.get('/', async (req,res)=>{
  const data = await getPedidos();
  res.json({
    mensaje: 'Exito',
    data
  })
});

router.get('/:id', async (req,res)=>{
  const data = await getPedido(req.params.id);
  res.json({
    mensaje: 'Exito',
    data
  })
});

router.post("/", async (req, res) => {
  var datos = req.body;
  const respuesta = await crearPedido(datos);
  if (respuesta.isSuccess) {
    res.json(respuesta);
  } else {
    res.status(400).json(respuesta);
  }
});


module.exports = router;