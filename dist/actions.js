"use strict";
/**
 * Actions namespace.
 * This namespace provides access to openHAB actions. All available actions can be accessed as direct properties of this
 * object (via their simple class name).
 *
 * @example <caption>Sends a broadcast notification</caption>
 * let { actions } = require('openhab');
 * actions.NotificationAction.sendBroadcastNotification("Hello World!")
 *
 * @example <caption>Sends a PushSafer notification</caption>
 * let { actions } = require('openhab');
 *  actions.Pushsafer.pushsafer("<your pushsafer api key>", "<message>", "<message title>", "", "", "", "")
 *
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.thingActions = exports.Voice = exports.ThingsAction = exports.Semantics = exports.ScriptExecution = exports.Ping = exports.LogAction = exports.HTTP = exports.Exec = exports.Ephemeris = exports.BusEvent = exports.Audio = void 0;
const log_1 = __importDefault(require("./log"));
const osgi = __importStar(require("./osgi"));
const Defaults_1 = require("@runtime/Defaults");
const log = (0, log_1.default)('actions');
const Things = Java.type('org.openhab.core.model.script.actions.Things');
const actionServices = osgi.findServices("org.openhab.core.model.script.engine.action.ActionService", null) || [];
actionServices.forEach(function (item) {
    try {
        //if an action fails to activate, then warn and continue so that other actions are available
        exports[item.getActionClass().getSimpleName()] = item.getActionClass().static;
    }
    catch (e) {
        log.warn("Failed to activate action {} due to {}", item, e);
    }
});
/**
 * Audio Actions
 *
 * The static methods of this class are made available as functions in the scripts. This allows a script to use audio features.
 *
 * @example
 * Audio.decreaseMasterVolume​(float percent)
 * Audio.getMasterVolume()
 * Audio.increaseMasterVolume​(float percent)
 * Audio.playSound​(String filename)
 * Audio.playSound​(String sink, String filename)
 * Audio.playSound​(String sink, String filename, PercentType volume)
 * Audio.playSound​(String filename, PercentType volume)
 * Audio.playStream​(String url)
 * Audio.playStream​(String sink, String url)
 * Audio.setMasterVolume​(float volume)
 * Audio.setMasterVolume​(PercentType percent)
 * @example
 * Audio.decreaseMasterVolume​(1.0)
 *
 * @name Audio
 * @memberof actions
 */
exports.Audio = Java.type('org.openhab.core.model.script.actions.Audio').class.static;
/**
 * BusEvent Actions
 *
 * The static methods of this class are made available as functions in the scripts. This gives direct write access to the openHAB event bus from within scripts. Items should not be updated directly (setting the state property), but updates should be sent to the bus, so that all interested bundles are notified.
 * @example
 * BusEvent.postUpdate​(String itemName, String stateString)
 * BusEvent.postUpdate​(Item item, Number state)
 * BusEvent.postUpdate​(Item item, String stateAsString)
 * BusEvent.postUpdate​(Item item, State state)
 * BusEvent.restoreStates​(Map<Item,​State> statesMap)
 * BusEvent.sendCommand​(String itemName, String commandString)
 * BusEvent.sendCommand​(Item item, Number number)
 * BusEvent.sendCommand​(Item item, String commandString)
 * BusEvent.sendCommand​(Item item, Command command)
 * BusEvent.storeStates​(Item... items)
 *
 * @name BusEvent
 * @memberof actions
 */
