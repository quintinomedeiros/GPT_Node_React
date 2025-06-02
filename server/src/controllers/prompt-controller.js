// Importa a classe InputPrompt, que representa o modelo de dados do prompt enviado pelo usuário
const InputPrompt = require("../models/input-prompt")

// Importa a configuração da API da OpenAI
const openai = require("../config/openai")

/**
 * Controlador responsável por lidar com o envio de prompts de texto para a OpenAI
 * e retornar a resposta ao cliente.
 */
module.exports = {
    /**
     * Função assíncrona que envia um texto para a API da OpenAI e retorna a resposta gerada.
     * @param {Object} req - Objeto de requisição HTTP, contendo o corpo com o texto do prompt.
     * @param {Object} res - Objeto de resposta HTTP, usado para enviar o retorno ao cliente.
     * @returns {Object} - Resposta JSON com o resultado da OpenAI ou erro.
     */
    async sendText(req, res) {
        // Instancia o cliente da API da OpenAI
        const openaiAPI = openai.configuration()

        // Cria uma instância do modelo InputPrompt com os dados do corpo da requisição
        const inputModel = new InputPrompt(req.body)  // Corrigido de "require.body"

        try {
            // Envia a requisição de completude de texto para a OpenAI
            const response = await openaiAPI.createCompletion(
                openai.textCompletion(inputModel)
            )

            // Retorna a resposta ao cliente com status 200
            return res.status(200).json({
                success: true,
                data: response.data.choices[0].text
            })

        } catch (error) {
            // Em caso de erro, exibe no console e retorna erro ao cliente
            console.error("Erro ao enviar o texto:", error)
            return res.status(400).json({
                success: false,
                error: error.response ? error.response : "Erro ao enviar o texto"
            })
        }
    }
}
