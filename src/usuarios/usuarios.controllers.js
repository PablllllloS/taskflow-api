let listaUsuarios = [{id: 1,idade: 21, nome: "Pablo", cargo: "Estagiário"}]
let proximoUsuario = 2

const usuariosController = {
    listar(req, res){res.status(200).json(listaUsuarios)},
    criar(req, res){
        const {nome, cargo} = req.body;
        const novoUsuario = {
            id: proximoUsuario++,
            nome: nome,
            cargo: cargo,
        };
        listaUsuarios.push(novoUsuario)
        res.status(200).json({mensagem: "Novo usuario, criado com sucesso"});
    },
    usuarioPorId(req, res){
        const id = Number(req.params.id);
        const usuario = listaUsuarios.find(l => l.id === id)
        if(!usuario){
            return res.status(404).json({erro:"Usuario não encontrado"})
        }
        res.status(200).json({usuario});
    },
    editar(req, res){
        const id = Number(req.params.id)
        const {nome, cargo, idade} = req.body
        const indx = listaUsuarios.findIndex(l => l.id === id);
        if(indx === -1){
            return res.status(404).json({erro:"Usuario não encontrado"})
        }
        const usuarioAtualizado = {nome, cargo, idade};
        listaUsuarios[indx] = usuarioAtualizado;
        res.status(200).json({mensagem: "Usuario editado com sucesso"})
    },
    deletar(req, res){
        const id = Number(req.params.id);
        const usuario = listaUsuarios.find(l => l.id !== id);
        if(!usuario){
            return res.status(404).json({erro: "Usuario não encontrado"})
        };
        listaUsuarios = listaUsuarios.filter(l => l.id !== id);
        res.json({mensagem: "Usuario deletado"});
    }
}
module.exports = usuariosController