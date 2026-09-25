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

app.get('/', (req, res) => res.json({api: "TaskFlow"}))
app.use('/auth', authRoutes);
app.use('/tarefas', autenticar, tarefasRoutes);
app.use('/usuarios', autenticar, usuarioRoutes);

app.use((req, res) => res.status(404).json({error: "rota não encontrada..."}))

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
module.exports = app;