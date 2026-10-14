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


    adicionar: async ({ texto, prioridade, coluna, usuarioId, projetoId }) => {
        const result = await pool.query(
            'INSERT INTO tarefas (texto, prioridade_id, coluna, projeto_id, usuarios_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
             [texto, prioridade, coluna, projetoId, usuarioId])
        return result.rows[0];
    },
    

    deletar: async (id) => {
        const result = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] || null;
    },
    editar: async ({ id, texto, prioridade, coluna }) => {
        const result = await pool.query(
            'UPDATE tarefas SET texto = $1, prioridade_id = $2, coluna = $3 WHERE id = $4 RETURNING *',
            [texto, prioridade, coluna, id]
        );
        return result.rows[0] || null;
    }
};