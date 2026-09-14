require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORTA = process.env.PORTA || 3000;
const authRoutes = require('./src/auth/auth.routes');
const tarefasRoutes = require('./src/tarefas/tarefas.routes');
const usuarioRoutes = require('./src/usuarios/usuarios.routes');
const logger = require('./src/middleware/logger');
const autenticar = require('./src/middleware/autenticar');
// const corsMiddleware = require('./src/middleware/cors');
const validarContentType = require('./src/middleware/validarContentType');

// app.use(corsMiddleware);
app.use(express.json()) // PARTE IMPORTANTE PARA QUE O GET - PUT - DELET - POST POSSAM FUNCIONAR
app.use(validarContentType);
app.use(logger);

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://www.google.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
}));

app.prependOnceListener(PORTA, () => {
    console.log(`Servidor na porta ${PORTA}`);
})

// PRODUÇÃO
//testinho bb
app.use('/tarefas', autenticar, tarefasRoutes);
app.use('/usuarios', autenticar, usuarioRoutes);
app.use('/auth', autenticar, authRoutes);

//PRODUÇÃO

app.listen(PORTA, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
})