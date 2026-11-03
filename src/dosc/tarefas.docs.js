const paths={
    '/tarefas':{
        get:{
            parameters:[
                {
                    name:'coluna',
                    in:'query',
                    required:false,
                    description: 'Filtra pela coluna do Kanban',
                    schema: {type: 'string', enum:['afazer', 'andamento', 'concluido']}
                }
            ],
            tags:['Tarefas'],
            sumary: 'Lista todas as tarefas',
            responses:{
                '200': {description: 'Solicitação bem-sucedida'},
            },
        },
        post:{
            tags:['Tarefas'],
            sumary: 'Nova tarefa',
            responses:{
                '201': {description: 'Cadastro de nova tarefa'}
            },
        }
    },
    '/tarefas/{id}':{
        get:{
            tags:['Tarefas'],
            sumary: 'Lista uma tarefa',
            responses:{
                '200':{description: 'Solicitação bem-sucedida'},
            },
        }
    }
};
module.exports = {paths}