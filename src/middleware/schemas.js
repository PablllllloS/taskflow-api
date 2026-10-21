const schemas = {
    id:{
        id: {obrigatorio: true, tipo: 'inteiro'}
    },
    tarefa : {
        texto: { obrigatorio: true, tipo: 'string'},
        prioridade: { obrigatorio: false, tipo: 'number', enum: [1,2,3]},
        coluna: { obrigatorio: false, tipo: 'string', enum: ['afazer', 'andamento', 'concluido']},
        usuarioId: {obrigatorio: false, tipo: 'inteiro'},
        projetoId: {obrigatorio: true, tipo: 'inteiro'},
        idprioridade: {obrigatorio: false, tipo: 'inteiro'},
    },
    usuario: {
        nome: { obrigatorio: true, tipo: 'string', minLength: 3},
        email:{ obrigatorio: true, tipo: 'string', formato: 'email'},
        senha_hash: { obrigatorio: true, tipo: 'string', minLength: 6},
    },

    projeto: {
        nome: { obrigatorio: true, tipo: 'string'},
        descricao: { obrigatorio: false, tipo: 'string'}
    },
};
module.exports = schemas;