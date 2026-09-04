const tarefaModels = require('./tarefas.models')

const tarefasController = {
    listar (req, res){
        const {coluna} = req.query;
        const resultado = coluna ? tarefaModels.listarPorColuna(coluna):tarefaModels.listar();
        res.status(200).json(resultado);
    },
    buscarPorId (req, res){
        const id = parseInt(req.params.id);
        const tarefa = tarefaModels.buscar(id);
        if (!tarefa){
            return res.status(404).json({erro:'Tarefa não encontrada'});
        };
        res.status(200).json(tarefa)
    },
    criar (req, res){
        const {texto, prioridade, coluna } = req.body;
        const novaTarefa = tarefaModels.adicionar({texto, prioridade, coluna});
        res.status(201).json(novaTarefa);
    },

    editar(req, res){
        const id = Number(req.params.id);
        const {texto, prioridade, coluna } = req.body;
        const tarefa = tarefaModels.editar({id, texto, prioridade, coluna});
        res.json(tarefa);
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