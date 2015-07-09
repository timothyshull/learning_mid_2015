define(["./module2.js"],
function(module2) {
    window.addEventListener("load", function() {
        var text = module2.text,
            elem = document.getElementsByClassName("test");
        elem[0].innerHTML = text;
        window.elem = elem;
        console.log(elem);
    });
});