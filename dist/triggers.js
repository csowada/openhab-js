'use strict';
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
exports.TimeOfDayTrigger = exports.GenericCronTrigger = exports.SystemStartlevelTrigger = exports.ThingStatusChangeTrigger = exports.ThingStatusUpdateTrigger = exports.GroupCommandTrigger = exports.GroupStateUpdateTrigger = exports.GroupStateChangeTrigger = exports.ItemCommandTrigger = exports.ItemStateUpdateTrigger = exports.ItemStateChangeTrigger = exports.ChannelEventTrigger = void 0;
/**
 * Triggers namespace.
 * This namespace allows creation of openHAB rule triggers.
 *
 * @namespace triggers
 */
const utils = __importStar(require("./utils"));
const ModuleBuilder = Java.type("org.openhab.core.automation.util.ModuleBuilder");
const Configuration = Java.type("org.openhab.core.config.core.Configuration");
/**
 * Creates a trigger. Internal function, instead use predefined trigger types.
 *
 * @memberof triggers
 * @private
 * @param {String} typeString the type of trigger to create
 * @param {String} [name] the name of the trigger
 * @param {Configuration} config the trigger configuration
 * @returns {any} the trigger
 */
let createTrigger = function (typeString, name, config) {
    if (typeof name === 'undefined' || name === null) {
        name = utils.randomUUID().toString();
    }
    return ModuleBuilder.createTrigger()
        .withId(name)
        .withTypeUID(typeString)
        .withConfiguration(new Configuration(config))
        .build();
};
/**
 * Creates a trigger that fires upon specific events in a channel.
 *
 * @example
 * ChannelEventTrigger('astro:sun:local:rise#event', 'START')
 *
 * @name ChannelEventTrigger
 * memberof triggers
 * @param {String} channel the name of the channel
 * @param {String} event the name of the event to listen for
 * @param {String} [triggerName] the name of the trigger to create
 * @returns {any | null} trigger
 *
 */
const ChannelEventTrigger = (channel, event, triggerName) => createTrigger("core.ChannelEventTrigger", triggerName, {
    "channelUID": channel,
    "event": event
});
exports.ChannelEventTrigger = ChannelEventTrigger;
/**
 * Creates a trigger that fires upon an item changing state.
 *
 * @example
 * ItemStateChangeTrigger('my_item', 'OFF', 'ON')
 *
 * @name ItemStateChangeTrigger
 * @memberof triggers
 * @param {String} itemName the name of the item to monitor for change
 * @param {String} [oldState] the previous state of the item
 * @param {String} [newState] the new state of the item
 * @param {String} [triggerName] the name of the trigger to create
 */
const ItemStateChangeTrigger = (itemName, oldState, newState, triggerName) => createTrigger("core.ItemStateChangeTrigger", triggerName, {
    "itemName": itemName,
    "state": newState,
    "oldState": oldState
});
exports.ItemStateChangeTrigger = ItemStateChangeTrigger;
/**
 * Creates a trigger that fires upon an item receiving a state update. Note that the item does not need to change state.
 *
 * @example
 * ItemStateUpdateTrigger('my_item', 'OFF')
 *
 * @name ItemStateUpdateTrigger
 * @memberof triggers
 * @param {String} itemName the name of the item to monitor for change
 * @param {String} [state] the new state of the item
 * @param {String} [triggerName] the name of the trigger to create
 */
const ItemStateUpdateTrigger = (itemName, state, triggerName) => createTrigger("core.ItemStateUpdateTrigger", triggerName, {
    "itemName": itemName,
    "state": state
});
exports.ItemStateUpdateTrigger = ItemStateUpdateTrigger;
/**
 * Creates a trigger that fires upon an item receiving a command. Note that the item does not need to change state.
 *
 * @example
 * ItemCommandTrigger('my_item', 'OFF')
 *
 * @name ItemCommandTrigger
 * @memberof triggers
 * @param {String} itemName the name of the item to monitor for change
 * @param {String} [command] the command received
 * @param {String} [triggerName] the name of the trigger to create
 */
const ItemCommandTrigger = (itemName, command, triggerName) => createTrigger("core.ItemCommandTrigger", triggerName, {
    "itemName": itemName,
    "command": command
});
exports.ItemCommandTrigger = ItemCommandTrigger;
/**
 * Creates a trigger that fires upon a member of a group changing state.
 *
 * @example
 * GroupStateChangeTrigger('my_group', 'OFF', 'ON')
 *
 * @name GroupStateChangeTrigger
 * @memberof triggers
 * @param {String} groupName the name of the group to monitor for change
 * @param {String} [oldState] the previous state of the group
 * @param {String} [newState] the new state of the group
 * @param {String} [triggerName] the name of the trigger to create
 */
