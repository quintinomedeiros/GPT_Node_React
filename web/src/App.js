import {useState} from 'react'

// Importação do arquivo de estilos principal da aplicação
import './styles/App.css';

// Importação do arquivo de reset de CSS para normalizar estilos entre navegadores
import './styles/reset.css';

// Importação da função responsável por fazer requisições HTTP para a API backend
import { makeRequest } from './api/api';

import { SideMenu } from './components/SideMenu/SideMenu';

/**
 * Componente principal da aplicação React.
 * Aqui é renderizada a estrutura básica da interface do usuário.
 */
function App() {
  return (
    <div className="App">
      <SideMenu></SideMenu>
      <h1>App works!!!</h1>
    </div>
  );
}

// Exportação do componente para que possa ser usado em outros arquivos (como index.js)
export default App;
