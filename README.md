# 🍔 Burger House API & Web

Sistema completo de lanchonete com frontend responsivo e backend REST API desenvolvido em Python utilizando [Flask](https://flask.palletsprojects.com?utm_source=chatgpt.com).

O projeto simula uma plataforma real de pedidos online para pequenos empreendimentos, permitindo listagem dinâmica de produtos, gerenciamento de carrinho e envio de pedidos diretamente para a API.

---

# ✨ Funcionalidades

- Cardápio dinâmico integrado à API
- Sistema de carrinho funcional
- Registro de pedidos
- Listagem de pedidos em tempo real
- Interface moderna e responsiva
- Estrutura REST API versionada (`/api/v1`)
- Integração frontend ↔ backend via `fetch`
- Processamento e armazenamento de pedidos
- Arquitetura baseada em classes
- Suporte a CORS para integração externa

---

# 🚀 Tecnologias Utilizadas

## Backend

- Python
- [Flask](https://flask.palletsprojects.com?utm_source=chatgpt.com)
- [Flask-CORS](https://flask-cors.readthedocs.io?utm_source=chatgpt.com)
- Colorama

## Frontend

- HTML5
- CSS3
- JavaScript Vanilla

---

# 📡 Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/v1/lanches` | Lista os produtos |
| GET | `/api/v1/pedidos` | Lista os pedidos |
| POST | `/api/v1/pedido` | Registra um novo pedido |

---

# 🧠 Objetivo do Projeto

O objetivo do projeto é demonstrar a construção completa de uma aplicação web integrada, conectando frontend e backend através de uma REST API moderna.

Além da interface comercial para lanchonetes e pequenos negócios, o sistema também serve como estudo prático de:

- Arquitetura REST
- Manipulação de requisições HTTP
- Comunicação cliente-servidor
- Processamento de dados JSON
- Gerenciamento de estado no frontend
- Integração entre JavaScript e Python

---

# 📷 Interface

- Landing page comercial
- Sistema de pedidos online
- Carrinho lateral interativo
- Visual moderno com design responsivo
- Estrutura adaptável para outros nichos comerciais

---

# 🔮 Melhorias Futuras

- Integração com banco de dados
- Painel administrativo
- Autenticação JWT
- Sistema de status em tempo real
- Integração com pagamentos
- Integração com WhatsApp
- Deploy em nuvem
- Upload de imagens dos produtos
- Dashboard analítico de vendas

---

# ⚙️ Como Executar

## Instalar dependências

```bash
pip install flask flask-cors colorama
```

---

## Executar o servidor

```bash
python app.py
```

---

## Acessar no navegador

```txt
http://127.0.0.1:5000
```

---

# 📁 Estrutura do Projeto

```txt
BurgerHouse/
│
├── app.py
├── index.html
├── static/
├── templates/
└── README.md
```

---

# 🛠️ Exemplo de Requisição

## POST `/api/v1/pedido`

```json
{
  "cliente": {
    "nome": "Carlos",
    "telefone": "99999-9999",
    "endereco": "Rua Exemplo"
  },

  "itens": [
    {
      "nome": "Hamburguer",
      "quantidade": 2
    }
  ],

  "observacao": "Sem cebola",
  "status": "recebido"
}
```

---

# 📄 Licença

Projeto desenvolvido para fins educacionais e demonstração de integração frontend/backend utilizando Flask REST API.
