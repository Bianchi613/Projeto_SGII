# Segurança de banco e implantação do SGII

**Atualizado em 2026-11-03.** Registro do [PR #16](https://github.com/Bianchi613/Projeto_SGII/pull/16), já mesclado à `main`. Revisão estática, sem executar o sistema ou testes neste atendimento.

## Correção aplicada

`backend/src/app.module.ts` define o comportamento de `SequelizeModule.forRootAsync`. A opção `synchronize`, que pode alterar automaticamente tabelas para refletir modelos, passou a obedecer a duas condições:

- `NODE_ENV` deve ser diferente de `production`;
- `DB_SYNC` deve ser explicitamente `true`.

Por isso, **em produção a sincronização fica desligada mesmo que alguém defina `DB_SYNC=true`**. Em desenvolvimento, a opção padrão também mudou de `true` para `false`. O `backend/.env.example` foi atualizado.

O objetivo é evitar mudanças inesperadas no esquema e perda de compatibilidade com dados existentes em produção. **Isso não dispensa backup, migrations ou revisão da modelagem.**

## Configuração recomendada

Exemplo, **sem credenciais reais**:

```dotenv
NODE_ENV=production
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=<usuario_de_aplicacao>
DB_PASSWORD=<senha_segura>
DB_DATABASE=projeto_sgii
DB_SYNC=false
DB_LOGGING=false
JWT_SECRET=<segredo_aleatorio_seguro>
JWT_EXPIRES_IN=1h
```

Não versione o `.env`. Preserve o `JWT_SECRET` entre reinicializações. Use usuário PostgreSQL com permissões mínimas.

## Verificação do comportamento

Em `backend`:

```bash
npm install
npm run build
npm test
```

Depois valide com um **banco de testes**:

1. `NODE_ENV=production` e `DB_SYNC=true`: a sincronização automática deve permanecer desligada.
2. `NODE_ENV=development` e `DB_SYNC=false`: também deve permanecer desligada.
3. `NODE_ENV=development` e `DB_SYNC=true`: só habilite para experimentos isolados, se necessário.
4. Se um banco vazio não tiver tabelas, o sistema poderá não funcionar até que o esquema seja provisionado por migrações ou procedimento de implantação.
5. Confirme login, usuários, salas, chaves, reservas, inventário e relatórios com a estrutura de banco existente.

**Não execute testes de sincronização contra o banco de produção.** O passo de criação/atualização do esquema precisa ser planejado e auditado separadamente.

## Pontos pendentes

- Formalizar e versionar migrações de banco antes de distribuir o serviço como SaaS.
- Validar segregação de dados de diferentes instituições e autorização de cada operação.
- Revisar autenticação, autorização, proteção contra abuso e políticas de logs.
- Fazer backup e simular restauração antes de upgrades de banco.
- A existência de JWT não garante que todas as regras de acesso estejam corretas.

## Histórico

[PR #16: impedir sincronização automática em produção](https://github.com/Bianchi613/Projeto_SGII/pull/16). Se o sistema parar ao atualizar um banco sem esquema, o caminho correto é preparar migrations e dados, **não** reativar `DB_SYNC` em produção.