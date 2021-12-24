"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticCallbackItemProvider = exports.managedItemProvider = exports.staticItemProvider = exports.StaticCallbackItemProvider = exports.ManagedItemProvider = exports.StaticItemProvider = void 0;
const osgi = require('../osgi');
const items = require('./managed');
const utils = require('../utils');
// const { AbstractProvider } = require('../provider');
const ITEM_PROVIDER_CLASS = "org.openhab.core.items.ItemProvider";
const item_1 = require("openhab/src/items/item");
const provider_1 = require("../provider");
class StaticItemProvider extends provider_1.AbstractProvider {
    constructor(items) {
        super(ITEM_PROVIDER_CLASS);
        this.items = items;
        this.registerService();
    }
    addProviderChangeListener(listener) {
    }
    removeProviderChangeListener(listener) {
    }
    getAll() {
        return this.items;
    }
}
exports.StaticItemProvider = StaticItemProvider;
class ManagedItemProvider extends provider_1.AbstractProvider {
    constructor() {
        super(ITEM_PROVIDER_CLASS);
        this.items = new Set();
        this.listeners = new Set();
        this.registerService();
    }
    addProviderChangeListener(listener) {
        this.listeners.add(listener);
    }
    removeProviderChangeListener(listener) {
        this.listeners.delete(listener);
    }
    add(item) {
        if (item instanceof item_1.Item) {
            const rawItem = item.rawItem;
            if (!this.items.has(rawItem)) {
                this.items.add(rawItem);
                for (let listener of this.listeners) {
                    listener.added(this.hostProvider, item);
                }
            }
        }
    }
    remove(itemOrName) {
        if (typeof itemOrName === 'string') {
            this.items.forEach(i => { if (i.name === itemOrName)
                this.remove(i); });
        }
        else if (itemOrName instanceof item_1.Item) {
            const rawItem = itemOrName.rawItem;
            if (this.items.has(rawItem)) {
                this.items.delete(rawItem);
                for (let listener of this.listeners) {
                    listener.removed(this.hostProvider, rawItem);
                }
            }
        }
    }
    update(item) {
        if (item instanceof items.Item) {
            item = item.rawItem;
        }
        for (let listener of this.listeners) {
            listener.updated(this.hostProvider, item);
        }
    }
    getAll() {
        return utils.jsSetToJavaSet(this.items);
    }
}
exports.ManagedItemProvider = ManagedItemProvider;
class StaticCallbackItemProvider extends provider_1.AbstractProvider {
    constructor() {
        super(ITEM_PROVIDER_CLASS);
        this.itemsCallbacks = [];
    }
    addProviderChangeListener(listener) {
    }
    removeProviderChangeListener(listener) {
    }
    addItemsCallback(callback) {
        this.itemsCallbacks.push(callback);
    }
    getAll() {
        return utils.jsArrayToJavaList(this.itemsCallbacks.flatMap(c => c()));
    }
}
exports.StaticCallbackItemProvider = StaticCallbackItemProvider;
const staticItemProvider = (items) => new StaticItemProvider(items);
exports.staticItemProvider = staticItemProvider;
const managedItemProvider = () => new ManagedItemProvider();
exports.managedItemProvider = managedItemProvider;
const staticCallbackItemProvider = () => new StaticCallbackItemProvider();
exports.staticCallbackItemProvider = staticCallbackItemProvider;
// module.exports = {
//     staticItemProvider: items => new StaticItemProvider(items),
//     managedItemProvider: () => new ManagedItemProvider(),
//     staticCallbackItemProvider: () => new StaticCallbackItemProvider()
// }
// // export classes to create clean d.ts file with TypeScript
// module.exports.StaticItemProvider = StaticItemProvider;
// module.exports.ManagedItemProvider = ManagedItemProvider;
// module.exports.StaticCallbackItemProvider = StaticCallbackItemProvider;
