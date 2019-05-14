---
layout: post
title:  "Causo: streamings, node, nuvem e busca binária"
date:   2019-05-09 17:06:00 -0300
description: O dia em que saber um algoritmo desses da faculdade me economizou muito tempo. Além disso, um pequeno guia introdutório para S3 e lambda da AWS usando um exemplo do mundo real, onde as coisas não são tão bonitinhas.
image: assets/img/cloud.jpg
altimg: Nuvens vistas de cima no céu. Com o efeito 3D de sempre
img_full: true
---

Vou contar a história do dia em que saber um algoritmo desses da faculdade (*busca binária*) me economizou muito tempo. E ao mesmo tempo, para contexto, o post acaba se tornando uma espécie de guia introdutório para *streaming* no node, *S3* e *lambda* da AWS usando um exemplo do mundo real, onde as coisas não são tão bonitinhas. Se você já sabe [promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise), vem comigo.

## Lambda

No meu trabalho atual, a gente mexe com as tais *funções lambda* da AWS. Basicamente a utilidade disso é ter um processo com começo, meio e fim, que não precisa de disponibilidade 24 horas por dia. Dado um *input*, é devolvido um *output* e morreu, acabou. A Amazon cobra por *100ms* executados. No caso aqui nós recebemos um arquivo com milhares de registros de transações financeiras e fazemos uma série de operações para cada uma. Uma vez por dia. Como não tem essa necessidade de disponibilidade, é mais barato do que manter um servidor ligado o dia inteiro que faça isso.

> **Observação**: a ideia aqui não é fazer propaganda da AWS, existem serviços equivalentes de outras grandes empresas. Estou falando da amazon por ser o que eu conheço, infelizmente ainda temos na prática quase um monopólio no quesito "computação em nuvem".

Imagine que ao receber o tal arquivo, um *evento* é disparado que roda a nossa função `handler`. Então no código abaixo, eu estou usando uma função `arquivoEvento()` que "entende" o evento disparado e exporta a URL do arquivo numa `string`. Além disso, espera a execução de uma `Promise` que processa o arquivo para finalmente retornar uma mensagem de sucesso.

~~~ javascript
exports.handler = async (event) => {
    const arquivo = arquivoEvento(event);
    await processaArquivo(arquivo);
    return 'Sucesso';
};
~~~
> **Outra observação:** códigos aqui meramente ilustrativos, até porque não posso mostrar o código real do trabalho. E nem seria bom para comunicar a ideia.

## Simple Storage Service, ou S3

A ideia do S3 é basicamente você ter um HD na internet. Pode ser usado pra guardar *assets*, backups, relatórios... Enfim, qualquer tipo de arquivo. Cada *bucket* é um "HD" desses. No nosso caso, um parceiro sobe o arquivo de uma remessa para o nosso bucket. Esta ação é o *trigger* que dispara a nossa função lambda, ou seja, os dados sobre o arquivo estão no objeto `event`, que seria um dos argumentos da lambda.

Na função `processaArquivo` usada dentro da `handler`, recebemos como argumento a `string` da URL do nosso arquivo dentro do bucket, algo como `s3-sa-east-1.amazonaws.com/nome-do-meu-bucket/caminho/para/o/arquivo.txt`. Usamos a sdk da própria Amazon para baixar o arquivo, a partir da promise `getObject`:

~~~ javascript
// classe de acesso ao bucket no s3:
const { S3 } = require('aws-sdk');

const processaArquivo = async (arquivo) => {
    const conteudo = await new S3().getObject(arquivo);
    conteudo.split('\n').map(async (line) => {
        // faz uma cacetada de operações de rede com cada linha do arquivo
    });
    return 'sucesso';
};
~~~

## Streaming

Imagine agora que este arquivo é muito grande. No exemplo acima, esperamos a Promise ser resolvida para aí então iterar pelas linhas do arquivo e ainda alocando ele todo na memória para isso. Um streaming de leitura é um objeto que emite um evento toda vez que ele recebe dados. A função `getObject` da sdk da AWS possui uma outra função `createReadStream()` que é exatamente este stream de leitura. O código abaixo é uma adaptação do código anterior, usando a API de streams.

~~~ javascript
const readlineS3 = arquivo => new S3().getObject(arquivo).createReadStream();

const processaArquivo = (arquivo) => new Promise((resolve) => {
    const rl = readlineS3(arquivo);
    rl.on('data', async (chunk) => {
        // faz uma cacetada de operações de rede com o arquivo
    });
    rl.on('close', () => {
        console.log('Arquivo lido com sucesso e mensagens enviadas a filas');
        console.log('Total de linhas >', totalDeLinhas);
        resolve('sucesso');
    });
});
~~~
Porém este código não funciona, pois o evento do streaming da AWS não devolve uma linha exata do arquivo, mas um "chunk" de dados. Como streams podem ser conectadas, isso pode ser resolvido com o pacote disponível no npm `linebyline`:
~~~ javascript
// cria um Streaming de evento, que converte os "chunks" do arquivo em linhas no evento 'line'
const byline = require('linebyline');

