const usuarioModel = require('./usuarios.models');

const usuariosController = {
    listar(req, res) {
        res.status(200).json(usuarioModel.listar());
    },
    criar(req, res) {
        const { nome, email, senha, cargo } = req.body;
        const novoUsuario = usuarioModel.criar({ nome, email, senha, cargo });
        res.status(201).json({ mensagem: "Usuário criado com sucesso", usuario: novoUsuario });
    },
    usuarioPorId(req, res) {
        const id = Number(req.params.id);
        const usuario = usuarioModel.buscarPorId(id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.status(200).json({ usuario });
    },
    editar(req, res) {
        const id = Number(req.params.id);
        const usuarioAtualizado = usuarioModel.editar(id, req.body);
        if (!usuarioAtualizado) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.status(200).json({ mensagem: "Usuário editado com sucesso", usuario: usuarioAtualizado });
    },
    deletar(req, res) {
        const id = Number(req.params.id);
        const deletado = usuarioModel.deletar(id);
        if (!deletado) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.json({ mensagem: "Usuário deletado com sucesso" });
    }
};

module.exports = usuariosController;