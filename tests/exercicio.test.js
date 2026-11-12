const formatarTarefa = require('../utlis/formatarTarefa');
const traduzirErroPrisma = require('../utlis/traduzirErroPrisma')
const criarErro = require('../utlis/criarErro');

describe('exercicio de testes', ()=>{
    test('criarErro - erro interno do servidor', ()=>{
        const erro = criarErro(500, 'Erro interno do servidor');
        expect(erro.status).toBe(500);
        expect(erro.detalhes).toBeUndefined()
    })

    test('metodo put com erro traduzido e mensagem', ()=>{
        const erroTraduzido = traduzirErroPrisma('P2003', 'PUT');
        const erro = criarErro();
        expect()
    })
})