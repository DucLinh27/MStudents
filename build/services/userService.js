"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _index = _interopRequireDefault(require("../models/index"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _sequelize = require("sequelize");
var _JWTAction = require("../middleware/JWTAction");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var salt = _bcryptjs["default"].genSaltSync(10);
var hashUserPassword = function hashUserPassword(password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var hashPassWord;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _bcryptjs["default"].hashSync(password, salt);
          case 3:
            hashPassWord = _context.sent;
            resolve(hashPassWord);
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var handleUserLogin = function handleUserLogin(email, password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var userData, isExist, user, check, token, refreshToken;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userData = {};
            _context2.next = 4;
            return checkUserEmail(email);
          case 4:
            isExist = _context2.sent;
            if (!isExist) {
              _context2.next = 34;
              break;
            }
            _context2.next = 8;
            return _index["default"].User.findOne({
              attributes: ["id", "email", "roleId", "password", "firstName", "lastName", "address", "gender", "phonenumber"],
              where: {
                email: email
              },
              raw: true
            });
          case 8:
            user = _context2.sent;
            if (!user) {
              _context2.next = 30;
              break;
            }
            _context2.next = 12;
            return _bcryptjs["default"].compare(password, user.password);
          case 12:
            check = _context2.sent;
            if (!check) {
              _context2.next = 26;
              break;
            }
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
            token = (0, _JWTAction.generateAccessToken)({
              id: user.id,
              username: user.email // Assuming the email is the username
            });
            refreshToken = (0, _JWTAction.generateRefreshToken)({
              id: user.id,
              username: user.email // Assuming the email is the username
            }); // Lưu token và refresh token vào bảng access_token
            _context2.next = 22;
            return _index["default"].Access_Token.create({
              userId: user.id,
              token: token,
              refreshToken: refreshToken
            });
          case 22:
            userData.token = token;
            userData.refreshToken = refreshToken;
            _context2.next = 28;
            break;
          case 26:
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          case 28:
            _context2.next = 32;
            break;
          case 30:
            userData.errCode = 2;
            userData.errMessage = "User not found";
          case 32:
            _context2.next = 36;
            break;
          case 34:
            userData.errCode = 1;
            userData.errMessage = "Your's Email isn't exist in our system, plz try other email";
          case 36:
            resolve(userData);
            _context2.next = 39;
            return getRoles(userData);
          case 39:
            _context2.next = 44;
            break;
          case 41:
            _context2.prev = 41;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 44:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 41]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var handleUserGoogle = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
              var user, token, refreshToken, newUser, _token, _refreshToken;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return _index["default"].User.findOne({
                      where: {
                        email: data.email
                      }
                    });
                  case 3:
                    user = _context3.sent;
                    if (!user) {
                      _context3.next = 12;
                      break;
                    }
                    token = (0, _JWTAction.generateAccessToken)({
                      id: user.id,
                      username: user.email
                    });
                    refreshToken = (0, _JWTAction.generateRefreshToken)({
                      id: user.id,
                      username: user.email
                    }); // Optionally save the tokens in the database
                    _context3.next = 9;
                    return _index["default"].Access_Token.create({
                      userId: user.id,
                      token: token,
                      refreshToken: refreshToken
                    });
                  case 9:
                    resolve({
                      errCode: 1,
                      errMessage: "Your email already exists, Plz try another email address GOOGLE",
                      userId: user.id,
                      token: token,
                      refreshToken: refreshToken
                    });
                    _context3.next = 18;
                    break;
                  case 12:
                    _context3.next = 14;
                    return _index["default"].User.create({
                      email: data.email,
                      firstName: data.name
                    });
                  case 14:
                    newUser = _context3.sent;
                    _token = (0, _JWTAction.generateAccessToken)({
                      id: newUser.id,
                      username: newUser.email
                    });
                    _refreshToken = (0, _JWTAction.generateRefreshToken)({
                      id: newUser.id,
                      username: newUser.email
                    }); // Optionally save the tokens in the database
                    // await db.Access_Token.create({ userId: newUser.id, token, refreshToken });
                    resolve({
                      errCode: 0,
                      message: "Ok",
                      userId: newUser.id,
                      token: _token,
                      refreshToken: _refreshToken
                    });
                  case 18:
                    _context3.next = 23;
                    break;
                  case 20:
                    _context3.prev = 20;
                    _context3.t0 = _context3["catch"](0);
                    reject(_context3.t0);
                  case 23:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[0, 20]]);
            }));
            return function (_x6, _x7) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function handleUserGoogle(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var checkUserEmail = function checkUserEmail(userEmail) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _index["default"].User.findOne({
              where: {
                email: userEmail
              }
            });
          case 3:
            user = _context5.sent;
            if (user) {
              resolve(true);
            } else {
              resolve(false);
            }
            _context5.next = 10;
            break;
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 7]]);
    }));
    return function (_x8, _x9) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var createNewUser = function createNewUser(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var check, hashPassWordFromBcrypt;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return checkUserEmail(data.email);
          case 3:
            check = _context6.sent;
            if (!(check === true)) {
              _context6.next = 8;
              break;
            }
            resolve({
              errCode: 1,
              errMessage: "Your email already exists, Plz try another email address"
            });
            _context6.next = 14;
            break;
          case 8:
            _context6.next = 10;
            return hashUserPassword(data.password);
          case 10:
            hashPassWordFromBcrypt = _context6.sent;
            _context6.next = 13;
            return _index["default"].User.create({
              email: data.email,
              password: hashPassWordFromBcrypt,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              phonenumber: data.phonenumber,
              gender: data.gender,
              roleId: data.roleId,
              positionId: data.positionId,
              image: data.avatar
            });
          case 13:
            resolve({
              errCode: 0,
              message: "Ok"
            });
          case 14:
            _context6.next = 19;
            break;
          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 19:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 16]]);
    }));
    return function (_x10, _x11) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var createNewStudents = function createNewStudents(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var check, hashPassWordFromBcrypt;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return checkUserEmail(data.email);
          case 3:
            check = _context7.sent;
            if (!(check === true)) {
              _context7.next = 8;
              break;
            }
            resolve({
              errCode: 1,
              errMessage: "Your email already exists, Plz try another email address"
            });
            _context7.next = 14;
            break;
          case 8:
            _context7.next = 10;
            return hashUserPassword(data.password);
          case 10:
            hashPassWordFromBcrypt = _context7.sent;
            _context7.next = 13;
            return _index["default"].User.create({
              email: data.email,
              password: hashPassWordFromBcrypt,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              phonenumber: data.phonenumber,
              gender: data.gender,
              roleId: "R3",
              // Set roleId to "R3"
              positionId: data.positionId,
              image: data.avatar
            });
          case 13:
            resolve({
              errCode: 0,
              message: "Ok"
            });
          case 14:
            _context7.next = 19;
            break;
          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 19:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 16]]);
    }));
    return function (_x12, _x13) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var changePassword = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(userId, oldPassword, newPassword) {
    var user, isMatch, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _index["default"].User.findOne({
            where: {
              id: userId
            }
          });
        case 2:
          user = _context8.sent;
          if (user) {
            _context8.next = 5;
            break;
          }
          throw new Error("User not found");
        case 5:
          _context8.next = 7;
          return _bcryptjs["default"].compare(oldPassword, user.password);
        case 7:
          isMatch = _context8.sent;
          if (isMatch) {
            _context8.next = 10;
            break;
          }
          throw new Error("Old password is incorrect");
        case 10:
          _context8.next = 12;
          return _bcryptjs["default"].hash(newPassword, 10);
        case 12:
          hashedPassword = _context8.sent;
          user.password = hashedPassword;
          _context8.next = 16;
          return user.save();
        case 16:
          return _context8.abrupt("return", user);
        case 17:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function changePassword(_x14, _x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getAllUsers = function getAllUsers(userId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var users;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            users = "";
            if (!(userId === "ALL")) {
              _context9.next = 6;
              break;
            }
            _context9.next = 5;
            return _index["default"].User.findAll({
              attributes: {
                exclude: ["password"]
              }
            });
          case 5:
            users = _context9.sent;
          case 6:
            if (!(userId && userId !== "ALL")) {
              _context9.next = 10;
              break;
            }
            _context9.next = 9;
            return _index["default"].User.findOne({
              where: {
                id: userId
              },
              attributes: {
                exclude: ["password"]
              }
            });
          case 9:
            users = _context9.sent;
          case 10:
            resolve(users);
            _context9.next = 16;
            break;
          case 13:
            _context9.prev = 13;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 16:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 13]]);
    }));
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var getAllStudents = function getAllStudents(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var _data;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _index["default"].User.findAll({
              where: {
                roleId: "R3"
              },
              attributes: {
                exclude: ["password"]
              }
            });
          case 3:
            _data = _context10.sent;
            resolve({
              errCode: 0,
              errMessage: "OK!",
              data: _data
            });
            _context10.next = 10;
            break;
          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 10:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 7]]);
    }));
    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var handleSearchUserByName = function handleSearchUserByName(name) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            if (name) {
              _context11.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              errMessage: "Missing parameter!"
            });
            _context11.next = 9;
            break;
          case 5:
            _context11.next = 7;
            return _index["default"].User.findAll({
              where: _defineProperty({}, _sequelize.Op.or, [{
                firstName: _defineProperty({}, _sequelize.Op.like, "%" + name + "%")
              }, {
                lastName: _defineProperty({}, _sequelize.Op.like, "%" + name + "%")
              }]),
              attributes: ["id", "firstName", "lastName"]
            });
          case 7:
            data = _context11.sent;
            if (data) {
              resolve({
                errCode: 0,
                errMessage: "OK!",
                data: data
              });
            } else {
              data = {};
              resolve({
                errCode: 1,
                errMessage: "User not found!",
                data: data
              });
            }
          case 9:
            _context11.next = 14;
            break;
          case 11:
            _context11.prev = 11;
            _context11.t0 = _context11["catch"](0);
            reject(_context11.t0);
          case 14:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 11]]);
    }));
    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var updateStudents = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(data) {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
              var user;
              return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.prev = 0;
                    if (!data.id || !data.gender) {
                      resolve({
                        errCode: 2,
                        errMessage: "The user does not exist"
                      });
                    }
                    _context12.next = 4;
                    return _index["default"].User.findOne({
                      where: {
                        id: data.id
                      },
                      raw: false
                    });
                  case 4:
                    user = _context12.sent;
                    if (!user) {
                      _context12.next = 19;
                      break;
                    }
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.address = data.address;
                    user.phonenumber = data.phonenumber;
                    user.roleId = "R3"; // Set roleId to "R3"
                    user.positionId = data.positionId;
                    user.gender = data.gender;
                    if (data.avatar) {
                      user.image = data.avatar;
                    }
                    _context12.next = 16;
                    return user.save();
                  case 16:
                    resolve({
                      errCode: 0,
                      message: "The user has been updated successfully"
                    });
                    _context12.next = 20;
                    break;
                  case 19:
                    resolve({
                      errCode: 1,
                      message: "User not found"
                    });
                  case 20:
                    _context12.next = 25;
                    break;
                  case 22:
                    _context12.prev = 22;
                    _context12.t0 = _context12["catch"](0);
                    reject(_context12.t0);
                  case 25:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12, null, [[0, 22]]);
            }));
            return function (_x24, _x25) {
              return _ref13.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function updateStudents(_x23) {
    return _ref12.apply(this, arguments);
  };
}();
var registerNewUser = function registerNewUser(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(resolve, reject) {
      var check, hashPassWordFromBcrypt;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return checkUserEmail(data.email);
          case 3:
            check = _context14.sent;
            if (!(check === true)) {
              _context14.next = 8;
              break;
            }
            resolve({
              errCode: 1,
              errMessage: "Your email already exists, Plz try another email address"
            });
            _context14.next = 14;
            break;
          case 8:
            _context14.next = 10;
            return hashUserPassword(data.password);
          case 10:
            hashPassWordFromBcrypt = _context14.sent;
            _context14.next = 13;
            return _index["default"].User.create({
              email: data.email,
              password: hashPassWordFromBcrypt,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              phonenumber: data.phonenumber,
              gender: data.gender,
              roleId: "R3",
              positionId: data.positionId,
              image: data.avatar
            });
          case 13:
            resolve({
              errCode: 0,
              message: "Ok"
            });
          case 14:
            _context14.next = 19;
            break;
          case 16:
            _context14.prev = 16;
            _context14.t0 = _context14["catch"](0);
            reject(_context14.t0);
          case 19:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[0, 16]]);
    }));
    return function (_x26, _x27) {
      return _ref14.apply(this, arguments);
    };
  }());
};
var deleteUSer = function deleteUSer(userId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(resolve, reject) {
      var foundUser;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _index["default"].User.findOne({
              where: {
                id: userId
              }
            });
          case 2:
            foundUser = _context15.sent;
            if (!foundUser) {
              resolve({
                errCode: 2,
                errMessage: "The user does not exist"
              });
            }
            _context15.next = 6;
            return _index["default"].User.destroy({
              where: {
                id: userId
              }
            });
          case 6:
            resolve({
              errCode: 0,
              errMessage: "The user is deleted successfully"
            });
          case 7:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    }));
    return function (_x28, _x29) {
      return _ref15.apply(this, arguments);
    };
  }());
};
var updateUser = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(data) {
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          return _context17.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(resolve, reject) {
              var user;
              return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                while (1) switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.prev = 0;
                    if (!data.id || !data.gender) {
                      resolve({
                        errCode: 2,
                        errMessage: "The user does not exist"
                      });
                    }
                    _context16.next = 4;
                    return _index["default"].User.findOne({
                      where: {
                        id: data.id
                      },
                      raw: false
                    });
                  case 4:
                    user = _context16.sent;
                    if (!user) {
                      _context16.next = 13;
                      break;
                    }
                    user.firstName = data.firstName, user.lastName = data.lastName, user.address = data.address, user.phonenumber = data.phonenumber, user.roleId = data.roleId, user.positionId = data.positionId, user.gender = data.gender;
                    if (data.avatar) {
                      user.image = data.avatar;
                    }
                    _context16.next = 10;
                    return user.save();
                  case 10:
                    resolve({
                      errCode: 0,
                      message: "The user has been updated successfully"
                    });
                    _context16.next = 14;
                    break;
                  case 13:
                    resolve({
                      errCode: 1,
                      message: "USer not found"
                    });
                  case 14:
                    _context16.next = 19;
                    break;
                  case 16:
                    _context16.prev = 16;
                    _context16.t0 = _context16["catch"](0);
                    reject(_context16.t0);
                  case 19:
                  case "end":
                    return _context16.stop();
                }
              }, _callee16, null, [[0, 16]]);
            }));
            return function (_x31, _x32) {
              return _ref17.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function updateUser(_x30) {
    return _ref16.apply(this, arguments);
  };
}();
var getAllCodeService = function getAllCodeService(typeInput) {
  return new Promise( /*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(resolve, reject) {
      var _res, allCode;
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            if (typeInput) {
              _context18.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              errMessage: "Missing required parameter"
            });
            _context18.next = 12;
            break;
          case 5:
            _res = {};
            _context18.next = 8;
            return _index["default"].Allcode.findAll({
              where: {
                type: typeInput
              }
            });
          case 8:
            allCode = _context18.sent;
            _res.errCode = 0;
            _res.data = allCode;
            resolve(_res);
          case 12:
            resolve(res);
            _context18.next = 18;
            break;
          case 15:
            _context18.prev = 15;
            _context18.t0 = _context18["catch"](0);
            reject(_context18.t0);
          case 18:
          case "end":
            return _context18.stop();
        }
      }, _callee18, null, [[0, 15]]);
    }));
    return function (_x33, _x34) {
      return _ref18.apply(this, arguments);
    };
  }());
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUSer: deleteUSer,
  updateUser: updateUser,
  getAllCodeService: getAllCodeService,
  registerNewUser: registerNewUser,
  changePassword: changePassword,
  handleUserGoogle: handleUserGoogle,
  getAllStudents: getAllStudents,
  createNewStudents: createNewStudents,
  updateStudents: updateStudents,
  handleSearchUserByName: handleSearchUserByName
};