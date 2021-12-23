/**
 * Items' metadata namespace.
 * This namespace provides access to metadata on items.
 *
 * @private
 * @namespace metadata
 */
var osgi = require('../osgi');
var utils = require('../utils');
var log = require('../log')('metadata');
var MetadataRegistry = osgi.getService("org.openhab.core.items.MetadataRegistry");
var Metadata = Java.type("org.openhab.core.items.Metadata");
var MetadataKey = Java.type("org.openhab.core.items.MetadataKey");
/**
 * This function will return the Metadata object associated with the
 * specified Item.
 *
 * @memberof metadata
 * @param {String} name of the Item
 * @param {String} namespace name of the namespace
 * @returns {String|null} the metadata as a string, or null
 */
var getValue = function (itemName, namespace) {
    var result = MetadataRegistry.get(new MetadataKey(namespace, itemName));
    return result ? result.value : null;
};
var addValue = function (itemName, namespace, value) {
    var key = new MetadataKey(namespace, itemName);
    MetadataRegistry.add(new Metadata(key, value, {}));
};
var updateValue = function (itemName, namespace, value) {
    var metadata = createMetadata(itemName, namespace, value);
    var result = MetadataRegistry.update(metadata);
    return result ? result.value : null;
};
/**
 * Adds (inserts) or updates a metadata value.
 *
 * @param {String} itemName the name of the item
 * @param {String} namespace the name of the namespace
 * @param {String} value the value to insert or update
 * @returns {Boolean} true if the value was added, false if it was updated
 */
var upsertValue = function (itemName, namespace, value) {
    var existing = getValue(itemName, namespace);
    if (existing === null) {
        addValue(itemName, namespace, value);
        return true;
    }
    else {
        updateValue(itemName, namespace, value);
        return false;
    }
};
var createMetadata = function (itemName, namespace, value) {
    log.debug("Creating metadata {}:{} = {}", namespace, itemName, value);
    var key = new MetadataKey(namespace, itemName);
    return new Metadata(key, value, {});
};
module.exports = {
    getValue: getValue,
    addValue: addValue,
    updateValue: updateValue,
    upsertValue: upsertValue,
    createMetadata: createMetadata
};
