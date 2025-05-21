# SGII – Sistema de Gestão Integrada Inteligente

## 🎯 Tema

Plataforma web para **gerenciamento inteligente de espaços físicos, controle de chaves e gestão de inventário** de recursos compartilhados. Voltada para ambientes institucionais como escolas, empresas, laboratórios e órgãos públicos.

## 💡 Escopo Funcional

A plataforma oferece funcionalidades integradas, incluindo:

- 🔑 **Controle de chaves**: cadastro, empréstimo e rastreamento de chaves físicas.
- 🗓️ **Reserva de ambientes e recursos**: agendamento de salas, auditórios, laboratórios e veículos.
- 🧾 **Gestão de inventário**: registro e monitoramento de equipamentos, móveis e materiais.
- 📊 **Painel administrativo**: gráficos interativos, relatórios e alertas de uso.
- 👥 **Gestão de usuários**: sistema multiusuário com autenticação segura e permissões por perfil.
- 📁 **Upload de documentos**: anexos para reservas, inventário e auditoria.
- 🧾 **Geração de relatórios**: emissão de relatórios em PDF para reservas, movimentações e histórico.

## 🧰 Tecnologias Utilizadas

### 🔹 **Frontend**

- [React](https://reactjs.org/) com [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/) para estilização
- [React Router](https://reactrouter.com/) para navegação
- [Axios](https://axios-http.com/) para requisições HTTP

### 🔹 **Backend**

- [Node.js](https://nodejs.org/) com [NestJS](https://nestjs.com/)
- [Sequelize ORM](https://sequelize.org/) para acesso ao banco de dados
- Autenticação com [JWT](https://jwt.io/)
- Validação e estruturação com [class-validator](https://github.com/typestack/class-validator)

### 🔹 **Banco de Dados**

- [PostgreSQL](https://www.postgresql.org/)

### 🔹 **Extras**

- Upload de arquivos com `multer`
- Geração de PDFs com `pdfkit` ou `puppeteer`
- Swagger para documentação de API
- Docker (futuramente) para ambiente de produção

## 🚧 Estrutura do Projeto
