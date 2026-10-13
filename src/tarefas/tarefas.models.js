// let tarefas = [];
// let proximoId = 3;

const pool = require('../database/db');

module.exports = {
    listar: async () => {
        const result = await pool.query('SELECT * FROM tarefas ORDER by id');
        return result.rows;
    },
    buscar: async (id) =>{
        const result = await pool.query('SELECT * from tarefas where id = $1',[id])
        return result.rows[0] || null;
    },
    listarPorColuna: async (coluna) => {
        const result = await pool.query('SELECT * FROM tarefas WHERE coluna = $1', [coluna] || 'afazer');
        return result.rows;
    },
    adicionar: async ({ texto, prioridade, coluna, usuarioId }) => {
        // const nova = {
        //     id: proximoId++,
        //     texto,
        //     prioridade: prioridade || 'media',
        //     coluna: coluna || 'afazer',
        //     usuarioId
        // };
        // tarefas.push(nova);
        const result = await pool.query(
            'INSERT INTO tarefas (texto, prioridade_id, coluna) VALUES ($1, $2, $3) RETURNING *',
             [texto, prioridade, coluna])
        return result.rows[0];
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