const usuarioModel = require('./usuarios.models');

const usuariosController = {
   async listar(req, res) {
        res.status(200).json(await usuarioModel.listar());
    },
   async criar(req, res) {
        const { nome, email, senha, cargo } = req.body;
        const novoUsuario = await usuarioModel.criar({ nome, email, senha, cargo });
        res.status(201).json({ mensagem: "Usuário criado com sucesso", usuario: novoUsuario });
    },
    async usuarioPorId(req, res) {
        const id = Number(req.params.id);
        const usuario = await usuarioModel.buscarPorId(id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.status(200).json({ usuario });
    },
    async editar(req, res) {
        const id = Number(req.params.id);
        const usuarioAtualizado = await usuarioModel.editar(id, req.body);
        if (!usuarioAtualizado) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.status(200).json({ mensagem: "Usuário editado com sucesso", usuario: usuarioAtualizado });
    },
    async deletar(req, res) {
        const id = Number(req.params.id);
        const deletado = await usuarioModel.deletar(id);
        if (!deletado) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.json({ mensagem: "Usuário deletado com sucesso" });
    }
};

module.exports = usuariosController;