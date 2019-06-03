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

Dada essa definição rápida, o termo *esotérica* aqui qualifica que a linguagem está fora do mercado. Enquanto as linguagens que você conhece estão inseridas no dia a dia do trabalhador de código, essas são feitas por qualquer motivo que não seja o de produzir algo para o seu chefe: experimentação acadêmica, arte, zueira... E é por isso que infelizmente não se fala muito delas, apesar de existirem muitas. [São mais de mil resultados no github](https://github.com/search?p=1&q=esoteric&type=Repositories). Então aqui eu trago uma curadoria, uma *exposição* se preferir, de algumas dessas linguagens.

Lembrando que **todas** elas são *Turing Completas*, ou seja, **teoricamente** poderiam sim ser usadas para qualquer coisa.

## Dogescript

**Javascript for the moon**

![meme doge "such code", "many html"]({{ '/assets/img/esotericas/codedoge.jpg' | relative_url }})
{: .center-elem .small-img}

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

É [uma linguagem](https://esolangs.org/wiki/Javagrid) **2D**. Isso é uma piração muito grande que eu não sei explicar, só mostrar mesmo. É uma abordagem bem interessante, programar pra isso deve ser como jogar um jogo, montar um cubo mágico. Veja abaixo uma implementação do famoso *FizzBuzz*
```
                 |i:number,j:number|                 
                 |print(i)         |                 
                 |down(i+1,j)      |                 
                 |                 |                 
                 |                 |                 
                 |                 |                 
-----------------@-----------------@-----------------
i:number,j:number|i:number,j:number|i:number,j:number
print("Fizz")    |i>j end()        |print("FizzBuzz")
right(i+1,j)     |i%15=0 right(i,j)|left(i+1,j)      
                 |i%5=0 down(i,j)  |                 
                 |i%3=0 left(i,j)  |                 
                 |up(i,j)          |                 
-----------------@-----------------@-----------------
                 |i:number,j:number|                 
                 |print("Buzz")    |                 
                 |up(i+1,j)        |                 
                 |                 |                 
                 |                 |                 
                 |                 |
```

## BIRL
![Logo da linguagem: um homem musculoso com os braços para cima]({{ '/assets/img/esotericas/birl.png' | relative_url }})
{: .center-elem .small-img }

```
HORA DO SHOW
    CE QUER VER ESSA PORRA? ("Hello, World! Porra!\n");
    BORA CUMPADE 0;
BIRL
```

Apenas apreciem esta [obra de arte](https://birl-language.github.io/) que é a linguagem do Bambam. Ou melhor, a **B**ambam's "**I**t's show time" **R**ecursive **L**anguage.

## Yorlang

```
sọpé "báwo ni ayé";
```
> "hello world" em yorlang

[Yorlang](https://anoniscoding.github.io/yorlang/) é uma linguagem esotérica baseada no idioma nigeriano/congolês Iorubá. No [repositório do github](https://github.com/anoniscoding/yorlang), o [autor](https://github.com/anoniscoding) diz que tem o objetivo de programar na sua linguagem nativa. Me chamou a atenção porque não conhecia algo parecido com um idioma que não fosse ocidental.

* * *

E aí, conhece alguma linguagem *esotérica* que eu não mencionei? Manda aí nos comentários ;)