const express = require('express');
// const validar = require('../middleware/validar');
// const schemas = require('../middleware/schemas');
const router = express.Router();
const idValido = validar(schemas.id, "params");
const tarefasController = require('./tarefas.controllers');

router.get('/', tarefasController.listar);
router.get('/:id', idValido, tarefasController.buscarPorId);
// router.post('/', validar(schemas.tarefa), tarefasController.criar);
router.post('/', tarefasController.criar); //TESTE
//router.put('/:id', idValido, validar(schemas.tarefa), tarefasController.editar);
router.put('/:id', idValido, tarefasController.editar); //TESTE
router.delete('/:id', idValido, tarefasController.deletar);

module.exports = router;