const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const validarProducto  = require('../middlewares/validarProducto');
const { check } = require("express-validator");


router.get("/", productosController.verProductos);

router.get("/buscar", productosController.verProductoPorNombre)

router.post(
    "/registro", 
    [
        check("cod")
            .not()
            .isEmpty()
            .withMessage("El código es obligatorio")
            .isNumeric()
            .withMessage("Debe ser solo numérico"),
        check("nombre_producto")
          .not()
          .isEmpty()
          .withMessage("El nombre del Producto es obligatorio"),
        check("tipo")
            .not()
            .isEmpty()
            .withMessage("El tipo de Producto es obligatorio"),
        check("marca")
            .not()
            .isEmpty()
            .withMessage("La marca del Producto es obligatoria"),
        check("precio")
            .not()
            .isEmpty()
            .withMessage("El precio es obligatorio")
            .isNumeric()
            .withMessage("Debe ser solo numérico"),
        check("stock")
            .not()
            .isEmpty()
            .withMessage("El número de stock es obligatorio")
            .isNumeric()
            .withMessage("Debe ser solo numérico"),
      ],
      validarProducto,
    productosController.crearProducto);


router.put("/actualizar/:id", productosController.actualizarProducto);

router.delete("/eliminar/:id", productosController.eliminarProducto)

router.get("/:id", productosController.verProductoPorId);


module.exports = router;