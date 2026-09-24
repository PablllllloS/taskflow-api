let usuarios = [
    { id: 1, nome: 'João', email: 'joao@gmail.com', senha: '123456', cargo: 'Dev' },
    { id: 2, nome: 'Maria', email: 'maria@gmail.com', senha: '654321', cargo: 'Design' },
    { id: 3, nome: 'admin', email: 'admin@gmail.com', senha: '1234', cargo: 'Admin' }
];

let proximoId = 4;

module.exports = {
    listar: () => usuarios,
    buscarPorId: (id) => usuarios.find(u => u.id === id),
    buscarPorEmail: (email) => usuarios.find(usuario => usuario.email === email),
    criar: ({ nome, email, senha, cargo }) => {
        const novo = { id: proximoId++, nome, email, senha, cargo };
        usuarios.push(novo);
        return novo;
    },
    editar: (id, dados) => {
        const idx = usuarios.findIndex(u => u.id === id);
        if (idx === -1) return null;
        usuarios[idx] = { ...usuarios[idx], ...dados };
        return usuarios[idx];
    },
    deletar: (id) => {
        const idx = usuarios.findIndex(u => u.id === id);
        if (idx === -1) return false;
        usuarios.splice(idx, 1);
        return true;
    }
};