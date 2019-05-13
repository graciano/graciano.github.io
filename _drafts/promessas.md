---
layout: post
title:  Promessas em javascript
date:   2019-05-13 11:45:00 -0300
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

<iframe width="560" height="315" src="https://www.youtube.com/embed/E-uCHxs170k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

Porém, raríssimas são as vezes em que o programador declara uma nova Promise. Em geral, você vai **usar** uma API que **retorna** uma Promise, e cabe ao programador lidar com o sucesso ou a rejeição da Promise. Por exemplo, a função [fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) faz exatamente o que o antigo ajax do jQuery fazia:
~~~ javascript
fetch('https://swapi.co/api/people/5/')
    .then(res => console.log('dados da Princesa Leia', res.json()))
    .catch(err => console.log('erro de acesso na api do Star Wars', err));
~~~

Uma maneira de consertar a *pirâmide da desgraça* ali de cima seria com uma função `promisify`, por exemplo `promisify(retornaAlgoDoBanco)`, que retorna uma função que retorna uma Promise. Em node (mas também é possível usar no browser), o uso seria algo como:
~~~ javascript
const { promisify } = require('util'); // o pacote 'util' já vem no node nativo, a partir da versão 8
const promessaDeAlgoDoBanco = promisify(retornaAlgoDoBanco);

promessaDeAlgoDoBanco({ id: 1 }, true)
    .then(res => console.log('restultado do banco', res))
    .catch(err => console.log('erro de acesso ao banco', err));
~~~
A função `promisify` assume que seu último argumento é um *callback* naquele modelo `callback(erro, resultado)`. Uma implementação para o promisify um tanto ingênua seria o código abaixo. [Aqui tem um polyfill](https://github.com/ljharb/util.promisify/blob/master/implementation.js) para versões antes de node 8 que seria mais genérica e confiável.

> Note a assinatura desta primeira linha, que é uma função que retorna outra função (que receberia os argumentos da função que usa callback). Por fim, esta função "de dentro" retorna uma nova promise.
~~~ javascript
const promisify = (funcaoLegado) => (...args) => new Promise(
    (resolve, reject) => funcaoLegado(args, (res, err) => {
        if (err) reject(err);
        else resolve(res);
    })
);
~~~

Agora ainda fica uma questão. Mesmo que seja uma *arrow function* bonitinha, nós **ainda estamos usando callbacks**, mesmo que seja de uma maneira mais padronizada. E é aí que vem um *[açúcar sintático](https://pt.wikipedia.org/wiki/A%C3%A7%C3%BAcar_sint%C3%A1tico)*: as keywords async/await.

### Async/Await
`async` é um açúcar sintático para declarar uma função assíncrona que retorna uma promise implicitamente. E `await` é um açúcar sintático para esperar o resultado de uma promise. Em caso de rejeição, um erro é lançado e será necessário usar o bloco *try/catch*. E é só isso. Isso resolve a *pirâmide da desgraça* de uma vez por todas. Vamos aos exemplos, baseados nos exemplos anteriores:
~~~ javascript
try {
    const promessaDeAlgoDoBanco = promisify(retornaAlgoDoBanco);
    const resultado = await promessaDeAlgoDoBanco({ id: 1 }, true);
} catch(err) {
    console.log('erro de acesso ao banco', err);
}
~~~

Ou se fosse o caso de implementar o acesso ao banco diretamente como uma função assíncrona:
~~~ javascript
const retornaAlgoDoBanco = async (parametros, booleanAleatorio) => {
    // chama o banco usando os parametros e o booleanAleatorio
    // caso dê erro
    throw new Error('erro de acesso ao banco');
    // caso de sucesso, o erro é nulo e os dados são "retornados" no segundo argumento
    return dados;
}
~~~

Ao afirmar que uma função assíncrona retorna uma Promise de maneira *implícita*, significa que o interpretador do Javascript é *bem espertinho* e vai resolver as promises que forem possíveis de serem resolvidas *antes da execução*. O que torna o seguinte código redundante:
~~~ javascript
const assincrono = async () => {
    // ...
    return await dados;
}
~~~

Bem, era isso. Espero ter cumprido minha promessa (;