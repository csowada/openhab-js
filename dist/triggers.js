'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 * Triggers namespace.
 * This namespace allows creation of openHAB rule triggers.
 *
 * @namespace triggers
 */
var utils_1 = __importDefault(require("./utils"));
var ModuleBuilder = Java.type("org.openhab.core.automation.util.ModuleBuilder");
var Configuration = Java.type("org.openhab.core.config.core.Configuration");
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
var createTrigger = function (typeString, name, config) {
    if (typeof name === 'undefined' || name === null) {
        name = utils_1["default"].randomUUID().toString();
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
var ChannelEventTrigger = function (channel, event, triggerName) { return createTrigger("core.ChannelEventTrigger", triggerName, {
    "channelUID": channel,
    "event": event
}); };
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
var ItemStateChangeTrigger = function (itemName, oldState, newState, triggerName) { return createTrigger("core.ItemStateChangeTrigger", triggerName, {
    "itemName": itemName,
    "state": newState,
    "oldState": oldState
}); };
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
var ItemStateUpdateTrigger = function (itemName, state, triggerName) { return createTrigger("core.ItemStateUpdateTrigger", triggerName, {
    "itemName": itemName,
    "state": state
}); };
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
var ItemCommandTrigger = function (itemName, command, triggerName) { return createTrigger("core.ItemCommandTrigger", triggerName, {
    "itemName": itemName,
    "command": command
}); };
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
var GroupStateChangeTrigger = function (groupName, oldState, newState, triggerName) { return createTrigger("core.GroupStateChangeTrigger", triggerName, {
    "groupName": groupName,
    "state": newState,
    "oldState": oldState
}); };
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
var GroupStateUpdateTrigger = function (groupName, state, triggerName) { return createTrigger("core.GroupStateUpdateTrigger", triggerName, {
    "groupName": groupName,
    "state": state
}); };
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
var GroupCommandTrigger = function (groupName, command, triggerName) { return createTrigger("core.GroupCommandTrigger", triggerName, {
    "groupName": groupName,
    "command": command
}); };
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
var ThingStatusUpdateTrigger = function (thingUID, status, triggerName) { return createTrigger("core.ThingStatusUpdateTrigger", triggerName, {
    "thingUID": thingUID,
    "status": status
}); };
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
var ThingStatusChangeTrigger = function (thingUID, status, previousStatus, triggerName) { return createTrigger("core.ThingStatusChangeTrigger", triggerName, {
    "thingUID": thingUID,
    "status": status,
    "previousStatus": previousStatus
}); };
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
var SystemStartlevelTrigger = function (startlevel, triggerName) { return createTrigger("core.SystemStartlevelTrigger", triggerName, {
    "startlevel": startlevel
}); };
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
var GenericCronTrigger = function (expression, triggerName) { return createTrigger("timer.GenericCronTrigger", triggerName, {
    "cronExpression": expression
}); };
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
var TimeOfDayTrigger = function (time, triggerName) { return createTrigger("timer.TimeOfDayTrigger", triggerName, {
    "time": time
}); };
module.exports = {
    ChannelEventTrigger: ChannelEventTrigger,
    GenericCronTrigger: GenericCronTrigger,
    GroupCommandTrigger: GroupCommandTrigger,
    GroupStateChangeTrigger: GroupStateChangeTrigger,
    GroupStateUpdateTrigger: GroupStateUpdateTrigger,
    ItemCommandTrigger: ItemCommandTrigger,
    ItemStateChangeTrigger: ItemStateChangeTrigger,
    ItemStateUpdateTrigger: ItemStateUpdateTrigger,
    SystemStartlevelTrigger: SystemStartlevelTrigger,
    ThingStatusChangeTrigger: ThingStatusChangeTrigger,
    ThingStatusUpdateTrigger: ThingStatusUpdateTrigger,
    TimeOfDayTrigger: TimeOfDayTrigger
};
