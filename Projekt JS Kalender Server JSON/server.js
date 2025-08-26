import express from "express";
import models from "./modules/db.js";
import { formDataCheck } from "./modules/formdatacheck.js";

const APP = express();
const IP = "127.0.0.1";
const PORT = 8081;

models.sequelize
.sync( { force: true } )
.then( () => {
    models.LoginTable.bulkCreate([
        {
            username: "robby111",
            email: "robby@111.de",
            password: "1234",
            advcal: ""
        },
        {
            username: "Elfie",
            email: "elfe@zauberwald.de",
            password: "0000",
            advcal: ""
        }
    ]).then( data => {
        //console.log(data);
        
        let userdata;

        APP.set("view engine", "ejs");
        APP.use(express.urlencoded({ extended: false }));
        APP.use(express.json());
        APP.use(express.static("public"));

        APP.get("/", (req, res) => { 
            res.render("index"); 
        });
        
        APP.post("/login", (req, res) => {
            models.LoginTable.findOne({
                raw: true,
                where: {
                    username: req.body.username,
                    password: req.body.password,
                },
                attributes: ["id", "username"]
            })
            .then( data => {
                userdata = {user: data};
                if(!userdata.user) {
                    console.log("Nutzername oder Passwort falsch!");
                    res.redirect("/");
                } else {
                    res.redirect("/calendar");
                }
            });
        });

        APP.post("/register", (req, res) => {
            let userName = req.body.username.trim();
            let userMail = req.body.email.trim();
            let userPass = req.body.password.trim();

            formDataCheck(userName, userMail, userPass)
            .then( error => {
                if (error) { 
                    console.log(error);
                } else {
                    models.LoginTable.create({
                        username: userName,
                        email: userMail,
                        password: userPass,
                    });
                    res.redirect("/");
                }
            });
        });

        APP.get("/calendar", (req, res) => {
            if(userdata && userdata.user) res.render("calendar", userdata);
            else res.redirect("/");
        });

        APP.get("/getcaldays", (req, res) => {
            if(userdata && userdata.user) {
                models.LoginTable.findOne({
                    raw: true,
                    where: { id: userdata.user.id },
                    attributes: ["advcal"]
                })
                .then( data => res.send(data) );
            } else { 
                res.redirect("/");
            }
        });
        
        APP.post("/updatecaldays", (req, res) => {
            if(userdata && userdata.user) {
                models.LoginTable.update(
                    { advcal: req.body.newDays },
                    { where: { id: userdata.user.id } }
                );
                res.sendStatus(200);
            } else { 
                res.redirect("/");
            }
        });
        
        APP.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`));

    });
});