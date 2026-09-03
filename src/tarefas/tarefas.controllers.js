let listaTarefas = [
    {id: 1, texto: "Estudar Node", prioridade: "alta", coluna: "afazer"},
    {id: 2, texto: "Criar API's", prioridade: "alta", coluna: "andamento"},
    {id: 3, texto: "Testar Postman", prioridade: "media", coluna: "concluido"},
    {id: 4, texto: "Testar API", prioridade: "alta", coluna: "andamento"},
]
let proximoId = 5;

const tarefasController = {
    listar (req, res){
        res.status(200).json(listaTarefas);
    },
    buscarPorId (req, res){
        const id = parseInt(req.params.id);
        const tarefa = listaTarefas.find(t => t.id === id);
        if (!tarefa){
            return res.status(404).json({erro:'Tarefa não encontrada'});
        };
        res.status(200).json(tarefa)
    },
    criar (req, res){
        const {texto, prioridade, coluna } = req.body;
        const novaTarefa = {
            id: proximoId++,
            texto: texto,
            prioridade: prioridade,
            coluna: coluna,
        };
        listaTarefas.push(novaTarefa);
        res.status(201).json(novaTarefa);
    },



    editar(req, res){
        const id = Number(req.params.id);
        const {texto, prioridade, coluna } = req.body;
        const indx = listaTarefas.findIndex(l => l.id === id);
        if(indx === -1){
            return res.status(404).json({erro: "Tarefa não encontrado"});
        };
        const tarefaAtualizada = {id, texto, prioridade, coluna};
        listaTarefas[indx] = tarefaAtualizada;
        res.json(tarefaAtualizada);
    },



    deletar(req, res){
        const id = Number(req.params.id);
        const tarefa = listaTarefas.find(l => l.id === id);
        if(!tarefa){
            return res.status(404).json({erro: 'Tarefa não encontrada'})
        };
        listaTarefas = listaTarefas.filter(l => l.id !== id);
        res.json('Tarefa removida com sucesso');
    },
}

module.exports = tarefasController;