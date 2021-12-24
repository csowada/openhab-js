'use strict';

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
const LOGGER_PREFIX = "org.openhab.automation.script";

const MessageFormatter: any = Java.type("org.slf4j.helpers.MessageFormatter");

/**
 * Logger class. A named logger providing the ability to log formatted messages.
 * 
 * @memberof log
 * @hideconstructor
 */
export class Logger {

    appenderProvider: any;
    _name: string;
    _logger: any;
    _listener: any;

    /**
     * Creates a new logger. Don't use directly, use {@link log} on module.
     * 
     * @param {String} _name the name of the logger. Will be prefixed by {@link LOGGER_PREFIX}
     * @param {*} _listener a callback to receive logging calls. Can be used to send calls elsewhere, such as escalate errors.
     */
    constructor(_name: string, appenderProvider?: any) {
        this._name = _name || this._getCallerDetails("", 3).fileName.replace(/\.[^/.]+$/, "")
        this.appenderProvider = appenderProvider;
        this._logger = Java.type<any>("org.slf4j.LoggerFactory").getLogger(LOGGER_PREFIX + "." + this.name.toString().toLowerCase());
    }

    /**
     * Method to determine caller. Don't use directly.
     * 
     * @private
     * @param {Object} msg the message to get caller details for
     * @param {Number} ignoreStackDepth the number of stack frames which to ignore in calculating caller
     * @returns {Error} message as an error object, with fileName, caller and optional lineNumber properties
     */
    _getCallerDetails(msg, ignoreStackDepth) {
        let stackLine = null;

        if (!(msg instanceof Error)) {
            msg = Error(msg);
            stackLine = msg.stack.split('\n')[ignoreStackDepth];
        } else {
            stackLine = msg.stack.split('\n')[1];
        }

        //pick out the call, fileName & lineNumber from the specific frame
        let match = stackLine.match(/^\s+at\s*(?<caller>[^ ]*) \(?(?<fileName>[^:]+):(?<lineNumber>[0-9]+):[0-9]+\)?/);

        if (match) {
            Object.assign(msg, match.groups);
        } else { //won't match an 'eval'd string, so retry
            match = stackLine.match(/\s+at\s+\<eval\>:(?<lineNumber>[0-9]+):[0-9]+/)
            if (match) {
                Object.assign(msg, {
                    fileName: "<unknown>",
                    caller: "<root script>"
                }, match.groups)
            } else {
                Object.assign(msg, {
                    fileName: "<unknown>",
                    caller: "<root script>"
                })
            } //throw Error(`Failed to parse stack line: ${stackLine}`);
        }

        return msg;
    }

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
    _formatLogMessage(msg:any, levelString: string, ignoreStackDepth: number, prefix: string = "none") {

        let clazz = this;
        let msgData = {
            message: msg.toString(),
            get caller() {//don't run this unless we need to, then cache it
                this.cached = this.cached || clazz._getCallerDetails(msg, ignoreStackDepth)
                return this.cached;
            }
        };

        levelString = levelString.toUpperCase();

        switch (prefix) {
            case "none": return msgData.message;
            case "level": return `[${levelString}] ${msgData.message}`
            case "short": return `${msgData.message}\t\t[${this.name}, ${msgData.caller.fileName}:${msgData.caller.lineNumber}]`
            case "log": return `${msgData.message}\t\t[${this.name} at source ${msgData.caller.fileName}, line ${msgData.caller.lineNumber}]`
            default: throw Error(`Unknown prefix type ${prefix}`)
        }
    }

    /**
     * Logs at ERROR level.
     * @see atLevel
     */
    error(msg: string|Error, ...args: any[]) { this.atLevel('error', msg, ...args) }
    /**
     * Logs at ERROR level.
     * @see atLevel
     */
    warn(msg: string|Error, ...args: any[]) { this.atLevel('warn', msg, ...args) }
    /**
     * Logs at INFO level.
     * @see atLevel
     */
    info(msg: string|Error, ...args: any[]) { this.atLevel('info', msg, ...args) }
    /**
     * Logs at DEBUG level.
     * @see atLevel
     */
    debug(msg: string|Error, ...args: any[]) { this.atLevel('debug', msg, ...args) }
    /**
     * Logs at TRACE level.
     * @see atLevel
     */
    trace(msg: string|Error, ...args: any[]) { this.atLevel('trace', msg, ...args) }

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
    atLevel(level: string, msg: string|Error, ...objects: any[]) {
        let titleCase = level[0].toUpperCase() + level.slice(1)
        try {
            if (this._logger[`is${titleCase}Enabled`]()) {

                this.maybeLogWithThrowable(level, msg, objects) ||
                    this.writeLogLine(level, this._formatLogMessage(msg, level, 6), objects);
            }
        } catch (err) {
            this._logger.error(this._formatLogMessage(err, "error", 0));
        }
    }

    maybeLogWithThrowable(level: string, msg: string|Error, objects: any) {
        if(objects.length === 1){
            let obj = objects[0];
            if((obj instanceof Error || (obj.message && obj.name && obj.stack)) && !(msg instanceof Error) && !msg.includes("{}")) { //todo: better substitution detected
                //log the basic message
                this.writeLogLine(level, msg, objects);

                //and log the exception
                this.writeLogLine(level, `${obj.name} : ${obj.message}\n${obj.stack}`);
                return true;
            }
        }
        return false;
    }

    writeLogLine(level: string, message: string|Error, objects: any[] = []) {
        let formatted = MessageFormatter.arrayFormat(message, objects).getMessage();

        this._logger[level](formatted);
    }

    /**
     * The listener function attached to this logger.
     */
    get listener() { return this._listener }

    /**
     * The name of this logger
     */
    get name() { return this._name }
}

/**
 * Creates a logger.
 * @see Logger
 * @name default
 * @param {string} name the name of the logger
 * @param {*} [_listener] an optional listener to process log events.
 * @memberof log
 */
export default function (_name) {
    return new Logger(_name);
}
