var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var parse_duration = require('parse-duration');
var getItem = require('../items').getItem;
/**
 * Operation to execute as part of a rule
 * @hideconstructor
 */
var OperationBuilder = /** @class */ (function () {
    function OperationBuilder(builder, fn) {
        this.builder = builder;
        this.fn = fn;
    }
    OperationBuilder.prototype._finishErr = function () {
        if (this.fn) {
            throw new Error("rule already completed");
        }
    };
    OperationBuilder.prototype._then = function (operation, group, name, description) {
        this.builder.name = name;
        this.builder.description = description;
        this.builder.setOperation(operation, group);
    };
    /**
     * Build this rule
     *
     * @param {string} name of the rules
     * @param {string} description of the rule
     */
    OperationBuilder.prototype.build = function (name, description) {
        if (!this.fn) {
            throw new Error("Cannot call build without function");
        }
        this._then(this.fn, this.group, name, description);
    };
    /**
     * Specify the rule group for this rule
     *
     * @param {string} group the group this rule belongs to.
     * @returns {OperationBuilder} this
     */
    OperationBuilder.prototype.inGroup = function (group) {
        this.group = group;
        return this;
    };
    /**
    * Specifies that a command should be sent as a result of this rule firing.
    *
    * @param {String} command the command to send
    * @returns {SendCommandOrUpdateOperation} the operation
    */
    OperationBuilder.prototype.send = function (c) {
        this._finishErr();
        return new SendCommandOrUpdateOperation(this, c);
    };
    ;
    /**
     * Specifies that an update should be posted as a result of this rule firing.
     *
     * @param {String} update the update to send
     * @returns {SendCommandOrUpdateOperation} the operation
     */
    OperationBuilder.prototype.postUpdate = function (c) {
        this._finishErr();
        return new SendCommandOrUpdateOperation(this, c, false);
    };
    ;
    /**
     * Specifies the a command 'ON' should be sent as a result of this rule firing.
     *
     * @returns {SendCommandOrUpdateOperation} the operation
     */
    OperationBuilder.prototype.sendOn = function () {
        this._finishErr();
        return new SendCommandOrUpdateOperation(this, "ON");
    };
    ;
    /**
     * Specifies the a command 'OFF' should be sent as a result of this rule firing.
     *
     * @returns {SendCommandOrUpdateOperation} the operation
     */
    OperationBuilder.prototype.sendOff = function () {
        this._finishErr();
        return new SendCommandOrUpdateOperation(this, "OFF");
    };
    ;
    /**
     * Specifies a command should be sent to toggle the state of the target object
     * as a result of this rule firing.
     *
     * @returns {ToggleOperation} the operation
     */
    OperationBuilder.prototype.sendToggle = function () {
        this._finishErr();
        return new ToggleOperation(this);
    };
    ;
    /**
     * Specifies a command should be forwarded to the state of the target object
     * as a result of this rule firing. This relies on the trigger being the result
     * of a command itself.
     *
     * @returns {SendCommandOrUpdateOperation} the operation
     */
    OperationBuilder.prototype.sendIt = function () {
        this._finishErr();
        return new SendCommandOrUpdateOperation(this, function (args) { return args.it.toString(); }, true, "it");
    };
    ;
    /**
     * Specifies a command state should be posted to the target object
     * as a result of this rule firing. This relies on the trigger being the result
     * of a command itself.
     *
     * @returns {SendCommandOrUpdateOperation} the operation
     */
    OperationBuilder.prototype.postIt = function () {
        this._finishErr();
        return new SendCommandOrUpdateOperation(this, function (args) { return args.it.toString(); }, false, "it");
    };
    ;
    /**
     * Copies the state from one item to another. Can be used to proxy item state. State is updated, not
     * sent as a command.
     *
     * @returns {CopyStateOperation} the operation config
     */
    OperationBuilder.prototype.copyState = function () {
        this._finishErr();
        return new CopyStateOperation(this, false);
    };
    ;
    /**
     * Sends the state from one item to another. Can be used to proxy item state. State is
     * sent as a command.
     *
     * @returns {CopyStateOperation} the operation config
     */
    OperationBuilder.prototype.copyAndSendState = function () {
        this._finishErr();
        return new CopyStateOperation(this, true);
    };
    ;
    return OperationBuilder;
}());
/**
 * {RuleBuilder} RuleBuilder triggers
 * @memberof OperationBuilder
 */
var OperationConfig = /** @class */ (function () {
    function OperationConfig(operationBuilder) {
        this.operationBuilder = operationBuilder;
    }
    /**
    * Specify the rule group for this rule
    *
    * @param {string} group the group this rule belongs to.
    * @returns {OperationBuilder} this
    */
    OperationConfig.prototype.inGroup = function (group) {
        this.group = group;
        return this;
    };
    /**
     * Build this rule
     *
     * @param {string} name of the rules
     * @param {string} description of the rule
     */
    OperationConfig.prototype.build = function (name, description) {
        this.operationBuilder._then(this, this.group, name, description);
    };
    return OperationConfig;
}());
/**
 * Copies state from one item to another item
 *
 * @memberof OperationBuilder
 * @extends OperationConfig
 * @hideconstructor
 */
