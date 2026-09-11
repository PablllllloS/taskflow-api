const jwt = require('jsonwebtoken');
const usuarioModel = require('../usuarios/usuarios.models');

const authController = {
    login (req, res){
        const {email, senha} = req.body;

        if(!email || !senha){
            return res.status(400).json({erro: 'Email e senha são obrigatórios'});
        }
        const usuario = usuarioModel.buscarPorEmail(email);
        if(!usuario){
            return res.status(401).json({erro: 'Credenciais inválidas'});
        };
        if(usuario.senha !== senha){
            return res.status(401).json({erro: 'Credenciais inválidas'});
        }
        const token = jwt.sign(
            {id: usuario.id, nome: usuario.nome},
            process.env.JWT_SECRET,
            {expiresIn: '30min'}
        );
        res.json({
            token,
            usuario: {id: usuario.id, nome: usuario.nome},
        });
    },
};

module.exports = authController;