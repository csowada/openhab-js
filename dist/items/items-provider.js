var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var osgi = require('../osgi');
var items = require('./managed');
var utils = require('../utils');
var AbstractProvider = require('../provider').AbstractProvider;
var ITEM_PROVIDER_CLASS = "org.openhab.core.items.ItemProvider";
var StaticItemProvider = /** @class */ (function (_super) {
    __extends(StaticItemProvider, _super);
    function StaticItemProvider(items) {
        var _this = _super.call(this, ITEM_PROVIDER_CLASS) || this;
        _this.items = items;
        _this.registerService();
        return _this;
    }
    StaticItemProvider.prototype.addProviderChangeListener = function (listener) {
    };
    StaticItemProvider.prototype.removeProviderChangeListener = function (listener) {
    };
    StaticItemProvider.prototype.getAll = function () {
        return this.items;
    };
    return StaticItemProvider;
}(AbstractProvider));
var ManagedItemProvider = /** @class */ (function (_super) {
    __extends(ManagedItemProvider, _super);
    function ManagedItemProvider() {
        var _this = _super.call(this, ITEM_PROVIDER_CLASS) || this;
        _this.items = new Set();
        _this.listeners = new Set();
        _this.registerService();
        return _this;
    }
    ManagedItemProvider.prototype.addProviderChangeListener = function (listener) {
        this.listeners.add(listener);
    };
    ManagedItemProvider.prototype.removeProviderChangeListener = function (listener) {
        this.listeners["delete"](listener);
    };
    ManagedItemProvider.prototype.add = function (item) {
        if (item instanceof items.Item) {
            item = item.rawItem;
        }
        if (!this.items.has(item)) {
            this.items.add(item);
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener.added(this.hostProvider, item);
            }
        }
    };
    ManagedItemProvider.prototype.remove = function (itemOrName) {
        var _this = this;
        if (typeof itemOrName === 'string') {
            this.items.forEach(function (i) { if (i.name === itemOrName)
                _this.remove(i); });
        }
        else {
            if (itemOrName instanceof items.Item) {
                itemOrName = itemOrName.rawItem;
            }
            if (this.items.has(itemOrName)) {
                this.items["delete"](itemOrName);
                for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener.removed(this.hostProvider, item);
                }
            }
        }
    };
    ManagedItemProvider.prototype.update = function (item) {
        if (item instanceof items.Item) {
            item = item.rawItem;
        }
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener.updated(this.hostProvider, item);
        }
    };
    ManagedItemProvider.prototype.getAll = function () {
        return utils.jsSetToJavaSet(this.items);
    };
    return ManagedItemProvider;
}(AbstractProvider));
var StaticCallbackItemProvider = /** @class */ (function (_super) {
    __extends(StaticCallbackItemProvider, _super);
    function StaticCallbackItemProvider() {
        var _this = _super.call(this, ITEM_PROVIDER_CLASS) || this;
        _this.itemsCallbacks = [];
        return _this;
    }
    StaticCallbackItemProvider.prototype.addProviderChangeListener = function (listener) {
    };
    StaticCallbackItemProvider.prototype.removeProviderChangeListener = function (listener) {
    };
    StaticCallbackItemProvider.prototype.addItemsCallback = function (callback) {
        this.itemsCallbacks.push(callback);
    };
    StaticCallbackItemProvider.prototype.getAll = function () {
        return utils.jsArrayToJavaList(this.itemsCallbacks.flatMap(function (c) { return c(); }));
    };
    return StaticCallbackItemProvider;
}(AbstractProvider));
module.exports = {
    staticItemProvider: function (items) { return new StaticItemProvider(items); },
    managedItemProvider: function () { return new ManagedItemProvider(); },
    staticCallbackItemProvider: function () { return new StaticCallbackItemProvider(); }
};
// export classes to create clean d.ts file with TypeScript
module.exports.StaticItemProvider = StaticItemProvider;
module.exports.ManagedItemProvider = ManagedItemProvider;
module.exports.StaticCallbackItemProvider = StaticCallbackItemProvider;