var CopyStateOperation = /** @class */ (function (_super) {
    __extends(CopyStateOperation, _super);
    /**
     * Creates a new operation. Don't use constructor directly.
     *
     * @param {Boolean} send whether to send (or post update) the state
     * @hideconstructor
     */
    function CopyStateOperation(operationBuilder, send) {
        var _this = _super.call(this, operationBuilder) || this;
        _this.send = send;
        return _this;
    }
    /**
     * Sets the item to copy the state from
     *
     * @param {String} item_name the item to copy state from
     * @returns {CopyStateOperation} this
     */
    CopyStateOperation.prototype.fromItem = function (item_name) {
        this.from_item = item_name;
        return this;
    };
    /**
     * Sets the item to copy the state to
     *
     * @param {String} item_name the item to copy state to
     * @returns {CopyStateOperation} this
     */
    CopyStateOperation.prototype.toItem = function (item_name) {
        this.to_item = item_name;
        return this;
    };
    /**
     * Appends another operation to execute when the rule fires
     *
     * @returns {CopyStateOperation} this
     */
    CopyStateOperation.prototype.and = function () {
        var next = new OperationBuilder(this.operationBuilder.builder, fn);
        this.next = next;
        return next;
    };
    /**
     * Runs the operation. Don't call directly.
     *
     * @private
     * @param {Object} args rule firing args
     */
    CopyStateOperation.prototype._run = function (args) {
        if (typeof this.from_item === 'undefined' || this.from_item === null) {
            throw Error("From item not set");
        }
        if (typeof this.to_item === 'undefined' || this.to_item === null) {
            throw Error("To item not set");
        }
        var from = getItem(this.from_item);
        if (typeof from === 'undefined' || from === null) {
            throw Error("Cannot find (from) item ".concat(this.from_item));
        }
        var to = getItem(this.to_item);
        if (typeof to === 'undefined' || to === null) {
            throw Error("Cannot find (to) item ".concat(this.to_item));
        }
        if (this.send) {
            to.sendCommand(from.state);
        }
        else {
            to.postUpdate(from.state);
        }
        if (this.next) {
            this.next.execute(args);
        }
    };
    /**
     * Checks that the operation configuration is complete. Don't call directly.
     *
     * @private
     * @returns true only if the operation is ready to run
     */
    CopyStateOperation.prototype._complete = function () {
        return this.from_item && this.to_item;
    };
    /**
     * Describes the operation.
     *
     * @private
     * @returns a description of the operation
     */
    CopyStateOperation.prototype.describe = function () {
        return "copy state from ".concat(this.from_item, " to ").concat(this.to_item);
    };
    return CopyStateOperation;
}(OperationConfig));
/**
 * Sends a command or update to an item
 *
 * @memberof OperationBuilder
 * @extends OperationConfig
 * @hideconstructor
 */
var SendCommandOrUpdateOperation = /** @class */ (function (_super) {
    __extends(SendCommandOrUpdateOperation, _super);
    function SendCommandOrUpdateOperation(operationBuilder, dataOrSupplier, isCommand, optionalDesc) {
        if (isCommand === void 0) { isCommand = true; }
        var _this = _super.call(this, operationBuilder) || this;
        _this.isCommand = isCommand;
        if (typeof dataOrSupplier === 'function') {
            _this.dataFn = dataOrSupplier;
            _this.dataDesc = optionalDesc || '[something]';
        }
        else {
            _this.dataFn = function () { return dataOrSupplier; };
            _this.dataDesc = optionalDesc || dataOrSupplier;
        }
        return _this;
    }
    /**
     * Send command to multiple items
     *
     * @param {*} itemsOrNames the items to send a command to
     * @returns {SendCommandOrUpdateOperation} this
     */
    SendCommandOrUpdateOperation.prototype.toItems = function (itemsOrNames) {
        this.toItemNames = itemsOrNames.map(function (i) { return (typeof i === 'string') ? i : i.name; });
        return this;
    };
    /**
     * Send command to an item
     *
     * @param {*} itemOrName the item to send a command to
     * @returns {SendCommandOrUpdateOperation} this
     */
    SendCommandOrUpdateOperation.prototype.toItem = function (itemOrName) {
        this.toItemNames = [(typeof itemOrName === 'string') ? itemOrName : itemOrName.name];
        return this;
    };
    /**
     * Send another command
     * @param {*} next
     * @returns {SendCommandOrUpdateOperation} this
     */
    SendCommandOrUpdateOperation.prototype.and = function (next) {
        this.next = next;
        return this;
    };
    SendCommandOrUpdateOperation.prototype._run = function (args) {
        for (var _i = 0, _a = this.toItemNames; _i < _a.length; _i++) {
            var toItemName = _a[_i];
            var item = items.getItem(toItemName);
            var data = this.dataFn(args);
            if (this.isCommand) {
                item.sendCommand(data);
            }
            else {
                item.postUpdate(data);
            }
        }
        this.next && this.next.execute(args);
    };
    SendCommandOrUpdateOperation.prototype._complete = function () {
        return (typeof this.toItemNames) !== 'undefined';
    };
    SendCommandOrUpdateOperation.prototype.describe = function (compact) {
        if (compact) {
            return this.dataDesc + (this.isCommand ? '⌘' : '↻') + this.toItemNames + (this.next ? this.next.describe() : "");
        }
        else {
            return (this.isCommand ? 'send command' : 'post update') + " ".concat(this.dataDesc, " to ").concat(this.toItemNames) + (this.next ? " and ".concat(this.next.describe()) : "");
        }
    };
    return SendCommandOrUpdateOperation;
}(OperationConfig));
/**
 * Toggles the state of an item
 *
 * @memberof OperationBuilder
 * @extends OperationConfig
 * @hideconstructor
 */
