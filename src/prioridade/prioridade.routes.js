const express = require('express');
const router = express.Router();
const prioridadeController = require('./prioridade.controllers');

router.get('/', prioridadeController.listar);
router.get('/:id', prioridadeController.buscarPorId);