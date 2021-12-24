/**
 * Logger class. A named logger providing the ability to log formatted messages.
 *
 * @memberof log
 * @hideconstructor
 */
declare class Logger {
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
    constructor(_name: string, appenderProvider?: any);
    /**
     * Method to determine caller. Don't use directly.
     *
     * @private
     * @param {Object} msg the message to get caller details for
     * @param {Number} ignoreStackDepth the number of stack frames which to ignore in calculating caller
     * @returns {Error} message as an error object, with fileName, caller and optional lineNumber properties
     */
    _getCallerDetails(msg: any, ignoreStackDepth: any): any;
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
    _formatLogMessage(msg: any, levelString: string, ignoreStackDepth: number, prefix?: string): any;
    /**
     * Logs at ERROR level.
     * @see atLevel
     */
    error(msg: string | Error, ...args: any[]): void;
    /**
     * Logs at ERROR level.
     * @see atLevel
     */
    warn(msg: string | Error, ...args: any[]): void;
    /**
     * Logs at INFO level.
     * @see atLevel
     */
    info(msg: string | Error, ...args: any[]): void;
    /**
     * Logs at DEBUG level.
     * @see atLevel
     */
    debug(msg: string | Error, ...args: any[]): void;
    /**
     * Logs at TRACE level.
     * @see atLevel
     */
    trace(msg: string | Error, ...args: any[]): void;
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
    atLevel(level: string, msg: string | Error, ...objects: any[]): void;
    maybeLogWithThrowable(level: string, msg: string | Error, objects: any): boolean;
    writeLogLine(level: string, message: string | Error, objects?: any[]): void;
    /**
     * The listener function attached to this logger.
     */
    get listener(): any;
    /**
     * The name of this logger
     */
    get name(): string;
}
/**
 * Creates a logger.
 * @see Logger
 * @name default
 * @param {string} name the name of the logger
 * @param {*} [_listener] an optional listener to process log events.
 * @memberof log
 */
export default function (_name: any): Logger;
export { Logger };
