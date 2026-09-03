let tarefas = [
    {id: 1, texto: "Estudar NodeJs", prioridade: "alta", coluna: "andamento"},
    {id: 2, texto: "Aprender", prioridade: "media", coluna: "afazer"}
];
let proximoId = 3;

module.exports = {
    listar: () => tarefas,
    listarPorColuna: (coluna) => tarefas.filter (t => t.coluna === coluna),
    buscar: (id) => tarefas.find(t => t.id === id),
    adicionar: ({texto, prioridade, coluna}) => {
        const nova = { 
            id: proximoId++,
            coluna: coluna,
            prioridade: prioridade,
            texto: texto
        };
        tarefas.push(nova);
        return nova;
    },
    remover: (id) => {
        const idx = tarefas.findIndex(t => t.id === id);
        if(idx === -1) return null;
        
    },
    editar: (id, dados) => {

    }
}