

# 🚀 React Native Auth App

Este projeto é um exemplo de aplicativo de autenticação desenvolvido com **React Native** utilizando **Expo**. O aplicativo se conecta a uma API de autenticação (**Node.js, JWT e MongoDB**) para gerenciar **cadastro** e **login** de usuários.  

## ✨ Recursos

✔ **Autenticação:** Telas para **cadastro** e **login** de usuários.  
📁 **Navegação Baseada em Arquivos:** Uso do **Expo Router** com uma estrutura organizada na pasta `app` (incluindo `auth`).  
🔐 **Armazenamento Seguro:** Utilização do `expo-secure-store` para guardar tokens JWT.  
🌍 **Integração com API:** Requisições HTTP para uma **API de autenticação** que utiliza **Node.js, JWT e MongoDB**.  

## 📂 Estrutura do Projeto

```plaintext
MyAuthApp/
├── app/                           // Rotas definidas pelo Expo Router
│   ├── _layout.tsx                // Layout global (renderiza o Slot do Expo Router)
│   ├── index.tsx                  // Rota raiz que redireciona para a tela de login
│   ├── auth/                      // Pasta para telas de autenticação
│   │   ├── confirmation.tsx       // Tela de confirmação de cadastro
│   │   ├── emailSent.tsx          // Tela de confirmação de envio de email
|   |   ├── login.tsx              // Tela de login
|   |   ├── passwordRecovery.tsx   // Tela de recuperação de senha 
|   |   ├── register.tsx           // Tela de cadastro de usuário
|   |   ├── resetPassword.tsx      // Tela de redefinição de senha
|   |   └── verifyCode.tsx         // Tela de verificação de código
│   └── home.tsx                   // Tela protegida (Home)
├── assets/                        // Arquivos estáticos (imagens, fontes, etc.)
├── package.json                   // Dependências e scripts do projeto
├── tsconfig.json                  // Configurações do TypeScript
└── app.json                       // Configurações do Expo
```

## 🔧 Pré-requisitos

✅ **Node.js** e **npm** ou **yarn** instalados.  
✅ **Expo CLI** instalado globalmente:  
```bash
npm install -g expo-cli
```
✅ Uma **API de autenticação** (Node.js, JWT, MongoDB) rodando ou URLs ajustadas conforme seu ambiente.  

## 📥 Instalação

1️⃣ **Clone o repositório:**  
   ```bash
   git clone https://github.com/seu-usuario/MyAuthApp.git
   cd MyAuthApp
   ```
   
2️⃣ **Instale as dependências:**  
   ```bash
   npm install
   # ou
   yarn install
   ```
   
3️⃣ **Configure as variáveis de ambiente** (se necessário) para ajustar as URLs da API e outras configurações.  

## ▶️ Executando o Projeto

Para iniciar o projeto, execute:  
```bash
expo start
```
Em seguida, abra o aplicativo no emulador ou em um dispositivo físico utilizando o aplicativo **Expo Go**. 📱  

## 🔍 Navegação

A navegação é baseada na estrutura de arquivos com o **Expo Router**:

- **`/`** → Rota raiz (**index.tsx**) que redireciona automaticamente para **`/auth/login`**.  
- **`/auth/*`** → 🔓 Telas de autenticação.
- **`/home`** → 🏠 Tela protegida, acessível após a autenticação.  

> ⚠ **Observação:** O redirecionamento na rota raiz é feito utilizando `router.replace('auth/login')` com um `setTimeout` para garantir que o layout esteja montado.  

## 🎨 Personalização e Contribuições

💡 **Personalização:**  
Ajuste os **estilos**, **validações** e **integrações** conforme a necessidade do seu projeto.  

🤝 **Contribuições:**  
Contribuições são **bem-vindas**! Sinta-se à vontade para abrir **issues** ou enviar **pull requests** com melhorias e correções.  

## 📜 Licença

Este projeto está licenciado sob a **[MIT License](LICENSE)**. 📄  

---
