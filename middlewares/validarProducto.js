const Producto = require('../models/Producto');

const validarProducto = async (req, res, next) => {
  const producto = await Producto.findOne({ nombre_producto: req.body.nombre_producto });

  if (producto) {
    res.status(400).json({
      message: "Producto ya registrado",
    });
  } else {
    next();
  }
};

module.exports = validarProducto;