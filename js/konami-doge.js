(function(){
    var easter_egg = new Konami();
    easter_egg.code = function() {
        console.log("konami code");
        var konamiDiv = document.getElementById('konami');
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                konamiDiv.style.left = '0';
                konamiDiv.className = 'slideLeft';
                konamiDiv.innerHTML = xhr.responseText;
            }
        };

        xhr.open("GET", "doge.html", true);
        xhr.setRequestHeader('Content-type', 'text/html');
        xhr.send();
    };
    easter_egg.load();
})();