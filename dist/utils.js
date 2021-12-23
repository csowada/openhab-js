"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var log_1 = __importDefault(require("./log"));
var log = (0, log_1["default"])("utils");
var HashSet = Java.type("java.util.HashSet");
var ArrayList = Java.type("java.util.ArrayList");
function getAllPropertyNames(obj) {
    var proto = Object.getPrototypeOf(obj);
    var inherited = (proto) ? getAllPropertyNames(proto) : [];
    var propSet = new Set(Object.getOwnPropertyNames(obj).concat(inherited));
    return __spreadArray([], propSet.values(), true);
}
var jsSetToJavaSet = function (set) {
    var rv = new HashSet();
    set.forEach(function (e) { return rv.add(e); });
    return rv;
};
var jsArrayToJavaSet = function (arr) {
    var set = new HashSet();
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var i = arr_1[_i];
        set.add(i);
    }
    return set;
};
var jsArrayToJavaList = function (arr) {
    var list = new ArrayList();
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var i = arr_2[_i];
        list.add(i);
    }
    return list;
};
var javaSetToJsArray = function (set) {
    return Java.from(new ArrayList(set));
};
var javaSetToJsSet = function (set) {
    return new Set(exports.javaSetToJsArray(set));
};
var randomUUID = function () { return Java.type("java.util.UUID").randomUUID(); };
var dumpObject = function (obj) {
    try {
        log.info("Dumping object...");
        log.info("  typeof obj = {}", (typeof obj));
        var isJavaObject = Java.isJavaObject(obj);
        log.info("  Java.isJavaObject(obj) = {}", isJavaObject);
        var isJavaType = Java.isType(obj);
        log.info("  Java.isType(obj) = {}", isJavaType);
        if (isJavaObject) {
            if (isJavaType) {
                log.info("  Java.typeName(obj) = {}", Java.typeName(obj));
            }
            else {
                log.info("  Java.typeName(obj.class) = {}", Java.typeName(obj["class"]));
                if (Java.typeName(obj["class"]) == 'java.util.HashMap') {
                    log.info("Dumping contents...");
                    var keys = obj.keySet().toArray();
                    for (var key in keys) {
                        log.info("".concat(keys[key], "(").concat(typeof keys[key], ") = ").concat(obj.get(keys[key]), "(").concat(typeof obj.get(keys[key]), ")"));
                        if (typeof keys[key] === 'object') {
                            log.info("Dumping key...");
                            exports.dumpObject(keys[key]);
                        }
                    }
                }
            }
        }
        else if (typeof obj === 'string') {
            log.info("String value = " + obj);
        }
        log.info("getAllPropertyNames(obj) = {}", getAllPropertyNames(obj));
        // log.info("obj.toString() = {}", obj.toString());
        // log.info("JSON.stringify(obj) = {}", JSON.stringify(obj));
    }
    catch (e) {
        log.info("Failed to dump object: " + e.message);
    }
};
var isJsInstanceOfJava = function (instance, type) {
    if (!Java.isType(type)) {
        throw Error("type is not a java class");
    }
    if (instance === null || instance === undefined || instance["class"] === null || instance["class"] === undefined) {
        return false;
    }
    return type["class"].isAssignableFrom(instance["class"]);
};
module.exports = {
    jsSetToJavaSet: jsSetToJavaSet,
    jsArrayToJavaSet: jsArrayToJavaSet,
    jsArrayToJavaList: jsArrayToJavaList,
    javaSetToJsArray: javaSetToJsArray,
    javaSetToJsSet: javaSetToJsSet,
    randomUUID: randomUUID,
    dumpObject: dumpObject,
    isJsInstanceOfJava: isJsInstanceOfJava
};
