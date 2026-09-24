const tarefaModels = require('./tarefas.models');

const tarefasController = {
    listar(req, res) {
        const { coluna } = req.query;
        const resultado = coluna ? tarefaModels.listarPorColuna(coluna) : tarefaModels.listar();
        res.status(200).json(resultado);
    },

    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const tarefa = tarefaModels.buscar(id);
        if (!tarefa) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        res.status(200).json(tarefa);
    },

    criar(req, res) {
        const { texto, prioridade, coluna } = req.body;
        const usuarioId = req.usuario ? req.usuario.id : null;

        // 🛡️ REGRA DE NEGÓCIO: Máximo de 2 tarefas em 'andamento'
        if (coluna === 'andamento' && usuarioId) {
            const todasTarefas = tarefaModels.listar();
            const tarefasEmAndamento = todasTarefas.filter(t => t.usuarioId === usuarioId && t.coluna === 'andamento');
            
            if (tarefasEmAndamento.length >= 2) {
                return res.status(403).json({ 
                    erro: 'Limite atingido. Só é permitido ter no máximo 2 tarefas em andamento.' 
                });
            }
        }

        const novaTarefa = tarefaModels.adicionar({ texto, prioridade, coluna, usuarioId });
        res.status(201).json(novaTarefa);
    },

    editar(req, res) {
        const id = Number(req.params.id);
        const { texto, prioridade, coluna } = req.body;
        const usuarioId = req.usuario ? req.usuario.id : null;

        const tarefaAtual = tarefaModels.buscar(id);
    
        if (!tarefaAtual) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }

        // 🛡️ REGRA DE NEGÓCIO: Previne que o utilizador burle a regra através da edição
        if (coluna === 'andamento' && tarefaAtual.coluna !== 'andamento' && usuarioId) {
            const todasTarefas = tarefaModels.listar();
            const tarefasEmAndamento = todasTarefas.filter(t => t.usuarioId === usuarioId && t.coluna === 'andamento');
            
            if (tarefasEmAndamento.length >= 2) {
                return res.status(403).json({ 
                    erro: 'Limite atingido. Não pode mover mais tarefas para andamento (máximo de 2).' 
                });
            }
        }

        const tarefa = tarefaModels.editar({ id, texto, prioridade, coluna });
        res.json(tarefa);
    },

    deletar(req, res) {
        const id = Number(req.params.id);
        const tarefaDeletada = tarefaModels.deletar(id);

        if (!tarefaDeletada) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        res.json({ mensagem: 'Tarefa removida com sucesso' });
    }
};

module.exports = tarefasController;