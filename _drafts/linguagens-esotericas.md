---
layout: post
title:  Linguagens Esotéricas
date:   2019-06-04 10:20:00 -0300
description: Uma lista de linguagens de programação que não foram feitas para servir a uma lógica de mercado.
image: assets/img/matrix.jpg
altimg: rosto do agente Smith com o efeito de caracteres verdes do filme Matrix
img_full: true
---

A definição do que é uma Linguagem de programação não é algo que nossa categoria de trabalhadores pensa muito. Na Ciência da Computação é a mesma coisa que dizer que é uma *Máquina de Turing Completa*. Nos termos das Humanas (pois é, o [Chomsky é um cara foda](https://pt.wikipedia.org/wiki/Hierarquia_de_Chomsky)) é dizer que é uma linguagem *sensível ao contexto*. Nos termos de *uma conversa de bar* é um bagulho que consegue fazer o que um computador consegue, mas não necessariamente o que um ser humano consegue.

Dada essa definição rápida, o termo *esotérica* aqui qualifica que a linguagem está fora do mercado. Se as linguagens que você conhece estão inseridas no dia a dia do trabalhador de código, essas são feitas por qualquer motivo que não seja o de produzir algo para o seu chefe: experimentação acadêmica, arte, zueira... E é por isso que infelizmente não se fala muito delas, apesar de existirem muitas. [São mais de mil resultados no github](https://github.com/search?p=1&q=esoteric&type=Repositories). Então aqui eu trago uma curadoria, uma *exposição* se preferir, de algumas dessas linguagens.

Lembrando que **todas** elas são *Turing Completas*, ou seja, **teoricamente** poderiam sim ser usadas para qualquer coisa.

## Dogescript

**Javascript for the moon**

![meme doge "such code", "many html"]({{ '/assets/img/esotericas/codedoge.jpg' | relative_url }})
{: .center-elem }

Como eu gostava desse meme. Como declarar uma string? `very value is 'banana'`. [É uma linguagem que compila pra javascript](https://dogescript.io/). Você me pergunta *"por quê?"* e eu te devolvo com *"por que não?"*

## Brainfuck

Com o objetivo de ser difícil pra caralho, essa linguagem possui apenas 8 comandos: `>`, `<`, `+`, `-`, `.`, `,`, `[` e `]`. [No artigo da wikipédia](https://en.wikipedia.org/wiki/Brainfuck#Language_design) é possível ver o que cada comando faz. Sendo Turing Completa, essa linguagem pode ser usada para qualquer problema computacional. Obviamente, não é porque você pode que você deveria fazer isso.

## JS Fuck

Com nome inspirado no BrainFuck, o [JS Fuck](http://www.jsfuck.com/) é javascript **válido**. São apenas 6 caracteres que por motivos esquisitos da origem do javascript simplesmente funciona. Diferente do *dogescript*, a parada simplesmente roda no browser. Dúvida que vai rodar? Copia aí e cola no console do teu navegador (`ctrl+shift+c`):
{% gist 49c80016bb5d280936ce10ff4fa312c4 jsfuck.js %}

## Arnoldc

![Exterminador do futuro segurando uma 12]({{ '/assets/img/esotericas/terminator.jpg' | relative_url }})
{: .center-elem }

```
IT'S SHOWTIME
TALK TO THE HAND "hello world"
YOU HAVE BEEN TERMINATED
```
Você acabou de ler o *"hello world"* da linguagem [Arnoldc](https://github.com/lhartikk/ArnoldC#arnoldc). E o mais legal é que esta não será a última vez que você vai ver a expressão "It's showtime" ser usada numa linguagem 😆

## Emojicode 😆

```
🏁 🍇
  😀 🔤Hello World!🔤❗️
🍉
```
> Hello world em emojicode

[Nessa linguagem](https://www.emojicode.org/docs/reference/basics.html), o tipo boolean (👌) pode ser `true` (👍) ou `false` (👎).

## Javagrid

É uma linguagem 2D. Isso é hilário. Veja abaixo uma implementação do famoso *FizzBuzz*

https://esolangs.org/wiki/Javagrid

## BIRL

Apenas apreciem esta obra de arte que é a linguagem do Bambam
https://birl-language.github.io/

## Yorlang (yoruba)
https://github.com/anoniscoding/yorlang
https://anoniscoding.github.io/yorlang/