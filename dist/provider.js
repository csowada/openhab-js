'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var osgi_1 = __importDefault(require("./osgi"));
// const osgi = require('./osgi');
function getAllFunctionNames(obj) {
    var props = [];
    var o = obj;
    do {
        props = props.concat(Object.getOwnPropertyNames(o));
        o = Object.getPrototypeOf(o);
    } while (o.constructor.name !== 'AbstractProvider');
    return props.filter(function (p) { return typeof obj[p] === 'function'; });
}
var AbstractProvider = /** @class */ (function () {
    function AbstractProvider(type) {
        this.typeName = type["class"].getName();
        this.javaType = Java.extend(type); //require('@runtime/osgi').classutil.extend(type);
    }
    AbstractProvider.prototype.register = function () {
        var javaConfig = {};
        var functionNamesToBind = getAllFunctionNames(this).
            filter(function (f) { return f !== 'constructor'; }).
            filter(function (f) { return f !== 'javaType'; });
        for (var _i = 0, functionNamesToBind_1 = functionNamesToBind; _i < functionNamesToBind_1.length; _i++) {
            var fn = functionNamesToBind_1[_i];
            javaConfig[fn] = this[fn].bind(this);
        }
        var hostProvider = this.processHostProvider(new this.javaType(javaConfig));
        this.hostProvider = hostProvider;
        osgi_1["default"].registerService(this.hostProvider, this.typeName);
    };
    AbstractProvider.prototype.processHostProvider = function (hostProvider) {
        return hostProvider;
    };
    return AbstractProvider;
}());
module.exports = {
    AbstractProvider: AbstractProvider
};
