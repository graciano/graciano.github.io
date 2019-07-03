---
layout: post
title:  Ordenação de Arrays em Javascript
date:   2019-07-03 17:32:00 -0300
description: Uma erro muito comum cometido ao usar a função Array.sort()
# image: assets/img/path/da/imagem.jpg
# altimg: descreva sua img
# img_full: true
permalink: /:categories/:year/:month/:day/ordenacao-array-javascript-sort-funcao-funcional
---

Vejo muitos programadores javascript cometerem um erro básico ao usar a função de ordenação de arrays. Aqui um tutorial de como usar a função e uma correção para as abordagens "erradas" que vejo por aí.

Para o tutorial, vamos considerar este array, onde os pilotos podem ser ordenados por ordem alfabética de nome ou veículo, ou também por idade:
```javascript
const listaPilotos = [
    {
      nome: 'Rogerinho do Ingá',
      veiculo: 'Sprinter Azul e Vermelha',
      idade: 38,
    },
    {
      nome: 'Maurílio dos Anjos',
      veiculo: 'Kombi Branca 84',
      idade: 32,
    },
    {
      nome: 'Julinho da Van',
      veiculo: 'Sprinter Branca',
      idade: 31,
    },
    {
      nome: 'Renan',
      veiculo: 'Towner Azul Bebê',
      idade: 42,
    },
];
```

### Introdução à função sort()
Se você já conhece a função, [clique aqui para pular a explicação](#abordagem-incorreta). Ao receber o array de pilotos acima, digamos que nós queremos ordenar os pilotos por ordem alfabética do campo `nome`. A variável `listaPilotos` é um array e possui a função `sort()`, que pode receber uma função de comparação como argumento. Esta função de comparação recebe dois elementos do array (por exemplo, `a` e `b`) como argumento e precisa retornar:

 - um número negativo, caso `a` deva ser ordenado antes de `b`
 - um número positivo, caso `b` deva ser ordenado antes de `a`
 - zero, caso seja indiferente a ordem entre os dois elementos; em outras palavras, são considerados "iguais"

Um exemplo parecido com a [documentação da função na mozilla](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) para ordenar um array de objetos por um campo string seria:

```javascript
const pilotosOrdenados = listaPilotos.sort((a, b) => {
  const nomeA = a.nome.toUpperCase();
  const nomeB = b.nome.toUpperCase();
  if (nomeA === nomeB) {
    return 0;
  } else if (nomeA < nomeB) {
    return -1;
  } else {
    return 1;
  }
});
```

### Abordagem incorreta

Muita gente acredita que o retorno da função de comparação precise **necessariamente** ser apenas 1 ou -1 ao invés de **qualquer valor** positivo ou negativo respectivamente. Dessa maneira, ao ordenar por idade, acabam usando lógicas complicadas de maneira desnecessária, por exemplo:
```javascript
const pilotosOrdenados = listaPilotos.sort((a, b) => {
  if (a.idade === b.idade) {
    return 0;
  } else if (a.idade < b.idade) {
    return -1;
  } else {
    return 1;
  }
});
```

Ou a alternativa em uma linha (confesso que já usei): `listaPilotos.sort((a, b) => Math.sign(a.idade - b.idade))`. Isso porque a função `Math.sign()` [retorna justamente 1, -1 ou 0](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/sign), dependendo do **sinal** do valor informado.

### Abordagem correta

Como você provavelmente já percebeu, usar o `Math.sign()` na função de comparação não é necessário. Logo, a maneira correta (para números) fica *bem mais simples*:
```javascript
const ordenados = listaPilotos.sort((a, b) => a.idade - b.idade);
```

No caso de strings, existe a função [localeCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare), que já retorna o necessário para a função `sort` no formato esperado, então ficaria assim:

```javascript
const ordenados = listaPilotos.sort((a, b) => a.nome.localeCompare(b.nome));
```

Ou caso seja realmente necessário não ser *case sensitive*: 
```javascript
const ordenados = listaPilotos.sort((a, b) => a.nome.localeCompare(
  b.nome,
  'pt-br',
  { sensitivity: 'base' },
));
```