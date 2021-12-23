'use strict';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Log namespace.
 * This namespace provides loggers to log messages to the openHAB Log.
 *
 * @example <caption>Basic logging</caption>
 * let log = require('openhab').log('my_logger');
 * log.info("Hello World!")
 *
 * @namespace log
 */
/**
 * Logger prefix
 */
var LOGGER_PREFIX = "org.openhab.automation.script";
var MessageFormatter = Java.type("org.slf4j.helpers.MessageFormatter");
/**
 * Logger class. A named logger providing the ability to log formatted messages.
 *
 * @memberof log
 * @hideconstructor
 */
var Logger = /** @class */ (function () {
    /**
     * Creates a new logger. Don't use directly, use {@link log} on module.
     *
     * @param {String} _name the name of the logger. Will be prefixed by {@link LOGGER_PREFIX}
     * @param {*} _listener a callback to receive logging calls. Can be used to send calls elsewhere, such as escalate errors.
     */
    function Logger(_name, appenderProvider) {
        this._name = _name || this._getCallerDetails("", 3).fileName.replace(/\.[^/.]+$/, "");
        this.appenderProvider = appenderProvider;
        this._logger = Java.type("org.slf4j.LoggerFactory").getLogger(LOGGER_PREFIX + "." + this.name.toString().toLowerCase());
    }
    /**
     * Method to determine caller. Don't use directly.
     *
     * @private
     * @param {Object} msg the message to get caller details for
     * @param {Number} ignoreStackDepth the number of stack frames which to ignore in calculating caller
     * @returns {Error} message as an error object, with fileName, caller and optional lineNumber properties
     */
    Logger.prototype._getCallerDetails = function (msg, ignoreStackDepth) {
        var stackLine = null;
        if (!(msg instanceof Error)) {
            msg = Error(msg);
            stackLine = msg.stack.split('\n')[ignoreStackDepth];
        }
        else {
            stackLine = msg.stack.split('\n')[1];
        }
        //pick out the call, fileName & lineNumber from the specific frame
        var match = stackLine.match(/^\s+at\s*(?<caller>[^ ]*) \(?(?<fileName>[^:]+):(?<lineNumber>[0-9]+):[0-9]+\)?/);
        if (match) {
            Object.assign(msg, match.groups);
        }
        else { //won't match an 'eval'd string, so retry
            match = stackLine.match(/\s+at\s+\<eval\>:(?<lineNumber>[0-9]+):[0-9]+/);
            if (match) {
                Object.assign(msg, {
                    fileName: "<unknown>",
                    caller: "<root script>"
                }, match.groups);
            }
            else {
                Object.assign(msg, {
                    fileName: "<unknown>",
                    caller: "<root script>"
                });
            } //throw Error(`Failed to parse stack line: ${stackLine}`);
        }
        return msg;
    };
    /**
     * Method to format a log message. Don't use directly.
     *
     * @private
     * @param {Object} msg the message to get caller details for
     * @param {String} levelString the level being logged at
     * @param {Number} ignoreStackDepth the number of stack frames which to ignore in calculating caller
     * @param {String} [prefix=log] the prefix type, such as none, level, short or log.
     * @returns {Error} message with 'message' String property
     */
    Logger.prototype._formatLogMessage = function (msg, levelString, ignoreStackDepth, prefix) {
        if (prefix === void 0) { prefix = "none"; }
        var clazz = this;
        var msgData = {
            message: msg.toString(),
            get caller() {
                this.cached = this.cached || clazz._getCallerDetails(msg, ignoreStackDepth);
                return this.cached;
            }
        };
        levelString = levelString.toUpperCase();
        switch (prefix) {
            case "none": return msgData.message;
            case "level": return "[".concat(levelString, "] ").concat(msgData.message);
            case "short": return "".concat(msgData.message, "\t\t[").concat(this.name, ", ").concat(msgData.caller.fileName, ":").concat(msgData.caller.lineNumber, "]");
            case "log": return "".concat(msgData.message, "\t\t[").concat(this.name, " at source ").concat(msgData.caller.fileName, ", line ").concat(msgData.caller.lineNumber, "]");
            default: throw Error("Unknown prefix type ".concat(prefix));
        }
    };
    /**
     * Logs at ERROR level.
     * @see atLevel
     */
    Logger.prototype.error = function () { this.atLevel.apply(this, __spreadArray(['error'], arguments, false)); };
    /**
     * Logs at ERROR level.
     * @see atLevel
     */
    Logger.prototype.warn = function () { this.atLevel.apply(this, __spreadArray(['warn'], arguments, false)); };
    /**
     * Logs at INFO level.
     * @see atLevel
     */
    Logger.prototype.info = function () { this.atLevel.apply(this, __spreadArray(['info'], arguments, false)); };
    /**
     * Logs at DEBUG level.
     * @see atLevel
     */
    Logger.prototype.debug = function () { this.atLevel.apply(this, __spreadArray(['debug'], arguments, false)); };
    /**
     * Logs at TRACE level.
     * @see atLevel
     */
    Logger.prototype.trace = function () { this.atLevel.apply(this, __spreadArray(['trace'], arguments, false)); };
    /**
     * Logs a message at the supplied level. The message may include placeholders {} which
     * will be substituted into the message string only if the message is actually logged.
     *
     * @example
     * log.atLevel('INFO', 'The widget was created as {}', widget);
     *
     *
     * @param {String} level The level at which to log, such as 'INFO', or 'DEBUG'
     * @param {String|Error} msg the message to log, possibly with object placeholders
     * @param {Object[]} [objects] the objects to substitute into the log message
     */
    Logger.prototype.atLevel = function (level, msg) {
        var objects = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            objects[_i - 2] = arguments[_i];
        }
        var titleCase = level[0].toUpperCase() + level.slice(1);
        try {
            if (this._logger["is".concat(titleCase, "Enabled")]()) {
                this.maybeLogWithThrowable(level, msg, objects) ||
                    this.writeLogLine(level, this._formatLogMessage(msg, level, 6), objects);
            }
        }
        catch (err) {
            this._logger.error(this._formatLogMessage(err, "error", 0));
        }
    };
    Logger.prototype.maybeLogWithThrowable = function (level, msg, objects) {
        if (objects.length === 1) {
            var obj = objects[0];
            if ((obj instanceof Error || (obj.message && obj.name && obj.stack)) && !msg.includes("{}")) { //todo: better substitution detected
                //log the basic message
                this.writeLogLine(level, msg, objects);
                //and log the exception
                this.writeLogLine(level, "".concat(obj.name, " : ").concat(obj.message, "\n").concat(obj.stack));
                return true;
            }
        }
        return false;
    };
    Logger.prototype.writeLogLine = function (level, message, objects) {
        if (objects === void 0) { objects = []; }
        var formatted = MessageFormatter.arrayFormat(message, objects).getMessage();
        this._logger[level](formatted);
    };
    Object.defineProperty(Logger.prototype, "listener", {
        /**
         * The listener function attached to this logger.
         * @return {*} the listener function
         */
        get: function () { return this._listener; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "name", {
        /**
         * The name of this logger
         * @return {String} the logger name
         */
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    return Logger;
}());
/**
 * Creates a logger.
 * @see Logger
 * @name default
 * @param {string} name the name of the logger
 * @param {*} [_listener] an optional listener to process log events.
 * @memberof log
 */
module.exports = function (_name) {
    return new Logger(_name);
};
module.exports.Logger = Logger;
