import React from "react";
import './ChatMessage.css';
import Avatar from "../../assets/avatar";

// user (user | chatgpt)
// message - aonde vai estar o prompt
export const ChatMessage = ({message}) => {
    <div className={`chat-message ${message.user === 'gpt'} && "chatgpt"`}>
        <div className="chat-message-center">
            <div className={`avatar {message.use === 'gpt' && "chatgpt}`}>
                {message.user === 'gpt' && (
                    <Avatar/>
                )}
            </div>
        </div>
        <div className="message">
            {message.message}
        </div>
    </div>
}