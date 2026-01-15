> ⚠️ **Nota:** Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica em um processo seletivo.

# 🚜 Agri Manager

API para gerenciar produtores rurais.

## 📋 Pré-requisitos

- **Node.js** (v22.14 ou superior)
- **Docker** e **Docker Compose**
- **NPM**

---

## ⚙️ Configuração Inicial

```bash
# Crie a .env conforme a .env.example do projeto
cp .env.example .env
```

## 🚀 Executando o projeto

### 🐳 Opção 1 - docker-compose

Sobe a API e o Banco de Dados automaticamente.

```bash
# Constrói a imagem e sobe os containers em background
docker-compose up --build -d

# Acompanhe os logs da API
docker-compose logs -f agri_manager_api
```

### 🖥️ Opção 2 - local

```bash
# Subir o banco de dados
docker-compose up agri_manager_db -d

# Instale as dependências
npm install

# Executa as migrations
npm run prisma:migrate:dev

# Gera os clientes do Prisma
npm run prisma:generate

# Inicia em modo watch
npm run start:dev
```

## 🧪 Testes

```bash
# Testes Unitários
npm run test

# Cobertura de Testes (Coverage)
npm run test:cov
```

## 📖 Facilitadores

Ferramentas para auxiliar no desenvolvimento:

- Documentação (Swagger): Acesse http://localhost:3000/docs para testar as rotas.
- Prisma Studio: Interface visual para gerenciar os dados do banco:

  ```bash
  npm run prisma:studio
  ```

- Reset Total (Cuidado 🧨): Zera o banco de dados, recria as tabelas e roda o seed automaticamente. ❗Somente para ambiente de desenvolvimento❗
  ```bash
  npx prisma migrate reset
  ```

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construção de aplicações eficientes e escaláveis.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- **[Prisma](https://www.prisma.io/)**: ORM (Object-Relational Mapping) moderno e performático.
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional robusto e open-source.
- **[Jest](https://jestjs.io/)**: Framework de testes focado em simplicidade.
- **[Swagger](https://swagger.io/)**: Ferramenta para documentação e teste de APIs (OpenAPI).
