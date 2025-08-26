export const filterFunc = (data) => {
    let filteredRecipes = data.recipes,
    titleAddon = "";

    // Anzeige filtern
    // nach Kategorie filtern
    if (data.category > "0") {
        filteredRecipes = filteredRecipes.filter(elem => elem.category == data.category);
        titleAddon += data.categories.find(elem => data.category == elem.id).name;
    }
    // nach Angepinnt filtern
    if (data.category == "0") {
        filteredRecipes = filteredRecipes.filter(elem => { 
            return data.pinnedRecipes.find(item => elem.id == item)
        });
        titleAddon += "Angepinnt";
    }
    // nach Suchwort filtern
    if(data.searchStr) {
        const filter = new RegExp(`.*${data.searchStr}.*`, 'i')
        filteredRecipes = filteredRecipes.filter(elem => {
            return filter.test(elem.name) || filter.test(elem.ingredients) || filter.test(elem.cooking);
        });
        titleAddon += ` gesucht nach "${data.searchStr}" `;
    }
    // Sortierung
    if(data.sortRecipes) {
        filteredRecipes = [...filteredRecipes].sort((a, b) => {
            if (data.sortRecipes.direction == "up") {
                return String(a[data.sortRecipes.name])
                .localeCompare(String(b[data.sortRecipes.name]),'de-DE-u-kn-true');
            } else {
                return String(b[data.sortRecipes.name])
                .localeCompare(String(a[data.sortRecipes.name]),'de-DE-u-kn-true');
            } 
        });
    }

    return { recipes: filteredRecipes, titleAddon: titleAddon }
}