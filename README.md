# SGII - Sistema de Gestão Integrada Inteligente

Plataforma web para gestão de espaços físicos, controle de chaves, reservas e inventário em ambientes institucionais.

## Funcionalidades

- Controle de chaves com cadastro, disponibilidade e movimentações.
- Reserva de salas e recursos compartilhados.
- Gestão de inventário de equipamentos, móveis e materiais.
- Cadastro de instituições e usuários.
- Autenticação com JWT.
- Painel administrativo com resumo de reservas, chaves, salas e inventário.
- Documentação da API via Swagger.

## Tecnologias

### Frontend

- React com Vite
- React Router
- Axios
- TailwindCSS

### Backend

- Node.js com NestJS
- Sequelize ORM
- PostgreSQL
- Passport/JWT
- Swagger

## Estrutura

```text
Projeto_SGII/
├── backend/   # API NestJS
├── frontend/  # Aplicação React/Vite
├── docs/      # Documentos do projeto
└── README.md
```

## Configuração

Crie os arquivos de ambiente a partir dos exemplos:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Principais variáveis do backend:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=12345
DB_DATABASE=projeto_sgii
DB_SYNC=false
NODE_ENV=development
DB_LOGGING=false
JWT_SECRET=troque_este_segredo_em_producao
JWT_EXPIRES_IN=1h
```

Principal variável do frontend:

```env
VITE_API_URL=http://localhost:3000
```

## Segurança do banco de dados

A partir do [PR #16](https://github.com/Bianchi613/Projeto_SGII/pull/16), a sincronização automática do esquema do PostgreSQL fica **sempre desativada em produção**, inclusive se `DB_SYNC=true`. O padrão de desenvolvimento também é `DB_SYNC=false`. Para bancos novos em produção, provisione tabelas com migrações ou processo de implantação validado; não reative sincronização automática para corrigir uma falta de esquema.

Veja [SECURITY.md](SECURITY.md) para a configuração segura, matriz de comportamento, testes e riscos ainda não cobertos. Não use senhas de exemplo em ambientes reais.

## Como Rodar

Backend:

```bash
cd backend
npm install
npm run start:dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

URLs padrão:

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`

## Verificação

Backend:

```bash
cd backend
npm run build
npm test
npx eslint "src/**/*.ts"
```

Frontend:

```bash
cd frontend
npm run build
npm run lint
```
