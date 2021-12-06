"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = void 0;
// import Axios from 'axios';
// var axios = Axios.create({ withCredentials: true }); // to accwpt cookies
// const USER_URL = 
var AUTH_URL = 'dd';
var STORAGE_KEY = 'loggedinUser';
var userService = {
  getLoggedinUser: getLoggedinUser,
  saveUser: saveUser,
  _createUser: _createUser,
  login: login,
  signup: signup,
  logout: logout
};
exports.userService = userService;
saveUser(userService._createUser());

function saveUser(user) {
  return regeneratorRuntime.async(function saveUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // async
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          return _context.abrupt("return", user);

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          throw "user not saved to storage - DB ".concat(_context.t0);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function logout() {
  return regeneratorRuntime.async(function logout$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          sessionStorage.clear();
          _context2.next = 7;
          break;

        case 4:
          _context2.prev = 4;
          _context2.t0 = _context2["catch"](0);
          throw "error - logout ".concat(_context2.t0);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 4]]);
}

function signup(user) {
  return regeneratorRuntime.async(function signup$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // const res = await axios.post(AUTH_URL+'/signup', user);
          // const savedUser = res.data;
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          return _context3.abrupt("return", user);

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function getLoggedinUser() {
  return regeneratorRuntime.async(function getLoggedinUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          return _context4.abrupt("return", JSON.parse(sessionStorage.getItem(STORAGE_KEY)));

        case 4:
          _context4.prev = 4;
          _context4.t0 = _context4["catch"](0);
          console.log('error in logginUser - DB');
          throw _context4.t0;

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 4]]);
}

function login(user) {
  return regeneratorRuntime.async(function login$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          // const res = await axios.post(AUTH_URL+'/login', {username, password});
          // const user = res.data;
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          return _context5.abrupt("return", user);

        case 5:
          _context5.prev = 5;
          _context5.t0 = _context5["catch"](0);
          console.log('error login');
          throw _context5.t0;

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function _createUser() {
  return {
    "_id": "abcd",
    "username": "Roni Bel",
    "email": "roni@gmail.com",
    "userImg": "https://data.whicdn.com/images/343025845/original.jpg",
    "from": "Israel",
    "desc": "I love to cook\n        and I live in Tel Aviv\n        I'm developer",
    "myRecipes": [{
      "_id": "f101",
      "img": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80"
    }, {
      "_id": "f102",
      "img": "https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg"
    }],
    "favorites": []
  };
} //   "img": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80",
// "_id": "f101"
// async function login(user) {
//     try {
//         const res = await axios.post(AUTH_URL + '/login', user);
//         const userSaved = res.data;
//     } catch (err) {
//         console.log(err);
//     }
// }