const tarefaModels = require('./tarefas.models');
const {criarErro} = require('../../utlis/criarErro')

const tarefasController = {
    async listar(req, res) {
        const { coluna } = req.query;
        const resultado = coluna ? await tarefaModels.listarPorColuna(coluna) : await tarefaModels.listar();
        res.status(200).json(resultado);
    },

    async buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const tarefa = await tarefaModels.buscar(id);
        if (!tarefa) {
            throw criarErro(404, 'Tarefa não encontrada');
        }
        res.status(200).json(tarefa);
    },

    async criar(req, res) {
        const { texto, prioridade, projetoId, coluna } = req.body;
        const usuarioId = req.usuario ? req.usuario.id : null;

        if (coluna === 'andamento' && usuarioId) {
            const todasTarefas = await tarefaModels.listar();
            const tarefasEmAndamento = todasTarefas.filter(t => t.usuarioId === usuarioId && t.coluna === 'andamento');
            
            if (tarefasEmAndamento.length >= 2) {
                return res.status(401).json({ 
                    erro: 'Limite atingido. Só é permitido ter no máximo 2 tarefas em andamento.' 
                });
            }
        }

        const novaTarefa = await tarefaModels.adicionar({ texto, prioridade, coluna, usuarioId, projetoId });
        res.status(201).json(novaTarefa);
    },

    async editar(req, res) {
        const id = Number(req.params.id);
        const { texto, prioridade, coluna } = req.body;
        const usuarioId = req.usuario ? req.usuario.id : null;

        const tarefaAtual = await tarefaModels.buscar(id);
    
        if (!tarefaAtual) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }

        if (coluna === 'andamento' && tarefaAtual.coluna !== 'andamento' && usuarioId) {
            const todasTarefas = await tarefaModels.listar();
            const tarefasEmAndamento = todasTarefas.filter(t => t.usuarioId === usuarioId && t.coluna === 'andamento');
            
            if (tarefasEmAndamento.length >= 2) {
                return res.status(401).json({ 
                    //ver sobre o 403
                    erro: 'Limite atingido. Não pode mover mais tarefas para andamento (máximo de 2).' 
                });
            }
        }

        const tarefa = await tarefaModels.editar({ id, texto, prioridade, coluna });
        res.json(tarefa);
    },

    async deletar(req, res) {
        const id = Number(req.params.id);
        const tarefaDeletada = await tarefaModels.deletar(id);

        if (!tarefaDeletada) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        res.json({ mensagem: 'Tarefa removida com sucesso' });
    }
};

module.exports = tarefasController;