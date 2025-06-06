// Importa o React para criar o componente funcional
import React from "react";

// Importa os estilos específicos para o componente ChatMessage
import './ChatMessage.css';

// Importa o componente Avatar da pasta de assets
import Avatar from "../../assets/avatar";

/**
 * Componente que exibe uma mensagem no chat.
 * 
 * Props:
 * - message: objeto com duas propriedades:
 *   - user: identifica se a mensagem é do 'user' ou do 'gpt'
 *   - message: texto da mensagem a ser exibido
 */
export const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.user === 'gpt' ? "chatgpt" : ""}`}>
            <div className="chat-message-center">
                {/* Avatar é exibido apenas para mensagens do GPT */}
                <div className={`avatar ${message.user === 'gpt' ? "chatgpt" : ""}`}>
                    {message.user === 'gpt' && <Avatar />}
                </div>
            </div>
            <div className="message">
                {message.message}
            </div>
        </div>
    );
}
