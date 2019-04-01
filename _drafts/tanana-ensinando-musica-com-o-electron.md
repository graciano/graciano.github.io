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

No estado atual, o projeto abre um arquivo do formato [music XML](#o-formato-music-xml) e exibe numa partitura *navegável* em SVG (graças ao [open sheet music display](https://opensheetmusicdisplay.org/)). *Navegável* aqui significa que tem um botão de *play/pause* pra um cursor que indica que nota deve ser tocada no período correto de tempo. Inclusive uma evolução natural disso vai ser uma customização do *bpm* da "execução" da partirura. Mas infelizmente ainda não tenho uma versão pronta para *testes com humanos*. A UX também está bem ruim e essa não é minha especialidade, (*[por favor, me mandem PRs](https://github.com/tananamusic/tanana/fork)*).

### Ideias mirabolantes demais

Imagina que louco se eu consigo sincronizar um teclado no computador via uma USB da vida e verificar se você tá tocando a música corretamente? Ou isso com um microfone pra ver se a pessoa cantou afinado? Ou um tutorial interativo que ensine o básico de o que é uma nota, uma escala, etc? Bem, *sonhar é de graça*. Óbvio que a prioridade no momento é outra. Afinal, tenho que criar um [MVP]({% post_url 2019-03-26-jekyll-cms-baseado-em-arquivos %}#mvp) antes de tornar essas coisas possíveis.

Falando em ideias mirabolantes, preciso deixar registrado aqui a treta gigante que foi decidir o formato escolhido. Antes de eu dar de cara num problemão e pesquisar de maneira apropriada, eu tentei converter um arquivo MIDI para partitura. Um arquivo MIDI é basicamente uma lista de **instruções para execução da música**. Então ao executar um MIDI normalmente o que a gente escuta é um "instrumento" robotizado bem básico estilo joguinhos da época do *game boy*. É o formato usado por exemplo em instrumentos sintetizadores, mas aí a "voz" do instrumento é cuidada por outros aspectos do teclado e do software, que não nos interessam para o assunto.

Quem já sabe um pouco sobre o assunto provavelmente já percebeu o tamanho da treta que foi isso. **Instruções para execução da música** não determinam de maneira única como escrever a música. Diferente do português, que é um idioma em que na maioria dos casos só há uma única maneira de se escrever um som, na música não é bem assim. Se eu toco uma nota 3 vezes num espaço de tempo igual eu escolho que fração pra colocar na assinatura de tempo (aqueles números) da partitura? Como eu escolho a assinatura da clave se a música for atonal? Enfim, o resumo da história é: a não ser que alguém faça um projeto de *inteligência artificial* com esse objetivo, não rola usar MIDI pra exibir uma partitura. E por não saber tanto de música assim, cometi esse erro "de inocente".

Até mais ou menos [este commit](https://github.com/tananamusic/tanana/commit/3a82314aa4549c4e88476b646dddf67e5de5b325) de março de 2017 eu ainda estava tentando essa maluquice. Até que descobri um formato apropriado para o projeto.

### O formato Music XML

Quem toca violão ou teclado está acostumado a achar arquivos de partitura em sites como o Cifra Club. A maioria destes arquivos tá em um dos formatos do Guitar Pro, que é um software proprietário. Por ser proprietário, seria inviável (difícil e contraditório) eu usar o formato deles num projeto de código aberto. Se formos buscar uma [lista de softwares que leem e/ou escrevem partitura](https://en.wikipedia.org/wiki/List_of_scorewriters) eu diria que o principal dentre os livres é o Musescore. Dado isso, encontrei o formato que ele usa, o [Music XML](https://www.musicxml.com/), que é um formato aberto, com especificações abertas. Inclusive o próprio *Musescore* consegue importar de outros formatos proprietários, convertendo para o *Music XML*.

A partir desse formato, o principal obstáculo do projeto foi superado e agora, se você quiser [mandar PR](https://github.com/tananamusic/tanana/fork) você não precisa saber nada sobre teoria musical, inclusive eu tenho [issues rotuladas dessa maneira](https://github.com/tananamusic/tanana/issues?q=is%3Aissue+is%3Aopen+label%3Ano-need-for-music-knowledge).

### A questão da UX
Estou considerando usar vuejs para a interface. Comenta aí o que tu acha
