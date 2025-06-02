// Importando as classes necessárias da biblioteca OpenAI
const { Configuration, OpenAIApi } = require("openai");

/**
 * Classe responsável por configurar a API da OpenAI e
 * definir os parâmetros de completude de texto.
 */
module.exports = class openai {
    /**
     * Cria e retorna uma instância configurada da API da OpenAI.
     * A chave da API é lida do arquivo .env (variável OPENAI_API_KEY).
     * 
     * @returns {OpenAIApi} - Instância autenticada da API da OpenAI.
     */
    static configuration() {
        // Criação da configuração com a chave da API
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // Retorna uma nova instância do cliente da API
        return new OpenAIApi(configuration);
    }

    /**
     * Define os parâmetros utilizados para gerar texto com o modelo da OpenAI.
     * 
     * @param {Object} param0 - Objeto contendo o prompt a ser enviado.
     * @param {string} param0.prompt - Texto base para a geração da resposta.
     * 
     * @returns {Object} - Objeto de configuração do prompt para o modelo.
     */
    static textCompletion({ prompt }) {
        return {
            model: "text-davinci-003",        // Modelo de linguagem utilizado
            prompt: `${prompt}.`,             // Prompt enviado para geração de texto
            temperature: 0,                   // Grau de criatividade (0 = determinístico)
            max_tokens: 3500,                 // Número máximo de tokens na resposta
            top_p: 1,                         // Amostragem do núcleo (1 = considerar 100% das opções)
            frequency_penalty: 0.5,           // Penalidade para repetição de palavras
            presence_penalty: 0,              // Incentivo à introdução de novos tópicos
        };
    }
}
