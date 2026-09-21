let usuarios = [
    {id: 1, nome: 'João', email: 'joao@gmail.com', senha: '123456'},
    {id: 2, nome: 'Maria', email: 'maria@gmail.com', senha: '654321'},
    {id: 3, nome: 'admin', email: 'admin@gmail.com', senha: "1234"},
];

module.exports = { 
    listar: () => usuarios,
    buscarPorEmail: (email) => {
        return usuarios.find(usuario => usuario.email === email);
    }
};