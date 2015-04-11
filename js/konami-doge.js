(function(){
    var easter_egg = new Konami();
    var NUMBER_OF_ANIMATIONS = 4;
    var loaded = false;

    var preLoad = function(url, callback){
        var image = new Image();
        image.src = url;
        image.onload = function(){
            callback();
        };
    };

    var doge = function(){
        loaded = true;
        var konamiDiv = document.getElementById('konami');
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                konamiDiv.innerHTML = xhr.responseText;
                konamiDiv.style.display = '';
                var children = konamiDiv.children;
                for(var i=0; i<children.length; i++){
                    var elem = children[i];
                    elem.classList.add('animate-random-'+parseInt(Math.random() * NUMBER_OF_ANIMATIONS));
                }
                preLoad('imagens/doge-smile.png', function(){
                    setTimeout(function(){
                        var img = konamiDiv.getElementsByTagName('img')[0];
                        img.src = 'imagens/doge-smile.png';
                    }, 2000);
                });
            }
        };

        xhr.open("GET", "doge.html", true);
        xhr.setRequestHeader('Content-type', 'text/html');
        xhr.send();
    };


    easter_egg.code = function() {
        if(loaded)
            doge();
        else{
            preLoad('imagens/doge.png', doge);
        }
    };
    easter_egg.load();
})();