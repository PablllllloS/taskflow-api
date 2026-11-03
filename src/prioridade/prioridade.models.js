const prisma = require('../database/prisma')

const prioridadeModel ={
    listar: async ()=>{
        const resultado = await prisma.prioridades.findMany({
            select:{id: true, 
                    descricao: true, 
                    ativo: true,
                    criado_em: true
                },
            where:{ativo:true},
            orderBy:{id: 'asc'}
        });
        return resultado;
    }
}

module.exports = prioridadeModel