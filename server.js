const express = require('express');
const app = express();
// const tarefas = [{texto: 'estudar', prioridade: 'alta', id: 1,}]
const PORTA = 3000;
const tarefasRoutes = require('./src/tarefas/tarefas.routes');


app.use(express.json()) // PARTE IMPORTANTE PARA QUE O GET - PUT - DELET - POST POSSAM FUNCIONAR

// PRODUÇÃO



//TAREFAS
app.use('/tarefas',tarefasRoutes);
//BUSCAR TAREFA POR ID
let tarefas = [
    {id: 1, texto: "Estudar Node", prioridade: "alta", coluna: "afazer"},
    {id: 2, texto: "Criar API's", prioridade: "alta", coluna: "andamento"},
    {id: 3, texto: "Testar Postman", prioridade: "media", coluna: "concluido"},
]
let usuarios = [{id: 1, nome: "admin", email: 'emaildasilvasantos@gmail.com', senha: 'senhaFraca1'}]
let proximoId = 4;
let proximoUsuario = 2;

app.get('/', (req, res) => {res.json({mensagem: 'Taskflow API funcionando'})});
app.get('/tarefas', (req, res) => res.json(tarefas));
app.get('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);

    if(!tarefa){
        return res.status(404).json({erro: 'Tarefa não encontrada'});
    }

    res.json(tarefa);
});

app.post('/tarefas', (req, res)=>{
    //req.body vai ter os dados enviados pela requisição, 
    //e então vai cair em cada uma dessas constantes, por conta de ter o mesmo nome

    const {texto, prioridade, coluna, cidade} = req.body;
    const novaTarefa = {
        id: proximoId++,
        coluna: coluna || 'afazer',
        cidade: cidade || '',
        prioridade: prioridade || 'media',
        texto: texto,
    };
    //está "empurrando" o objeto de nova tarefa para dentro de tarefa
    //lembrando CONSTANTE NÃO MUDA, mas os objetos/array dentro dele sim
    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa)
})

app.put('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const {texto, prioridade, couna, cidade} = req.body;

    const indice = tarefas.findIndex(t => t.id === id);
    //correndo um array para achar o index/posição do objeto selecionado para editar
    //e se não encontrar nenhum id, ou seja, sem index, vai voltar um early return como erro
    if(indice === -1){
        return res.status(404).json({erro: 'Tarefa não encontrada'});
    }

    //substituir a tarefa no array mantendo o mesmo id
    const tarefaAtualizada = {id, texto, prioridade, coluna, cidade};
    tarefas[indice] = tarefaAtualizada;

    //vai retornar a tarefa atualizada, no mesmo local, do mesmo id que estava antes
    res.json(tarefaAtualizada);
})

app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t=> t.id === id);
    if(!tarefa){
        return res.status(404).json({erro: 'Tarefa não encontrada'});
    };

    tarefas = tarefas.filter(t => t.id !== id);

    res.json({ mensagem: 'Tarefa removida com sucesso'})
});

//USUARIOS

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