exports.BusEvent = Java.type('org.openhab.core.model.script.actions.BusEvent').class.static;
/**
 *  Ephemeris Actions
 *
 * The static methods of this class are made available as functions in the scripts. This allows a script to use ephemeris features.
 * @example
 * Ephemeris.getBankHolidayName()
 * Ephemeris.getBankHolidayName​(int offset)
 * Ephemeris.getBankHolidayName​(int offset, String filename)
 * Ephemeris.getBankHolidayName​(String filename)
 * Ephemeris.getBankHolidayName​(ZonedDateTime day)
 * Ephemeris.getBankHolidayName​(ZonedDateTime day, String filename)
 * Ephemeris.getDaysUntil​(String searchedHoliday)
 * Ephemeris.getDaysUntil​(String searchedHoliday, String filename)
 * Ephemeris.getDaysUntil​(ZonedDateTime day, String searchedHoliday)
 * Ephemeris.getDaysUntil​(ZonedDateTime day, String searchedHoliday, String filename)
 * Ephemeris.getHolidayDescription​(@Nullable String holiday)
 * Ephemeris.getNextBankHoliday()
 * Ephemeris.getNextBankHoliday​(int offset)
 * Ephemeris.getNextBankHoliday​(int offset, String filename)
 * Ephemeris.getNextBankHoliday​(String filename)
 * Ephemeris.getNextBankHoliday​(ZonedDateTime day)
 * Ephemeris.getNextBankHoliday​(ZonedDateTime day, String filename)
 * Ephemeris.isBankHoliday()
 * Ephemeris.isBankHoliday​(int offset)
 * Ephemeris.isBankHoliday​(int offset, String filename)
 * Ephemeris.isBankHoliday​(String filename)
 * Ephemeris.isBankHoliday​(ZonedDateTime day)
 * Ephemeris.isBankHoliday​(ZonedDateTime day, String filename)
 * Ephemeris.isInDayset​(String daysetName)
 * Ephemeris.isInDayset​(String daysetName, int offset)
 * Ephemeris.isInDayset​(String daysetName, ZonedDateTime day)
 * Ephemeris.isWeekend()
 * Ephemeris.isWeekend​(int offset)
 * Ephemeris.isWeekend​(ZonedDateTime day)
 *
 * @name Ephemeris
 * @memberof actions
 */
exports.Ephemeris = Java.type('org.openhab.core.model.script.actions.Ephemeris').class.static;
/**
 *  Exec Actions
 *
 * This class provides static methods that can be used in automation rules for executing commands on command line.
 *
 * @example
 * Exec.executeCommandLine​(String... commandLine)
 * Exec.executeCommandLine​(Duration timeout, String... commandLine)
 *
 * @name Exec
 * @memberof actions
 */
exports.Exec = Java.type('org.openhab.core.model.script.actions.Exec').class.static;
/**
 *  HTTP Actions
 *
 * This class provides static methods that can be used in automation rules for sending HTTP requests
 *
 * @example
 * HTTP.sendHttpDeleteRequest​(String url)
 * HTTP.sendHttpDeleteRequest​(String url, int timeout)
 * HTTP.sendHttpDeleteRequest​(String url, Map<String,​String> headers, int timeout)
 * HTTP.sendHttpGetRequest​(String url)
 * HTTP.sendHttpGetRequest​(String url, int timeout)
 * HTTP.sendHttpGetRequest​(String url, Map<String,​String> headers, int timeout)
 * HTTP.sendHttpPostRequest​(String url)
 * HTTP.sendHttpPostRequest​(String url, int timeout)
 * HTTP.sendHttpPostRequest​(String url, String contentType, String content)
 * HTTP.sendHttpPostRequest​(String url, String contentType, String content, int timeout)
 * HTTP.sendHttpPostRequest​(String url, String contentType, String content, Map<String,​String> headers, int timeout)
 * HTTP.sendHttpPutRequest​(String url)
 * HTTP.sendHttpPutRequest​(String url, int timeout)
 * HTTP.sendHttpPutRequest​(String url, String contentType, String content)
 * HTTP.sendHttpPutRequest​(String url, String contentType, String content, int timeout)
 * HTTP.sendHttpPutRequest​(String url, String contentType, String content, Map<String,​String> headers, int timeout)
 *
 * @name HTTP
 * @memberof actions
 */
