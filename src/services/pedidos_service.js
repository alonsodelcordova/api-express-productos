const { Pedido, DetallePedido } = require('../models/pedido');

const getPedidos = async () => {
    return await Pedido.findAll();
}

const getPedido = async (id) => {
    return await Pedido.findByPk(id, {
        include: {
            model: DetallePedido,
            as: 'detalles'
        }
    });
}

const crearPedido = async (datos) => {
    try {
        const pedido = Pedido.build(datos);
        const respuesta = await Pedido.create(pedido);
        return {
            mensaje: 'Pedido agregado',
            data: respuesta,
            isSuccess: true
        }
    } catch (error) {
        var errors = error.errors.map(e => e.message);
        return {
            errors,
            isSuccess: false
        }
    }
}

module.exports = { getPedidos, getPedido, crearPedido };
