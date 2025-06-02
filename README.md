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
│   │   ├── components/
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   └──index.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── logo.svg
│   ├── .gitignore
│   ├── package.lock.json
│   ├── package.json
├── README.md
```

## Como o servidor funciona

Ao iniciar o servidor (`server.js`), a aplicação Express é configurada em `app.js`, onde middlewares essenciais e rotas são carregados.

Quando o usuário faz uma requisição HTTP para alguma rota dentro do caminho `/api`, essa requisição é encaminhada para o arquivo `routes.js`, que direciona para o controller correspondente (por exemplo, `prompt-controller.js`).

O controller trata a lógica do pedido, podendo interagir com modelos de dados (`input-prompt.js`) e serviços externos configurados em `openai.js`. Após processar a requisição, o servidor envia a resposta final ao cliente (frontend React).

Dessa forma, o backend atua como intermediário entre o usuário e os serviços de IA, organizando o fluxo de dados e respostas.

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

#### Crie os diretórios: src/api, src/components e src/styles (mover App.css e index.css)

```bash
mkdir server web
cd server
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

## 🚀 Próximos passos

* Criar frontend em React no diretório `web`
* Conectar o React com esta API usando `fetch` ou `axios`
* Tratar validações e erros no frontend

---

## ✍️ Autor

Criado para o curso **Integrando o ChatGPT com Node e React** por **Quintino de Medeiros Faustino**  
🔗 [Acesse o curso na DIO](https://web.dio.me/lab/integrando-o-chatgpt-com-node-e-react?ref=HMIKRR3NGF)
