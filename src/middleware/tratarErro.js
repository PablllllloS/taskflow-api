function tratarErro(erro, req, res, next){
    const status = erro.status || 500;
    console.error(`[ERRO] ${req.method} - ${req.url} - ${erro.message}`);
    
    const mensagem = status === 500 ? `Erro intero no servidor` : error.message

    res.status(status).json({erro: mensagem});
};

module.exports = tratarErro;