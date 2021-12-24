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
exports.time = exports.cache = exports.osgi = exports.uitils = exports.action = exports.triggers = exports.metadata = exports.things = exports.items = exports.rules = exports.log = void 0;
/**
 * @typedef {Object} HostState Native Java openHAB State (instance of org.openhab.core.types.State)
 * @typedef {Object} HostItem Native Java openHAB Item (instance of org.openhab.core.items.Item)
 * @typedef {Object} HostClass Native Java Class Object (instance of java.lang.Class)
 * @typedef {Object} HostRule Native Jave openHAB Rule (instance of org.openhab.core.automation.Rule)
 * @typedef {Object} HostTrigger Native Jave openHAB Trigger (instance of org.openhab.core.automation.Trigger)
 * @typedef {Object} HostGroupFunction Native Java openHAB ...
 */
exports.log = __importStar(require("./log"));
exports.rules = __importStar(require("./rules"));
exports.items = __importStar(require("./items"));
exports.things = __importStar(require("./things"));
exports.metadata = __importStar(require("./metadata"));
exports.triggers = __importStar(require("./triggers"));
exports.action = __importStar(require("./actions"));
exports.uitils = __importStar(require("./utils"));
exports.osgi = __importStar(require("./osgi"));
exports.cache = __importStar(require("./cache"));
exports.time = __importStar(require("@js-joda/core"));
