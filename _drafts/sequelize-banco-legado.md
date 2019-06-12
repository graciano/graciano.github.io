---
layout: post
title: "Causo: sequelize com banco legado e models compartilhados"
date: 2019-06-13 10:15:00 -0300
description: Pequeno guia usado na centralização de models compartilhados em micro-serviços que usam o mesmo banco de dados, além de como lidar com sequelize num banco legado
# image: assets/img/path/da/imagem.jpg
# altimg: descreva sua img
# img_full: true
---

Não vou justificar aqui um conjunto de micro-serviços usar do mesmo banco de dados. *elaborar*

## O Problema

Temos vários micro-serviços. Banco de dados legado. Não tem migration. Alterações numa tabela dão muito trabalho e consequências complicadas de dar manutenção pelos micro-serviços. *elaborar*

## Resultado esperado

Aqui está o processo que usei para criar um projeto que simplesmente exporta os models para os micro-serviços, como uma dependência destes. Ao mesmo tempo em que haverá a re-usabilidade de código, também passaremos a usar migrations.

## Mão na massa

Criei a pasta do meu projeto de models e entrei nela: `mkdir models && cd models`. Depois, eu criei um *dump* de criação do esquema atual do banco de dados legado. Caso você esteja usando **Postgre**, o comando seria
```
pg_dump -U usuario nome_do_banco --schema-only > cria-banco-legado.sql
```

Como o projeto é javascript, rodei e segui o passo a passo do `npm init` e depois instalei o sequelize: `npm i sequelize`. Também criei um arquivo `.gitignore` usando o https://gitignore.io. Depois desse *boilerplate* todo, podemos focar na necessidade do projeto: criar migrations e centralização dos models.

### Usando o sequelize

Seguindo o próprio [guia do sequelize](http://docs.sequelizejs.com/manual/getting-started), falta agora instalar o driver do seu banco de dados. Por enquanto, resolvi instalar como dependência de *desenvolvimento* o SQLite, que é um banco baseado em arquivo. Fiz isso porque não estou afim de me preocupar com criar uma conexão de verdade e um banco novo apenas para criar as migrations e ver o que funciona. Fiz isso com `npm i --save-dev sqlite3`. Criei uma maneira de acessar o sequelize com as opções vindo do próprio projeto e usei o `NODE_ENV` para determinar se acessaria o `sqlite` ou o driver escolhido pelo usuário, assim, no arquivo `index.js`: 

```javascript
const Sequelize = require('sequelize');

const sqliteOptions = {
  dialect: 'sqlite',
  storage: 'test-database.sqlite'
};

const useSqlite = () => [
  'sqlite',
  'test',
].includes(process.env.NODE_ENV);

const createSequelize = ({
  dbName,
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
  dbDialect,
}) => useSqlite() ? new Sequelize(sqliteOptions)
  : new Sequelize(
    dbName,
    dbUser,
    dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: dbDialect,
      logging: true,
      benchmark: false,
    },
  );

var sequelizeInstance;
const getSequelize = (options) => {
  if (!sequelizeInstance) {
    sequelizeInstance = createSequelize(options);
  }
  return sequelizeInstance;
};

const models = {};

module.exports = {
  getSequelize,
  ...models,
}
```

Agora precisamos criar as migrations, para isso é necessário o `sequelize-cli`. Ao rodar o `npx sequelize-cli init` eu percebi que o meu `index.js` faz o que o cli quer que seja o conteúdo do arquivo `models/index.js`. Isso precisava ser resolvido, já que a ideia é o projeto ser uma dependência de outros projetos, e não seguir a lógica imposta pelo padrão do cli. Para isso,investiguei melhor e descobri um arquivo de configuração chamado `.sequelizerc`.