/**
 * Created by matheus graciano on 26/03/15.
 */
(function(){

    var TEMPO_MINIMO = 200;
    var VARIACAO_DELAY = 500;
    var INTERVALO_TROCA = 15;
    var CARACTERES = ['1', '0', '!', '@', '#', '$', '%', '*', '(', ')', '£', '¢', '¬', '{', '[', ']', '}', '^', '<', '>', ',', '.', ';', ':', '?', '/', '|', '\\', "'", '"', '-', '_', '=', '+', '§'];

    var charAleatorio = function(){
        return CARACTERES[parseInt(Math.random() * (CARACTERES.length-1))];
    };
    var trocaChar = function(elem, char, iMaximo){
        var text = elem.textContent;
        if(!iMaximo)
            iMaximo = text.length;
        var pos = parseInt(iMaximo * Math.random());
        var textResult = ""+text.substring(0, pos);
        textResult+=char;
        textResult+= text.substring(pos+1, text.length);
        elem.textContent = textResult;
    };

    var zeraEPreenche = function(elem, callback, arg0, arg1){
        var tam = elem.textContent.length;
        elem.textContent = charAleatorio();
        for(var i=1; i<tam; i++){
            var tempo = TEMPO_MINIMO + parseInt(Math.random() * VARIACAO_DELAY);
            setTimeout(
                function(){
                    elem.textContent = charAleatorio() + elem.textContent;
                }, tempo);
        }
        setTimeout(function(){ callback(arg0, arg1); }, TEMPO_MINIMO + VARIACAO_DELAY);
    };

   var projetos = document.getElementsByClassName('js-projeto');
   for(var i=0; i<projetos.length; i++){
       var projeto = projetos[i];
       projeto.setAttribute('data-state', 'false');

       projeto.addEventListener('mouseenter', function(ev){
           var caption = this.getElementsByClassName('caption')[0];
           var text = caption.textContent;
           zeraEPreenche(caption, function(c, text){
               var tam = text.length;
               for(var i=0; i<tam; i++){
                   setTimeout(
                       (function(i){
                           caption.textContent = caption.textContent.substring(1, tam)+text[i];
                       })(i), TEMPO_MINIMO + parseInt(Math.random() * VARIACAO_DELAY));
               }
           }, caption, text);
           var event = ev || window.event;
           if (event.stopPropagation) {
               event.stopPropagation();
           } else {
               event.cancelBubble = true;
           }
       });
       projeto.addEventListener('mouseleave', function(){
           var caption = this.getElementsByClassName('caption')[0];
           caption.textContent = caption.getAttribute('data-text');
       });
   }
})();