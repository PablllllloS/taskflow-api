const criarErro = require('./criarErro');
function traduzirErroPrisma(erro, metodo) {
    if (erro.code === 'P2002') {
        const campo = erro.meta.target[0];
        return criarErro(409, 'Já existe um registro com esse valor',
            [`valor repetido em: ${campo}`]);
    };
    if (erro.code === 'P2003') {
        if (metodo === 'DELETE') return criarErro(409,
            'Não é possível excluir: existem registros ligados a este');
        return criarErro(400, 'Um dos ids informados não existe');
    };
    if (erro.code === 'P2025') {

        return criarErro(404, 'Registro não encontrado');

    };

    return erro;
};
module.exports = traduzirErroPrisma;