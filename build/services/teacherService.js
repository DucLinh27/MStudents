"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _index = _interopRequireDefault(require("../models/index"));
var _lodash = _interopRequireDefault(require("lodash"));
var _emailService = _interopRequireDefault(require("./emailService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
require("dotenv").config();
var getAllTeachers = function getAllTeachers() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var teachers;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index["default"].User.findAll({
              where: {
                roleId: "R2"
              },
              attributes: {
                exclude: ["password", "image"]
              }
            });
          case 3:
            teachers = _context.sent;
            resolve({
              errCode: 0,
              data: teachers
            });
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
var getAllTeacherInfor = function getAllTeacherInfor() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var teachers;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _index["default"].Teacher_Infor.findAll({});
          case 3:
            teachers = _context2.sent;
            resolve({
              errCode: 0,
              data: teachers
            });
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var checkRequireFields = function checkRequireFields(inputData) {
  console.log(inputData);
  var arrFields = ["teacherId", "description", "level", "coursesId"];
  var isValid = true;
  var element = "";
  for (var i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element
  };
};
var saveDetailInforTeacher = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(inputData) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
              var checkObj, teacher, teacherInfor;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    checkObj = checkRequireFields(inputData);
                    if (!(checkObj.isValid === false)) {
                      _context3.next = 6;
                      break;
                    }
                    resolve({
                      errCode: 1,
                      errMessage: "Missing parameter: ".concat(checkObj.element)
                    });
                    _context3.next = 34;
                    break;
                  case 6:
                    if (!(inputData.action === "CREATE")) {
                      _context3.next = 11;
                      break;
                    }
                    _context3.next = 9;
                    return _index["default"].Teacher_Infor.create({
                      teacherId: inputData.teacherId,
                      description: inputData.description,
                      level: inputData.level,
                      coursesId: inputData.coursesId
                    });
                  case 9:
                    _context3.next = 19;
                    break;
                  case 11:
                    if (!(inputData.action === "EDIT")) {
                      _context3.next = 19;
                      break;
                    }
                    _context3.next = 14;
                    return _index["default"].Teacher_Infor.findOne({
                      where: {
                        teacherId: inputData.teacherId
                      },
                      raw: false
                    });
                  case 14:
                    teacher = _context3.sent;
                    if (!teacher) {
                      _context3.next = 19;
                      break;
                    }
                    teacher.level = inputData.level, teacher.description = inputData.description, teacher.coursesId = inputData.coursesId, teacher.updateAt = new Date();
                    _context3.next = 19;
                    return teacher.save();
                  case 19:
                    _context3.next = 21;
                    return _index["default"].Teacher_Infor.findOne({
                      where: {
                        teacherId: inputData.teacherId
                      }
                    });
                  case 21:
                    teacherInfor = _context3.sent;
                    if (!teacherInfor) {
                      _context3.next = 31;
                      break;
                    }
                    teacherInfor.teacherId = inputData.teacherId;
                    teacherInfor.coursesId = inputData.coursesId;
                    teacherInfor.description = inputData.description;
                    teacherInfor.level = inputData.level;
                    _context3.next = 29;
                    return teacherInfor.save();
                  case 29:
                    _context3.next = 33;
                    break;
                  case 31:
                    _context3.next = 33;
                    return _index["default"].Teacher_Infor.create({
                      teacherId: inputData.teacherId,
                      coursesId: inputData.coursesId,
                      level: inputData.level,
                      description: inputData.description
                    });
                  case 33:
                    resolve({
                      errCode: 0,
                      errMessage: "Save infor teacher successd!"
                    });
                  case 34:
                    _context3.next = 39;
                    break;
                  case 36:
                    _context3.prev = 36;
                    _context3.t0 = _context3["catch"](0);
                    reject(_context3.t0);
                  case 39:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[0, 36]]);
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
  return function saveDetailInforTeacher(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var getInforTeacherById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(inputId) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
              var data;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    if (inputId) {
                      _context5.next = 5;
                      break;
                    }
                    resolve({
                      errCode: 1,
                      errMessage: "Missing parameter!"
                    });
                    _context5.next = 10;
                    break;
                  case 5:
                    _context5.next = 7;
                    return _index["default"].User.findOne({
                      where: {
                        id: inputId
                      },
                      attributes: {
                        exclude: ["password"]
                      },
                      include: [{
                        model: _index["default"].Courses,
                        attributes: ["id", "name", "image", "description"]
                      }],
                      raw: false,
                      nest: true
                    });
                  case 7:
                    data = _context5.sent;
                    if (!data) data = {};
                    resolve({
                      errCode: 0,
                      data: data
                    });
                  case 10:
                    _context5.next = 15;
                    break;
                  case 12:
                    _context5.prev = 12;
                    _context5.t0 = _context5["catch"](0);
                    reject(_context5.t0);
                  case 15:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[0, 12]]);
            }));
            return function (_x9, _x10) {
              return _ref6.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getInforTeacherById(_x8) {
    return _ref5.apply(this, arguments);
  };
}();
var getExtraInforTeacherById = function getExtraInforTeacherById(idInput) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (idInput) {
              _context7.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              errMessage: "Messings required parameter missing"
            });
            _context7.next = 10;
            break;
          case 5:
            _context7.next = 7;
            return _index["default"].Teacher_Infor.findOne({
              where: {
                teacherId: idInput
              },
              attributes: {
                exclude: ["id", "teacherId"]
              },
              include: [{
                model: _index["default"].Courses,
                as: "courses",
                attributes: ["id", "name", "image"]
              }],
              raw: false,
              nest: true
            });
          case 7:
            data = _context7.sent;
            if (!data) data = {};
            resolve({
              errCode: 0,
              data: data
            });
          case 10:
            _context7.next = 15;
            break;
          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 15:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 12]]);
    }));
    return function (_x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var sendRemedy = function sendRemedy(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var appointment;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            if (!(!data.email || !data.teacherId || !data.studentId || !data.timeType)) {
              _context8.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              errMessage: "Messing required parameter missing"
            });
            _context8.next = 15;
            break;
          case 5:
            _context8.next = 7;
            return _index["default"].Booking.findOne({
              where: {
                teacherId: data.teacherId,
                studentId: data.studentId,
                timeType: data.timeType,
                statusId: "S2"
              },
              raw: false
            });
          case 7:
            appointment = _context8.sent;
            if (!appointment) {
              _context8.next = 15;
              break;
            }
            appointment.statusId = "S3";
            _context8.next = 12;
            return appointment.save();
          case 12:
            _context8.next = 14;
            return _emailService["default"].sendAttachments(data);
          case 14:
            resolve({
              errCode: 0,
              errMessage: "Oke"
            });
          case 15:
            _context8.next = 20;
            break;
          case 17:
            _context8.prev = 17;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 20:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 17]]);
    }));
    return function (_x13, _x14) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var editTeacherService = function editTeacherService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var teacher;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            if (!data.id) {
              resolve({
                errCode: 2,
                errMessage: "Missing required parameters!"
              });
            }
            _context9.next = 4;
            return _index["default"].Teacher_Infor.findOne({
              where: {
                id: data.id
              },
              raw: false
            });
          case 4:
            teacher = _context9.sent;
            if (!teacher) {
              _context9.next = 16;
              break;
            }
            teacher.id = data.id;
            teacher.teacherId = data.teacherId;
            teacher.coursesId = data.coursesId;
            teacher.description = data.description;
            teacher.level = data.level;
            _context9.next = 13;
            return teacher.save();
          case 13:
            resolve({
              errCode: 0,
              errMessage: "Edit Teacher successful!"
            });
            _context9.next = 17;
            break;
          case 16:
            resolve({
              errCode: 1,
              errMessage: "Teacher not found!"
            });
          case 17:
            _context9.next = 22;
            break;
          case 19:
            _context9.prev = 19;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 22:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 19]]);
    }));
    return function (_x15, _x16) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var deleteTeacherService = function deleteTeacherService(inputId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var teacher;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _index["default"].Teacher_Infor.findOne({
              where: {
                id: inputId.id
              }
            });
          case 2:
            teacher = _context10.sent;
            if (teacher) {
              _context10.next = 5;
              break;
            }
            return _context10.abrupt("return", reject({
              errCode: 2,
              errMessage: "This Teacher does not exist!"
            }));
          case 5:
            _context10.next = 7;
            return _index["default"].Teacher_Infor.destroy({
              where: {
                id: inputId.id
              }
            });
          case 7:
            resolve({
              errCode: 0,
              errMessage: "Delete Teacher successful!"
            });
          case 8:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    return function (_x17, _x18) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var getTopTeacherHome = function getTopTeacherHome(limitInput) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var users;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _index["default"].User.findAll({
              limit: limitInput,
              where: {
                roleId: "R2"
              },
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ["password"]
              },
              include: [{
                model: _index["default"].Teacher_Infor,
                attributes: ["id", "description", "level"]
              }],
              raw: true,
              nest: true
            });
          case 3:
            users = _context11.sent;
            resolve({
              errCode: 0,
              data: users
            });
            _context11.next = 10;
            break;
          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            reject(_context11.t0);
          case 10:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 7]]);
    }));
    return function (_x19, _x20) {
      return _ref11.apply(this, arguments);
    };
  }());
};
module.exports = {
  getAllTeachers: getAllTeachers,
  saveDetailInforTeacher: saveDetailInforTeacher,
  getInforTeacherById: getInforTeacherById,
  getExtraInforTeacherById: getExtraInforTeacherById,
  sendRemedy: sendRemedy,
  getAllTeacherInfor: getAllTeacherInfor,
  editTeacherService: editTeacherService,
  deleteTeacherService: deleteTeacherService,
  getTopTeacherHome: getTopTeacherHome
};