var ToggleOperation = /** @class */ (function (_super) {
    __extends(ToggleOperation, _super);
    function ToggleOperation(operationBuilder) {
        var _this = _super.call(this, operationBuilder) || this;
        _this.next = null;
        /**
         * @private
         * @param {*} itemName
         * @returns {ToggleOperation} this
         */
        _this.toItem = function (itemName) {
            this.itemName = itemName;
            return this;
        };
        /**
         * @private
         * @param {*} next
         * @returns {ToggleOperation} this
         */
        _this.and = function (next) {
            this.next = next;
            return this;
        };
        _this._run = function () { return _this.doToggle() && (_this.next && _this.next.execute()); };
        _this._complete = function () { return true; };
        _this.describe = function () { return "toggle ".concat(_this.itemName) + (_this.next ? " and ".concat(_this.next.describe()) : ""); };
        return _this;
    }
    /**
    * Toggle the state of an item
    *
    * @returns {SendCommandOrUpdateOperation} this
    */
    ToggleOperation.prototype.doToggle = function () {
        var item = items.getItem(this.itemName);
        switch (item.type) {
            case "SwitchItem": {
                var toSend = ('ON' == item.state) ? 'OFF' : 'ON';
                item.sendCommand(toSend);
                break;
            }
            case "ColorItem": {
                var toSend = ('0' != item.rawState.getBrightness().toString()) ? 'OFF' : 'ON';
                item.sendCommand(toSend);
                break;
            }
            default:
                throw error("Toggle not supported for items of type ".concat(item.type));
        }
    };
    return ToggleOperation;
}(OperationConfig));
/**
 * Timing Item state
 *
 * @memberof OperationBuilder
 * @extends OperationConfig
 * @hideconstructor
 */
var TimingItemStateOperation = /** @class */ (function (_super) {
    __extends(TimingItemStateOperation, _super);
    function TimingItemStateOperation(operationBuilder, item_changed_trigger_config, duration) {
        var _this = _super.call(this, operationBuilder) || this;
        if (typeof item_changed_trigger_config.to_value === 'undefined') {
            throw error("Must specify item state value to wait for!");
        }
        _this.item_changed_trigger_config = item_changed_trigger_config;
        _this.duration_ms = (typeof duration === 'Number' ? duration : parse_duration.parse(duration));
        _this._complete = item_changed_trigger_config._complete;
        _this.describe = function () { return item_changed_trigger_config.describe() + " for " + duration; };
        return _this;
    }
    TimingItemStateOperation.prototype._toOHTriggers = function () {
        //each time we're triggered, set a callback. 
        //If the item changes to something else, cancel the callback.
        //If the callback executes, run the operation
        //register for all changes as we need to know when it changes away
        switch (this.op_type) {
            case "changed":
                return [triggers.ChangedEventTrigger(this.item_name)];
            default:
                throw error("Unknown operation type: " + this.op_type);
        }
    };
    TimingItemStateOperation.prototype._executeHook = function (next) {
        if (items.get(this.item_changed_trigger_config.item_name).toString() === this.item_changed_trigger_config.to_value) {
            _start_wait(next);
        }
        else {
            _cancel_wait();
        }
    };
    TimingItemStateOperation.prototype._start_wait = function (next) {
        this.current_wait = setTimeout(next, this.duration_ms);
    };
    TimingItemStateOperation.prototype._cancel_wait = function () {
        if (this.current_wait) {
            cancelTimeout(this.current_wait);
        }
    };
    return TimingItemStateOperation;
}(OperationConfig));
module.exports = {
    SendCommandOrUpdateOperation: SendCommandOrUpdateOperation,
    TimingItemStateOperation: TimingItemStateOperation,
    ToggleOperation: ToggleOperation,
    CopyStateOperation: CopyStateOperation,
    OperationBuilder: OperationBuilder
};
module.exports.CopyStateOperation = CopyStateOperation;
module.exports.OperationBuilder = OperationBuilder;
module.exports.SendCommandOrUpdateOperation = SendCommandOrUpdateOperation;
module.exports.TimingItemStateOperation = TimingItemStateOperation;
module.exports.ToggleOperation = ToggleOperation;
