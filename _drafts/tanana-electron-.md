---
layout: post
title:  "Tananã: ensinando música com o Electron"
date:   2019-03-29 10:00:00 -0300
description: Um projeto open source para aprender partituras em cima do electron, uma ferramenta javascript usada por Spotify, Discord, Slack, Skype e outros para criar apps que rodem em windows/gnu-linux/mac.
# image: path pra imagem
# altimg: descreva sua img
---

Talvez você já tenha ouvido falar do [electron](https://electronjs.org/). Ou talvez do [atom](https://atom.io/): o "editor de texto hackeável" do github. Para os desavisados, uma breve explicação: o Atom é um editor de texto em *javascript* feito pelo github. Na época era para rivalizar com o todo-poderoso Sublime Text. Hoje rivaliza mais com o VS code, também feito em electron, da microsoft, que comprou o github ¯\\_(ツ)_/¯. Esses editores, *que não são IDEs*, possuem APIs abertas para o desenvolvimento de plugins para todo o tipo de funcionalidade. Como o atom é feito em javascript, ele precisa de um motor que o faça rodar em tudo que é sistema operacional. Para resolver isso, usaram a engine do node e do chromium.

Mas, como você deve ter pensado, é uma ótima ideia ter um motor que possibilite executar javascript "nativamente" nos sistemas operacionais. Já existiam iniciativas assim, mas não deram muito certo. E daí, do Atom nasceu o Electron (anteriormente chamado de atom shell), que é exatamente isso: o core do projeto, onde você cria uma aplicação usando *html/css/javascript* e ele cria uma build que roda nativamente desktops afora. Em resumo é a mesma coisa que criar um webapp, mas usando o comando `$ electron pasta-com-um-html-e-js` para executar a sua versão nativa.


## Tananã: o software para treinar a leitura de partirura
Fui fazer um trabalho de Informática Aplicada ao Ensino na época da UFRJ e acabei escolhendo desenvolver uma coisa ambiciosa: um software para treinar partituras.

**Pausa para você rir da minha cara. Eu era ingênuo e pegava coisas demais para o meu caminhãozinho carregar.**

Continuando… a motivação do projeto é simples: eu, como músico, sei ler partitura, mas é como se eu fosse semi-analfabeto na parada. Imagine uma crinaça aprendendo a ler: "a.. va-ca é… ma-lha-da". Muitos outros músicos que eu conheço também compartilham deste problema e acharam a ideia boa: uma interface simples que mostre a partitura no tempo "correto" de execução da mesma. Porque a maioria dos softwares musicais ou tem uma interface horrível ou são muito voltados a profissionais. Uma exceção seria o maravilhoso flat.io, mas eles não têm o viés educativo. E eu precisava fazer alguma coisa pra passar no semestre ;)