exports.HTTP = Java.type('org.openhab.core.model.script.actions.HTTP').class.static;
/**
 *  Log Actions
 *
 * The static methods of this class are made available as functions in the scripts. This allows a script to log to the SLF4J-Log.
 *
 * @example
 * Log.logDebug​(String loggerName, String format, Object... args)
 * Log.logError​(String loggerName, String format, Object... args)
 * Log.logInfo​(String loggerName, String format, Object... args)
 * Log.logWarn​(String loggerName, String format, Object... args)
 *
 * @name Log
 * @memberof actions
 */
exports.LogAction = Java.type('org.openhab.core.model.script.actions.Log').class.static;
/**
 *  Ping Actions
 *
 * This Action checks the vitality of the given host.
 *
 * @example
 * Ping.checkVitality​(String host, int port, int timeout)
 *
 * @name Ping
 * @memberof actions
 */
exports.Ping = Java.type('org.openhab.core.model.script.actions.Ping').class.static;
/**
 *  ScriptExecution Actions
 *
 * The static methods of this class are made available as functions in the scripts. This allows a script to call another script, which is available as a file.
 *
 * @example
 * ScriptExecution.callScript​(String scriptName)
 * ScriptExecution.createTimer​(ZonedDateTime instant, org.eclipse.xtext.xbase.lib.Procedures.Procedure0 closure)
 * ScriptExecution.createTimerWithArgument​(ZonedDateTime instant, Object arg1, org.eclipse.xtext.xbase.lib.Procedures.Procedure1<Object> closure)
 *
 * @name ScriptExecution
 * @memberof actions
 */
exports.ScriptExecution = Java.type('org.openhab.core.model.script.actions.ScriptExecution').class.static;
/**
 *  Semantics Actions
 *
 * The static methods of this class are made available as functions in the scripts. This allows a script to use Semantics features.
 *
 * @example
 * Semantics.getEquipment​(Item item)
 * Semantics.getEquipmentType​(Item item)
 * Semantics.getLocation​(Item item)
 * Semantics.getLocationType​(Item item)
 * Semantics.getPointType​(Item item)
 * Semantics.getPropertyType​(Item item)
 * Semantics.getSemanticType​(Item item)
 * Semantics.isEquipment​(Item item)
 * Semantics.isLocation​(Item item)
 * Semantics.isPoint​(Item item)
 *
 * @name Semantics
 * @memberof actions
 */
exports.Semantics = Java.type('org.openhab.core.model.script.actions.Semantics').class.static;
/**
 *  Things Actions
 *
 * This class provides static methods that can be used in automation rules for getting thing's status info.
 *
 * @example
 * Things.getActions​(String scope, String thingUid)
 * Things.getThingStatusInfo​(String thingUid)
 *
 * @name Things
 * @memberof actions
 */
exports.ThingsAction = Java.type('org.openhab.core.model.script.actions.Things').class.static;
/**
 *  Voice Actions
 *
 * The static methods of this class are made available as functions in the scripts. This allows a script to use voice features.
 *
 * @example
 * Voice.interpret​(Object text)
 * Voice.interpret​(Object text, String interpreter)
 * Voice.interpret​(Object text, String interpreter, String sink)
 * Voice.say​(Object text)
 * Voice.say​(Object text, String voice)
 * Voice.say​(Object text, String voice, String sink)
 * Voice.say​(Object text, String voice, String sink, PercentType volume)
 * Voice.say​(Object text, String voice, PercentType volume)
 * Voice.say​(Object text, PercentType volume)
 *
 * @name Voice
 * @memberof actions
 */
exports.Voice = Java.type('org.openhab.core.model.script.actions.Voice').class.static;
/**
 *
 * @param {String} bindingId
 * @param {String} thingUid
 * @returns
 */
const thingActions = (bindingId, thingUid) => Things.getActions(bindingId, thingUid);
exports.thingActions = thingActions;
/**
 *
 * @param  {...any} args
 * @returns
 */
const get = (...args) => Defaults_1.actions.get(...args);
exports.get = get;
