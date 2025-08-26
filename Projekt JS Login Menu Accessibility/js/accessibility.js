"use strict";

{
    
    // Elemente referenzieren
    const divAccess = document.querySelector("#accessibility");
    const origFontSize = window.getComputedStyle(document.body).getPropertyValue("font-size");
    const ALT_FONT_TYPES = "Times New Roman, Times, serif"; // Alternative Schriftart
    const UNIT = "px"; // Einheit für Schriftgröße etc.
    const STEPS = 2; // Pixelangabe für Schriftgröße kleiner oder größer
    let settingsObj = {};

    // Button-Beschriftungen
    const BUTTONS = [
        "Schrift ändern",
        "Aa+",
        "Aa-",
        "Links unterstreichen",
        "Zurücksetzen"
    ];
    // Button id=""
    const BUTTON_IDS = [
        "fontType",
        "fontSizePlus",
        "fontSizeMinus",
        "linksUnderline",
        "resetSettings"
    ];

    // Initialisierungsfunktion
    const init = function() {

        // Buttons erzeugen, übergeben an ausgelagerter Funktion
        for (let i = 0; i < BUTTONS.length; i++) {
            createButton(BUTTON_IDS[i], "accessBtn", BUTTONS[i], divAccess);
        }
        setStyles();
        
    }

    // ausgelagerte Funktionen

    // Button erzeugen
    const createButton = function(name, klasse, text, container) {

        const button = document.createElement("button");
        button.setAttribute("id", name);
        if (klasse) { button.classList = klasse; }
        button.textContent = text;
        button.addEventListener("click", function() {
            setSettings(name);
        });
        container.append(button);

    };

    // Einstellungen setzen und speichern
    const setSettings = function(name) {

        if (name == "resetSettings") {
            for (const property in settingsObj) {
                localStorage.setItem(property, "");
            }
            setStyles();
            return;
        } 
        else if (name == "fontSizePlus" || name == "fontSizeMinus") {
            const oldName = name.slice();
            name = name.slice(0, 8);
            settingsObj[name] = newFontSize(oldName);
        }
        else if (!settingsObj[name] || settingsObj[name] == 0) { settingsObj[name] = 1; } 
        else { settingsObj[name] = 0; }

        // Speicher neue Einstellungen
        if (Storage) {
            localStorage.setItem(name, settingsObj[name]);
        }
        setStyles();

    };

    // Neue Schriftgröße erzeugen
    const newFontSize = function(name) {

        let fontSize = parseFloat(document.body.style.fontSize);
        if(isNaN(fontSize)) { fontSize = parseFloat(origFontSize); }

        if (name == "fontSizePlus" && fontSize < parseFloat(origFontSize) * 2) {
            fontSize = fontSize + STEPS;
        } 
        if (name == "fontSizeMinus" && fontSize > parseFloat(origFontSize) * 0.5) {
            fontSize = fontSize - STEPS;
        }
        return fontSize;

    }

    // DOM Styles setzen
    const setStyles = function() {

        // Hole Einstellungen aus dem Speicher
        if (Storage) {
            settingsObj = {
                "fontType": localStorage.getItem("fontType"),
                "fontSize": localStorage.getItem("fontSize"),
                "linksUnderline": localStorage.getItem("linksUnderline")
            };
        }

        // Schriftart ändern
        if (settingsObj["fontType"] == 1) { document.body.style.fontFamily = ALT_FONT_TYPES; }
        else { document.body.style.fontFamily = ""; }

        // Schriftgröße ändern
        if (settingsObj["fontSize"]) { document.body.style.fontSize = settingsObj["fontSize"] + UNIT; }
        else { document.body.style.fontSize = ""; }

        // Links-Unterstreichung ändern
        if (settingsObj["linksUnderline"] == 1) {
            const linksAll = document.querySelectorAll("a[href]");
            for (let i = 0; i < linksAll.length; i++) {
                linksAll[i].style.textDecoration = "underline";
            }
        } else {
            const linksAll = document.querySelectorAll("a[href]");
            for (let i = 0; i < linksAll.length; i++) {
                linksAll[i].style.textDecoration = "";
            }
        }

    }

    init();
}