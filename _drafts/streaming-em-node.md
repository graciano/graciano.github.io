---
layout: post
title:  "Causo: streamings, node, nuvem e busca binária"
date:   2019-04-17 13:40:00 -0300
description: O dia em que saber um algoritmo desses da faculdade me economizou muito tempo. Além disso, um pequeno guia introdutório para S3 e lambda da AWS usando um exemplo do mundo real, onde as coisas não são tão bonitinhas.
# image: path pra imagem
# altimg: descreva sua img
---

A maioria dos blogs de programação por aí te dão tutoriais super formais com exemplos abstratos. Isso tem sua utilidade, mas sinto que falta um toque mais de *"contar causo"*, pois com as experiências reais se aprende muito. Por isso este post não é um tutorial comum como se vê por aí. O objetivo é falar sobre o dia em que saber um algoritmo desses da faculdade (*busca binária*) me economizou muito tempo. E ao mesmo tempo ser uma espécie de guia introdutório para *streaming* no node, *S3* e *lambda* da AWS usando um exemplo do mundo real, onde as coisas não são tão bonitinhas. Se você já sabe [promises], vem comigo.

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

Na função `processaArquivo` usada dentro da `handler`, recebemos como argumento a `string` da URL do nosso arquivo dentro do bucket, algo como `https://s3-sa-east-1.amazonaws.com/nome-do-meu-bucket/caminho/para/o/arquivo.txt`. Usamos a sdk da própria Amazon para baixar o arquivo, a partir da promise `getObject`:

~~~ javascript
// classe de acesso ao bucket no s3:
const { S3 } = require('aws-sdk');

const processaArquivo = async (arquivo) => {
    const rl = readlineS3(arquivo);
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

Como avisado anteriormente, este é um exemplo do mundo real, onde as coisas podem ficar bem feias. Você pode ter notado que na parte em que processamos a linha, eu deixei um comentário que dizia *"faz uma cacetada de operações de rede com o arquivo"*. Acontece que, na AWS, há um limite de requests abertos ao mesmo tempo, e cada evento de `line` não é garantido de entrar na mesma ordem ou mesmo de serem sequenciais no [event loop](https://medium.com/@bohou/understanding-nodejs-event-loop-without-a-computer-science-degree-e1c9250d583f). Consequência: o arquivo era bastante grande e esse limite causava erros. Por causa disso, precisávamos limitar um tamanho máximo de dados para ser processado por vez.

~~~ javascript
// explicar o throttle
const { Throttle } = require('stream-throttle');
const readlineS3 = arquivo => byline(new S3().getObject(arquivo)
    .createReadStream()
    .pipe(new Throttle({ rate: 9 * 1024 })));

const processaArquivo = (arquivo) => new Promise((resolve) => {
    const rl = readlineS3(arquivo);
    rl.on('line', async (line) => {
        // faz uma cacetada de operações de rede com o arquivo
    });
    rl.on('close', () => {
        console.log('Arquivo lido com sucesso e mensagens enviadas a filas');
        console.log('Total de linhas >', totalDeLinhas);
        resolve('sucesso');
    });
});
~~~