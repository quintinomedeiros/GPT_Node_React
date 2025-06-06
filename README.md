# Integração ChatGPT com Node.js e React

Este projeto é um exemplo completo de como criar uma aplicação que integra um servidor **Node.js (Express)** com um cliente **React**, utilizando a **API da OpenAI** para interações com o modelo ChatGPT.

---

## ✨ Tecnologias Utilizadas

### Backend (Node.js):
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [OpenAI SDK](https://www.npmjs.com/package/openai)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)

### Frontend (React):
- [React.js](https://reactjs.org/)
- [Axios](https://axios-http.com/)

---

## 📁 Estrutura do Projeto

```plaintext
chatgpt-integration/
├── server/ # Backend com Node.js + Express
│   ├── node_modules/...(gitignore)
│   ├── src/
│   │   ├── assets/
│   │   │   └── avatar.js
│   │   ├── config/
│   │   │   └── openai.js
│   │   ├── controllers/
│   │   │   └── prompt-controller.js
│   │   ├── models/
│   │   │   └── input-prompt.js
│   │   ├── routes/
│   │   │   └── routes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env(gitignore)
│   ├── .gitignore
│   ├── .package-lock.json
│   └── package.json
├── web/ # Frontend com React
│   └── node_modules/...(gitignore)
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── api/
│   │   │   └──api.js
│   │   ├── assets/
│   │   │   └──avatar.js
│   │   ├── components/
│   │   │   ├── ChatMessage
│   │   │   │   ├── ChatMessage.js
│   │   │   │   └── ChatMessage.css
│   │   │   ├── SideMenu
│   │   │   │   ├── SideMenu.js
│   │   │   │   └── SideMenu.css
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── index.css
│   │   │   └── reset.css
│   │   ├── App.js
│   │   └── index.js
│   ├── .gitignore
│   ├── package.lock.json
│   ├── package.json
└── README.md
```

## Como o servidor funciona

Ao iniciar o servidor (`server.js`), a aplicação Express é configurada em `app.js`, onde middlewares essenciais e rotas são carregados.

Quando o usuário faz uma requisição HTTP para alguma rota dentro do caminho `/api`, essa requisição é encaminhada para o arquivo `routes.js`, que direciona para o controller correspondente (por exemplo, `prompt-controller.js`).

O controller trata a lógica do pedido, podendo interagir com modelos de dados (`input-prompt.js`) e serviços externos configurados em `openai.js`. Após processar a requisição, o servidor envia a resposta final ao cliente (frontend React).

Dessa forma, o backend atua como intermediário entre o usuário e os serviços de IA, organizando o fluxo de dados e respostas.

> ⚠️ **Dica:** para reiniciar o servidor, entre na pasta **web** e no terminal digite ```npm start```.

## 🔹 Passo a Passo

### 1. Criar Diretórios

```bash
mkdir server web
cd server
```

### 2. Inicializar o projeto Node

```bash
npm init -y
```

### 3. Instalar dependências

```bash
npm i express cors dotenv openai
```

### 4. Criar estrutura do código

```bash
mkdir src
cd src
mkdir config controllers models routes
```

### 5. Criar `.env`

```env
# Chave de API da OpenAI (obtenha em https://platform.openai.com/account/api-keys)
OPENAI_API_KEY="sua-chave-secreta"

# Porta do servidor
PORT=5555
```

> ⚠️ **Atenção:** nunca envie sua chave real para repositórios públicos.

### 6. Criar `.gitignore`

```gitignore
node_modules/
.env
```

### 7. Configurar app e servidor

#### `server/src/app.js`

```js
const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

module.exports = app
```

#### `server/src/server.js`

```js
const app = require("./app")
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
```

### 8. Iniciar servidor

```bash
node --watch src/server
```

### 9. Configurar OpenAI

#### `src/config/openai.js`

```js
const { Configuration, OpenAIApi } = require("openai")

module.exports = class openai {
    static configuration() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        })
        return new OpenAIApi(configuration)
    }

    static textCompletion({ prompt }) {
        return {
            model: "text-davinci-003",
            prompt: `${prompt}.`,
            temperature: 0,
            max_tokens: 3500,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        }
    }
}
```

### 10. Criar Model

#### `server/src/models/input-prompt.js`

```js
/**
 * Classe que representa o prompt de entrada enviado pelo usuário
 */
class InputPrompt {
    constructor({ prompt }) {
        this.prompt = prompt
    }
}

module.exports = InputPrompt
```

### 11. Criar Controller

#### `server/src/controllers/prompt-controller.js`

```js
const InputPrompt = require("../models/input-prompt")
const openai = require("../config/openai")

module.exports = {
    async sendText(req, res) {
        const openaiAPI = openai.configuration()
        const inputModel = new InputPrompt(req.body)

        try {
            const response = await openaiAPI.createCompletion(
                openai.textCompletion(inputModel)
            )

            return res.status(200).json({
                success: true,
                data: response.data.choices[0].text
            })
        } catch (error) {
            console.error("Erro ao enviar o texto:", error)
            return res.status(400).json({
                success: false,
                error: error.response || "Erro ao enviar o texto"
            })
        }
    }
}
```

### 12. Criar Rotas

#### `server/src/routes/routes.js`

```js
const express = require("express")
const router = express.Router()
const PromptController = require("../controllers/prompt-controller")

router.post("/prompt", PromptController.sendText)

module.exports = router
```

#### Vincular rotas no `app.js`

```js
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes")

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes)

module.exports = app;
```

### 13. Instalar o react (caso não tenha instalado) e criar o projeto react (no diretório web)

```bash
cd web
npm install -g create-react-app
```
```bash
npx create-react-app gpt-front
```
> ⚠️ **Dica:** após criar o projeto react, ele salva os arquivos em uma pasta com o nome do app. Sugere-se acessar a pasta com o explorer, arrastar os arquivos para o diretório web e eliminar o diretório vazio.

> ⚠️ **Dica:** em src elimine os arquivos - test.js; reportWebVitals.js (eliminar o código ao fim e a importação em index.js); setuptests.js.

No Vs Code, dentro do diretório Web, rode o projeto na barra lateral esquerda com npm scripts


### 14. Criar conexão entre front-end e chatgpt

#### Crie os diretórios: src/api, src/components e src/styles (mover App.css e index.css - ajustar importação em App.js e index.js)


### 15. Instalar Axios para consumir api

```bash
npm i axios
```

#### Crie o arquivo web/api/api.js
```js
import axios from 'axios'

const URL_API = 'http://localhost:5555/api/prompt'

export const makeRequest = async (message) => {
    const {data} = await axios.post(URL_API, message)
    return data
}
```

### 16. Componetizando os elementos - SideMenu

#### Crie um arquivo web/styles/reset.css e inclua a [padronização de estilos entre navegadores](https://www.devmedia.com.br/como-utilizar-a-tecnica-css-reset/26797)

#### Ajuste web/app.js:
> importar reset.js
> importar api
> importar userState do react

```js
import {useState} from 'react'
import './styles/App.css';
import './styles/reset.css';
import { makeRequest } from './api/api';
function App() {
  return (
    <div className="App">
      <h1>App works!!!</h1>
    </div>
  );
}
export default App;
```

#### Crie os arquivos web/components/SideMenu.js e web/components/SideMenu.css

> web/components/SideMenu.js
```js
import React from 'react'
import './SideMenu.css'

export const SideMenu = ()=> {
    return(
        <aside className='sidemenu'>
            <div className='sidemenu-button'>
                <span>+</span>
                Novo chat
            </div>
        </aside>
    )
}
```

> web/components/SideMenu.css
```css
.sidemenu {
    width: 260px;
    padding: 10px;
    background-color: #202123;
}

.sidemenu-button{
    padding: 15px;
    border-radius: 5px;
    text-align: left;
    transition: ease 0.25 all;
}

.sidemenu-button:hover{
    background-color: rgba(255, 255, 255, 0.1);
}

.sidemenu-button span{
    padding-left: 6px;
    padding-right: 12px;
}
```

> Faça a importação em web/App.js
```js
import {useState} from 'react'
import './styles/App.css';
import './styles/reset.css';
import { makeRequest } from './api/api';
import { SideMenu } from './components/SideMenu/SideMenu';

function App() {
  return (
    <div className="App">
      <SideMenu></SideMenu>
      <h1>App works!!!</h1>
    </div>
  );
}

export default App;
```

> Altere a classe .App web/src/styles/App.css

```css
.App {
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  color: #fff;
  background-color: #282c34;
}
```

#### Crie o arquivo web/src/assets/avatar.js
```js
import React from 'react';

const Avatar = (props) =>{
    return(
        <svg>

        </svg>
    )
}

export default Avatar
```

⚠️ **Dica:** Acesse o site do site GPT, inspecione o ícone e copie o path para colocar dentro do <svg>


#### Crie os arquivos web/components/ChatMessage.js e web/components/ChatMessage.css e import o Avatar
```js
import React from "react";
import './ChatMessage.css';
import Avatar from "../../assets/avatar";

// user (user | chatgpt)
// message - aonde vai estar o prompt
export const ChatMessage = ({message}) => {
    return(
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
    )
    
}
```

```css
.chat-message.chatgpt{
    background-color: #444654;
}

.chat-message-center{
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    padding: 12px;
    padding-left: 24px;
    padding-right: 24px;
}

.message{
    padding-left: 40px;
    padding-right: 40px;
}
```

### 8. Criar os hooks dos dos estados (useStat)

#### Atualize web/src/App.js

```bash
import {useState} from 'react'

function App() {

  const[input, setInput] = useState("")
  const[chatlog, setChatLog] = useState([{
    user:"gpt",
    message: "Como posso te ajudar hoje?"
  }])

  async function handleSubmit(e){
    e.preventDefault()

    let response = await makeRequest({prompt: input})

    response = response.data.split('\n')
    .map(line => <p>{line}</p>)

    setChatLog([...chatlog,{
      user:'me',
      message: `${input}`
    },
    {
      user:'gpt',
      message: response
    }

    ])

    setInput("")
  }

  return (
    <div className="App">
      <SideMenu></SideMenu>
      <section className='chatbox'>
        <div className='chat-log'>
          {chatlog.map((message, index)=>(
            <ChatMessage 
              key={index}
              message={message.message} 
            />
          ))}
        </div>
        <div className='chat-input-holder'> 
            <form onSubmit={handleSubmit}>
              <input
                rows='1'
                className='chat-input-textarea'
                type="text" 
                placeholder='Digite sua mensagem aqui'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
              />
            </form>
        </div>
      </section>
    </div>
  );
}
```


---

## 📄 Exemplo de Requisição

`POST http://localhost:5555/api/prompt`

```json
{
  "prompt": "Me dê 3 ideias de nomes para startups de educação"
}
```

---

## 🔎 Recursos Sugeridos

* [Documentação OpenAI API](https://platform.openai.com/docs)
* [Express.js](https://expressjs.com/pt-br/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)

---

## 📡 Boas práticas

* Nunca exponha sua chave da OpenAI em repositórios públicos.
* Use `.env.example` para indicar variáveis de ambiente necessárias.
* Separe responsabilidades: `controllers`, `routes`, `models`, `config`.
* Mantenha padrões de código e inclua documentação em cada módulo.

---


## ✍️ Autor

Criado para o curso **Integrando o ChatGPT com Node e React** por **Quintino de Medeiros Faustino**  
🔗 [Acesse o curso na DIO](https://web.dio.me/lab/integrando-o-chatgpt-com-node-e-react?ref=HMIKRR3NGF)
