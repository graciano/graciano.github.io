---
layout: post
title: "Oi, eu sou o hacker"
date: 2019-06-21 11:10:00 -0300
description: ! '#VazaJato: Algumas explicações sobre hackers, criptografia e tecnologia que os jornais erram a rodo. E o seu Moro também.'
# image: assets/img/path/da/imagem.jpg
# altimg: descreva sua img
# img_full: true
---

Depois que o zap zap elegeu o presidente atual, o zap azul contribui com as próprias trapalhadas do governo para cair sua popularidade. Muitos propagadores de fake news e pessoas bem intencionadas, mas desinformadas, estão cometendo equívocos na parte tecnológica do assunto, então aqui vão algumas informações **#factCheckingDeTI**.

## Hackers não invadiram o Telegram

Se alguém quebrar a criptografia do telegram, tem uma [recompensa gorda esperando pra ser paga](https://telegram.org/blog/cryptocontest).

## Criptografia ponta a ponta

O telegram possui uma função de chat secreto que **não funciona em grupos** e não é a padrão. Ou seja, se você não apertar o botão "chat secreto" seu chato **não é criptografado**. O que claramente é o caso do vazamento, já que sabemos que o applicativo em si não foi a vulnerabilidade explorada.

## Invasão de celulares

Este **não parece ser o caso** da *#vazajato* na minha opinião, mas como é possível e não estão explicando direito, vou deixar registrado aqui.
Existe um tipo de ataque hacker *"middle man"* que é possível de ser feito se você [puder controlar uma wifi, chamado SS7](https://delhitrainingcourses.com/blog/ss7-attacks-hack-phone-whatsapp-read-messages-2018/). Desta maneira, usando a vulnerabilidade dos protocolos de ligações, o criminoso pode tomar conta das suas ligações e mensagens SMS. Curiosamente, esse tipo de ataque se tornou público com as revelações do próprio Snowden no que culminou na criação do The Intercept. O criminoso que usava isso era o próprio governo dos EUA.
Com acesso a ligações e SMS, o hacker pode acessar seu whatsapp, mas isso faria com que o celular da vítima perdesse o acesso, como eu explico mais pra frente. No caso do telegram, a vítima receberia uma notificação com o IP e outras informações de onde o login foi feito.

## Detalhes específicos de quem parece que não leu as matérias

Alguns podcasts, blogueiros e até mesmo parlamentares de esquerda disseram coisas **falsas** como:

- Moro estaria num grupo com os procuradores
- Teve áudios divulgados com a voz do Moro (*pelo menos até a data de publicação o único áudio divulgado pelo the intercept era um segundo de nada*)
- Moro disse "textualmente" que queria prejudicar politicamente o PT (*essa é uma interpretação óbvia, mas não é **textual**, cara pálida*)

Isso é muito irresponsável, mesmo que no contexto de uma piada. Tem muita desinformação por aí e esse tipo de falta de atenção na minha opinião só atrapalha. E dá margem para o governo se defender. É muito fácil se defender de mentiras. Sendo que não precisa inventar nada, é só parar uns minutinhos e ler as matérias. Por favor, [leia as matérias](https://theintercept.com/series/mensagens-lava-jato/)

## As mensagens estão salvas na nuvem

O ex-juíz disse (ou por ingenuidade, ou na canalhice) que as mensagens não existem mais. Na audiência do senado, teve um senador que levantou a possibilidade de se requerer as mensagens nos servidores do telegram, no que o ministro do governo Bolsonaro respondeu que as mensagens não existem mais. Disse ainda que tem o "mal hábito de comprar celulares baratos" que possuem pouca memória, de "16 mega ou giga, que fala né". De novo, por ingenuidade ou burrice.
Seria *impossível* você fazer login num novo dispositivo do telegram (ou qualquer outro aplicativo) e acessar as conversas sem que as mesmas estejam salvas em algum lugar. No caso do whatsapp, o app te impede de acessar mais de um dispositivo ao mesmo tempo. Com a exceção do navegador, mas isso é o que nós programadores chamamos de gambiarra; tanto é gambiarra que o whatsapp precisa que seu celular esteja ligado e conectado à internet para que sua versão web funcione. Ao entrar num novo celular, para recuperar as conversas você precisa de um backup, no que muita gente usa o Google Drive para isso.
No caso do telegram, como o usuário não gerencia esse backup, as mensagens estão nos servidores do telegram. Não existe outra possibilidade. Por isso a afirmação de que o que o ex-juíx alega é **impossível**.

## Criptomoedas, aves misteriosas e etc

Criptomoedas são praticamente [irrastreáveis](https://brasil.elpais.com/brasil/2017/05/12/economia/1494621106_047933.html). Se alguém comete crimes (enquanto seu Moro ainda não proibiu os crimes) e recebe ilegamente algo em bitcoin por exemplo, não é num registro **público** que cabe num print de celular que alguém vai descobrir. Nem a família bozo é tão incompetente assim (ou talvez seja 😆).
Sinceramente, eu até ia me esforçar mais sobre esse assunto, mas já fizeram um [trabalho muito melhor do que eu poderia fazer](https://www.tudocelular.com/curiosidade/noticias/n143010/fake-news-pavao-bitcoins-russia-the-intercept-glenn-greenwald-vaza-jato.html).

## A fonte do Intercept não é conhecida

Invadindo ou não o celular de alguém, a ação poderia muito bem ter sido feita por um usuário avançado que nenhum conhecimento sobre código ou essas coisas de ráquer. Apesar de que pelo que eu entendi até agora, as informações vieram da **conta do telegram** (diferente de afirmar que é o celular, como veremos a seguir) do fã de super-homem conhecido como Deltan Dallagnol.
Dito, isso, apenas quem sabe como as informações foram obtidas é a fonte do Intercept, ou talvez os próprios jornalistas. Mas daí a falar que foi hacker é [especulação](https://theintercept.com/2019/06/17/hackers-criminosos-vazajato-sergio-moro/).

## Algumas especulações minhas de como poderia ter acontecido

Antes do *momento hackey*, quero apenas provar com isso que a narrativa do hacker é improvável, mas não impossível. O que realmente é absurdo são as acusações de que o Intercept estaria de conluio com o tal hacker que fala *outrossim*. Não estou nem de longe dizendo que foi de um jeito ou outro que aconteceu. O objetivo é apresentar argumentos técnicos de que **existem** outras maneiras de se obter estas informações, inclusive com pouco conhecimento técnico, diferente do caso do SS7.

Digamos que o Deltan tenha logado no telegram web, que é o cliente de browser do telegram. Ou o cliente desktop, que pode ser instalado no linux, macOS ou windows. Os dados ficam disponíveis num computador que outros funcionários do ministério público possivelmente têm acesso. "Cliente" aqui é um termo técnico para um programa que acessa um servidor de acordo com um conjunto de regras. O whatsapp por exemplo tem um cliente que é o app normal do seu celular e um *cliente web*, que fica no [aqui](https://web.whatsapp.com), o termo *web* significa um "app" que funciona no navegador. Seguem agora as especulações baseadas nisso.

### Um jeito muito, muito simples

Se você estiver lendo este texto num navegador do computador, e não no celular, aperte `Ctrl+S`. Você vai salvar uma versão *offline* do site. Ao entrar no computador logado no telegram web e fazer essa ação pronto: você tem uma pasta que pode ser enviada anonimamente pra qualquer jornal do mundo.

### Um pouco menos simples

Via telegram desktop...

### Um tanto complicada, mas qualquer usuário mais avançado poderia fazer

**Observação:** *Este método pode ser combinado com outros acima, no caso de a pessoa não ter tempo na máquina usada, mas ter tempo em casa.*

**Observação 2:** *Eu sinceramente não testei isso, se alguém quiser me ajudar nos comentários, por favor sinta-se à vontade*

Alguém com um usuário na máquina do Dallagnol e com privilégios de administrador poderia fazer login e obter os arquivos de sessão do firefox ou do chrome lá. Ou os arquivos do Telegram Desktop. É o caso lá em casa: mozão pode fazer login no usuário dela e acessar os arquivos em, digamos, `C:/Usuários/Graciano/AppData/Mozilla/...`, copiar isso pra um pen drive e ao substituir estes arquivos em outra máquina. Nesta outra máquina, ao fazer login, pode-se acessar a conta da pessoa **sem ela saber**. E aí com mais tempo, rolar as conversas para cima para recuperar dados mais antigos.