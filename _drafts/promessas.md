---
layout: post
title:  Promessas em javascript
date:   2019-04-05 13:20:00 -0300
description: Eu te prometo que você finalmente vai entender esse conceito do javascript e seus usos reais depois de ler este texto.
# image: path pra imagem
# altimg: descreva sua img
---
## Antes de explicar o que é Promessa, uma Promessa

Eu prometo que vou explicar as promises, mas **antes, vou trazer aqui o contexto de como elas surgiram**, porque o mundo real não é um tutorial de internet e você vai acabar se deparando com um sistema legado cheio de *callbacks* por aí.

## Callbacks

Em Javascript, funções são um tipo de variável:
~~~ javascript
const minhaFunc = function() {
    return 'olá mundo';
}
~~~
Logo, eu posso passar uma função como argumento de outra, para ela ser executada no futuro. Um exemplo disso existe desde a era das trevas da linguagem e se chama `setTimeout`:
~~~ javascript
~~~