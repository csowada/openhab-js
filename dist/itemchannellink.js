'use strict';
/**
 * Items' metadata namespace.
 * This namespace provides access to metadata on items.
 *
 * @private
 * @namespace metadata
 */
var log = require('./log')('itemchannellink');
var ItemChannelLink = Java.type("org.openhab.core.thing.link.ItemChannelLink");
var createItemChannelLink = function (itemName, channel) {
    log.debug("Creating item channel link {} -> {}", itemName, channel.uid);
    return new ItemChannelLink(itemName, channel.rawChannel.getUID());
};
module.exports = {
    createItemChannelLink: createItemChannelLink
};
