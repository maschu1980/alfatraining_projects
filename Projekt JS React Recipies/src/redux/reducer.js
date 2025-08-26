import * as ACTIONS from './actionTypeStrings';

const initState = {
    category: "-1",
    categories: [],
    recipes: [],
    users: [],
    loggedin: null,
    showEdit: null,
    editCat: null,
    editRecipe: null,
    searchStr: "",
    sortRecipes: null,
    pinnedRecipes: []
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ACTIONS.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case ACTIONS.SET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case ACTIONS.SET_SHOW_CAT:
            return {
                ...state,
                category: action.payload
            }
        case ACTIONS.SET_LOGIN:
            return {
                ...state,
                loggedin: action.payload
            }
        case ACTIONS.SET_LOGOUT:
            return {
                ...state,
                loggedin: null
            }
        case ACTIONS.SET_SHOW_EDIT:
            return {
                ...state,
                showEdit: action.payload
            }
        case ACTIONS.SET_EDITCAT:
            return {
                ...state,
                editCat: action.payload
            }
        case ACTIONS.CHANGE_CAT_VAL:
            return {
                ...state,
                editCat: {...state.editCat, [action.payload.target.name] : action.payload.target.value }
            }
        case ACTIONS.ADDCAT:
            return {
                ...state,
                categories: [...state.categories, action.payload],
                editCat: null
            }        
        case ACTIONS.UPDATECAT:
            return {
                ...state,
                categories: state.categories.map(elem => elem.id == action.payload.id ? action.payload : elem),
                editCat: null
            }
        case ACTIONS.DELCAT:
            return {
                ...state,
                categories: state.categories.filter(elem => elem.id != action.payload),
                editCat: null
            }
        case ACTIONS.SET_EDITRECIPE:
            return {
                ...state,
                editRecipe: action.payload
            }
        case ACTIONS.CHANGE_RECIPE_VAL:
            return {
                ...state,
                editRecipe: {...state.editRecipe, [action.payload.target.name] : action.payload.target.value }
            }
        case ACTIONS.ADDRECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                editRecipe: null
            }
        case ACTIONS.UPDATERECIPE:
            return {
                ...state,
                recipes: state.recipes.map(elem => elem.id == action.payload.id ? action.payload : elem),
                editRecipe: null
            }
        case ACTIONS.DELRECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(elem => elem.id != action.payload)
            }
        case ACTIONS.RESET_EDIT:
            return {
                ...state,
                showEdit: null,
                editCat: null,
                editRecipe: null
            }
        case ACTIONS.SET_SEARCH:
            return {
                ...state,
                searchStr: action.payload
            }
        case ACTIONS.SET_SORT:
            return {
                ...state,
                sortRecipes: action.payload
            }
        case ACTIONS.SET_PINNED:
            return {
                ...state,
                pinnedRecipes: action.payload
            }
        case ACTIONS.ADDPINNED:
            return {
                ...state,
                pinnedRecipes: [...state.pinnedRecipes, action.payload]
            }
        case ACTIONS.DELPINNED:
            return {
                ...state,
                pinnedRecipes: state.pinnedRecipes.filter(elem => elem != action.payload)
            }
        default:
            return state
    }
}

export default reducer;