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
var AbstractProvider = require('../provider').AbstractProvider;
var METADATA_PROVIDER_CLASS = "org.openhab.core.items.MetadataProvider";
var StaticCallbackMetadataProvider = /** @class */ (function (_super) {
    __extends(StaticCallbackMetadataProvider, _super);
    function StaticCallbackMetadataProvider() {
        var _this = _super.call(this, METADATA_PROVIDER_CLASS) || this;
        _this.metadataCallbacks = [];
        return _this;
    }
    StaticCallbackMetadataProvider.prototype.addProviderChangeListener = function (listener) {
    };
    StaticCallbackMetadataProvider.prototype.removeProviderChangeListener = function (listener) {
    };
    StaticCallbackMetadataProvider.prototype.addMetadataCallback = function (callback) {
        this.metadataCallbacks.push(callback);
    };
    StaticCallbackMetadataProvider.prototype.getAll = function () {
        require('../log')('metadata-provider').debug("///" + this.metadataCallbacks.length);
        require('../log')('metadata-provider').debug("///" + this.metadataCallbacks.flatMap(function (c) { return c(); }).length);
        for (var _i = 0, _a = this.metadataCallbacks.flatMap(function (c) { return c(); }); _i < _a.length; _i++) {
            var x = _a[_i];
            require('../log')('metadata-provider').debug(x);
        }
        return utils.jsArrayToJavaList(this.metadataCallbacks.flatMap(function (c) { return c(); }));
    };
    return StaticCallbackMetadataProvider;
}(AbstractProvider));
module.exports = {
    staticCallbackMetadataProvider: function () { return new StaticCallbackMetadataProvider(); }
};
// seperate export class for just for TypeScript
module.exports.StaticCallbackMetadataProvider = StaticCallbackMetadataProvider;
