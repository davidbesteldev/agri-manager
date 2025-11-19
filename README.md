# Agri Manager

API para gerenciar produtores rurais.

## 🚀 Run project

```bash
# Crie a .env conforme a .env.example do projeto
cp .env.example .env

# Instale as dependências
npm install

# Executa as migrations
npm run prisma:migrate:dev

# Gera os clientes do Prisma
npm run prisma:generate

# Inicia em modo watch
npm run start:dev
```

## 🧪 Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## 📖 Facilitators

- Acesse a documentação das rotas via **Swagger**: [http://localhost:3000/docs](http://localhost:3000/docs)
- Visualize rapidamente os dados com:

  ```bash
  npm run prisma:studio
  ```

- Zera o banco de dados, recria as tabelas e roda o seed automaticamente ❗somente para desenvolvimento❗:
  ```bash
  npx prisma migrate reset
  ```

---
