const { Router } = require("express");
const { getUsers, createUser, deleteUser } = require("../services/users_service");
const router = Router();

router.get("/", async (req, res) => {
  const data = await getUsers();
  res.json({
    mensaje: "Exito",
    data,
  });
});

router.post("/", async (req, res) => {
  var datos = req.body;
  const respuesta = await createUser(datos);
  if (respuesta.isSuccess) {
    res.json(respuesta);
  } else {
    res.status(400).json(respuesta);
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  if(!id && id != ''){
    res.status(400).json({ mensaje: "Id no valido" });
  }
  const respuesta = await deleteUser(req.params.id);
  res.json(respuesta);
});

module.exports = router;
