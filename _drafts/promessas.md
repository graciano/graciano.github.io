---
layout: post
title:  Promessas em javascript
date:   2019-05-10 15:45:00 -0300
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
Esse tipo de abordagem acabou se padronizando para o uso de um callback único, que informa um erro no primeiro argumento e os argumentos de sucesso em sequência como `callback(erro, dados)`, por exemplo:
~~~ javascript
const retornaAlgoDoBanco = (parametros, booleanAleatorio, callback) => {
    // chama o banco usando os parametros e o booleanAleatorio
    // caso dê erro, "retorna" o erro, desta maneira
    callback(erro);
    // caso de sucesso, o erro é nulo e os dados são "retornados" no segundo argumento
    callback(null, dados);
}
~~~

Agora imagine se precisamos fazer chamadas dessas em sequência:

~~~ javascript
retornaAlgoDoBanco({
    id: 1
}, true, (err, dados) => {
    if (err) {
        console.log(err);
        // interrompe a execução da função, pois não há dados para serem usados
        return;
    }
    outraFuncComCalback(dados, (err, retornoDessaOutraFunc) => {
        if (err) {
            console.log(err);
            return;
        }
        usa(dados);
        retornaAlgoDoBanco({
            id: 2
        }, true, (err, maisDadosAinda) => {
            if (err) {
                console.log(err);
                return;
            }
            usa(maisDadosAinda);
        })
    });
});
~~~

Ao exemplo de cima damos o nome de *callback hell*. E [alguém genial traduziu para "pirâmide da desgraça" no guia da Mozilla em português](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Usando_promises).

## Promises

Quando alguém promete alguma coisa, como foi o meu caso ali em cima, só existem duas possibilidades: ou cumpre-se a promessa, ou se rejeita a ação. No Javascript é a mesma coisa. Ironicamente, a declaração de uma `Promise` se dá com um `callback`.
~~~ javascript
const promessaDoBanco = (parametros, booleanAleatorio) => new Promise((resolve, reject) => {
    // chama o banco usando os parametros e o booleanAleatorio
    // caso dê erro, "retorna" o erro, desta maneira
    reject(erro);
    // caso de sucesso "retorna" os dados
    resolve(dados);
});
~~~
