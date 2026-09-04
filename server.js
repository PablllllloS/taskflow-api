const express = require('express');
const app = express();
// const tarefas = [{texto: 'estudar', prioridade: 'alta', id: 1,}]
const PORTA = 3000;
const tarefasRoutes = require('./src/tarefas/tarefas.routes');
const usuarioRoutes = require('./src/usuarios/usuarios.routes');


app.use(express.json()) // PARTE IMPORTANTE PARA QUE O GET - PUT - DELET - POST POSSAM FUNCIONAR

// PRODUÇÃO

app.use('/tarefas',tarefasRoutes);
app.use('/usuarios', usuarioRoutes);

//PRODUÇÃO

app.listen(PORTA, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
})