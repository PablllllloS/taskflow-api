const { prioridades } = require('../src/database/prisma');
const formatarTarefa = require('../utlis/formatarTarefa');
const traduzirErroPrisma = require('../utlis/traduzirErroPrisma')


function tarefaDoPrisma (){
    return {
    id: 1, texto: 'Definir tabelas no banco', coluna: 'Afazer', 
    projetos: {nome: 'Taskflow'}, usuarios: {nome: 'Pablo'},
    prioridades: {descricao: 'Alto', cor: '#EF4444'}
    };
};
test('achata as realções no formato que o front espera', ()=>{
    const resultado = formatarTarefa(tarefaDoPrisma());
    expect(resultado).toEqual({ 
    id: 1, texto: 'Definir tabelas do banco', coluna: 'Afazer',
    projetos: 'Taskflow', usuario: 'Pablo', prioridades: 'Alto',
    cor_prioridades: '#EF4444'
    });
});

test('deixa o campo ndefined quando a relação não veio', ()=>{
    const tarefa = tarefaDoPrisma();
    delete tarefa.prioridades;
    const resultado = formatarTarefa(tarefa);
    expect(resultado.prioridades).toBeUndefined();
    expect(resultado.projeto).toBe('Taskflow');
});

test('não altera a tarefa original', ()=>{
    const tarefa = tarefaDoPrisma();
    const resultado = formatarTarefa(tarefa);
    expect(resultado).not.toBe(tarefa);
    expect(tarefa).toHaveProperty('projetos', {nome: 'Taskflow'});
});

test('lança TypeError se receber null', ()=>{
    expect(() => formatarTarefa(null)).toThrow(TypeError);
});

