function formatarTarefa(tarefa){
    const {projetos, usuarios, prioridades, ...resto} = tarefa;
    return {
        ...resto,
        projetos: projetos?.nome,
        usuarios: usuarios?.nome,
        prioridades: prioridades?.descricao,
        cor_prioridades: prioridades?.cor
    }
}

module.exports = formatarTarefa