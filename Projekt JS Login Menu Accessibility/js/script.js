"use strict";

 {
    // Elemente referenzieren
    const   output = document.querySelector("#container"),
            aside = document.querySelector("#accessibility"),
            menuContent = document.querySelector("#navcontainer"),
            loginBtn = document.querySelector("#login-btn"),
            registerBtn = document.querySelector("#register-btn"),
            accessBtn = document.querySelector("#accessibility-btn"),
            menuBtn = document.querySelector("#menu-btn"),
            UNIT = "px";

    // Initialisierungsfunktion
    const init = function() {

        loginBtn.addEventListener("click", function() { 
            getAjax("./templates/login.html", "", formAction, "login"); // getAjax(file, type, function, param)
        }); 
        registerBtn.addEventListener("click", function() {
            getAjax("./templates/register.html", "", formAction, "register"); // getAjax(file, type, function, param)
        });
        accessBtn.addEventListener("click", function() {
            toggleMenu(aside, "margin-top", aside.offsetHeight); // toggleMenu(container, style, value)
        });
        menuBtn.addEventListener("click", function() {
            toggleMenu(menuContent, "margin-left", menuContent.offsetWidth); // toggleMenu(container, style, value)
        });
        aside.style.marginTop = (0 - aside.offsetHeight) + UNIT;
        menuContent.style.marginLeft = (0 - menuContent.offsetWidth) + UNIT;

    };

    // ausgelagerte Funktionen

    // Ajax-Abfrage
    const getAjax = function(file, type, paramFunction, param) {

        const xhr = new XMLHttpRequest();
        xhr.onload = function() {

            if(xhr.status != 200) {
                output.textContent = "Ups, beim Laden der Datei ist ein Fehler aufgetreten!";
                return;
            }
            if(!type) { 
                output.innerHTML = xhr.responseText;
                paramFunction(param);
            }
            if(type == "json") {
                if (xhr.responseType == "json") { paramFunction(xhr.response, param); }
                else { paramFunction(JSON.parse(xhr.responseText), param); }
            }
        /*  
            if(type == "xml") {
                paramFunction(xhr.responseXML, param);
            }
        */

        };
        xhr.open("GET", file );
        if(type == "json") { xhr.responseType = "json"; }
        // if(type == "xml") { xhr.responseType = "document"; }
        xhr.setRequestHeader("Cache-Control","no-cache");
        xhr.send();

    };

    // Menüs ein- und ausklappen
    const toggleMenu = function(container, style, value) {

        let position;
        
        // Welchen Wert vom Element nehmen, oberen oder linken?
        if(style == "margin-top") { position = container.getBoundingClientRect().top; }
        else if(style == "margin-left") { position = container.getBoundingClientRect().left; }
        
        // Wenn Position kleiner als 0 ist
        if(position < 0) {
            //einblenden
            container.removeAttribute("style");
        } else {
            //ausblenden
            container.setAttribute("style", style + ": -" + value + UNIT + ";" );
        }
        
    };

    // Formular Aktion festlegen 
    const formAction = function(form) {
        const   formular = document.querySelector("#" + form + "form"),
                getFunc = {
                    "login":    loginUser,
                    "register": registerUser
                };
        
        formular.onsubmit = function() {
            getAjax("./user.json", "json", getFunc[form], formular);   // getAjax(file, type, function, param)
            return false;
        };
    
    }

/*  
    // User Login
    const userLogin = function () {

        const loginForm = document.querySelector("#loginform");

        loginForm.onsubmit = function() {
            getAjax("./user.json", "json", loginUser, loginForm);   // getAjax(file, type, function, param)
            return false;
        };
    
    };

    // Neuen User registrieren
    const newUser = function() {
    
        const registerForm = document.querySelector("#registerform");

        registerForm.onsubmit = function() {
            getAjax("./user.json", "json", registerUser, registerForm);   // getAjax(file, type, function, param)
            return false;
        }

    };
 */

    // User überprüfen
    const loginUser = function(data, form) {

        const   userName = form.querySelector("#username"),
                userPass = form.querySelector("#password");     
        let     para = document.querySelector("p#form-info"),
                userData,
                content;

        // Prüfung des Usernamen und Passwort
        for (let i = 0; i < data.length; i++) {
            if (data[i].username.trim() == userName.value.trim() && data[i].password.trim() == userPass.value.trim()) {
                userData = data[i];
                break;
            }
        }

        // Ausgabe
        if(!para) {
            para = document.createElement("p");
            para.setAttribute("id", "form-info");
            para.classList = "form-error";
        }

        // Wenn Username und Passwort übereinstimmen, ansonsten Fehlermeldung ausgeben
        if (userData) {
            content = "<h1>Willkommen " + userData.username + "</h1>"
            content += "<p>Deine E-Mail Adresse: <a href=\"mailto:" + userData.email + "\">" + userData.email + "</a></p>"
            content += "<p>Dein Alter: " + userData.age + "</p>"
            content += "<p>Deine Webseite: "
            if (userData.webseite != "") { content += "<a href=\"" + userData.website + "\" target=\"_blank\">" + userData.website + "</a>" }
            content += "</p>";

            output.innerHTML = content;
        } else {
            para.textContent = "Falscher Benutzername oder Passwort";
            form.insertAdjacentElement("beforebegin", para);
        }

    };

    // Neuen User überprüfen
    const registerUser = function(data, form) {

        const   userName = form.querySelector("#username").value.trim(),
                userEmail = form.querySelector("#email").value.trim(),
                userWeb = form.querySelector("#website").value.trim(),
                userAge = Number(form.querySelector("#age").value),
                userPass = form.querySelector("#password").value.trim();
        let     para = document.querySelector("p#form-info"),
                errMsg;

        // Prüfung ob User oder E-Mail schon vorhanden
        for (let i = 0; i < data.length; i++) {
            if (data[i].username == userName || data[i].email == userEmail) {
                if(data[i].username == userName) { errMsg = "Benutzername schon vergeben! "; }
                else if(data[i].email == userEmail) { errMsg = "E-Mail Adresse schon vergeben! "; }
                break;
            }
        }

        // Ausgabe
        if(!para) {
            para = document.createElement("p");
            para.setAttribute("id", "form-info");
        }

        // Erfolgsmeldung oder Fehlermeldung ausgeben
        if(!errMsg) {
            const newRegUser = {
                username: userName,
                password: userPass,
                website: userWeb,
                age: userAge,
                email: userEmail
            }
            data.push(newRegUser);
            para.classList.remove("form-error");
            para.textContent = "Benutzer erfolgreich angelegt!";

            saveNewUser(JSON.stringify(data));
        } else {
            para.classList = "form-error";
            para.textContent = errMsg;
        }
        
        form.insertAdjacentElement("beforebegin", para);
    };

    // Neuen Nutzer in der user.json speichern
    const saveNewUser = function(jsonData) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status != 200) {
                output = "Fehler beim Speichern eines neuen Benutzers!"
                return;
            }
        };
        xhr.open("POST", "./script.php");
        xhr.send(jsonData);
    };

    init();
}