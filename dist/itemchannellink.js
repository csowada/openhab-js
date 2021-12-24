"use strict";
/**
 * Items' metadata namespace.
 * This namespace provides access to metadata on items.
 *
 * @private
 * @namespace metadata
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemChannelLink = void 0;
const log_1 = __importDefault(require("./log"));
const log = (0, log_1.default)('itemchannellink');
const ItemChannelLink = Java.type("org.openhab.core.thing.link.ItemChannelLink");
const createItemChannelLink = function (itemName, channel) {
    log.debug("Creating item channel link {} -> {}", itemName, channel.uid);
    return new ItemChannelLink(itemName, channel.rawChannel.getUID());
};
exports.createItemChannelLink = createItemChannelLink;
