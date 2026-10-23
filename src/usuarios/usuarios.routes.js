const express = require('express');
const router = express.Router();
const validar = require('../middleware/validar');
const schemas = require('../middleware/schemas');
const usuariosController = require('./usuarios.controllers');
const idValido = validar(schemas.id, "params")

router.get('/',usuariosController.listar);
router.post('/', usuariosController.criar);
router.put('/:id', idValido, usuariosController.editar);
router.delete('/:id', idValido, usuariosController.deletar);
router.get('/:id', idValido, usuariosController.usuarioPorId);

module.exports = router;