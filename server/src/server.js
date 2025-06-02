/**
 * Arquivo responsável por iniciar o servidor da aplicação.
 * Ele importa a configuração do aplicativo Express e define a porta de escuta.
 */

// Importação do app Express configurado no arquivo app.js
const app = require("./app");

// Definição da porta em que o servidor irá escutar
// Caso exista uma variável de ambiente PORT, ela será utilizada; caso contrário, será usada a porta 3000
const port = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
