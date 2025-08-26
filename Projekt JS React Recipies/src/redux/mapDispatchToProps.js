import * as ACTIONS from './actionTypeStrings';
import axios from 'axios';
import { BASE_URL } from '../assets/baseURL'

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: () => {
            dispatch(() => {
                axios.get(`${BASE_URL}/users`)
                .then(res => {
                    dispatch({
                        type: ACTIONS.SET_USERS,
                        payload: res.data
                    })
                })
                axios.get(`${BASE_URL}/categories`)
                .then(res => {
                    dispatch({
                        type: ACTIONS.SET_CATEGORIES,
                        payload: res.data
                    })
                })
                axios.get(`${BASE_URL}/recipes`)
                .then(res => {
                    dispatch({
                        type: ACTIONS.SET_RECIPES,
                        payload: res.data
                    })
                })
            })
        },
        showCat: (cat) => {
            dispatch({
                type: ACTIONS.SET_SHOW_CAT,
                payload: cat
            })
        },
        login: (obj) => {
            dispatch({
                type: ACTIONS.SET_LOGIN,
                payload: obj
            })
        },
        logout: () => {
            dispatch({
                type: ACTIONS.SET_LOGOUT
            })
        },
        resetEdit: () => {
            dispatch({
                type: ACTIONS.RESET_EDIT
            })
        },
        setShowEdit: (string) => {
            dispatch({
                type: ACTIONS.SET_SHOW_EDIT,
                payload: string
            })
        },
        setEditCat: (obj) => {
            dispatch({
                type: ACTIONS.SET_EDITCAT,
                payload: obj
            })
        },
        changeCatVal: (e) => {
            dispatch({
                type: ACTIONS.CHANGE_CAT_VAL,
                payload: e
            })
        },
        addCat: (obj) => {
            dispatch(() => {
                axios.post(`${BASE_URL}/categories`, obj)
                .then(res => {
                    dispatch({
                        type: ACTIONS.ADDCAT,
                        payload: res.data
                    })
                })
            })
        },
        updateCat: (id, obj) => {
            dispatch(() => {
                axios.put(`${BASE_URL}/categories/${id}`, obj)
                .then(res => {
                    dispatch({
                        type: ACTIONS.UPDATECAT,
                        payload: res.data
                    })
                })
            })
        },
        delCat: (id) => {
            dispatch(() => {
                axios.delete(`${BASE_URL}/categories/${id}`)
                .then(res => {
                    dispatch({
                        type: ACTIONS.DELCAT,
                        payload: id
                    })
                })
            })
        },
        setEditRecipe: (obj) => {
            dispatch({
                type: ACTIONS.SET_EDITRECIPE,
                payload: obj
            })
        },
        changeRecipeVal: (e) => {
            dispatch({
                type: ACTIONS.CHANGE_RECIPE_VAL,
                payload: e
            })
        },
        addRecipe: (obj) => {
            dispatch(() => {
                axios.post(`${BASE_URL}/recipes`, obj)
                .then(res => {
                    dispatch({
                        type: ACTIONS.ADDRECIPE,
                        payload: res.data
                    })
                })
            })
        },
        updateRecipe: (id, obj) => {
            dispatch(() => {
                axios.put(`${BASE_URL}/recipes/${id}`, obj)
                .then(res => {
                    dispatch({
                        type: ACTIONS.UPDATERECIPE,
                        payload: res.data
                    })
                })
            })
        },
        delRecipe: (id) => {
            dispatch(() => {
                axios.delete(`${BASE_URL}/recipes/${id}`)
                .then(res => {
                    dispatch({
                        type: ACTIONS.DELRECIPE,
                        payload: id
                    })
                })
            })
        },
        searchRecipes: (string) => {
            dispatch({
                type: ACTIONS.SET_SEARCH,
                payload: string
            })
        },
        setSort: (obj) => {
            dispatch({
                type: ACTIONS.SET_SORT,
                payload: obj
            })
        },
        setPinned: (obj) => {
            dispatch({
                type: ACTIONS.SET_PINNED,
                payload: obj
            })
        },
        addPinned: (obj) => {
            dispatch({
                type: ACTIONS.ADDPINNED,
                payload: obj
            })
        },
        delPinned: (id) => {
            dispatch({
                type: ACTIONS.DELPINNED,
                payload: id
            })
        }
    }
}

export default mapDispatchToProps;