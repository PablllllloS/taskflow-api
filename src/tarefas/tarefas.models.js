// let tarefas = [];
// let proximoId = 3;
const prisma = require('../database/prisma');
const pool = require('../database/db');

const incluirNomes = {
    projetos: {select: {nome:true}},
    usuarios: {select: {nome: true}},
    prioridades: {select: {descricao: true, cor: true}}
};

function formatarTarefa(tarefa){
    const {projetos, usuarios, prioridades, ...resto} = tarefa;
    return {
        ...resto,
        projetos: projetos?.nome,
        usuarios: usuarios?.nome,
        prioridade: prioridades?.descricao,
        prioridade: prioridades?.cor
    }
}


const tarefas = {
    listar: async () => {
        const lista = await prisma.tarefas.findMany({
            select:{
                id: true,
                texto: true,
                ordem: true,
                coluna: true,
                projeto_id: true,
                usuarios_id: true,
                prioridade_id: true,
                tempo_em: true,
                criado_em: true,
                iniciado_em: true,
                ...incluirNomes,
            },
            orderBy: {id:'asc'}
        })
        return lista.map(formatarTarefa);
    },
    buscar: async (id) =>{
        // const result = await pool.query('SELECT * from tarefas where id = $1',[id])
        // return result.rows[0] || null;
        const buscar = await prisma.tarefas.findUnique({
            where: {id},
            select:{
                id: true,
                texto: true,
                ordem: true,
                coluna: true,
                projeto_id: true,
                usuarios_id: true,
                prioridade_id: true,
                tempo_em: true,
                criado_em: true,
                iniciado_em: true,
                ...incluirNomes,
            },
            orderBy: {id:'asc'}
        })
        return buscar(formatarTarefa)
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
    editar: async ({ id, dados }) => {
        const iniciadoEm = null;
        const concluidoEm = null;
        if(coluna === 'andamento'){
            iniciadoEm = new Date();
            concluidoEm = null;
        } else if (coluna ==='concluido'){
            iniciadoEm = null;
            concluidoEm = new Date();
        } else {
            iniciadoEm = null;
            concluidoEm = null;
        }
        // const result = await pool.query(
        //     `UPDATE tarefas SET 
        //     texto = $1,
        //     prioridade_id = $2, 
        //     coluna = $3,
        //     projeto_id = $4,
        //     usuario_id = $5,
        //     iniciado_em = $6,
        //     conconluido_em = $7
        //     WHERE id = $8 
        //     RETURNING *`,
        //     [texto, prioridade, coluna, projetoId, usuarioId, iniciadoEm, concluidoEm, id]
        // );
        const tarefa = await prisma.tarefas.update({
            where: {id},
            data:{
                texto: dados.texto,
                coluna: dados.coluna,
                idprioridade: dados.idprioridade,
                usuario_id: dados.usuario_id,
                projeto_id: dados.projetoId,
                iniciada_em: iniciadoEm,
                concluida_em: concluidoEm
            },
            include: incluirNomes
        })
        return formatarTarefa(tarefa)
    }
};

module.exports = tarefas