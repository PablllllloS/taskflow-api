const jwt = require('jsonwebtoken');
const usuarioModel = require('../usuarios/usuarios.models');
const {criarErro} = require('../../utlis/criarErro');

const authController = {
    async login (req, res){
        const {email, senha_hash} = req.body;

        if(!email || !senha_hash){
            throw criarErro(400, json({erro: 'Email e senha são obrigatórios'}));
        };
        const usuario = await usuarioModel.buscarPorEmail(email);
        
        if(!usuario){
            console.log(`Primeira condicional`);
            return res.status(401).json({erro: 'Credenciais inválidas'});
        };
        if(usuario.senha_hash !== senha_hash){
            console.log(`Segunda condicional`);
            return res.status(401).json({erro: 'Credenciais inválidas'});
        };
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