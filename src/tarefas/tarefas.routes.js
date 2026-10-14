const express = require('express');
// const validar = require('../middleware/validar');
// const schemas = require('../middleware/schemas');
const router = express.Router();
const tarefasController = require('./tarefas.controllers');

router.get('/', tarefasController.listar);
router.get('/:id', tarefasController.buscarPorId);
// router.post('/', validar(schemas.tarefa), tarefasController.criar);
router.post('/', tarefasController.criar); //TESTE
//router.put('/:id', validar(schemas.tarefa), tarefasController.editar);
router.put('/:id', tarefasController.editar); //TESTE
router.delete('/:id', tarefasController.deletar);

module.exports = router;