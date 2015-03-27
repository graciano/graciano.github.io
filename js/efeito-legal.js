/**
 * Created by matheus graciano on 26/03/15.
 */
(function(){


    var TEMPO_MINIMO = 20;
    var VARIACAO_DELAY = 60;
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

    var zeraEPreenche = function(elem, callback, arg0, arg1){
        var tam = elem.textContent.length;
        elem.textContent = charAleatorio();
        var t = 0;
        for(var i=1; i<tam; i++){
            var t0 = t+tempo();
            timeoutsEfeito.push(setTimeout(
                function(){
                    elem.textContent = charAleatorio() + elem.textContent;
                }, t0));
            t+=TEMPO_MINIMO;
        }
        timeoutsEfeito.push(setTimeout(function(){ callback(arg0, arg1); }, tam*TEMPO_MINIMO + VARIACAO_DELAY));
    };

    var disparaEvento = function(ev, context){
        var caption = context.getElementsByClassName('caption')[0];
        var text = caption.textContent;
        limpaTimeouts();
        zeraEPreenche(caption, function(c, text){
            var tam = text.length;
            var t = TEMPO_MINIMO;
            for(var i=0; i<tam; i++){
                timeoutsEfeito.push(setTimeout(
                    function(i){
                        trocaChar(caption, text.substring(i, i+1), i);
                    }, t + tempo(), i));
                t+=TEMPO_MINIMO;
            }
        }, caption, text);
        var event = ev || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    };

    var desligaEvento = function(ev, context){
        limpaTimeouts();
        var caption = context.getElementsByClassName('caption')[0];
        caption.textContent = caption.getAttribute('data-text');
    };

    var projetos = document.getElementsByClassName('js-projeto');
    for(var i=0; i<projetos.length; i++){

        var projeto = projetos[i];
        projeto.setAttribute('data-state', 'false');

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