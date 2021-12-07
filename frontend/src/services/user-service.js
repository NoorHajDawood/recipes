import Axios from 'axios';
var axios = Axios.create({ withCredentials: true }); // to accwpt cookies

// credentials: "include"
// const USER_URL = 
// const AUTH_URL = `https://recipes-methods.herokuapp.com/`;
const AUTH_URL = `/`;
const STORAGE_KEY = 'loggedinUser';

export const userService = {
    getLoggedinUser,
    saveUser,
    login,
    signup,
    logout
}


// saveUser(userService._createUser())

async function saveUser(user) {
    try {
        // async
        await axios.patch(AUTH_URL + 'api/users/' + user._id, user);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));

        // return user;
    } catch (err) {
        throw `user not saved to storage - DB ${err}`;
    }
}

async function logout() {
    try {
        sessionStorage.clear();
        await axios.get('/api/sessions/logout');
    } catch (err) {
        throw `error - logout ${err}`;
    }
}

async function signup(user) {
    try {
        user.favorites = [];
        user.myRecipes = [];
        const res = await axios.post('/api/users', user);
        res.data.password = user.password
        user = res.data;
        // user._id = res.data._id;
        await login(user);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return user;
    } catch (err) {
        throw err;
    }
}

async function getLoggedinUser() {
    try {
        let user = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
        if (!user) {
            try {
                const tempUser = (await axios.post('/api/sessions/login', {})).data;
                user = tempUser;
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            } catch (err) {}
        }
        return user;
    } catch (err) {
        throw err;
    }
}

async function login(user) {
    try {
        const params = new URLSearchParams();
        params.append('email', user.email);
        params.append('password', user.password);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const res = await axios.post(`/api/sessions/login`, params, config);
        const currUser = res.data;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currUser));

        return currUser;
    } catch (err) {
        throw err;
    }
}

function _createUser() {
    return {
        "_id": "abcd",
        "username": "Roni Bel",
        "email": "roni@gmail.com",
        "userImg": "https://data.whicdn.com/images/343025845/original.jpg",
        "from": "Israel",
        "desc": `I love to cook
        and I live in Tel Aviv
        I'm developer`,
        "myRecipes": [{
                "_id": "f101",
                "img": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80"
            },
            {
                "_id": "f102",
                "img": "https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg"
            }
        ],
        "favorites": []
    }
}