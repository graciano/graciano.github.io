---
layout: post
title: Oi, eu sou o hacker
date: 2019-06-19 10:15:00 -0300
description: Algumas explicações sobre hackers, criptografia e tecnologia que os jornais erram a rodo
# image: assets/img/path/da/imagem.jpg
# altimg: descreva sua img
# img_full: true
---

Depois que o zap zap elegeu o presidente atual, o zap azul contribui com as próprias trapalhadas do governo para cair sua popularidade. Muitos propagadores de fake news e pessoas bem intencionadas, mas desinformadas, estão cometendo equívocos na parte tecnológica do assunto, então aqui vão algumas informações **#factCheckingDeTI**.

## Hackers não invadiram o Telegram

Se alguém quebrar a criptografia do telegram, tem uma recompensa gorda esperando pra ser paga.

## Criptografia ponta a ponta

## Invasão de celulares

## Bitcoin

São irrastreáveis. Se alguém comete crimes (enquanto seu Moro ainda não proibiu os crimes) e recebe ilegamente algo em bitcoin, não é num print **público** que alguém vai descobrir. Nem a família bozo é tão incompetente assim (ou talvez seja 😆)

## Detalhes específicos de quem parece que não leu as matérias

Alguns podcasts, blogueiros e até mesmo parlamentares de esquerda disseram coisas **falsas** como:

- Moro estaria num grupo com os procuradores
- Teve áudios divulgados com a voz do Moro (*pelo menos até a data de publicação o único áudio divulgado pelo the intercept era um segundo de nada*)
- Moro disse "textualmente" que queria prejudicar politicamente o PT (*essa é uma interpretação óbvia, mas não é **textual**, cara pálida*)

Isso é muito irresponsável, mesmo que no contexto de uma piada. Tem muita desinformação por aí e esse tipo de falta de atenção na minha opinião só atrapalha. E dá margem para o governo se defender. É muito fácil se defender de mentiras. Sendo que não precisa inventar nada, é só parar uns minutinho e ler as matérias. Por favor, [leia as matérias](link)

## As mensagens estão salvas na nuvem

O ex-juíz disse (ou por ingenuidade, ou na canalhice) que as mensagens não existem mais. Na audiência do senado, teve um senador que levantou a possibilidade de se requerer as mensagens nos servidores do telegram, no que o ministro do governo Bolsonaro respondeu que as mensagens não existem mais. Disse ainda que tem o "mal hábito de comprar celulares baratos" que possuem pouca memória, de "16 mega ou giga, que fala né". De novo, por ingenuidade ou burrice.


## A fonte do Intercept não é conhecida

Invadindo ou não o celular de alguém, a ação poderia muito bem ter sido feita por um usuário avançado que nenhum conhecimento sobre código ou essas coisas de ráquer. Apesar de que pelo que eu entendi até agora, as informações vieram da **conta do telegram** (diferente de afirmar que é o celular, como veremos a seguir) do fã de super-homem conhecido como Deltan Dallagnol.

### Algumas especulações minhas de como pode ter acontecido

Digamos que o  Deltan tenha logado no telegram web, que é o cliente de browser do telegram. Ou o cliente desktop, que pode ser instalado no linux, macOS ou windows. Os dados ficam disponíveis num computador que outros funcionários do ministério público possivelmente têm acesso. "Cliente" aqui é um termo técnico para um programa que acessa um servidor de acordo com um conjunto de regras. O whatsapp por exemplo tem um cliente que é o app normal do seu celular e um *cliente web*, que fica no https://web.whatsapp.com, o termo *web* aqui é usado para um "app" que funciona no navegador. Seguem agora as especulações baseadas nisso.

#### Um jeito muito, muito simples

Se você estiver lendo este texto num navegador do computador, e não no celular, aperte `Ctrl+S`. Você vai salvar uma versão *offline* do site. Ao entrar no computador logado no telegram web e fazer essa ação pronto: você tem uma pasta que pode ser enviada anonimamente pra qualquer jornal do mundo.

#### Um pouco menos simples

Via telegram desktop...

#### Um tanto complicada, mas qualquer usuário mais avançado poderia fazer

**Observação:** *Este método pode ser combinado com outros acima, no caso de a pessoa não ter tempo na máquina usada, mas ter tempo em casa.*

**Observação 2:** *Eu sinceramente não testei isso, se alguém quiser me ajudar nos comentários, por favor sinta-se à vontade*

 Alguém com um usuário nesta máquina e com privilégios de administrador poderia fazer login e obter os arquivos de sessão do firefox ou do chrome lá. É o caso lá em casa: mozão pode fazer login no usuário dela e acessar os arquivos em, digamos, `C:/Usuários/Graciano/AppData/Mozilla/...`, copiar isso pra um pen drive e ao substituir estes arquivos em outra máquina. Nesta outra máquina, ao fazer login, pode-se acessar a conta da pessoa **sem ela saber**.