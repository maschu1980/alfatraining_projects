
// random Reihenfolge der Tage generieren
export const randomDays = value => {
    let days = new Set();
    while (days.size < value) {
        let rndDay = Math.ceil(Math.random() * value);
        days.add(rndDay);
    }
    return [...days];
};

// HTML-Tag erstellen
export const createTag = (tag, tagText, tagId = false, tagClass = false, tagEvent = false) => {
    const newTag = document.createElement(tag);
    newTag.html(tagText);
    if (tagId) newTag.setAttribute("id", tagId);
    if (tagClass) newTag.classList = tagClass;
    if (tagEvent) newTag.addEventListener(tagEvent.event, tagEvent.function, tagEvent.options);
    return newTag;
};