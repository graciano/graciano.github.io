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

Em Javascript, funções são um tipo de variável, por exemplo `const minhaFunc = () => 'olá mundo';`. Que, caso você não conheça ainda as *arrow functions*, é a mesma coisa que:
~~~ javascript
const minhaFunc = function() {
    return 'olá mundo';
}
~~~
Uma outra maneira de escrever a mesma coisa (porém redundante, porque a função não faz nada além de retornar a `string`), seria:
~~~ javascript
const minhaFunc = () => {
    return 'olá mundo';
}
~~~

Sendo as funções um tipo, pode-se passar uma função como argumento de outra, para ela ser executada no futuro. A esta função que é argumento de outra, dá-se o nome de *callback*. Um exemplo disso existe desde a era das trevas da linguagem e se chama `setTimeout`, por exemplo `setTimeout(() => console.log('Julinho da Van'), 3000)` printa "Julinho da Van" no seu console depois de 3 segundos (ou 3000 milissegundos).

Então, quem ainda usa jQuery deve conhecer a função `$.ajax`.
~~~ javascript
$.ajax({
    url: 'https://swapi.co/api/people/5/',
    success: function(princesaLeia) {
        console.log('dados da Princesa Leia', princesaLeia);
    },
    error: function(request, status, error) {
        console.log('erro de acesso na api do Star Wars', request.responseText);
    }
}).done(function() {
      console.log('terminei');
  });
~~~
Esse tipo de abordagem acabou se padronizando para o uso de um callback único, que informa um erro no primeiro argumento e os argumentos de sucesso em sequência, por exemplo:
~~~ javascript

callback(err, data);

const retornaAlgoDoBanco = (parametro, qualquerCoisa, callback) => {
    //
    callback(erro);
    callback(null, dados)
}

///callback hell
retornaAlgoDoBanco({
    id: 1
}, true, (err, dados) => {
    if (err) {
        return;
    }
    retornaAlgoDoBanco({
        id: 1
    }, true, (err, dados) => {
        if (err) {
            return;
        }
        usa(dados);
        retornaAlgoDoBanco({
            id: 1
        }, true, (err, dados) => {
            if (err) {
                return;
            }
            usa(dados);
        })
    })
    usa(dados);
})
~~~