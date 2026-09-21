const projetoModel = require('../models/projetos.models');
const projetosController = {
    listar(req, res){
        res.status(200).json(projetoModel.listar());
    },
    buscarPorId(req, res){
        const p = projetoModel.buscar(parseInt(req.params.id));
        if(!p){
            return res.status(404).json({erro: "Projeto não encontrado"});
        }
        res.status(200).json({projeto: p});
    },
    criar(req, res){
        const {nome, descricao} = req.body;
        const novoProjeto = projetoModel.criar({nome, descricao});
        res.status(201).json(projetoModel.adicionar(req.body));
    },
    editar(req, res){
        const id = parseInt(req.params.id);
        const {nome, descricao} = req.body;
        const projetoAtualizado = projetoModel.editar(id, {nome, descricao});
        if(!projetoAtualizado){
            return res.status(404).json({erro: "Projeto não encontrado"});
        }
        res.status(200).json({mensagem: "Projeto editado com sucesso", projeto: projetoAtualizado});
    },
    deletar(req, res){
        const id = parseInt(req.params.id);
        const projetoDeletado = projetoModel.deletar(id);
        if(!projetoDeletado){
            return res.status(404).json({erro: "Projeto não encontrado"});
        }
        res.status(200).json({mensagem: "Projeto deletado com sucesso", projeto: projetoDeletado});
    }
}