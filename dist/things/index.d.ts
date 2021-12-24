/**
 *
 */
declare class OHThing {
    rawThing: any;
    constructor(rawThing: any);
}
/**
 *
 */
declare class OHChannel {
    rawChannel: any;
    constructor(rawChannel: any);
    get uid(): any;
}
/**
 *
 */
declare class ThingBuilder {
    thingTypeUID: any;
    thingId: any;
    thingUID: any;
    rawBuilder: any;
    constructor(thingTypeUID: any, thingId: any, bridgeUID: any);
    withChannel(channel: OHChannel): this;
    withLabel(label: string): this;
    build(): OHThing;
}
/**
 *
 */
declare class ChannelBuilder {
    rawBuilder: any;
    constructor(thingUID: any, channelId: any, acceptedItemType: any);
    withConfiguration(config: any): this;
    withKind(stateOrTrigger: any): this;
    withLabel(label: string): this;
    withType(channelType: any): this;
    build(): OHChannel;
}
/**
 *
 * @param {String} thingTypeUID
 * @param {String} id
 * @param {String} bridgeUID
 * @returns
 */
export declare const newThingBuilder: (thingTypeUID: any, id: any, bridgeUID: any) => ThingBuilder;
/**
 *
 * @param {String} thingUID
 * @param {String} channelId
 * @param {String} acceptedItemType
 * @returns
 */
export declare const newChannelBuilder: (thingUID: any, channelId: any, acceptedItemType: any) => ChannelBuilder;
export {};
