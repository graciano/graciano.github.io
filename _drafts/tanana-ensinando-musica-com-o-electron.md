---
layout: post
title:  "Tananã: ensinando música com o Electron"
date:   2019-03-29 10:00:00 -0300
description: Um projeto open source para aprender partituras em cima do electron, uma ferramenta javascript usada por Spotify, Discord, Slack, Skype e outros para criar apps que rodem em windows/gnu-linux/mac.
# image: path pra imagem
# altimg: descreva sua img
---

Antes de falar do Tananã, o app com nome mais charmoso do Brasil, queria primeiro explicar o que é o [electron](https://electronjs.org/). Talvez você já tenha ouvido falar do [atom](https://atom.io/): o "editor de texto hackeável" do github. É um editor escrito em *javascript*. Por causa disso e por conseguir executar na santíssima trindade *windows/gnu-linux/mac*, extraíram essa *base* do atom que possibilita a *build* para sistemas operacionais e chamaram de *electron*, usando a engine do chromium. Então basicamente, quando se usa o Spotify, o Slack, o Discord ou qualquer outro *electron app*, na prática o seu computador está ligando um navegador interno que roda o app. Na época que foi criado, o atom disputava seus usuários com o Sublime Text. Hoje rivaliza mais com o também feito em electron VS Code, da microsoft, que comprou o github ¯\\_(ツ)_/¯

Há quem não goste do electron justamente por obrigar o usuário a rodar um navegador e carregar coisas desnecessárias. Isso faz parte de um debate maior que envolve dependência de software, facilidade de desenvolvimento, o quanto java é uma linguagem feia, boba, bocó e outros aspectos fora do assunto aqui. Eu pessoalmente acho uma ótima ideia ter um motor que possibilite executar javascript "nativamente" nos sistemas operacionais. *Javascript* é uma linguagem conhecida pela maioria dos desenvolvedores, então teoricamente precisa menos esforço para desenvolver uma aplicação que rode em vários SOs e possivelmente equivalente com uma eventual versão web. Na prática eu te digo no futuro, porque essa é a intenção com o *tananã*. Por enquanto o que eu posso afirmar é que o ambiente de desenvolvimento é a mesma coisa que criar um *webapp*, mas usando o comando `$ electron pasta-com-um-html-e-js` para executar o app ao invés de acessar pelo navegador. Com uma pequena diferença que é lidar com o sistema de arquivos do SO usando a API própria do electron.


## Tananã: o software para treinar a leitura de partitura

> Sério, esse nome é muito legal, não acha?

Fui fazer um trabalho de Informática Aplicada ao Ensino na época da UFRJ (lá em 2016) e acabei escolhendo desenvolver uma coisa ambiciosa: um software para treinar partituras.

**Pausa para você rir da minha cara. Eu era ingênuo e pegava coisas grandes demais de lidar sozinho.**

A motivação do projeto é simples: eu, como músico, sei ler partitura, mas é como se eu fosse semi-analfabeto na parada. Imagine uma criança aprendendo a ler: *"a.. va-ca é… ma-lha-da"*. Muitos outros músicos que eu conheço também compartilham deste problema e acharam a ideia boa: uma interface simples que mostre a partitura no tempo "correto" de execução da mesma. Porque a maioria dos softwares musicais ou tem uma interface horrível ou são muito voltados a profissionais. Uma exceção seria o maravilhoso [flat.io](https://flat.io/), mas eles não têm o viés educativo (e sem fins lucrativos). E eu precisava fazer alguma coisa pra passar no semestre ;)

No estado atual, o projeto abre um arquivo do formato [music XML](#o-formato-music-xml) e exibe numa partitura *navegável* em SVG (graças ao [open sheet music display](https://opensheetmusicdisplay.org/)). *Navegável* aqui significa que tem um botão de *play/pause* pra um cursor que indica que nota deve ser tocada no período correto de tempo. Inclusive uma evolução natural disso vai ser uma customização do *bpm* da "execução" da partirura. Mas infelizmente ainda não tenho uma versão pronta para *testes com humanos*. A UX também está bem ruim e essa não é minha especialidade, (*[por favor, me mandem PRs](https://github.com/tananamusic/tanana/fork)*).

### Ideias mirabolantes demais

Imagina que louco se eu consigo sincronizar um teclado no computador via uma USB da vida e verificar se você tá tocando a música corretamente? Ou isso com um microfone pra ver se a pessoa cantou afinado? Ou um tutorial interativo que ensine o básico de o que é uma nota, uma escala, etc? Bem, *sonhar é de graça*. Óbvio que a prioridade no momento é outra. Afinal, tenho que criar um [MVP]({% post_url 2019-03-26-jekyll-cms-baseado-em-arquivos %}#mvp) antes de tornar essas coisas possíveis.

Falando em ideias mirabolantes, preciso deixar registrado aqui a treta gigante que foi decidir o formato escolhido. Antes de eu dar de cara num problemão e pesquisar de maneira apropriada, eu tentei converter um arquivo MIDI para partitura. Um arquivo MIDI é basicamente uma lista de **instruções para execução da música**. Então ao executar um MIDI normalmente o que a gente escuta é um "instrumento" robotizado bem básico estilo joguinhos da época do *game boy*. É o formato usado por exemplo em instrumentos sintetizadores, mas aí a "voz" do instrumento é cuidada por outros aspectos do teclado e do software, que não nos interessam para o assunto.

Quem já sabe um pouco sobre o assunto provavelmente já percebeu o tamanho da treta que foi isso. **Instruções para execução da música** não determinam de maneira única como escrever a música. Diferente do português, que é um idioma em que na maioria dos casos só há uma única maneira de se escrever um som, na música não é bem assim. Se eu toco uma nota 3 vezes num espaço de tempo igual eu escolho que fração pra colocar no compasso da partitura? Como eu escolho a armadura da clave se a música for atonal? Me desculpe se você não entendeu, na real nem eu entendi isso 100%, esse é o ponto. O resumo da história é: a não ser que alguém faça um projeto de *inteligência artificial* com esse objetivo, não rola usar MIDI pra exibir uma partitura. E por não saber tanto de música assim, cometi esse erro "de estagiário".

Até mais ou menos [este commit](https://github.com/tananamusic/tanana/commit/3a82314aa4549c4e88476b646dddf67e5de5b325) de março de 2017 eu ainda estava tentando essa maluquice. Até que descobri um formato apropriado para o projeto.

### O formato Music XML

Quem toca violão ou teclado está acostumado a achar arquivos de partitura em sites como o Cifra Club. A maioria destes arquivos tá em um dos formatos do Guitar Pro, que é um software proprietário. Por ser proprietário, seria inviável (difícil e contraditório) eu usar o formato deles num projeto de código aberto. Se formos buscar uma [lista de softwares que leem e/ou escrevem partitura](https://en.wikipedia.org/wiki/List_of_scorewriters) eu diria que o principal dentre os livres é o Musescore. Dado isso, encontrei o formato que ele usa, o [Music XML](https://www.musicxml.com/), que é um formato aberto, com especificações abertas. Inclusive o próprio *Musescore* consegue importar de outros formatos proprietários, convertendo para o *Music XML*.

A partir desse formato, o principal obstáculo do projeto foi superado e agora, se você quiser [mandar PR](https://github.com/tananamusic/tanana/fork) você não precisa saber nada sobre teoria musical, inclusive eu tenho [issues rotuladas dessa maneira](https://github.com/tananamusic/tanana/issues?q=is%3Aissue+is%3Aopen+label%3Ano-need-for-music-knowledge).

### A questão da UX
Estou considerando usar vuejs para a interface. Comenta aí o que tu acha
