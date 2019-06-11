---
layout: post
title: Como usar sequelize em banco de dados legado
date: 2019-06-13 10:15:00 -0300
description: Pequeno guia usado na centralização de models compartilhados em micro-serviços que usam o mesmo banco de dados
# image: assets/img/path/da/imagem.jpg
# altimg: descreva sua img
# img_full: true
---

Não vou justificar aqui um conjunto de micro-serviços usar do mesmo banco de dados.

## O Problema

Temos vários micro-serviços

## Resultado esperado

Aqui está o processo que usei para criar um projeto que simplesmente exporta os models para os micro-serviços, como uma dependência destes. Ao mesmo tempo em que haverá a re-usabilidade de código, também passaremos a usar migrations.

## Mão na massa
