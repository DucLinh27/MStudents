"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _userService = _interopRequireDefault(require("../services/userService"));
var _JWTAction = require("../middleware/JWTAction");
var _memoryCache = _interopRequireDefault(require("memory-cache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var JWT = require("jsonwebtoken");
// import { getUserWithRole } from "../services/JWTService";

require("dotenv").config();
var ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
var REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
var refreshAccessToken = function refreshAccessToken(req, res) {
  var refreshToken = req.header("Refresh-Token");
  if (!refreshToken) {
    return res.status(401).json({
      error: "No refresh token provided"
    });
  }
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, function (err, user) {
    if (err) {
      return res.status(403).json({
        error: "Invalid refresh token"
      });
    }
    var newAccessToken = generateAccessToken({
      id: user.id,
      username: user.username
    });
    res.json({
      token: newAccessToken
    });
  });
};
var handleUserGoogle = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var message;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _userService["default"].handleUserGoogle(req.body);
        case 2:
          message = _context.sent;
          return _context.abrupt("return", res.status(200).json(message));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function handleUserGoogle(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var handleLoging = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var email, password, userData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          console.log("email:", email);
          console.log("password:", password);
          if (!(!email || !password)) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter!"
          }));
        case 6:
          _context2.next = 8;
          return _userService["default"].handleUserLogin(email, password);
        case 8:
          userData = _context2.sent;
          console.log("userData:", userData);
          return _context2.abrupt("return", res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
          }));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function handleLoging(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
// userController.js
var changePasswordService = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var userId, oldPassword, newPassword, confirmNewPassword;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.body.userId;
          oldPassword = req.body.oldPassword;
          newPassword = req.body.newPassword;
          confirmNewPassword = req.body.confirmNewPassword;
          if (!(!userId || !oldPassword || !newPassword || !confirmNewPassword)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
          }));
        case 6:
          if (!(newPassword !== confirmNewPassword)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            errCode: 2,
            errMessage: "New password and confirm new password do not match!"
          }));
        case 8:
          _context3.prev = 8;
          _context3.next = 11;
          return _userService["default"].changePassword(userId, oldPassword, newPassword);
        case 11:
          return _context3.abrupt("return", res.status(200).json({
            errCode: 0,
            errMessage: "Password changed successfully!"
          }));
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](8);
          return _context3.abrupt("return", res.status(500).json({
            errCode: 3,
            errMessage: _context3.t0.message
          }));
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[8, 14]]);
  }));
  return function changePasswordService(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var handleGetAllStudent = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var infor;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _userService["default"].getAllStudents();
        case 3:
          infor = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(infor));
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
          }));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function handleGetAllStudent(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var handleGetAllUsers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, users;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.query.id; //All, id
          if (id) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter",
            users: []
          }));
        case 3:
          _context5.next = 5;
          return _userService["default"].getAllUsers(id);
        case 5:
          users = _context5.sent;
          _memoryCache["default"].clear();
          return _context5.abrupt("return", res.status(200).json({
            errCode: 0,
            errMessage: "Ok",
            users: users
          }));
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function handleGetAllUsers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var handleCreateNewUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var message;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _userService["default"].createNewUser(req.body);
        case 2:
          message = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(message));
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function handleCreateNewUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var handleCreateNewStudents = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var message;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _userService["default"].createNewStudents(req.body);
        case 2:
          message = _context7.sent;
          return _context7.abrupt("return", res.status(200).json(message));
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function handleCreateNewStudents(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var handleRegisterNewUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var message;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _userService["default"].registerNewUser(req.body);
        case 2:
          message = _context8.sent;
          return _context8.abrupt("return", res.status(200).json(message));
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function handleRegisterNewUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var handleDeleteUser = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var message;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (req.body.id) {
            _context9.next = 2;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter"
          }));
        case 2:
          _context9.next = 4;
          return _userService["default"].deleteUSer(req.body.id);
        case 4:
          message = _context9.sent;
          return _context9.abrupt("return", res.status(200).json(message));
        case 6:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function handleDeleteUser(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var handleEditUser = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var data, message;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          data = req.body;
          _context10.next = 3;
          return _userService["default"].updateUser(data);
        case 3:
          message = _context10.sent;
          return _context10.abrupt("return", res.status(200).json(message));
        case 5:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function handleEditUser(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var handleEditStudents = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var data, message;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          data = req.body;
          _context11.next = 3;
          return _userService["default"].updateStudents(data);
        case 3:
          message = _context11.sent;
          return _context11.abrupt("return", res.status(200).json(message));
        case 5:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function handleEditStudents(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var getAllCode = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _userService["default"].getAllCodeService(req.query.type);
        case 3:
          data = _context12.sent;
          console.log(data);
          return _context12.abrupt("return", res.status(200).json(data));
        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          console.log("get all code error: ", _context12.t0);
          return _context12.abrupt("return", res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
          }));
        case 12:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 8]]);
  }));
  return function getAllCode(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var handleSearchUserByName = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var infor;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _userService["default"].handleSearchUserByName(req.query.name);
        case 3:
          infor = _context13.sent;
          return _context13.abrupt("return", res.status(200).json(infor));
        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          return _context13.abrupt("return", res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
          }));
        case 11:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return function handleSearchUserByName(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
module.exports = {
  handleLoging: handleLoging,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  handleRegisterNewUser: handleRegisterNewUser,
  changePasswordService: changePasswordService,
  handleUserGoogle: handleUserGoogle,
  refreshAccessToken: refreshAccessToken,
  handleGetAllStudent: handleGetAllStudent,
  handleEditStudents: handleEditStudents,
  handleCreateNewStudents: handleCreateNewStudents,
  handleSearchUserByName: handleSearchUserByName
};