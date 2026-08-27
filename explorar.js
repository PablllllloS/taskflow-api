// function escreva(texto, comando){
//     console.log(texto, comando);
// };
const fs = require('fs');
const path = require('path');
const os = require('os');

// TAREFA 1

console.log('=====AMBIENTE=====');
console.log('Node.js:', process.version);
console.log('Sistema', os.platform());
console.log('Pasta atual:', __dirname);

// TAREFA 2

console.log('');
console.log('==ARQUIVOS NA PASTA==');
const arquivos = fs.readdirSync('.');
arquivos.forEach(arquivo => {
    console.log(' -', arquivo)
});

//TAREFA 3

console.log('');
console.log('== CAMINHO DO FUTURO SERVIDOR ==');
const caminhoServidor = path.join(__dirname, 'src', 'server.js');
console.log('O servidor fecara em:', caminhoServidor);

// DESAFIO

const arquivosJS = arquivos.filter(a => a.endsWith('.js'));
console.log('');
console.log('== DESAFIO ==');
console.log(`Arquivos .js encontrados: ${arquivosJS.length} `)

const arquivosTaskflow = fs.readdirSync('../Front-end React/TaskFlow-React/taskflow');
arquivosTaskflow.forEach(arquivos =>{
    console.log(' -', arquivos);
})

const arquivosJS1 = arquivosTaskflow.filter(a => a.endsWith('.js'));
console.log('');
console.log(`Arquivos .js encontrados:${arquivosJS.length}`);