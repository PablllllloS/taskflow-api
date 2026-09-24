let tarefas = [
    { id: 1, texto: "Estudar NodeJs", prioridade: "alta", coluna: "andamento", usuarioId: 1 },
    { id: 2, texto: "Aprender React", prioridade: "media", coluna: "afazer", usuarioId: 1 }
];
let proximoId = 3;

module.exports = {
    listar: () => tarefas,
    listarPorColuna: (coluna) => tarefas.filter(t => t.coluna === coluna),
    buscar: (id) => tarefas.find(t => t.id === id),
    adicionar: ({ texto, prioridade, coluna, usuarioId }) => {
        const nova = {
            id: proximoId++,
            texto,
            prioridade: prioridade || 'media',
            coluna: coluna || 'afazer',
            usuarioId
        };
        tarefas.push(nova);
        return nova;
    },
    deletar: (id) => {
        const idx = tarefas.findIndex(t => t.id === id);
        if (idx === -1) return null;
        return tarefas.splice(idx, 1)[0];
    },
    editar: ({ id, texto, prioridade, coluna }) => {
        const idx = tarefas.findIndex(t => t.id === id);
        if (idx === -1) return null;
        tarefas[idx] = { ...tarefas[idx], texto, prioridade, coluna };
        return tarefas[idx];
    }
};