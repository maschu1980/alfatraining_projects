"use strict";

// innerHTML -> .html()
Node.prototype.html = function (content) {
    if(content) {
        this.innerHTML = content;
        return this;
    } else {
        return this.innerHTML;
    }
};

// document.querySelector() -> jSelect()
// document.querySelectorAll() -> jSelect()
const jSelect = function(elem) {
    const newSelect = document.querySelectorAll(elem);
    if (newSelect.length > 1) {
        return newSelect;
    } else {
        return newSelect[0];
    }
};
//const $$ = jSelect;