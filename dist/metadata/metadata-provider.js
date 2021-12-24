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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticCallbackMetadataProvider = void 0;
const provider_1 = require("../provider");
const utils = __importStar(require("../utils"));
const METADATA_PROVIDER_CLASS = "org.openhab.core.items.MetadataProvider";
class StaticCallbackMetadataProvider extends provider_1.AbstractProvider {
    constructor() {
        super(METADATA_PROVIDER_CLASS);
        this.metadataCallbacks = [];
    }
    addProviderChangeListener(listener) {
    }
    removeProviderChangeListener(listener) {
    }
    addMetadataCallback(callback) {
        this.metadataCallbacks.push(callback);
    }
    getAll() {
        require('../log')('metadata-provider').debug("///" + this.metadataCallbacks.length);
        require('../log')('metadata-provider').debug("///" + this.metadataCallbacks.flatMap(c => c()).length);
        for (let x of this.metadataCallbacks.flatMap(c => c())) {
            require('../log')('metadata-provider').debug(x);
        }
        return utils.jsArrayToJavaList(this.metadataCallbacks.flatMap(c => c()));
    }
}
exports.StaticCallbackMetadataProvider = StaticCallbackMetadataProvider;
exports.default = () => new StaticCallbackMetadataProvider();
// module.exports = {
//     staticCallbackMetadataProvider: () => new StaticCallbackMetadataProvider()
// }
// // seperate export class for just for TypeScript
// module.exports.StaticCallbackMetadataProvider = StaticCallbackMetadataProvider;
