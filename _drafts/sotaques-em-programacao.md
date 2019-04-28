---
layout: post
title:  Sotaques em programação
date:   2019-04-05 13:20:00 -0300
description: Se você era muito fã de uma linguagem, isso pode estar te afetando ao trabalhar com outra, tanto para o bem quanto para o mal.
# image: path pra imagem
# altimg: descreva sua img
---
### Qual sua linguagem favorita?

Escuto tanto esta pergunta que já me acostumei a responder na ponta da língua: *a que paga meu salário*. Não quero dizer aqui que não tenho preferências. Definitivamente quero distância de coisas mais antigas da *microsoft* como *Visual Basic*, *SQL Server* ou *.NET*. Por mim o *Java* acabava, mesmo sendo minha primeira linguagem.

Entretanto, a ideia aqui não é resmungar ou ser **clubista**. Vamos refletir sobre um fenômeno bem comum na nossa categoria de infoploretários: o que estou chamando de "sotaque" em programação.

### Quando um "Javismo" é usado para o mal

Observe este pedaço de código:

~~~ javascript
const { createReadStream } = require('fs')
const { createInterface } = require('readline')
const { sqsPush } = require('../service/sqsPush')

const dependencies = {
    sqsPush,
    createReadStream,
    createInterface,
}

const processaArquivo = async (file) => {
    const { sqsPush, createReadStream, createInterface } = Object.assign({}, dependencies)
    // ... código que usa as funções sqsPush, createReadStream, createInterface...
}
~~~

O autor deste código quis reproduzir um conceito de frameworks MVC (principalmente java) chamado [injeção de dependência](https://blog.caelum.com.br/ioc-e-di-para-frameworks-mvc/){: title="inclusive recomendo qualquer material de estudo da caelum, são ótimos"}. Este conceito foi feito para facilitar [testes automatizados](https://pt.stackoverflow.com/questions/243862/o-que-%C3%A9-um-teste-automatizado) instanciando objetos automaticamente. Só que neste caso, o *javascript* não é uma linguagem fortemente tipada ou mesmo que obrigue todas as variáveis a serem um objeto de uma classe. Funções são um tipo em javascript. Logo, todas as "dependências" que estão ali **não precisam ser instanciadas** e aplicação deste conceito se torna desnecessária. O código abaixo funciona do mesmo jeito e tem exatamente o mesmo nível de dificuldade de ser testado automaticamente:

~~~ javascript
const { createReadStream } = require('fs')
const { createInterface } = require('readline')
const { sqsPush } = require('../service/sqsPush')

const processaArquivo = async (file) => {
    // ... código que usa as funções sqsPush, createReadStream, createInterface...
}
~~~