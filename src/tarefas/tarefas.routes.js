const express = require('express');
const validar = require('../middleware/validar');
const schemas = require('../middleware/schemas');
const router = express.Router();
const tarefasController = require('./tarefas.controllers');

router.get('/', tarefasController.listar);
router.get('/:id', tarefasController.buscarPorId);
router.post('/', validar(schemas.tarefa), tarefasController.criar);
router.put('/:id', validar(schemas.tarefa), tarefasController.editar);
router.delete('/:id', tarefasController.deletar);

module.exports = router;