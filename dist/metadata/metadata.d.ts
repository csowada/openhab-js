/**
 * Items' metadata namespace.
 * This namespace provides access to metadata on items.
 *
 * @private
 * @namespace metadata
 */
/**
 * This function will return the Metadata object associated with the
 * specified Item.
 *
 * @memberof metadata
 * @param {String} name of the Item
 * @param {String} namespace name of the namespace
 * @returns {String|null} the metadata as a string, or null
 */
declare let getValue: (itemName: any, namespace: any) => any;
declare let addValue: (itemName: any, namespace: any, value: any) => void;
declare let updateValue: (itemName: any, namespace: any, value: any) => any;
/**
 * Adds (inserts) or updates a metadata value.
 *
 * @param {String} itemName the name of the item
 * @param {String} namespace the name of the namespace
 * @param {String} value the value to insert or update
 * @returns {Boolean} true if the value was added, false if it was updated
 */
declare let upsertValue: (itemName: any, namespace: any, value: any) => boolean;
declare let createMetadata: (itemName: any, namespace: any, value: any) => any;
export { getValue, addValue, updateValue, upsertValue, createMetadata };
