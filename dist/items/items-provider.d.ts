import { Item } from "openhab/src/items/item";
import { AbstractProvider } from "../provider";
export declare class StaticItemProvider extends AbstractProvider {
    items: Set<org.openhab.core.items.Item>;
    constructor(items: any);
    addProviderChangeListener(listener: any): void;
    removeProviderChangeListener(listener: any): void;
    getAll(): Set<org.openhab.core.items.Item>;
}
export declare class ManagedItemProvider extends AbstractProvider {
    listeners: Set<any>;
    items: Set<org.openhab.core.items.Item>;
    constructor();
    addProviderChangeListener(listener: any): void;
    removeProviderChangeListener(listener: any): void;
    add(item: Item): void;
    remove(itemOrName: string | Item): void;
    update(item: any): void;
    getAll(): any;
}
export declare class StaticCallbackItemProvider extends AbstractProvider {
    itemsCallbacks: any[];
    constructor();
    addProviderChangeListener(listener: any): void;
    removeProviderChangeListener(listener: any): void;
    addItemsCallback(callback: any): void;
    getAll(): any;
}
export declare const staticItemProvider: (items: any) => StaticItemProvider;
export declare const managedItemProvider: () => ManagedItemProvider;
export declare const staticCallbackItemProvider: () => StaticCallbackItemProvider;
