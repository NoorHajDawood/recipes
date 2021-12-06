"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userStore = void 0;

var _userService = require("@/services/user-service.js");

var _bootstrapVue = require("bootstrap-vue");

var userStore = {
  state: {
    user: null
  },
  getters: {
    user: function user(state) {
      return state.user;
    }
  },
  mutations: {
    setUser: function setUser(state, _ref) {
      var savedUser = _ref.savedUser;
      state.user = savedUser;
    },
    addRecipeUser: function addRecipeUser(state, _ref2) {
      var recipe = _ref2.recipe;
      state.user.myRecipes.push({
        '_id': recipe._id,
        'img': recipe.imageUrl
      });

      _userService.userService.saveUser(state.user);
    }
  },
  actions: {
    saveUser: function saveUser(_ref3, _ref4) {
      var commit, user;
      return regeneratorRuntime.async(function saveUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref3.commit;
              user = _ref4.user;
              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(_userService.userService.saveUser(user));

            case 5:
              commit({
                type: "setUser",
                savedUser: user
              });
              return _context.abrupt("return", user);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              console.log('cannot save user chages');
              this.$notify.error({
                title: 'Error',
                message: 'Cant save changes'
              });
              throw _context.t0;

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[2, 9]]);
    },
    login: function login(_ref5, _ref6) {
      var commit, user, savedUser;
      return regeneratorRuntime.async(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref5.commit;
              user = _ref6.user;
              _context2.prev = 2;
              console.log('2', user);
              _context2.next = 6;
              return regeneratorRuntime.awrap(_userService.userService.login(user));

            case 6:
              savedUser = _context2.sent;
              commit({
                type: "setUser",
                savedUser: savedUser
              });
              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](2);
              console.log("error login");
              this.$notify.error({
                title: 'Error',
                message: 'Login error'
              });

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[2, 10]]);
    },
    logout: function logout(_ref7) {
      var commit;
      return regeneratorRuntime.async(function logout$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref7.commit;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(_userService.userService.logout());

            case 4:
              commit({
                type: 'setUser',
                savedUser: null
              });
              _context3.next = 11;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);
              this.$notify.error({
                title: 'Error',
                message: 'Logout error'
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[1, 7]]);
    },
    signup: function signup(_ref8, _ref9) {
      var commit, user, savedUser;
      return regeneratorRuntime.async(function signup$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref8.commit;
              user = _ref9.user;
              _context4.prev = 2;
              _context4.next = 5;
              return regeneratorRuntime.awrap(_userService.userService.signup(user));

            case 5:
              savedUser = _context4.sent;
              commit({
                type: "setUser",
                savedUser: savedUser
              });
              return _context4.abrupt("return", user);

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](2);
              this.$notify.error({
                title: 'Error',
                message: 'Sign-up error'
              });
              throw _context4.t0;

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[2, 10]]);
    },
    addRecipeToUser: function addRecipeToUser(_ref10, _ref11) {
      var commit, recipe;
      return regeneratorRuntime.async(function addRecipeToUser$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              commit = _ref10.commit;
              recipe = _ref11.recipe;
              _context5.prev = 2;
              commit({
                type: 'addRecipeUser',
                recipe: recipe
              });
              _context5.next = 10;
              break;

            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5["catch"](2);
              this.$notify.error({
                title: 'Error',
                message: 'Error save changes'
              });
              throw _context5.t0;

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[2, 6]]);
    },
    removeRecipeFromUser: function removeRecipeFromUser(_ref12, _ref13) {
      var commit, dispatch, getters, recipeId, user, idx;
      return regeneratorRuntime.async(function removeRecipeFromUser$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              commit = _ref12.commit, dispatch = _ref12.dispatch, getters = _ref12.getters;
              recipeId = _ref13.recipeId;
              _context6.prev = 2;
              user = JSON.parse(JSON.stringify(getters.user));
              idx = user.myRecipes.findIndex(function (recipe) {
                return recipe._id == recipeId;
              });
              user.myRecipes.splice(idx, 1);
              _context6.next = 8;
              return regeneratorRuntime.awrap(dispatch({
                type: 'saveUser',
                user: user
              }));

            case 8:
              _context6.next = 14;
              break;

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](2);
              this.$notify.error({
                title: 'Error',
                message: 'Error save changes'
              });
              throw _context6.t0;

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[2, 10]]);
    }
  }
};
exports.userStore = userStore;