const tarefas = require('./tarefas.docs')

module.exports = {
    openapi: '3.0.3',
    info:{
        title:'TaskFlow API',
        version: '1.0.0',
        description: 'API do TaskFlow - SENAI CTGAS-ER',
    },
    servers: [{url:'http://localhost:3000', description:'Local'}],

    security: [{bearerAuth: []}],
    
    paths: {
        ...tarefas.paths
    },
};