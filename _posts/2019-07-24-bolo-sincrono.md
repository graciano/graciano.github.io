---
layout: post
title: O bolo síncrono e o sorvete assíncrono
date: 2019-07-24 19:06:00 -0300
description: >-
  Funções Síncronas e Assíncronas explicadas com analogia de receitas de 🍦 doces 🍰
image: assets/img/bolo-assincrono/bolo.png
altimg: bolo de morango com glacê branco, foto com efeito 3D da hora
img_full: true
permalink: /:categories/:year/:month/:day/🍦-🍰-funcao-sincrona-assincrona-bolo-doces
---

Em Javascript e outras tecnologias que lidam muito com eventos e I/O, se fala muito em síncrono/assíncrono. Neste site, eu já expliquei como trabalhar com [promessas]({{ site.baseurl }}{% post_url 2019-05-15-promessas-em-javascript %}), que é a API nativa específica do Javascript para isso. Aqui será uma explicação dos conceitos, mais introdutória.

Antes de entender esses conceitos é necessário refletir sobre o que é um algoritmo propriamente dito, e como o conceito de algoritmo se relaciona com sincronia. Um algoritmo não passa de uma sequência de passos para um computador executar. Uma receita de bolo. Ou de sorvete.

Exemplo de receita 🍰🍌:

 1. Bata no liquidificador os ovos, o açúcar, o óleo e as bananas.
 2. Despeje numa tigela e bata com fermento e farinha de trigo.
 3. Asse numa forma previamente untada por 30 minutos.

Para simplificar eu omiti a declaração de variáveis do algoritmo, que seriam os ingredientes e suas quantidades (na verdade é porque eu nunca fiz um bolo de banana 🤷). Na hora de fazer este bolo, cada passo precisa ser executado *necessariamente* após o passo anterior. Mesmo com outras pessoas te ajudando, você não conseguiria fazer o bolo em menos de 30 minutos. Ou, quando meu chefe tenta forçar um prazo impossível, falamos pra ele: *9 pessoas grávidas não dão a luz a um filho em 1 mês*. Dizemos que esta receita de bolo é **síncrona**.

Minha mãe me ensinou uma receita de sorvete caseiro que faz sucesso com meus amigos. Segue mais ou menos a receita (de novo sem as quantidades de ingrediente pois preguiça 🤷):

 - Separe as claras das gemas dos ovos
 - **Creme 1**: basicamente um suspiro
   1. Bata as claras em neve com o açúcar
 - **Creme 2**
   1. Ferva a maizena, as gemas, o creme de leite e o leite condensado.
   2. Mexa o creme enquanto ele ainda não ferveu, para prevenir pelotas da maizena.
   3. Acrescente essência de baunilha
 - Espere os dois cremes esfriarem e bata-os juntos.
 - Coloque numa forma com a calda de chocolate, sem mistrurar e leve ao congelador.

No passo 2 há uma palavrinha mágica: *enquanto*. Isso significa que necessariamente, para o sucesso do algoritmo, um passo precisa ser executado ao mesmo tempo de outro. A isso se dá o nome de concorrência, e é um assunto bem complicado, então vou deixar de lado por enquanto. Há um outro aspecto possível desta receita: Os cremes 1 e 2 podem ser feitos ao mesmo tempo por pessoas diferentes. Quase todo natal eu faço o creme 2 enquanto mamãe bate as claras em neve. É um algoritmo **assíncrono**.

Espero ter ajudado com esta analogia e caso você queira colocar isso em prática com Javascript, dê uma conferida no meu tutorial de [promises]({{ site.baseurl }}{% post_url 2019-05-15-promessas-em-javascript %}).