const readlineS3 = arquivo => byline(new S3().getObject(arquivo)
    .createReadStream());
const processaArquivo = (arquivo) => new Promise((resolve) => {
    const rl = readlineS3(arquivo);
    rl.on('line', async (line) => {
        // aqui de fato é uma linha do arquivo
    });
    rl.on('close', () => {
        //...
        resolve('sucesso');
    });
});
~~~

## Nem tudo são flores

Como avisado anteriormente, este é um exemplo do mundo real, onde as coisas podem ficar bem feias. Você pode ter notado que na parte em que processamos a linha, eu deixei um comentário que dizia *"faz uma cacetada de operações de rede com o arquivo"*. Acontece que na AWS há um limite de requests HTTP abertos ao mesmo tempo, e cada evento de `line` não é garantido de entrar na mesma ordem ou mesmo de serem sequenciais no [event loop](https://medium.com/@bohou/understanding-nodejs-event-loop-without-a-computer-science-degree-e1c9250d583f). Consequência: o arquivo era bastante grande e esse limite causava erros. Por causa disso, precisávamos criar um tamanho máximo de dados para ser processado por vez.
Mais uma vez, um pacote do npm para nos salvar, no caso o `stream-throttle`, que pega qualquer stream e limita a publicação dos eventos dela de acordo com um número de bytes que você informa, em que no caso a função `readlineS3` ficou assim, limitando a *2KB*:

~~~ javascript
const { Throttle } = require('stream-throttle');
const readlineS3 = arquivo => byline(new S3().getObject(arquivo)
    .createReadStream()
    .pipe(new Throttle({ rate: 2 * 1024 }))); // 2KB de throttle
~~~

### OK, mas e a busca binária?

O limite de *2KB* acima foi totalmente arbritário. Tratamos isso como um limite inferior, por ser um valor baixo e demorar para executar. No mínimo esse seria o parâmetro. Porém, ao mesmo tempo em que já funcionava, a AWS cobra por cada 100ms de execução da nossa função. Então se tornava necessário descobrir qual o limite superior de bytes da operação. Multipliquei esse valor por 10 e tentei rodar a função com 20KB. O erro aconteceu. Lembrando que como o arquivo era grande, um teste demorava **em torno de 2 minutos** com o throttling de 2KB.

**Agora nós temos exatamente o enunciado de uma busca binária.**. Sabemos o limite superior e o inferior de um conjunto ordenado. Agora é testar se funciona no meio do caminho para achar um novo limite superior ou inferior. E então, dividir e conquistar: repetir o processo "recursivamente" com os novos valores para limite superior e inferior até achar um valor que faça sentido.

Em código, uma versão **bem simplificada** seria:
~~~ javascript
const busca = (inicio, fim, lista, valor) => {
    const meio = Math.floor((inicio + fim) / 2);
  if (lista[meio] === valor) return meio;
    if (lista[meio] > valor) return busca(meio, fim, lista, valor);
    return busca(inicio, meio, lista, valor);
}
~~~
E adaptando para a ideia aqui, não há uma lista e quem vai rodar a "busca" é a minha cabeça, então seria algo como o código abaixo, dentro de um critério de precisão, já que não há condição de parada.
~~~ javascript
const busca = (ini, fim) => {
    const meio = ((fim - ini) / 2) + ini;
    if( rodaSemErro(meio) ) return buscaInt(meio, fim);
    // critério de precisão...
    return buscaInt(ini, meio);
}
~~~~

O meio do caminho entre 2 e 20 seria `((20KB - 2KB) / 2) + 2KB = 11KB`. Ainda dava erro. 11KB se tornou o novo limite superior. `((11KB - 2KB) / 2) + 2KB = 6.5KB` que funcionava. Se tornou o limite inferior, e assim por diante... 8.75 dava erro e 7.25 não. Eu poderia continuar para mais precisão, mas achei justo parar por aqui e coloquei no código: `{ rate: 7.25 * 1024 }`. Achei um número otimizado em 4 tentativas. Mais ou menos 5 minutos. Imagine quantas tentativas seria se eu fosse incrementando 2.1KB, 2.2KB...

A maioria dos blogs de programação por aí te dão tutoriais super formais com exemplos abstratos. Isso tem sua utilidade, mas sinto que falta um toque mais de *"contar causo"*, uma vibe de bar mesmo, pois com as experiências reais se aprende muito. Se gostar me conta aí nos comentários ;) 
