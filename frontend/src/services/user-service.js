// import Axios from 'axios';
// var axios = Axios.create({ withCredentials: true }); // to accwpt cookies

// const USER_URL = 
const AUTH_URL = 'dd';
const STORAGE_KEY = 'loggedinUser';

export const userService = {
    getLoggedinUser,
    saveUser,
    _createUser,
    login,
    signup,
    logout
}

saveUser(userService._createUser())

async function saveUser(user) {
    try {
        // async
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return user;
    } catch (err) {
        throw `user not saved to storage - DB ${err}`;
    }
}

async function logout() {
    try {
        sessionStorage.clear();
    } catch (err) {
        throw `error - logout ${err}`;
    }
}

async function signup(user) {
    try {
        // const res = await axios.post(AUTH_URL+'/signup', user);
        // const savedUser = res.data;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return user;
    } catch (err) {
        throw err;
    }
}

async function getLoggedinUser() {
    try {
        //     const res = await axios.get(USER_URL);
        //     return res.data;
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    } catch (err) {
        console.log('error in logginUser - DB');
        throw err;
    }
}

async function login(user) {
    try {
        // const res = await axios.post(AUTH_URL+'/login', {username, password});
        // const user = res.data;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return user;
    } catch (err) {
        console.log('error login');
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


//   "img": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80",
// "_id": "f101"
// async function login(user) {
//     try {
//         const res = await axios.post(AUTH_URL + '/login', user);
//         const userSaved = res.data;

//     } catch (err) {
//         console.log(err);
//     }
// }