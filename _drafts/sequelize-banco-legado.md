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