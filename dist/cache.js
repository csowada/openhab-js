"use strict";
/**
 * Shared cache namespace.
 * This namespace provides a default cache that can be use to set and retrieve objects that will be persisted between reloads of scripts.
 *
 * @namespace cache
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.put = exports.get = void 0;
// const cache = require("@runtime").sharedcache
const _runtime_1 = __importDefault(require("@runtime"));
const cache = _runtime_1.default.sharedcache;
/**
 * Returns the value to which the specified key is mapped
 *
 * @example <caption>Get a previously set value with a default value (times = 0)</caption>
 * let counter = cache.get("counter", () => ({ "times": 0 }));
 * console.log("Count",counter.times++);
 *
 * @example <caption>Get a previously set object</caption>
 * let counter = cache.get("counter");
 * if(counter == null){
 *      counter = {times: 0};
 *      cache.put("counter", counter);
 * }
 * console.log("Count",counter.times++);
 *
 * @memberof cache
 * @param {string} key the key whose associated value is to be returned
 * @param {function} [defaultSupplier] if the specified key is not already associated with a value, this function will return a default value
 * @returns {(*|null)} the current object for the supplied key, a default value if defaultSupplier is provided, or null
 */
const get = function (key, defaultSupplier) {
    if (typeof defaultSupplier === 'function') {
        return cache.get(key, defaultSupplier);
    }
    else {
        return cache.get(key);
    }
};
exports.get = get;
/**
 * Associates the specified value with the specified key
 *
 * @memberof cache
 * @param {string} key key with which the specified value is to be associated
 * @param {*} value value to be associated with the specified key
 * @returns {(*|null)} the previous value associated with null, or null if there was no mapping for key
 */
const put = function (key, value) {
    return cache.put(key, value);
};
exports.put = put;
/**
 * Removes the mapping for a key from this map if it is present
 *
 * @memberof cache
 * @param {string} key key whose mapping is to be removed from the map
 * @returns {(*|null)} the previous value associated with key or null if there was no mapping for key
 */
const remove = function (key) {
    return cache.remove(key);
};
exports.remove = remove;
