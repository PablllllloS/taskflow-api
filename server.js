const app = require('./app')
const PORTA = process.env.PORTA || 3000;
const pool = require('./src/database/db');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err); 
    } else {
        console.log('banco conectado:', res.rows[0].now);
    }
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});