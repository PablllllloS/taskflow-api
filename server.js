require('dotenv').config();
const express = require('express');
const app = express();
const PORTA = process.env.PORTA || 3000;

const authRoutes = require('./src/auth/auth.routes');
const tarefasRoutes = require('./src/tarefas/tarefas.routes');
const usuarioRoutes = require('./src/usuarios/usuarios.routes');

const logger = require('./src/middleware/logger');
const autenticar = require('./src/middleware/autenticar');
const corsMiddleware = require('./src/middleware/cors');
const validarContentType = require('./src/middleware/validarContentType');

app.use(corsMiddleware);
app.use(express.json());
app.use(validarContentType);
app.use(logger);

// Rotas
app.use('/auth', authRoutes);
app.use('/tarefas', autenticar, tarefasRoutes);
app.use('/usuarios', autenticar, usuarioRoutes);

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});