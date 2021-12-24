"use strict";
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
exports.Item = void 0;
const utils = __importStar(require("../utils"));
const metadata = __importStar(require("../metadata"));
const log_1 = __importDefault(require("../log"));
const item_history_1 = require("./item-history");
const log = (0, log_1.default)('item');
/**
 * Class representing an openHAB Item
 *
 * @memberOf items
 */
class Item {
    /**
     * Create an Item, wrapping a native Java openHAB Item. Don't use this constructor, instead call {@link getItem}.
     * @param {HostItem} rawItem Java Item from Host
     * @hideconstructor
     */
    constructor(rawItem) {
        if (typeof rawItem === 'undefined') {
            throw Error("Supplied item is undefined");
        }
        this.rawItem = rawItem;
        /**
         * Access historical states for this item
         * @type {ItemHistory}
         */
        this.history = new item_history_1.ItemHistory(rawItem);
    }
    /**
     * The type of the item: the Simple (without package) name of the Java item type, such as 'Switch'.
     * @return {String} the type
     */
    get type() {
        return this.rawItem.getClass().getSimpleName();
    }
    /**
     * The name of the item.
     * @return {String} the name
     */
    get name() {
        return this.rawItem.getName();
    }
    /**
     * The label attached to the item
     * @return {String} the label
     */
    get label() {
        return this.rawItem.getLabel();
    }
    /**
     * The state of the item, as a string.
     * @return {String} the item's state
     */
    get state() {
        return this.rawState.toString();
    }
    /**
     * The raw state of the item, as a java object.
     * @return {HostState} the item's state
     */
    get rawState() {
        return this.rawItem.state;
    }
    /**
     * Members / children / direct descendents of the current group item (as returned by 'getMembers()'). Must be a group item.
     * @returns {Item[]} member items
     */
    get members() {
        if (this.rawItem instanceof org.openhab.core.items.GroupItem) {
            return utils.javaSetToJsArray(this.rawItem.getMembers()).map(raw => new Item(raw));
        }
    }
    /**
     * All descendents of the current group item (as returned by 'getAllMembers()'). Must be a group item.
     * @returns {Item[]} all descendent items
     */
    get descendents() {
        if (this.rawItem instanceof org.openhab.core.items.GroupItem) {
            return utils.javaSetToJsArray(this.rawItem.getAllMembers()).map(raw => new Item(raw));
        }
    }
    /**
     * Whether this item is initialized.
     * @type {Boolean}
     * @returns true iff the item has not been initialized
     */
    get isUninitialized() {
        if (this.rawItem.state instanceof UnDefType
            || this.rawItem.state.toString() == "Undefined"
            || this.rawItem.state.toString() == "Uninitialized") {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Gets metadata values for this item.
     * @param {String} namespace The namespace for the metadata to retreive
     * @returns {String} the metadata associated with this item and namespace
     */
    getMetadataValue(namespace) {
        return metadata.getValue(this.name, namespace);
    }
    /**
     * Updates metadata values for this item.
     * @param {String} namespace The namespace for the metadata to update
     * @param {String} value the value to update the metadata to
     * @returns {String} the updated value
     */
    updateMetadataValue(namespace, value) {
        return metadata.updateValue(this.name, namespace, value);
    }
    /**
     * Inserts or updates metadata values for this item.
     * @param {String} namespace The namespace for the metadata to update
     * @param {String} value the value to update the metadata to
     * @returns {Boolean} true iff a new value was inserted
     */
    upsertMetadataValue(namespace, value) {
        return metadata.upsertValue(this.name, namespace, value);
    }
    /**
     * Updates metadata values for this item.
     * @param {Map<any, any>} namespaceToValues A map of namespaces to values to update
     */
    updateMetadataValues(namespaceToValues) {
        for (let k in namespaceToValues) {
            metadata.updateValue(this.name, k, namespaceToValues[k]);
        }
    }
    /**
     * Sends a command to the item
     * @param {String|HostState} value the value of the command to send, such as 'ON'
     * @see sendCommandIfDifferent
     * @see postUpdate
     */
    sendCommand(value) {
        log.debug("Sending command {} to {}", value, this.name);
        events.sendCommand(this.rawItem, value);
    }
    /**
     * Sends a command to the item, but only if the current state is not what is being sent.
     * Note
     * @param {String|HostState} value the value of the command to send, such as 'ON'
     * @returns {Boolean} true if the command was sent, false otherwise
     * @see sendCommand
     */
    sendCommandIfDifferent(value) {
        if (value.toString() != this.state.toString()) {
            this.sendCommand(value);
            return true;
        }
        return false;
    }
    /**
     * Posts an update to the item
     * @param {String|HostState} value the value of the command to send, such as 'ON'
     * @see sendCommand
     */
    postUpdate(value) {
        events.postUpdate(this.rawItem, value);
        log.debug("Posted update {} to {}", value, this.name);
    }
    /**
     * Adds groups to this item
     * @param {Array<String|Item>} groupNamesOrItems names of the groups (or the group items themselves)
     */
    addGroups(...groupNamesOrItems) {
        if (this.rawItem instanceof org.openhab.core.items.GenericItem) {
            let groupNames = groupNamesOrItems.map((x) => (typeof x === 'string') ? x : x.name);
            this.rawItem.addGroupNames(utils.jsArrayToJavaList(groupNames));
            managedItemProvider.update(this.rawItem);
        }
    }
    /**
     * Removes groups from this item
     * @param {Array<String|Item>} groupNamesOrItems names of the groups (or the group items themselves)
     */
    removeGroups(...groupNamesOrItems) {
        if (this.rawItem instanceof org.openhab.core.items.GenericItem) {
            let groupNames = groupNamesOrItems.map((x) => (typeof x === 'string') ? x : x.name);
            for (let groupName of groupNames) {
                this.rawItem.removeGroupName(groupName);
            }
            managedItemProvider.update(this.rawItem);
        }
    }
    /**
     * Gets the tags from this item
     */
    get tags() {
        return utils.javaSetToJsArray(this.rawItem.getTags());
    }
    /**
     * Adds tags to this item
     * @param {Array<String>} tagNames names of the tags to add
     */
    addTags(...tagNames) {
        if (this.rawItem instanceof org.openhab.core.items.GenericItem) {
            this.rawItem.addTags(tagNames);
            managedItemProvider.update(this.rawItem);
        }
    }
    /**
     * Removes tags from this item
     * @param {Array<String>} tagNames names of the tags to remove
     */
    removeTags(...tagNames) {
        if (this.rawItem instanceof org.openhab.core.items.GenericItem) {
            for (let tagName of tagNames) {
                this.rawItem.removeTag(tagName);
            }
            managedItemProvider.update(this.rawItem);
        }
    }
}
exports.Item = Item;
