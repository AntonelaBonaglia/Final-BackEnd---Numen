const axios = require("axios");
const { validationResult } = require("express-validator");
const Producto = require("../models/Producto");




const verProductos = async (req, res) => {
  const productos = await Producto.find();
  res.status(200).json(productos);
};



const verProductoPorId = async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  res
    .status(200)
    .json({ producto, message: "Este es un producto de nuestro catálogo." });
};


const verProductoPorNombre = async (req, res) => {
  const producto = await Producto.findOne({
    nombre_producto: req.query.producto,
  });
  res
    .status(200)
    .json({
      producto,
      message: `Se encontro el producto en nuestra tienda.`,
    });
};



const crearProducto = async (req, res) => {
  try {
    const validarError = validationResult(req);

    if (validarError.isEmpty()) {
      const producto = new Producto(req.body);
      await producto.save();
      res.status(201).json({
        nombre_producto: producto.nombre_producto,
        message: "Se agrego un nuevo Producto a la tienda.",
        error: null,
      });
    } else {
      res.status(400).json({
        nombre_producto: null,
        message: "Los datos ingresados son incorrectos.",
        error: validarError.errors,
      }); 
    }
  }catch (error) {
    res.status(500).json({
      nombre_producto: req.body.nombre_producto,
      message: "Error -" + error.message,
    });
  }
};


const actualizarProducto = async(req, res) =>{
  try{
    const validarError = validationResult(req);

    if(validarError.isEmpty()){
      const id = req.params.id;
      const producto = await Producto.findByIdAndUpdate(id, req.body);
   
      if(producto){
        res.status(200).json({
          nombre_producto: req.body.nombre_producto,
          message: `El producto ${nombre_producto} se ha actualizado correctamente.`,
        });
      } else{
        res.status(404).json({
          nombre_producto: null,
          message: `No se encontro el id ingresado: ${id} en la tienda.`
        });
      }     
    }else{
      res.status(400).json({
        nombre_producto: null,
        message: 'Los datos son incorrectos',
        error: validarError.errors
      })
    }
  }catch(error){
    res
      .status(500)
      .json({
        nombre_producto: req.body.nombre_producto,
        message: `Error: ${error.message}`
      })
  };
};

const eliminarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await Producto.findByIdAndDelete(id);
    if (producto) {
      res.status(200).json({
        nombre_producto: req.body.nombre_producto,
        message: "El producto ha sido eliminado correctamente",
      });
    } else {
      res.status(404).json({
        nombre_producto: null,
        message: "El id no es válido",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ 
        nombre_producto: req.body.nombre_producto, 
        message: "Error - " + error.message });
  }
};



module.exports = {
  crearProducto,
  verProductos,
  verProductoPorId,
  verProductoPorNombre,
  actualizarProducto,
  eliminarProducto
};
