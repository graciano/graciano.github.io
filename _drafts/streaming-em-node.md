---
layout: post
title:  "Causo: streamings, node, nuvem e busca binária"
date:   2019-04-17 13:40:00 -0300
description: O dia em que saber um algoritmo desses da faculdade me economizou muito tempo. Além disso, um pequeno guia introdutório para S3 e lambda da AWS usando um exemplo do mundo real, onde as coisas não são tão bonitinhas.
# image: path pra imagem
# altimg: descreva sua img
---

No meu trabalho atual, a gente mexe com as tais *funções lambda* da AWS. Basicamente a utilidade disso é ter um processo com começo, meio e fim, que não precisa de disponibilidade 24 horas por dia. Dado um *input*, é devolvido um *output* e morreu, acabou. A Amazon cobra por *100ms* executados. No caso aqui nós recebemos um arquivo com milhares de registros de transações financeiras e fazemos uma série de operações para cada uma. Uma vez por dia. Como não tem essa necessidade de disponibilidade, é mais barato do que manter um servidor ligado o dia inteiro que faça isso.

> **Observação**: a ideia aqui não é fazer propaganda da AWS, existem serviços equivalentes de outras grandes empresas. Estou falando da amazon por ser o que eu conheço, infelizmente ainda temos na prática quase um monopólio no quesito "computação em nuvem".

## Lambda

Imagine que ao receber o tal arquivo, um *evento* é disparado que roda a nossa função `handler`. Então no código abaixo, eu estou usando uma função `arquivoEvento()` que "entende" o evento disparado e exporta a URL do arquivo numa `string`. Além disso, espera a execução de uma `Promise` que processa o arquivo para finalmente retornar uma mensagem de sucesso.

~~~ javascript
exports.handler = async (event) => {
    const arquivo = arquivoEvento(event);
    await processaArquivo(arquivo);
    return 'Sucesso';
};
~~~
> **Outra observação:** códigos aqui meramente ilustrativos, não posso te mostrar o código real do trabalho. E nem seria bom para a ideia do texto.

## Simple Storage Service, ou S3


~~~ javascript
// cria um Streaming de evento, que converte os "chunks" do arquivo em linhas no evento 'line'
const byline = require('linebyline');
// explicar o throttle
const { Throttle } = require('stream-throttle');
// classe de acesso ao bucket no s3:
const { S3 } = require('aws-sdk');

const readlineS3 = arquivo => byline(new S3().getObject(arquivo)
    .createReadStream()
    .pipe(new Throttle({ rate: 9 * 1024 })));

const processaArquivo = (arquivo) => new Promise((resolve) => {
    const rl = readlineS3(arquivo);
    rl.on('line', async (line) => {
        // faz uma cacetada de operações de rede com o arquivo
    });
    rl.on('close', () => {
        logger.info('Arquivo lido com sucesso e mensagens enviadas a filas , total de linhas >', totalDeLinhas)
        resolve();
    });
});
~~~