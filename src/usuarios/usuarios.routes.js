const express = require('express');
const router = express.Router();
const usuariosController = require('./usuarios.controllers');

router.get('/',usuariosController.listar);
router.post('/', usuariosController.criar);
router.put('/:id', usuariosController.editar);
router.delete('/:id', usuariosController.deletar);
router.get('/:id', usuariosController.usuarioPorId);

module.exports = router;