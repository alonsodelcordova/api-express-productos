const { User, Token } = require("../models/users");
const crypto = require("crypto");


function encriptarPassword(password) {
  const hash256 = crypto.createHash("sha256");
  const newPass= hash256.update(password).digest("base64");
  return newPass;
}


function generarToken(username) {
  let user_key = username + Math.random().toString();
  return  crypto.createHash("sha256").update(user_key).digest("base64");
}

const getUsers = async () => {
  return await User.findAll();
};

const createUser = async (datos) => {
  try {
    const user = User.build(datos);
    user.set({
      password: encriptarPassword(user.password),
    })
    const respuesta = await user.save();
    return {
      mensaje: "Usuario agregado",
      data: respuesta,
      isSuccess: true,
    };
  } catch (error) {
    var errors = error.errors.map((e) => e.message);
    return {
      errors,
      isSuccess: false,
    };
  }
};

//----------- login ------------------------------
const inciarSesion = async (username, password) => {
  const user = await User.findOne({
    where: {
      name: username
    },
  });
  if (!user) {
    return {
      mensaje: "Usuario no encontrado",
      isSuccess: false,
    };
  }
  const passwordDesencrypt = encriptarPassword(password);
  if (passwordDesencrypt != user.password) {
    return {
      mensaje: "Contraseña incorrecta",
      isSuccess: false
    };
  }

  var token = await Token.findOne({
    where: {
      user_id: user.id,
    },
  });
  if (!token) {
    token = await Token.create({
       token: generarToken(username),
      user_id: user.id,
    });
  }
  return {
    mensaje: "Bienvenido",
    isSuccess: true,
    token: token.token,
    username: user.name,
    email: user.email,
  };
};

//----------- logout ------------------------------
const cerrarSesion = async (tokenSRC) => {
  const token = await Token.findOne({
    where: {
      token: tokenSRC,
    },
  });
  if (!token) {
    return {
      mensaje: "Token no encontrado",
      isSuccess: false,
    };
  }
  await token.destroy();
  return {
    mensaje: "Sesión cerrada",
    isSuccess: true,
  };
};

const deleteUser = async (id) => {
  try{
    await User.destroy({
      where: {
        id: id,
      },
    });
    return {
      mensaje: "Usuario eliminado",
      isSuccess: true,
    }
  }catch(error){
    return {
      mensaje: "Usuario no encontrado",
      isSuccess: false
    }
  }
 
};

module.exports = {
  getUsers,
  createUser,
  inciarSesion,
  cerrarSesion,
  deleteUser
};
