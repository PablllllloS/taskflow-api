const express = require('express');
const validar = require('../middleware/validar');
const schemas = require('../middleware/schemas');
const router =  express.Router();
const tarefasController = require('./tarefas.controllers');

router.get('/',tarefasController.listar);
router.post('/', validar(schemas.tarefa) ,tarefasController.criar);
router.put('/:id', validar(schemas.tarefa) ,tarefasController.editar);
router.delete('/:id', validar(schemas.tarefa) ,tarefasController.deletar);
// router.get('/estatisticas', tarefasController.estatisticas);
// router.get('/estatisticas/resumo', tarefasController.estatisticasResumo);
router.get('/:id', tarefasController.buscarPorId);

module.exports = router;