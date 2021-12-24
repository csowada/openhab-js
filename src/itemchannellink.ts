/**
 * Items' metadata namespace.
 * This namespace provides access to metadata on items.
 * 
 * @private
 * @namespace metadata
 */

import logger from "./log";
const log = logger('itemchannellink');

const ItemChannelLink: any = Java.type("org.openhab.core.thing.link.ItemChannelLink");

export const createItemChannelLink = function(itemName: string, channel: any) {
    log.debug("Creating item channel link {} -> {}", itemName, channel.uid);
    return new ItemChannelLink(itemName, channel.rawChannel.getUID());
}
