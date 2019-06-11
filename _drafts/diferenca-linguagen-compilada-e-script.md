---
layout: post
title: Diferenças entre linguagens compiladas e de script
date: 2019-06-13 10:15:00 -0300
description: Uma visão pessoal de como entender e lidar com as diferenças práticas entre o compilado e o script.
# image: assets/img/path/da/imagem.jpg
# altimg: descreva sua img
# img_full: true
---

Compilada é puramente "declarativo", no sentido em que os comandos da linguagem necessariamente estão dentro de um contexto, que é uma função, ou o método de uma classe. Exemplo: rust, java, C, C++

Script mistura essa questão "declarativa" com comandos "soltos", livres de contexto, o que na prática significa que estão no contexto global. Um código script pode existir sem funções ou métodos. Exemplo shell, ruby, javascript, php.