---
layout: post
title:  "Jekyll: CMS baseado em arquivos"
date:   2019-03-21 12:24:00 -0300
description: Flat file CMS e outras palavrinhas em inglês (aka buzzwords) sobre como programei o blog.
image: assets/img/anaglyph-jekyll.png
altimg: Logo do Jekyll com efeito de óculos 3D antigo
---
Vou explicar o processo de criação deste blog e falar umas **buzzwords** da hora. Pois isso é bom pra **SEO** por causa das **keywords**. Peço perdão para quem não é da área de **TI**, eu me esforcei pra ser o mais didático possível na minha **approach**, mas algumas coisas vão acabar ficando complicadas de entender.

## MVP
No momento que lancei este blog usei a ideia do *mínimo produto viável (MVP)*. Se você for olhar no [repositório do github](https://github.com/graciano/graciano.me), vai notar que nem paginação eu fiz. Apenas listei todos os posts na home. Deixei pra implementar isso quando for conveniente, ou seja, quando tiver posts o suficiente para a paginação se fazer necessária. Isso é o MVP: entregar o mais rápido **possível** algo que tenha valor, que funcione pra alguém. Note aqui meu ênfase na palavra **possível**: muita gente no mundo corporativo só quer os prós e não os contras de uma abordagem, e quer só a parte de ser rápido. Em termos de código, isso gera *bugs*.

Exemplos de coisas que deixei de fazer antes de lançar o blog, mas que eventualmente serão implementadas quando eu tiver tempo (*ou não*):
 - previsão de tempo de leitura de cada post
 - cabeçalho do site fixo, com animação ao scrollar pra baixo; tipo o cabeçalho dos navegadores de celular
 - página com um portfólio de coisas que já fiz
 - um CSS melhor pra mídias externas tipo *tweets* e vídeos do *youtube*
 - comentários nos posts

## Vaporwave
Vaporwave na real é um estilo de música eletrônica, mas tem essas referências visuais que eu acho divertidas: anos 90, *windows 95/macintosh*, estética grega antiga, caracteres japoneses e colocar **cyber** no nome das coisas. Como sou péssimo em design me pareceu uma boa ideia pegar uma estética pronta e só aplicar aqui, como p degradê do cabeçalho e o efeito típico de óculos 3D antigos também nas datas.

## Flat file CMS
Ao usar um CMS (*content management system* - sistema gerenciador de conteúdo) é necessário um [servidor](#serverhosting) e um serviço de banco de dados. Com isso você tem login, usuário, senha e outros paranauês. Além de o custo ser maior. Um CMS baseado em arquivo (*flat file*) é diferente porque você escreve os arquivos de cada post na sua máquina e só sobe pra pasta de posts do blog. A maioria desses sistemas usam arquivos do tipo [Markdown](https://pt.wikipedia.org/wiki/Markdown) para o conteúdo.

[Jekyll](https://jekyllrb.com) é o CMS que eu estou usando. Ele é feito na linguagem ruby, que eu gosto bastante. Além disso, usa o sistema de template html [Liquid](https://shopify.github.io/liquid/), do Shopify. Então eu basicamente escrevo arquivos em markdown na [pasta de posts do meu repositório no github](https://github.com/graciano/graciano.me/tree/master/_posts) e, ao dar commit no ramo `master` do git, já está tudo publicado.

# Server/Hosting
No github existe o *github pages*, que usa o Jekyll pra publicar sites estáticos de graça. Não é nem obrigatório usar Jekyll, você pode só publicar uma pasta com *html/css/javascript* que ela fica pública em *&lt;username&gt;.github.io* Eu até queria usar, mas não tem https e um dos plugins que estou usando pro jekyll estava dando erro. Aí que uma amiga me recomendou o [Netlify](https://www.netlify.com/), de graça também. Quando fiz login e configurei o meu repositório do github ele já entendeu que era jekyll e fez tudo sozinho pra mim. Só tive o trabalho de configurar o domínio. Agora até já arrisquei brincar com configurações mais "avançadas", mas achei muito bom ter um serviço que não me dê trabalho de cuidar da *infraestrutura* do site.
