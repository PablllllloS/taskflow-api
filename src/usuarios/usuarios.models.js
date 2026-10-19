const pool = require('../database/db');

module.exports = {
    listar: async () => {
        const result = await pool.query('SELECT * FROM usuarios');
        return result.rows;
    },
    buscarPorId: async (id) => {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        return result.rows[0] || null;
    },
    buscarPorEmail: async (email) => {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return result.rows[0] || null;
    },
    criar: async ({ nome, email, senha, cargo }) => {
        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, senha, cargo) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, senha, cargo]
        );
        return result.rows[0];
    },
    editar: async (id, dados) => {
        const result = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha = $3, cargo = $4 WHERE id = $5 RETURNING *',
            [dados.nome, dados.email, dados.senha, dados.cargo, id]
        );
        return result.rows[0] || null;
    },
    deletar: async (id) => {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] || null;
    }
};