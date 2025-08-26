
// Prüfung der übergebenen Formulardaten beim Registrieren
export const formDataCheck = async (name, email, password) => {
    const emailRegEx = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    let errMsg = "";
    
    if (name != "") {
        const existingName = await models.LoginTable.findOne({ where: { username: name } });
        if(existingName) errMsg += "Benutzername schon vergeben\n";
    } else {
        errMsg += "Kein Benutzername angegben\n";
    }

    if(email != "" && emailRegEx.test(email)) {
        const existingMail = await models.LoginTable.findOne({ where: { email: email } });
        if(existingMail) errMsg += "E-Mail Adresse schon vergeben\n";
    } else {
        errMsg += "Keine gültige E-Mail Adresse\n";
    }
    
    if (password == "") errMsg += "Kein Passwort angegben\n";

    return errMsg;
}