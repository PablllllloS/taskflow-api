// let tarefas = [];
// let proximoId = 3;
const formatarTarefa = require('../../utlis/formatarTarefa')
const prisma = require('../database/prisma');

const incluirNomes = {
    projetos: {select: {nome:true}},
    usuarios: {select: {nome: true}},
    prioridades: {select: {descricao: true, cor: true}}
};

// function formatarTarefa(tarefa){
//     const {projetos, usuarios, prioridades, ...resto} = tarefa;
//     return {
//         ...resto,
//         projetos: projetos?.nome,
//         usuarios: usuarios?.nome,
//         prioridades: prioridades?.descricao,
//         cor_prioridades: prioridades?.cor
//     }
// }


const tarefas = {

    listar: async () => {
    const tarefas = await prisma.tarefas.findMany({
        include: incluirNomes,
        orderBy: { id: 'asc' }
    });

    return tarefas.map(formatarTarefa);
    },

    buscar: async (id) =>{
        const tarefa = await prisma.tarefas.findUnique({
            where: {id},
            include: incluirNomes
        });
        return tarefa ? formatarTarefa(tarefa) : null;
    },

    listarPorColuna: async (coluna = 'afazer') => {
        const tarefas = await prisma.tarefas.findMany({
            where: { coluna },
            include: incluirNomes,
            orderBy: { ordem: 'asc' }
        });

        return tarefas.map(formatarTarefa);
    },

    adicionar: async (dados) => {
        const tarefa = await prisma.tarefas.create({
            data: {
                texto: dados.texto,
                coluna: dados.coluna || 'afazer',
                ordem: Number(dados.ordem) || 2,
                prioridade_id: Number(dados.prioridade_id) || 2,
                usuarios_id: Number(dados.usuarios_id),
                projeto_id: Number(dados.projeto_id)
            },
            include: incluirNomes,
        });
        return formatarTarefa(tarefa);
    },
    
    deletar: async (id) => {
        try{
            const tarefa = await prisma.tarefas.delete({
                where: {id}
            });
            return formatarTarefa(tarefa);
        } catch (erro){
            if(erro.code === 'P2025') return null;
            throw erro;
        }
    },

    editar: async ({ id, dados }) => {
        let iniciadoEm = null;
        let concluidoEm = null;
        if(dados.coluna === 'andamento'){
            iniciadoEm = new Date();
            concluidoEm = null;
        } else if (dados.coluna ==='concluido'){
            iniciadoEm = null;
            concluidoEm = new Date();
        } else {
            iniciadoEm = null;
            concluidoEm = null;
        }
        
        const tarefa = await prisma.tarefas.update({
            where: {id},
            data:{
                texto: dados.texto,
                coluna: dados.coluna,
                prioridade_id: dados.prioridade_id,
                usuario_id: dados.usuario_id,
                projeto_id: dados.projeto_id,
                iniciada_em: iniciadoEm,
                concluida_em: concluidoEm
            },
            include: incluirNomes
        })
        return formatarTarefa(tarefa)
    }
};

module.exports = tarefas