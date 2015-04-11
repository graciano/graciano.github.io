(function(){
    var easter_egg = new Konami();
    var NUMBER_OF_ANIMATIONS = 4;
    easter_egg.code = function() {
        console.log("konami code");
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
                     //elem.style.webkitAnimationPlayState = 'running';
                     //   elem.style.mozAnimationPlayState = 'running';
                     //    elem.style.msAnimationPlayState = 'running';
                     //     elem.style.oAnimationPlayState = 'running';
                     //      elem.style.animationPlayState = 'running';
                }
            }
        };

        xhr.open("GET", "doge.html", true);
        xhr.setRequestHeader('Content-type', 'text/html');
        xhr.send();
    };
    easter_egg.load();
})();