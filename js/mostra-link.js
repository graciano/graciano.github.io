/**
 * Created by matheus on 27/03/15.
 */
(function(){
    var cortaEvento = function (event) {
        var e = event || window.event;
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    };

    var preventLongPressMenu = function (elem) {
        elem.ontouchstart = cortaEvento;
        elem.ontouchmove = cortaEvento;
        elem.ontouchend = cortaEvento;
        elem.ontouchcancel = cortaEvento;
    };

    var projetos = document.getElementsByClassName('js-projeto');
    var imagens = [];

    for(var i=0; i<projetos.length; i++){
        imagens.push(projetos[i].getElementsByTagName('img'));
    }
    for(i=0; i<imagens.length; i++){
        preventLongPressMenu(imagens[i]);
    }
})();