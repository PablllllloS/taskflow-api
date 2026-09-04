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
            texto: texto,
            prioridade: prioridade,
            coluna: coluna,
        };
        tarefas.push(nova);
        return nova;
    },
    deletar: (id) => {
        const idx = tarefas.findIndex(t => t.id === id);
        if(idx === -1) return null;
        return tarefas.splice(idx, 1)[0]
    },
    editar: ({id, texto, prioridade, coluna}) =>{
        const idx = tarefas.findIndex(t => t.id === id);
        if(idx === -1){
            return null; status(404).json({erro: 'Tarefa não encontrada'})
        };
        const tarefaAtualizada = {id, texto, prioridade, coluna};
        return tarefas[idx] = tarefaAtualizada;
    }
};