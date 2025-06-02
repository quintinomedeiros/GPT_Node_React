/**
 * Classe InputPrompt
 * Responsável por representar um prompt de entrada enviado pelo usuário para a API.
 * Esta classe pode ser utilizada para organizar e validar os dados antes de processá-los.
 */

class InputPrompt {
    /**
     * Construtor da classe InputPrompt
     * @param {Object} param0 - Objeto contendo os dados do prompt.
     * @param {string} param0.prompt - Texto do prompt enviado pelo usuário.
     */
    constructor({ prompt }) {
        this.prompt = prompt; // Armazena o texto do prompt recebido
    }
}

// Exporta a classe para que possa ser utilizada em outros módulos
module.exports = InputPrompt;
