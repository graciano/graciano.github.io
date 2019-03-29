---
layout: post
title:  "Tananã: ensinando música com o Electron"
date:   2019-03-29 10:00:00 -0300
description: Um projeto open source para aprender partituras em cima do electron, uma ferramenta javascript usada por Spotify, Discord, Slack, Skype e outros para criar apps que rodem em windows/gnu-linux/mac.
# image: path pra imagem
# altimg: descreva sua img
---

Talvez você já tenha ouvido falar do [electron](https://electronjs.org/). Ou talvez do [atom](https://atom.io/): o "editor de texto hackeável" do github. Para os desavisados, uma breve explicação: o Atom é um editor de texto em *javascript* feito pelo github. Na época era para rivalizar com o todo-poderoso Sublime Text. Hoje rivaliza mais com o VS code, também feito em electron, da microsoft, que comprou o github ¯\\_(ツ)_/¯. Esses editores, *que não são IDEs*, possuem APIs abertas para o desenvolvimento de plugins para todo o tipo de funcionalidade. Como o atom é feito em javascript, ele precisa de um motor que o faça rodar em tudo que é sistema operacional. Para resolver isso, usaram a engine do node e do chromium.

Mas, como você deve ter pensado, é uma ótima ideia ter um motor que possibilite executar javascript "nativamente" nos sistemas operacionais. Considerando que existem muito mais programadores que sabem web do que as tecnologias que normalmente rodam nativamente nos sistemas operacionais: C++, C#, Java, essas linguagens **chatas** ¯\\_(ツ)_/¯. Já existiam iniciativas nesse sentido de trazer a web para o nativo, mas não deram muito certo. E daí, do Atom nasceu o Electron (anteriormente chamado de atom shell), que é exatamente isso: o core do projeto, onde você cria uma aplicação usando *html/css/javascript* e ele cria uma build que roda nativamente desktops afora. Em resumo, o ambiente de desenvolvimento é a mesma coisa que criar um *webapp*, mas usando o comando `$ electron pasta-com-um-html-e-js` para executar o app ao invés de acessar pelo navegador.


## Tananã: o software para treinar a leitura de partirura
Fui fazer um trabalho de Informática Aplicada ao Ensino na época da UFRJ (lá em 2016) e acabei escolhendo desenvolver uma coisa ambiciosa: um software para treinar partituras.

**Pausa para você rir da minha cara. Eu era ingênuo e pegava coisas grandes demais de lidar sozinho.**

A motivação do projeto é simples: eu, como músico, sei ler partitura, mas é como se eu fosse semi-analfabeto na parada. Imagine uma criança aprendendo a ler: *"a.. va-ca é… ma-lha-da"*. Muitos outros músicos que eu conheço também compartilham deste problema e acharam a ideia boa: uma interface simples que mostre a partitura no tempo "correto" de execução da mesma. Porque a maioria dos softwares musicais ou tem uma interface horrível ou são muito voltados a profissionais. Uma exceção seria o maravilhoso [flat.io](https://flat.io/), mas eles não têm o viés educativo. E eu precisava fazer alguma coisa pra passar no semestre ;)

No estado atual, o projeto abre um arquivo do formato [music XML](#o-formato-music-xml) e exibe numa partitura em SVG (graças ao [open sheet music display](https://opensheetmusicdisplay.org/)). Mas ainda não tenho uma versão pronta para *testes com humanos*. A UX ainda está bem ruim e essa não é minha especialidade (*[send help](https://github.com/tananamusic/tanana/fork)*).

### Ideias mirabolantes demais

Imagina que louco se eu consigo sincronizar um teclado no computador via uma USB da vida e verificar se você tá tocando a música corretamente? Bem, sonhar é de graça.

### O formato Music XML
https://www.musicxml.com/

### A questão da UX
Estou considerando usar vuejs para a interface. Comenta aí o que tu acha
