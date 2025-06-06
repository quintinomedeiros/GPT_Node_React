/**
 * Função responsável por enviar uma requisição POST para a API local com a mensagem do usuário.
 * Utiliza a biblioteca Axios para comunicação HTTP.
 *
 * @param {Object} message - Objeto contendo a mensagem a ser enviada para a API.
 * @returns {Promise<Object>} - Resposta da API com os dados processados.
 */
import axios from 'axios'

const URL_API = 'http://localhost:5555/api/prompt'

export const makeRequest = async (message) => {
    const { data } = await axios.post(URL_API, message)
    return data
}
