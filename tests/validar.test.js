const validar = require('../src/middleware/validar');
const schemas = require('../src/middleware/schemas');

function tarefaValida(){
    return{
        texto: 'Revisar o plano de teste',
        coluna: 'afazer',
        usuario_id: 1,
        projeto_id:1,
        prioridade_id:2
    }
}

function pegarErro(funcao){
    try{
        
        funcao();
    
    } catch(erro){

        return erro;

    }
}

describe('validar', ()=>{
    test('chama o next quando os dados estão certos', ()=>{
        const middleware = validar(schemas.tarefas);
        const req = {body: tarefaValida()};
        const next = jest.fn();
    
        middleware(req, {}, next);
        
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
    })

    test('sem body: 400 com um detalhe por campo obrigatório', ()=>{
        const middleware = validar(schemas.tarefa);
        const req = {};
        const next = jest.fn();

        const erro = pegarErro(()=> middleware(req, {}, next));

        expect(erro.status).toBe(400);
        expect(erro.message).toBe('Dados inválidos');
        expect(erro.detalhes).toEqual([
            "O campo 'texto' é obrigatório",
            "O campo 'coluna' é obrigatório",
            "O campo 'usuario_id' é obrigatório",
            "O campo 'projeto_id' é obrigatório",
            "O campo 'idprioridade' é obrigatório"
        ]);
        expect(next).not.toHaveBeenCalled();
    })
})
