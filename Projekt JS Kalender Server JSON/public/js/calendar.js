import { randomDays, createTag } from "./../modules/custom-modules.js";

const DAYS = 24;                            // Anzahl Tage/Türchen
const MONTH = 11;                           // Monat (0-11)
const DIVCLASS = "advent-class";            // Klasse(n) für erzeugte Tage/Türchen
const CANVAS = { width: 190, height: 250 }; // Canvas Größe für Animation 
const PICPATH = "./pics";                   // Pfad zu den Hintergrundbildern für die Tage/Türchen

const advCal = jSelect("#advent-calendar"); // document.querySelector()
const date = new Date();                    // aktuelles Datum
const rndDays = randomDays(DAYS);           // zufällige Anordnung der Tage/Türchen
let openedDays;

console.log(rndDays);

// Hole JSON Daten und erzeuge den Kalender
fetch("./json/calendar.json")
.then( data => { return data.json() } )
.then( jsonData => {

    // JSON Daten nach Map( Map() ) konvertieren
    const dataDays = new Map(Object.entries(jsonData));
    dataDays.forEach( (elem, index) => dataDays.set(index, new Map(Object.entries(elem)) ) );
    
    const init = () => {
        
        // erzeuge alle Kalender Tage/Türchen
        rndDays.forEach( day => {
            const dayDiv = createTag(
                "div",
                day,
                `day-${day}`,
                DIVCLASS,
                {
                    event: "click",
                    function: () => openDoor(day)
                }
            );
            advCal.append(dayDiv);
        });

        // Schon geöffnete Tage/Türchen aus Speicher auslesen 
        // if (Storage) openedDays = JSON.parse(localStorage.getItem("advCalendar"));

        // Bereits geöffnete Tage/Türchen aus Datenbank auslesen
        getDays();

    };

    // Öffne Tage/Türchen
    const openDoor = (day, newDay = true) => {

        // Prüfung ob Tag/Türchen schon geöffnet werden darf
        if (checkDay(day)) {  

            // Tag/Türchen öffnen
            const oldDiv = jSelect(`#day-${day}`);
            const newDiv = oldDiv.cloneNode();
            newDiv.style.backgroundImage = `url(${PICPATH}/${dataDays.get(String(day)).get("picture")})`;
            newDiv.classList.add("open");
            newDiv.html(dataDays.get(String(day)).get("description"));
            oldDiv.replaceWith(newDiv);
            
            // Wenn neuer Tag/Türchen geöffnet wird
            if(newDay) {

                // Canvas erzeugen und Animation ausführen, danach Canvas wieder löschen
                const canvas = createTag("canvas", "", "", "canvas-class");
                canvas.setAttribute("width", `${CANVAS.width}px`);
                canvas.setAttribute("height", `${CANVAS.height}px`);
                canvas.style.position = "absolute";
                newDiv.append(canvas);
                requestAnimationFrame(() => openDoorAni(canvas));

                // in Speicher speichern
                // if(Storage) localStorage.setItem("advCalendar", JSON.stringify(openedDays));

                // in Datenbank speichern
                saveDay(day);

            }           

        } else if (!jSelect("#advent-err")) {

            // Fehlermeldung generieren und ausgeben
            const errDiv = createTag(
                "div",
                "<p>Nanana, noch ist es nicht soweit!</p>",
                "advent-err",
                "advent-err",
                { 
                    event: "click",
                    function: event => event.currentTarget.remove(),
                }
            );
            errDiv.style.top = `${window.scrollY}px`;
            advCal.parentNode.prepend(errDiv);

        }
    };

    // Prüfe ob Datum bereits ereicht
    const checkDay = day => {
        //return true;
        return (day <= date.getDate() && date.getMonth() == MONTH) ? true : false;
    };

    // Bereits geöffnete Tage/Türchen aus Datenbank auslesen
    const getDays = () => {
        fetch("/getcaldays")
        .then( res => res.json() )
        .then( data => {
            if(data.advcal != "") {
                openedDays = JSON.parse(data.advcal);
                // Tage/Türchen, die schon geöffnet wurden, wieder öffnen
                openedDays.forEach( day => openDoor(day, false) );
            }
        })
        .catch( err => console.log(err) );
    };

    // Neuer Tag/Türchen in Datenbank speichern
    const saveDay = day => {
        let openedDaysSet = new Set(openedDays).add(day);
        openedDays = [...openedDaysSet].sort( (a, b) => a - b );

        fetch("/updatecaldays", {
            method:     "post",
            headers:    {"Content-Type": "application/json"},
            body:       JSON.stringify({newDays: JSON.stringify(openedDays)})
        })
        .catch( err => console.log(err) );
    };

    // Animation zum öffnen der Tage/Türchen
    const openDoorAni = (canvas, width = CANVAS.width) => {
        const context = canvas.getContext("2d");

        context.clearRect(0,0,CANVAS.width,CANVAS.height);

        context.fillStyle = "rgba(0,0,0,1)";
        context.fillRect(0, 0, width, CANVAS.height);

        if ( width > 0 ) { 
            width = width - 10;
            requestAnimationFrame( () => openDoorAni(canvas, width) );
        } else {
            canvas.remove();
        }
    };

    init();

})
.catch( err => console.log(err) );