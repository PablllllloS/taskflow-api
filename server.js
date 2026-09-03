const express = require('express');
const app = express();
// const tarefas = [{texto: 'estudar', prioridade: 'alta', id: 1,}]
const PORTA = 3000;
const tarefasRoutes = require('./src/tarefas/tarefas.routes');
const usuarioRoutes = require('./src/usuarios/usuarios.routes');


app.use(express.json()) // PARTE IMPORTANTE PARA QUE O GET - PUT - DELET - POST POSSAM FUNCIONAR

// PRODUÇÃO



//TAREFAS
app.use('/tarefas',tarefasRoutes);
app.use('/usuarios', usuarioRoutes);

//USUARIOS
let usuarios = [{id: 1, nome: "admin", email: 'emaildasilvasantos@gmail.com', senha: 'senhaFraca1'}]
let proximoUsuario = 2;
app.get('/usuarios', (req, res)=>{res.json(usuarios)});
app.get('/usuarios/:id', (req, res)=>{
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id );
    if(!usuario){
        return res.status(400).json({erro: 'Usuario não encontrado'});
    };
    res.json(usuario);
});

app.post('/usuarios/', (req, res) => {
    const {nome, email, senha} = req.body;
    const novoUsuario = {
        id: proximoUsuario++,
        email: email,
        senha: senha,
        nome: nome,
    }
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id',(req, res)=>{
    const id = Number(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    const {nome, email, senha} = req.body;
    if(index === -1){
        return res.status(404).json({erro: 'Tarefa não encontrada'});
    }
    const usuarioAtualizado = {id, nome, email, senha};
    usuarios[index] = usuarioAtualizado;

    res.json(usuarioAtualizado);
});
app.delete('/usuarios/:id', (req, res)=>{
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (!id) {
        return res.status(404).json({erro:'Usuário não encontrado'});        
    };
    usuarios = usuarios.filter(u => u.id !== id)
    res.status(200).json({mensagem: `Usuario retirado: ${id}`});
})
//PRODUÇÃO

app.listen(PORTA, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
})