const GroupStateChangeTrigger = (groupName, oldState, newState, triggerName) => createTrigger("core.GroupStateChangeTrigger", triggerName, {
    "groupName": groupName,
    "state": newState,
    "oldState": oldState
});
exports.GroupStateChangeTrigger = GroupStateChangeTrigger;
/**
 * Creates a trigger that fires upon a member of a group receiving a state update. Note that group item does not need to change state.
 *
 * @example
 * GroupStateUpdateTrigger('my_group', 'OFF')
 *
 * @name GroupStateUpdateTrigger
 * @memberof triggers
 * @param {String} groupName the name of the group to monitor for change
 * @param {String} [state] the new state of the group
 * @param {String} [triggerName] the name of the trigger to create
 */
const GroupStateUpdateTrigger = (groupName, state, triggerName) => createTrigger("core.GroupStateUpdateTrigger", triggerName, {
    "groupName": groupName,
    "state": state
});
exports.GroupStateUpdateTrigger = GroupStateUpdateTrigger;
/**
 * Creates a trigger that fires upon a member of a group receiving a command. Note that the group does not need to change state.
 *
 * @example
 * GroupCommandTrigger('my_group', 'OFF')
 *
 * @name GroupCommandTrigger
 * @memberof triggers
 * @param {String} groupName the name of the group to monitor for change
 * @param {String} [command] the command received
 * @param {String} [triggerName] the name of the trigger to create
 */
const GroupCommandTrigger = (groupName, command, triggerName) => createTrigger("core.GroupCommandTrigger", triggerName, {
    "groupName": groupName,
    "command": command
});
exports.GroupCommandTrigger = GroupCommandTrigger;
/**
 * Creates a trigger that fires upon an Thing status updating
 *
 * @example
 * ThingStatusUpdateTrigger('some:thing:uuid','OFFLINE')
 *
 * @name ThingStatusUpdateTrigger
 * @memberof triggers
 * @param {String} thingUID the name of the thing to monitor for a status updating
 * @param {String} [status] the optional status to monitor for
 * @param {String} [triggerName] the name of the trigger to create
 */
const ThingStatusUpdateTrigger = (thingUID, status, triggerName) => createTrigger("core.ThingStatusUpdateTrigger", triggerName, {
    "thingUID": thingUID,
    "status": status,
});
exports.ThingStatusUpdateTrigger = ThingStatusUpdateTrigger;
/**
* Creates a trigger that fires upon an Thing status changing
*
* @example
* ThingStatusChangeTrigger('some:thing:uuid','ONLINE','OFFLINE')
*
* @name ThingStatusChangeTrigger
* @memberof triggers
* @param {String} thingUID the name of the thing to monitor for a status change
* @param {String} [status] the optional status to monitor for
* @param {String} [previousStatus] the optional previous state to monitor from
* @param {String} [triggerName] the optional name of the trigger to create
*/
const ThingStatusChangeTrigger = (thingUID, status, previousStatus, triggerName) => createTrigger("core.ThingStatusChangeTrigger", triggerName, {
    "thingUID": thingUID,
    "status": status,
    "previousStatus": previousStatus,
});
exports.ThingStatusChangeTrigger = ThingStatusChangeTrigger;
/**
 * Creates a trigger that fires if a given start level is reached by the system
 *
 * @example
 * SystemStartlevelTrigger(40)  //Rules loaded
 * ...
 * SystemStartlevelTrigger(50)  //Rule engine started
 * ...
 * SystemStartlevelTrigger(70)  //User interfaces started
 * ...
 * SystemStartlevelTrigger(80)  //Things initialized
 * ...
 * SystemStartlevelTrigger(100) //Startup Complete
 *
 * @name SystemStartlevelTrigger
 * @memberof triggers
 * @param {String} startlevel the system start level to be triggered on
 * @param {String} [triggerName] the name of the trigger to create
 */
const SystemStartlevelTrigger = (startlevel, triggerName) => createTrigger("core.SystemStartlevelTrigger", triggerName, {
    "startlevel": startlevel
});
exports.SystemStartlevelTrigger = SystemStartlevelTrigger;
/**
 * Creates a trigger that fires on a cron schedule. The supplied cron expression defines when the trigger will fire.
 *
 * @example
 * GenericCronTrigger('0 30 16 * * ? *')
 *
 * @name GenericCronTrigger
 * @memberof triggers
 * @param {String} expression the cron expression defining the triggering schedule
 */
const GenericCronTrigger = (expression, triggerName) => createTrigger("timer.GenericCronTrigger", triggerName, {
    "cronExpression": expression
});
exports.GenericCronTrigger = GenericCronTrigger;
/**
 * Creates a trigger that fires daily at a specific time. The supplied time defines when the trigger will fire.
 *
 * @example
 * TimeOfDayTrigger('19:00')
 *
 * @name TimeOfDayTrigger
 * @memberof triggers
 * @param {String} time the time expression defining the triggering schedule
 */
const TimeOfDayTrigger = (time, triggerName) => createTrigger("timer.TimeOfDayTrigger", triggerName, {
    "time": time
});
exports.TimeOfDayTrigger = TimeOfDayTrigger;
