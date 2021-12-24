const osgi = require('../osgi');
const items = require('./managed');
const utils = require('../utils');
// const { AbstractProvider } = require('../provider');

const ITEM_PROVIDER_CLASS = "org.openhab.core.items.ItemProvider";

import { Item } from "openhab/src/items/item";
import { AbstractProvider } from "../provider"

export class StaticItemProvider extends AbstractProvider {

    items: Set<org.openhab.core.items.Item>

    constructor(items) {
        super(ITEM_PROVIDER_CLASS);
        this.items = items;
        this.registerService();
    }

    addProviderChangeListener(listener) {
    }

    removeProviderChangeListener(listener) {
    }

    getAll(){
        return this.items;
    }
}


export class ManagedItemProvider extends AbstractProvider {

    listeners: Set<any>;
    items: Set<org.openhab.core.items.Item>

    constructor() {
        super(ITEM_PROVIDER_CLASS);
        this.items = new Set();
        this.listeners = new Set();
        this.registerService();
    }

    addProviderChangeListener(listener) {
        this.listeners.add(listener)
    }

    removeProviderChangeListener(listener) {
        this.listeners.delete(listener);
    }

    add(item: Item) {
        if (item instanceof Item) {
            const rawItem = item.rawItem;

            if (!this.items.has(rawItem)) {
                this.items.add(rawItem);
                for (let listener of this.listeners) {
                    listener.added(this.hostProvider, item);
                }
            }

        }
    }

    remove(itemOrName: string|Item) {
        if (typeof itemOrName === 'string') {
            this.items.forEach(i => { if (i.name === itemOrName) this.remove(i) });
        } else if(itemOrName instanceof Item) {
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

export class StaticCallbackItemProvider extends AbstractProvider {

    itemsCallbacks: any[];

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

    getAll(){
        return utils.jsArrayToJavaList(this.itemsCallbacks.flatMap(c => c()));
    }
}

export const staticItemProvider = (items) => new StaticItemProvider(items);
export const managedItemProvider = () => new ManagedItemProvider();
export const staticCallbackItemProvider = () => new StaticCallbackItemProvider();

// module.exports = {
//     staticItemProvider: items => new StaticItemProvider(items),
//     managedItemProvider: () => new ManagedItemProvider(),
//     staticCallbackItemProvider: () => new StaticCallbackItemProvider()
// }

// // export classes to create clean d.ts file with TypeScript
// module.exports.StaticItemProvider = StaticItemProvider;
// module.exports.ManagedItemProvider = ManagedItemProvider;
// module.exports.StaticCallbackItemProvider = StaticCallbackItemProvider;