const JavaThingBuilder: any = Java.type('org.openhab.core.thing.binding.builder.ThingBuilder');
const ThingTypeUID: any = Java.type('org.openhab.core.thing.ThingTypeUID');
const JavaChannelBuilder: any = Java.type('org.openhab.core.thing.binding.builder.ChannelBuilder');
const ChannelUID: any = Java.type('org.openhab.core.thing.ChannelUID');
const ThingUID: any = Java.type('org.openhab.core.thing.ThingUID');
const ChannelKind: any = Java.type('org.openhab.core.thing.type.ChannelKind');
const ChannelTypeUID: any = Java.type('org.openhab.core.thing.type.ChannelTypeUID');
const Configuration: any = Java.type('org.openhab.core.config.core.Configuration');

/**
 * 
 */
class OHThing {
    rawThing: any;
    constructor(rawThing) {
        this.rawThing = rawThing;
    }
}

/**
 * 
 */
class OHChannel {
    rawChannel: any;
    constructor(rawChannel) {
        this.rawChannel = rawChannel;
    }

    get uid() {
        return this.rawChannel.getUID().toString();
    }
}

/**
 * 
 */
class ThingBuilder {

    thingTypeUID: any;
    thingId: any;
    thingUID: any;
    rawBuilder: any;

    constructor(thingTypeUID, thingId, bridgeUID) {
        if (typeof thingTypeUID === 'string') {
            thingTypeUID = new ThingTypeUID(...thingTypeUID.split(':'));
        }

        this.thingTypeUID = thingTypeUID;
        this.thingId = thingId;

        if (typeof bridgeUID !== 'undefined') {
            if (typeof bridgeUID === 'string') {
                let [bridgeBindingId, bridgeThingTypeId, bringThingId] = bridgeUID.split(':');
                bridgeUID = new ThingUID(new ThingTypeUID(bridgeBindingId, bridgeThingTypeId), bringThingId);
            }
            this.thingUID = new ThingUID(thingTypeUID, bridgeUID, thingId);
            this.rawBuilder = JavaThingBuilder.create(thingTypeUID, this.thingUID);
            this.rawBuilder.withBridge(bridgeUID);
        } else {
            this.thingUID = new ThingUID(thingTypeUID, thingId);
            this.rawBuilder = JavaThingBuilder.create(thingTypeUID, this.thingUID);
        }
    }

    withChannel(channel: OHChannel) {
        this.rawBuilder.withChannel(channel.rawChannel);
        return this;
    }

    withLabel(label: string) {
        this.rawBuilder.withLabel(label);
        return this;
    }

    build() {
        return new OHThing(this.rawBuilder.build());
    }
}

/**
 * 
 */
class ChannelBuilder {

    rawBuilder: any;

    constructor(thingUID, channelId, acceptedItemType) {
        let channelUID = new ChannelUID(thingUID, channelId);
        this.rawBuilder = JavaChannelBuilder.create(channelUID, acceptedItemType);
    }

    withConfiguration(config) {
        this.rawBuilder.withConfiguration(new Configuration(config));
        return this;
    }

    withKind(stateOrTrigger) {
        this.rawBuilder.withKind(ChannelKind.parse(stateOrTrigger));
        return this;
    }

    withLabel(label: string) {
        this.rawBuilder.withLabel(label);
        return this;
    }

    withType(channelType) {
        if (typeof channelType === 'string') {
            channelType = new ChannelTypeUID(channelType);
        }
        this.rawBuilder.withType(channelType);
        return this;
    }

    build() {
        return new OHChannel(this.rawBuilder.build());
    }
}

/**
 * 
 * @param {String} thingTypeUID 
 * @param {String} id 
 * @param {String} bridgeUID 
 * @returns 
 */
 export const newThingBuilder = (thingTypeUID, id, bridgeUID) => new ThingBuilder(thingTypeUID, id, bridgeUID);


/**
 * 
 * @param {String} thingUID 
 * @param {String} channelId 
 * @param {String} acceptedItemType 
 * @returns 
 */
export const newChannelBuilder = (thingUID, channelId, acceptedItemType) => new ChannelBuilder(thingUID, channelId, acceptedItemType);

// module.exports = {
//     newThingBuilder,
//     newChannelBuilder
// }

// module.exports.ThingBuilder = ThingBuilder;
// module.exports.ChannelBuilder = ChannelBuilder;