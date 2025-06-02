/**
 * Arquivo principal de configuração do aplicativo Express.
 * Aqui são carregadas as dependências, middlewares e variáveis de ambiente.
 */

// Importação das dependências
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes")

// Carregamento das variáveis de ambiente do arquivo .env
require("dotenv").config();

// Criação de uma instância do aplicativo Express
const app = express();

// Configurações globais da aplicação

// Middleware para permitir que a aplicação utilize JSON nas requisições e respostas
app.use(express.json());

// Middleware de CORS para permitir requisições de diferentes origens (Cross-Origin Resource Sharing)
app.use(cors());

// Registra as rotas definidas no arquivo 'routes' sob o caminho base '/api'.
// Todas as requisições que começarem com '/api' serão encaminhadas para o middleware/router 'routes'.
app.use(routes)

// Exportação do app para ser usado em outros arquivos, como o server.js
module.exports = app;
