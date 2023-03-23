const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  cod: {
    type: Number,
    required: true,
    unique: true
  },
  nombre_producto: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;