import { storageService } from './async-storage.service.js'
import { storage } from './storage-service.js'
const axios = require('axios')

const Recipe_KEY = 'recipesDB';

// var gToys = _createToys()
// _createRecipes();
const Recipe_URL = `/`;
// https://recipes-methods.herokuapp.com/

export const recipesService = {
    query,
    getById,
    remove,
    save
}

// TODO: support paging and filtering and sorting
function query(filter) {
    // filterBy
    // return storageService.query(Recipe_KEY)
    return axios.get(Recipe_URL + `api/recipes?title=${filter.title??''}&sort=${filter.sort}`).then(res => res.data)
}

function getById(id) {
    // return 

    // const recipe = storageService.get(Recipe_KEY, id)
    // return recipe;
    return axios.get(Recipe_URL + 'api/recipes/' + id).then(res => res.data)
}

function remove(id) {
    // return storageService.remove(Recipe_KEY, id)
    return axios.delete(Recipe_URL + 'api/recipes/' + id).then(res => res.data)
}

async function save(recipe) {
    // const savedrecipe = (recipe._id) ? storageService.put(Recipe_KEY, recipe) : storageService.post(Recipe_KEY, recipe)
    const url = '/api/recipes';
    if (recipe._id) {
        return await axios.patch(url + `/${recipe._id}`, recipe).data;
    } else {
        const addResult = await axios.post(url, recipe);
        return addResult.data;
    }
}