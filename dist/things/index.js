var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var JavaThingBuilder = Java.type('org.openhab.core.thing.binding.builder.ThingBuilder');
var ThingTypeUID = Java.type('org.openhab.core.thing.ThingTypeUID');
var JavaChannelBuilder = Java.type('org.openhab.core.thing.binding.builder.ChannelBuilder');
var ChannelUID = Java.type('org.openhab.core.thing.ChannelUID');
var ThingUID = Java.type('org.openhab.core.thing.ThingUID');
var ChannelKind = Java.type('org.openhab.core.thing.type.ChannelKind');
var ChannelTypeUID = Java.type('org.openhab.core.thing.type.ChannelTypeUID');
var Configuration = Java.type('org.openhab.core.config.core.Configuration');
/**
 *
 */
var OHThing = /** @class */ (function () {
    function OHThing(rawThing) {
        this.rawThing = rawThing;
    }
    return OHThing;
}());
/**
 *
 */
var OHChannel = /** @class */ (function () {
    function OHChannel(rawChannel) {
        this.rawChannel = rawChannel;
    }
    Object.defineProperty(OHChannel.prototype, "uid", {
        get: function () {
            return this.rawChannel.getUID().toString();
        },
        enumerable: false,
        configurable: true
    });
    return OHChannel;
}());
/**
 *
 */
var ThingBuilder = /** @class */ (function () {
    function ThingBuilder(thingTypeUID, thingId, bridgeUID) {
        if (typeof thingTypeUID === 'string') {
            thingTypeUID = new (ThingTypeUID.bind.apply(ThingTypeUID, __spreadArray([void 0], thingTypeUID.split(':'), false)))();
        }
        this.thingTypeUID = thingTypeUID;
        this.thingId = thingId;
        if (typeof bridgeUID !== 'undefined') {
            if (typeof bridgeUID === 'string') {
                var _a = bridgeUID.split(':'), bridgeBindingId = _a[0], bridgeThingTypeId = _a[1], bringThingId = _a[2];
                bridgeUID = new ThingUID(new ThingTypeUID(bridgeBindingId, bridgeThingTypeId), bringThingId);
            }
            this.thingUID = new ThingUID(thingTypeUID, bridgeUID, thingId);
            this.rawBuilder = JavaThingBuilder.create(thingTypeUID, this.thingUID);
            this.rawBuilder.withBridge(bridgeUID);
        }
        else {
            this.thingUID = new ThingUID(thingTypeUID, thingId);
            this.rawBuilder = JavaThingBuilder.create(thingTypeUID, this.thingUID);
        }
    }
    ThingBuilder.prototype.withChannel = function (channel) {
        this.rawBuilder.withChannel(channel.rawChannel);
        return this;
    };
    ThingBuilder.prototype.withLabel = function (label) {
        this.rawBuilder.withLabel(label);
        return this;
    };
    ThingBuilder.prototype.build = function () {
        return new OHThing(this.rawBuilder.build());
    };
    return ThingBuilder;
}());
/**
 *
 */
var ChannelBuilder = /** @class */ (function () {
    function ChannelBuilder(thingUID, channelId, acceptedItemType) {
        var channelUID = new ChannelUID(thingUID, channelId);
        this.rawBuilder = JavaChannelBuilder.create(channelUID, acceptedItemType);
    }
    ChannelBuilder.prototype.withConfiguration = function (config) {
        this.rawBuilder.withConfiguration(new Configuration(config));
        return this;
    };
    ChannelBuilder.prototype.withKind = function (stateOrTrigger) {
        this.rawBuilder.withKind(ChannelKind.parse(stateOrTrigger));
        return this;
    };
    ChannelBuilder.prototype.withLabel = function (label) {
        this.rawBuilder.withLabel(label);
        return this;
    };
    ChannelBuilder.prototype.withType = function (channelType) {
        if (typeof channelType === 'string') {
            channelType = new ChannelTypeUID(channelType);
        }
        this.rawBuilder.withType(channelType);
        return this;
    };
    ChannelBuilder.prototype.build = function () {
        return new OHChannel(this.rawBuilder.build());
    };
    return ChannelBuilder;
}());
/**
 *
 * @param {String} thingTypeUID
 * @param {String} id
 * @param {String} bridgeUID
 * @returns
 */
var newThingBuilder = function (thingTypeUID, id, bridgeUID) { return new ThingBuilder(thingTypeUID, id, bridgeUID); };
/**
 *
 * @param {String} thingUID
 * @param {String} channelId
 * @param {String} acceptedItemType
 * @returns
 */
var newChannelBuilder = function (thingUID, channelId, acceptedItemType) { return new ChannelBuilder(thingUID, channelId, acceptedItemType); };
module.exports = {
    newThingBuilder: newThingBuilder,
    newChannelBuilder: newChannelBuilder
};
module.exports.ThingBuilder = ThingBuilder;
module.exports.ChannelBuilder = ChannelBuilder;
