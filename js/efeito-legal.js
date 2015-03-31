/**
 * Created by matheus graciano on 26/03/15.
 */
(function(){


    var TEMPO_MINIMO = 20;
    var VARIACAO_DELAY = 50;
    var INTERVALO_TROCA = 15;
    var CARACTERES = ['1', '0', '!', '@', '#', '$', '%', '*', '(', ')', '£', '¢', '¬', '{', '[', ']', '}', '^', '<', '>', ',', '.', ';', ':', '?', '/', '|', '\\', "'", '"', '-', '_', '=', '+', '§'];
    var timeoutsEfeito = [];

    var charAleatorio = function(){
        return CARACTERES[parseInt(Math.random() * (CARACTERES.length-1))];
    };
    var trocaChar = function(elem, char, pos){
        var text = elem.textContent;
        var textResult = ""+text.substring(0, pos);
        textResult+=char;
        textResult+= text.substring(pos+1, text.length);
        elem.textContent = textResult;
    };
    var limpaTimeouts = function(){
        for(var i=0; i<timeoutsEfeito.length; i++){
            clearTimeout(timeoutsEfeito[i]);
        }
        timeoutsEfeito = [];
    };

    var tempo = function(){
        return TEMPO_MINIMO + parseInt(Math.random() * VARIACAO_DELAY);
    };

    var ficaTrocandoAteVoltarCharOriginal = function(elem, posText, i, max){
        if(i==(max-1)){
            trocaChar(elem, elem.getAttribute('data-text').substring(posText, posText+1), posText);
        }
        else if(i<max){
            trocaChar(elem, charAleatorio(), posText);
            timeoutsEfeito.push(setTimeout(function(){
                ficaTrocandoAteVoltarCharOriginal(elem, posText, i+1, max);
            }, INTERVALO_TROCA));
        }
    };

    var criaEfeito = function(elem){
        var tam = elem.textContent.length;
        var go = function(i){
            if(i<tam){
                timeoutsEfeito.push(setTimeout(function(){
                    var t = tempo();
                    var nTrocas = parseInt((t + (TEMPO_MINIMO * (tam - i - 1))) / INTERVALO_TROCA);
                    var originalText = elem.getAttribute('data-text');
                    ficaTrocandoAteVoltarCharOriginal(elem, i, 0, nTrocas);
                }, tempo()));

                timeoutsEfeito.push(setTimeout(function(){
                    go(i+1);
                }), tempo());
            }
        };
        go(0);
    };

    var disparaEvento = function(ev, context){
        var caption = context.getElementsByClassName('caption')[0];
        var text = caption.textContent;
        caption.setAttribute('data-text', text);
        limpaTimeouts();
        criaEfeito(caption);
        var event = ev || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    };

    var desligaEvento = function(ev, context){
        limpaTimeouts();
        var caption = context.getElementsByClassName('js-caption')[0];
        caption.textContent = caption.getAttribute('data-text');
    };

    var projetos = document.getElementsByClassName('js-projeto');
    for(var i=0; i<projetos.length; i++){

        var projeto = projetos[i];

        projeto.addEventListener('mouseenter', function(ev){
            disparaEvento(ev, this);
            ev.preventDefault();
        });
        projeto.addEventListener('mouseleave', function(ev){
            desligaEvento(ev, this);
            ev.preventDefault();
        });
        projeto.addEventListener('touchstart', function(ev){
            disparaEvento(ev, this);
        });
        projeto.addEventListener('touchend', function(ev){
            desligaEvento(ev, this);
        });
    }
})();