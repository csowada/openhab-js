/**
 * @typedef { import("../global").HostItem } HostItem
 * @typedef { import("../global").HostGroupFunction } HostGroupFunction
 * @typedef { import("../global").HostState } HostState
 *
 */
var log = require('../log')('item');
var metadata = require('../metadata');
var ItemHistory = require('./item-history');
/**
 * Class representing an openHAB Item
 *
 * @memberOf items
 */
var Item = /** @class */ (function () {
    /**
     * Create an Item, wrapping a native Java openHAB Item. Don't use this constructor, instead call {@link getItem}.
     * @param {HostItem} rawItem Java Item from Host
     * @hideconstructor
     */
    function Item(rawItem) {
        if (typeof rawItem === 'undefined') {
            throw Error("Supplied item is undefined");
        }
        this.rawItem = rawItem;
        /**
         * Access historical states for this item
         * @type {ItemHistory}
         */
        this.history = new ItemHistory(rawItem);
    }
    Object.defineProperty(Item.prototype, "type", {
        /**
         * The type of the item: the Simple (without package) name of the Java item type, such as 'Switch'.
         * @return {String} the type
         */
        get: function () {
            return this.rawItem.getClass().getSimpleName();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "name", {
        /**
         * The name of the item.
         * @return {String} the name
         */
        get: function () {
            return this.rawItem.getName();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "label", {
        /**
         * The label attached to the item
         * @return {String} the label
         */
        get: function () {
            return this.rawItem.getLabel();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "state", {
        /**
         * The state of the item, as a string.
         * @return {String} the item's state
         */
        get: function () {
            return this.rawState.toString();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "rawState", {
        /**
         * The raw state of the item, as a java object.
         * @return {HostState} the item's state
         */
        get: function () {
            return this.rawItem.state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "members", {
        /**
         * Members / children / direct descendents of the current group item (as returned by 'getMembers()'). Must be a group item.
         * @returns {Item[]} member items
         */
        get: function () {
            return utils.javaSetToJsArray(this.rawItem.getMembers()).map(function (raw) { return new Item(raw); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "descendents", {
        /**
         * All descendents of the current group item (as returned by 'getAllMembers()'). Must be a group item.
         * @returns {Item[]} all descendent items
         */
        get: function () {
            return utils.javaSetToJsArray(this.rawItem.getAllMembers()).map(function (raw) { return new Item(raw); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "isUninitialized", {
        /**
         * Whether this item is initialized.
         * @type {Boolean}
         * @returns true iff the item has not been initialized
         */
        get: function () {
            if (this.rawItem.state instanceof UnDefType
                || this.rawItem.state.toString() == "Undefined"
                || this.rawItem.state.toString() == "Uninitialized") {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets metadata values for this item.
     * @param {String} namespace The namespace for the metadata to retreive
     * @returns {String} the metadata associated with this item and namespace
     */
    Item.prototype.getMetadataValue = function (namespace) {
        return metadata.getValue(this.name, namespace);
    };
    /**
     * Updates metadata values for this item.
     * @param {String} namespace The namespace for the metadata to update
     * @param {String} value the value to update the metadata to
     * @returns {String} the updated value
     */
    Item.prototype.updateMetadataValue = function (namespace, value) {
        return metadata.updateValue(this.name, namespace, value);
    };
    /**
     * Inserts or updates metadata values for this item.
     * @param {String} namespace The namespace for the metadata to update
     * @param {String} value the value to update the metadata to
     * @returns {Boolean} true iff a new value was inserted
     */
    Item.prototype.upsertMetadataValue = function (namespace, value) {
        return metadata.upsertValue(this.name, namespace, value);
    };
    /**
     * Updates metadata values for this item.
     * @param {Map<any, any>} namespaceToValues A map of namespaces to values to update
     */
    Item.prototype.updateMetadataValues = function (namespaceToValues) {
        for (var k in namespaceToValues) {
            metadata.updateValue(this.name, k, namespaceToValues[k]);
        }
    };
    /**
     * Sends a command to the item
     * @param {String|HostState} value the value of the command to send, such as 'ON'
     * @see sendCommandIfDifferent
     * @see postUpdate
     */
    Item.prototype.sendCommand = function (value) {
        log.debug("Sending command {} to {}", value, this.name);
        events.sendCommand(this.rawItem, value);
    };
    /**
     * Sends a command to the item, but only if the current state is not what is being sent.
     * Note
     * @param {String|HostState} value the value of the command to send, such as 'ON'
     * @returns {Boolean} true if the command was sent, false otherwise
     * @see sendCommand
     */
    Item.prototype.sendCommandIfDifferent = function (value) {
        if (value.toString() != this.state.toString()) {
            this.sendCommand(value);
            return true;
        }
        return false;
    };
    /**
     * Posts an update to the item
     * @param {String|HostState} value the value of the command to send, such as 'ON'
     * @see sendCommand
     */
    Item.prototype.postUpdate = function (value) {
        events.postUpdate(this.rawItem, value);
        log.debug("Posted update {} to {}", value, this.name);
    };
    /**
     * Adds groups to this item
     * @param {Array<String|Item>} groupNamesOrItems names of the groups (or the group items themselves)
     */
    Item.prototype.addGroups = function () {
        var groupNamesOrItems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            groupNamesOrItems[_i] = arguments[_i];
        }
        var groupNames = groupNamesOrItems.map(function (x) { return (typeof x === 'string') ? x : x.name; });
        this.rawItem.addGroupNames(groupNames);
        managedItemProvider.update(this.rawItem);
    };
    /**
     * Removes groups from this item
     * @param {Array<String|Item>} groupNamesOrItems names of the groups (or the group items themselves)
     */
    Item.prototype.removeGroups = function () {
        var groupNamesOrItems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            groupNamesOrItems[_i] = arguments[_i];
        }
        var groupNames = groupNamesOrItems.map(function (x) { return (typeof x === 'string') ? x : x.name; });
        for (var _a = 0, groupNames_1 = groupNames; _a < groupNames_1.length; _a++) {
            var groupName = groupNames_1[_a];
            this.rawItem.removeGroupName(groupName);
        }
        managedItemProvider.update(this.rawItem);
    };
    Object.defineProperty(Item.prototype, "tags", {
        /**
         * Gets the tags from this item
         */
        get: function () {
            return utils.javaSetToJsArray(this.rawItem.getTags());
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds tags to this item
     * @param {Array<String>} tagNames names of the tags to add
     */
    Item.prototype.addTags = function () {
        var tagNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tagNames[_i] = arguments[_i];
        }
        this.rawItem.addTags(tagNames);
        managedItemProvider.update(this.rawItem);
    };
    /**
     * Removes tags from this item
     * @param {Array<String>} tagNames names of the tags to remove
     */
    Item.prototype.removeTags = function () {
        var tagNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tagNames[_i] = arguments[_i];
        }
        for (var _a = 0, tagNames_1 = tagNames; _a < tagNames_1.length; _a++) {
            var tagName = tagNames_1[_a];
            this.rawItem.removeTag(tagName);
        }
        managedItemProvider.update(this.rawItem);
    };
    return Item;
}());
module.exports = Item;
