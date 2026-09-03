const express = require('express');
const router =  express.Router();
const tarefasController = require('./tarefas.controllers');

router.get('/', tarefasController.listar);
router.post('/', tarefasController.criar);
router.put('/:id', tarefasController.editar);
router.delete('/:id', tarefasController.deletar);
// router.get('/estatisticas', tarefasController.estatisticas);
// router.get('/estatisticas/resumo', tarefasController.estatisticasResumo);
router.get('/:id', tarefasController.buscarPorId);

module.exports = router;