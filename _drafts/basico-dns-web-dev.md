---
layout: post
title: >-
  Domínios e DNS: o mínimo que um web dev precisa saber
date: 2019-07-16 10:20:00 -0300
description: >-
  Básico sobre domínios, subdomínios e a história de um request: o que acontece quando se digita uma URL e depois aperta enter ⤵
image: assets/img/dns/yellow-pages.jpg
altimg: livro de páginas amarelas, com o efeito 3D de sempre
img_full: true
---

Depois que se clicar num link ou digitar o endereço manualmente no seu navegador e se aperta "enter", acontece uma coisa mágica chamada request. Mas especificamente do tipo GET. Muitos devs juniores (e sandy 🙃) já sabem disso,mas não entendem o processo por completo. Principalmente no mercado atual que cobra uma formação na velocidade da luz em que a gente só aprende "o que interessa", priorizando *comos* em detrimento de *porquês*. Então vem comigo que **aqui tem informação!!**

## DNS: a lista telefônica do nosso século

Para o request chegar no servidor de um *site*, primeiro o browser precisa saber o IP do mesmo. É interessante nós pensarmos aqui no que significam as palavras site e IP. São termos com significado que existiam antes da internet que conhecemos hoje. Site em inglês significa **lugar**. Em Portugal e alguns ambientes mais formais do Brasil se usa o termo "*websítio*". IP é a mesma coisa: *IP address*, o **endereço** conforme o protocolo "*Internet Protocol*". Por isso a minha definição de que o DNS como lista telefônica. O "*Domain Name System*" (Sistema de nomes de domínio) é outro protocolo que define várias maneiras diferentes de se listar um endereço.

Um domínio é como se fosse um reino, um território. Podem existir mais de um site em um domínio, usando subdomínios como [dcc.ufrj.br](dcc.ufrj.br) que é o site do Departamento de Ciência da Computação da UFRJ, que tem seu próprio site no domínio principal [ufrj.br](ufrj.br). Num servidor DNS eu posso criar os registros DNS A ou AAAA que são registros de "address", ou seja, o domínio escolhido corresponde (no fim das contas*) a um IP correspondente. No caso do registro A, um IPv4 e no caso do AAAA, IPv6. Para os subdomínios, se usa o CNAME (nome canônico). Um subdomínio poderia apontar para outra pasta no meu servidor ou mesmo outro endereço físico.

***

**Obs.:** *como no caso do GNU/Linux, a definição teórica também dá o mesmo nome da aplicação prática: um **servidor** DNS é chamado de DNS também. A [primeira aplicação prática disso](https://ns1.com/resources/dns-protocol) é bastante usada até hoje e se chama BIND.*

***

No caso da weblocalidade deste texto, há uns meses comprei o domínio [graciano.me] no GoDaddy, que tem seus próprios servidores DNS, ou seja, sua própria lista telefônica. Servidores no plural porque geralmente se usam duas ou mais listas públicas com redundância para caso de uma cair. Afinal, não é literalmente uma lista física e ao ser consultado, um servidor pode estar fora do ar 😉. Para quem já viu por aí, normalmente se usa a nomenclatura ns1, ns2, ns3...

## A história do request

A conclusão é que quando se digita "graciano.me/qualquer-coisa" no browser, há uma procura na lista telefônica do endereço físico atribuído a "graciano.me", que é um IP. Na prática, como eu uso a [netlify](https://www.netlify.com/), o site está "na nuvem", então corresponde a uma outra URL com domínio da ferramenta EC2 da Amazon. Porém, como muito sabiamente se diz por aí, a nuvem é uma abstração, que no *fim das contas* é um computador físico com um IP em algum lugar. E quem faz as "contas" para chegar no endereço final é um algoritmo espertinho chamado DNS Resolver, traduzindo porcamente seria o "resolvedor" de DNS. Com isso, finalmente o request GET chega num computador em algum lugar, que faz o que os devs juniores e sandys do mundo já estão acostumados a trabalhar.
