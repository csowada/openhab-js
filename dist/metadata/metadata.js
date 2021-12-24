"use strict";
/**
 * Items' metadata namespace.
 * This namespace provides access to metadata on items.
 *
 * @private
 * @namespace metadata
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadata = exports.upsertValue = exports.updateValue = exports.addValue = exports.getValue = void 0;
const osgi = __importStar(require("../osgi"));
const log_1 = __importDefault(require("../log"));
const log = (0, log_1.default)('metadata');
const MetadataRegistry = osgi.getService("org.openhab.core.items.MetadataRegistry");
const Metadata = Java.type("org.openhab.core.items.Metadata");
const MetadataKey = Java.type("org.openhab.core.items.MetadataKey");
/**
 * This function will return the Metadata object associated with the
 * specified Item.
 *
 * @memberof metadata
 * @param {String} name of the Item
 * @param {String} namespace name of the namespace
 * @returns {String|null} the metadata as a string, or null
 */
let getValue = function (itemName, namespace) {
    let result = MetadataRegistry.get(new MetadataKey(namespace, itemName));
    return result ? result.value : null;
};
exports.getValue = getValue;
let addValue = function (itemName, namespace, value) {
    let key = new MetadataKey(namespace, itemName);
    MetadataRegistry.add(new Metadata(key, value, {}));
};
exports.addValue = addValue;
let updateValue = function (itemName, namespace, value) {
    let metadata = createMetadata(itemName, namespace, value);
    let result = MetadataRegistry.update(metadata);
    return result ? result.value : null;
};
exports.updateValue = updateValue;
/**
 * Adds (inserts) or updates a metadata value.
 *
 * @param {String} itemName the name of the item
 * @param {String} namespace the name of the namespace
 * @param {String} value the value to insert or update
 * @returns {Boolean} true if the value was added, false if it was updated
 */
let upsertValue = function (itemName, namespace, value) {
    let existing = getValue(itemName, namespace);
    if (existing === null) {
        addValue(itemName, namespace, value);
        return true;
    }
    else {
        updateValue(itemName, namespace, value);
        return false;
    }
};
exports.upsertValue = upsertValue;
let createMetadata = function (itemName, namespace, value) {
    log.debug("Creating metadata {}:{} = {}", namespace, itemName, value);
    let key = new MetadataKey(namespace, itemName);
    return new Metadata(key, value, {});
};
exports.createMetadata = createMetadata;
