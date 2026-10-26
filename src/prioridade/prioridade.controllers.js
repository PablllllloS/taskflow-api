const prioridadeModel = require('./prioridade.models')

const prioridadeController = {
    async listar(req, res){
        const resultado = await prioridadeModel.listar();
        res.status(200).json(resultado);
    },
}

module.exports = prioridadeController