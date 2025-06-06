// Importa o hook useState para gerenciar o estado dos componentes funcionais
import { useState } from 'react';

// Importação dos estilos globais da aplicação
import './styles/App.css';

// Reset de CSS para normalizar estilos entre navegadores
import './styles/reset.css';

// Função responsável por realizar requisições à API backend
import { makeRequest } from './api/api';

// Componentes reutilizáveis da interface
import { SideMenu } from './components/SideMenu/SideMenu';
import { ChatMessage } from './components/ChatMessage/ChatMessage';

/**
 * Componente principal da aplicação React.
 * Renderiza a interface de um chatbot com menu lateral,
 * histórico de mensagens e campo de entrada de texto.
 */
function App() {
  // Estado para armazenar o texto digitado pelo usuário
  const [input, setInput] = useState('');

  // Estado que armazena o histórico de mensagens do chat
  const [chatlog, setChatLog] = useState([
    {
      user: 'gpt',
      message: 'Como posso te ajudar hoje?'
    }
  ]);

  /**
   * Manipula o envio do formulário (mensagem do usuário).
   * Envia o prompt para a API, recebe a resposta e atualiza o histórico do chat.
   */
  async function handleSubmit(e) {
    e.preventDefault(); // Impede o recarregamento da página

    // Envia a mensagem do usuário para a API
    let response = await makeRequest({ prompt: input });

    // Formata a resposta da API, dividindo em parágrafos
    response = response.data
      .split('\n')
      .map((line, i) => <p key={i}>{line}</p>);

    // Atualiza o histórico com a mensagem do usuário e a resposta da IA
    setChatLog([
      ...chatlog,
      {
        user: 'me',
        message: input
      },
      {
        user: 'gpt',
        message: response
      }
    ]);

    // Limpa o campo de entrada
    setInput('');
  }

  return (
    <div className="App">
      {/* Menu lateral fixo */}
      <SideMenu />

      {/* Área principal do chat */}
      <section className="chatbox">

        {/* Histórico de mensagens */}
        <div className="chat-log">
          {chatlog.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
            />
          ))}
        </div>

        {/* Campo de entrada de mensagem */}
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              className="chat-input-textarea"
              type="text"
              placeholder="Digite sua mensagem aqui"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </section>
    </div>
  );
}

// Exporta o componente App para ser utilizado no ponto de entrada (ex: index.js)
export default App;
