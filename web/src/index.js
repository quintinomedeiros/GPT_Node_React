// Importa a biblioteca React para criar componentes
import React from 'react';

// Importa a biblioteca ReactDOM para renderizar os componentes no DOM
import ReactDOM from 'react-dom/client';

// Importa os estilos globais da aplicação
import './styles/index.css';

// Importa o componente principal da aplicação
import App from './App';

/**
 * Ponto de entrada da aplicação React.
 * Aqui o React é conectado ao DOM através do elemento com id "root".
 */

// Cria a raiz da aplicação React usando a API moderna (desde React 18)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente <App /> dentro do modo estrito do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
