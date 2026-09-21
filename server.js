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
app.use(express.json()) // PARTE IMPORTANTE PARA QUE O GET - PUT - DELET - POST POSSAM FUNCIONAR
app.use(validarContentType);
app.use(logger);

// PRODUÇÃO

app.use('/tarefas', autenticar, tarefasRoutes);
app.use('/usuarios', autenticar, usuarioRoutes);
app.use('/auth', authRoutes);

//PRODUÇÃO

app.prependOnceListener(PORTA, () => {
    console.log(`Servidor na porta ${PORTA}`);
})

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
})