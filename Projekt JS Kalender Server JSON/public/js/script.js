"use strict";

const formDiv = jSelect("#formDiv");
const loginBtn = jSelect("#login");
const registerBtn = jSelect("#register");

loginBtn.addEventListener("click", event => {
    event.preventDefault();
    toggleForm("login");
});
registerBtn.addEventListener("click", event => {
    event.preventDefault();
    toggleForm("register");
});

const toggleForm = form => {
    fetch( `templates/${form}.html` )
    .then( response => response.text() )
    .then( html => {
        formDiv.innerHTML = html;
        formDiv.className = form;
    })
    .catch( err => console.log(err) );
};

toggleForm("login");