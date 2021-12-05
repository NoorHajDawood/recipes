import { storageService } from './async-storage.service.js'
import { storage } from './storage-service.js'
// const axios = require('axios')

const Recipe_KEY = 'recipesDB';

// var gToys = _createToys()
_createRecipes();

export const recipesService = {
    query,
    getById,
    remove,
    save,
    getEmptyRecipe
}

// TODO: support paging and filtering and sorting
function query() {
    // filterBy
    return storageService.query(Recipe_KEY)
        // return axios.get(Recipe_URL, { params: filterBy }).then(res => res.data)
}

function getById(id) {
    // return 

    const recipe = storageService.get(Recipe_KEY, id)
    return recipe;
    // return axios.get(Recipe_URL + id).then(res => res.data)
}

function remove(id) {
    return storageService.remove(Recipe_URL, id)
        // return axios.delete(Recipe_URL + id).then(res => res.data)

}

function save(recipe) {
    const savedrecipe = (recipe._id) ? storageService.put(Recipe_KEY, recipe) : storageService.post(Recipe_KEY, recipe)
    return savedrecipe;
    // if (recipe._id) {
    //     return axios.put(Recipe_URL + `${recipe._id}`, recipe).then(res => res.data)
    // } else {
    //     return axios.post(Recipe_URL, recipe).then(res => res.data)
    // }
}


function getEmptyRecipe() {
    return {

    }
}

function _createRecipes() {
    var recipes = storage.load(Recipe_KEY)
    if (!recipes || !recipes.length) {
        recipes = [

            {
                "_id": "f101",
                "title": "One Bowl Chocolate Cake",
                "imageUrl": "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/easy_chocolate_cake_31070_16x9.jpg",
                "description": "This is a rich and moist chocolate cake. It only takes a few minutes to prepare the batter. Frost with your favorite chocolate frosting.",
                "prepTime": "20 mins",
                "serving": 24,
                "memberId": 0,
                "ingredients": [{
                        "name": "white sugar",
                        "quantity": 2,
                        "unit": "cups"
                    },
                    {
                        "name": "unsweetened cocoa powder",
                        "quantity": "3/4",
                        "unit": "cups"
                    },
                    {
                        "name": "eggs",
                        "quantity": "2",
                        "unit": ""
                    },
                    {
                        "name": "milk",
                        "quantity": "1",
                        "unit": ""
                    }
                ],
                "instructions": [
                    "instruction 1",
                    "instruction 2"
                ],
                "likes": 100
            },
            {
                "_id": "f102",
                "title": "One Bowl Chocolate Cake",
                "imageUrl": "https://www.mybakingaddiction.com/wp-content/uploads/2011/10/lr-0953.jpg",
                "description": "This is a rich and moist chocolate cake. It only takes a few minutes to prepare the batter. Frost with your favorite chocolate frosting.",
                "prepTime": "20 mins",
                "serving": 24,
                "memberId": 0,
                "ingredients": [{
                        "name": "white sugar",
                        "quantity": 2,
                        "unit": "cups"
                    },
                    {
                        "name": "unsweetened cocoa powder",
                        "quantity": "3/4",
                        "unit": "cups"
                    },
                    {
                        "name": "eggs",
                        "quantity": "2",
                        "unit": ""
                    },
                    {
                        "name": "milk",
                        "quantity": "1",
                        "unit": ""
                    }
                ],
                "instructions": [
                    "instruction 1",
                    "instruction 2"
                ],
                "likes": 100
            },
            {
                "_id": "f103",
                "title": "One Bowl Chocolate Cake",
                "imageUrl": "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/easy_chocolate_cake_31070_16x9.jpg",
                "description": "This is a rich and moist chocolate cake. It only takes a few minutes to prepare the batter. Frost with your favorite chocolate frosting.",
                "prepTime": "20 mins",
                "serving": 24,
                "memberId": 0,
                "ingredients": [{
                        "name": "white sugar",
                        "quantity": 2,
                        "unit": "cups"
                    },
                    {
                        "name": "unsweetened cocoa powder",
                        "quantity": "3/4",
                        "unit": "cups"
                    },
                    {
                        "name": "eggs",
                        "quantity": "2",
                        "unit": ""
                    },
                    {
                        "name": "milk",
                        "quantity": "1",
                        "unit": ""
                    }
                ],
                "instructions": [
                    "instruction 1",
                    "instruction 2"
                ],
                "likes": 100
            },
            {
                "_id": "f104",
                "title": "One Bowl Chocolate Cake",
                "imageUrl": "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/easy_chocolate_cake_31070_16x9.jpg",
                "description": "This is a rich and moist chocolate cake. It only takes a few minutes to prepare the batter. Frost with your favorite chocolate frosting.",
                "prepTime": "20 mins",
                "serving": 24,
                "memberId": 0,
                "ingredients": [{
                        "name": "white sugar",
                        "quantity": 2,
                        "unit": "cups"
                    },
                    {
                        "name": "unsweetened cocoa powder",
                        "quantity": "3/4",
                        "unit": "cups"
                    },
                    {
                        "name": "eggs",
                        "quantity": "2",
                        "unit": ""
                    },
                    {
                        "name": "milk",
                        "quantity": "1",
                        "unit": ""
                    }
                ],
                "instructions": [
                    "instruction 1",
                    "instruction 2"
                ],
                "likes": 100
            }

        ]
        storage.store(Recipe_KEY, recipes)
    }
    return recipes;
}