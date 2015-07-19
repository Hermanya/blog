(function() {
    'use strict';
    var numberOfParts = 8;

    var elements = document.querySelectorAll('[data-glitch]');
    for (var i = 0; i < elements.length; i++) {
        makeItGlitch(elements[i]); 
    }

    function makeItGlitch(element) {
        element.style.position = 'relative';
        var content = element.innerHTML;
        var partHeight = element.clientHeight / numberOfParts;
        element.innerHTML = new Array(numberOfParts).join('hack').split('hack').map(function (_, index) {
            return '<div style="position: absolute;' +
                              ' width: ' + element.clientWidth + 'px;' +
                              ' height: ' + partHeight + 'px;' +
                              ' overflow: hidden;' +
                              ' left: ' + (30) + 'px;' +
                              ' top: ' + ( index * partHeight) + 'px;' +
                              '"><div style="transform: translateY(' + ( -index * partHeight) + 'px)">' + content +  '</div></div>'
        }).join('')


        var index;
        window.setInterval(function () {
            index = Math.floor(Math.random() * numberOfParts)
            element.children[index].style.transform = 'translateX(' + (Math.random() > 0.5 ? 1: -1 )*16 + 'px)';
            window.setTimeout(function () {
                element.children[index].style.transform = 'translateX(0)';
            }, 100)
        }, 1000)
    }
}());
