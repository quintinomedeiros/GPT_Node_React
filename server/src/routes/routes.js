/**
* Módulo de rotas para a aplicação.
* Define as rotas relacionadas à API de prompt do ChatGPT.
*/

const express = require("express");
const promptController = require("../controllers/prompt-controller");

// Cria um roteador do Express
const routes = express.Router();

/**
* @route POST /api/prompt
* @description Recebe um texto do cliente e envia para a API da OpenAI
* @access Público
* @controller promptController.sendText
*/
routes.post('/api/prompt', promptController.sendText);

// Exporta o roteador para ser usado no servidor principal
module.exports = routes;