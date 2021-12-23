/**
 * @typedef { import("./operation-builder").OperationBuilder } OperationBuilder
 * @typedef { import("./condition-builder").ConditionBuilder } ConditionBuilder
 */
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var triggers = require('../triggers');
var operations = require('./operation-builder');
var conditions = require('./condition-builder');
/**
 * Builder for rule Triggers
 *
 * @hideconstructor
 */
var TriggerBuilder = /** @class */ (function () {
    function TriggerBuilder(builder) {
        this.builder = builder;
    }
    TriggerBuilder.prototype._setTrigger = function (trigger) {
        this.currentTigger = trigger;
        return this.currentTigger;
    };
    TriggerBuilder.prototype._or = function () {
        this.builder.addTrigger(this.currentTigger);
        return this;
    };
    TriggerBuilder.prototype._then = function (fn) {
        this._or();
        return new operations.OperationBuilder(this.builder, fn);
    };
    TriggerBuilder.prototype._if = function (fn) {
        this._or();
        return new conditions.ConditionBuilder(this.builder, fn);
    };
    /**
     * Specifies a channel event as a source for the rule to fire.
     *
     * @param {String} channelName the name of the channel
     * @returns {ChannelTriggerConfig} the trigger config
     */
    TriggerBuilder.prototype.channel = function (s) {
        return this._setTrigger(new ChannelTriggerConfig(s, this));
    };
    /**
     * Specifies a cron schedule for the rule to fire.
     *
     * @param {String} cronExpression the cron expression
     * @returns {CronTriggerConfig} the trigger config
     */
    TriggerBuilder.prototype.cron = function (s) {
        return this._setTrigger(new CronTriggerConfig(s, this));
    };
    /**
     * Specifies an item as the source of changes to trigger a rule.
     *
     * @param {String} itemName the name of the item
     * @returns {ItemTriggerConfig} the trigger config
     */
    TriggerBuilder.prototype.item = function (s) {
        return this._setTrigger(new ItemTriggerConfig(s, false, this));
    };
    /**
     * Specifies an group member as the source of changes to trigger a rule.
     *
     * @param {String} groupName the name of the group
     * @returns {ItemTriggerConfig} the trigger config
     */
    TriggerBuilder.prototype.memberOf = function (s) {
        return this._setTrigger(new ItemTriggerConfig(s, true, this));
    };
    /**
     * Specifies a Thing status event as a source for the rule to fire.
     *
     * @param {String} thingUID the UID of the Thing
     * @returns {ThingTriggerConfig} the trigger config
     */
    TriggerBuilder.prototype.thing = function (s) {
        return this._setTrigger(new ThingTriggerConfig(s, this));
    };
    /**
     * Specifies a system event as a source for the rule to fire.
     *
     * @memberof TriggerBuilder
     * @returns {SystemTriggerConfig} the trigger config
     */
    TriggerBuilder.prototype.system = function () {
        return this._setTrigger(new SystemTriggerConfig(this));
    };
    return TriggerBuilder;
}());
/**
 * {RuleBuilder} RuleBuilder triggers
 * @memberof TriggerBuilder
 */
var TriggerConf = /** @class */ (function () {
    function TriggerConf(triggerBuilder) {
        this.triggerBuilder = triggerBuilder;
    }
    /**
     * Add an additional Trigger
     *
     * @returns {TriggerBuilder}
     */
    TriggerConf.prototype.or = function () {
        return this.triggerBuilder._or();
    };
    /**
     * Move to the rule operations
     *
     * @param {*} function the optional function to execute
     * @returns {OperationBuilder}
     */
    TriggerConf.prototype.then = function (fn) {
        return this.triggerBuilder._then(fn);
    };
    /**
     * Move to the rule condition
     *
     * @param {*} function the optional function to execute
     * @returns {ConditionBuilder}
     */
    TriggerConf.prototype["if"] = function (fn) {
        return this.triggerBuilder._if(fn);
    };
    return TriggerConf;
}());
/**
 * @memberof TriggerBuilder
 * @extends TriggerConf
 * @hideconstructor
 */
var ChannelTriggerConfig = /** @class */ (function (_super) {
    __extends(ChannelTriggerConfig, _super);
    function ChannelTriggerConfig(channelName, triggerBuilder) {
        var _this = _super.call(this, triggerBuilder) || this;
        _this.channelName = channelName;
        _this._toOHTriggers = function () { return [triggers.ChannelEventTrigger(_this.channelName, _this.eventName)]; };
        return _this;
    }
    ChannelTriggerConfig.prototype.describe = function (compact) {
        if (compact) {
            return this.channelName + (this.eventName ? ":".concat(this.eventName) : "");
        }
        else {
            return "matches channel \"".concat(this.channelName, "\"") + (this.eventName ? "for event ".concat(this.eventName) : "");
        }
    };
    /**
     * trigger a specific event name
     *
     * @param {string} eventName
     * @returns {ChannelTriggerConfig}
     */
    ChannelTriggerConfig.prototype.to = function (eventName) {
        return this.triggered(eventName);
    };
    /**
     * trigger a specific event name
     *
     * @param {string} eventName
     * @returns {ChannelTriggerConfig}
     */
    ChannelTriggerConfig.prototype.triggered = function (eventName) {
        this.eventName = eventName || "";
        return this;
    };
    ChannelTriggerConfig.prototype._complete = function () {
        return typeof (this.eventName) !== 'undefined';
    };
    return ChannelTriggerConfig;
}(TriggerConf));
;
/**
 * Cron based trigger
 *
 * @memberof TriggerBuilder
 * @extends TriggerConf
 * @hideconstructor
 */
var CronTriggerConfig = /** @class */ (function (_super) {
    __extends(CronTriggerConfig, _super);
    function CronTriggerConfig(timeStr, triggerBuilder) {
        var _this = _super.call(this, triggerBuilder) || this;
        _this.timeStr = timeStr;
        _this._complete = function () { return true; };
        _this._toOHTriggers = function () { return [triggers.GenericCronTrigger(_this.timeStr)]; };
        _this.describe = function (compact) { return compact ? "cron_".concat(_this.timeStr) : "matches cron \"".concat(_this.timeStr, "\""); };
        return _this;
    }
    return CronTriggerConfig;
}(TriggerConf));
;
/**
 * item based trigger
 *
 * @memberof TriggerBuilder
 * @extends TriggerConf
 * @hideconstructor
 */
var ItemTriggerConfig = /** @class */ (function (_super) {
    __extends(ItemTriggerConfig, _super);
    function ItemTriggerConfig(itemOrName, isGroup, triggerBuilder) {
        var _this = _super.call(this, triggerBuilder) || this;
        _this.type = isGroup ? 'memberOf' : 'item';
        if (typeof itemOrName !== 'string') {
            itemOrName = itemOrName.name;
        }
        _this.item_name = itemOrName;
        _this.describe = function () { return "".concat(_this.type, " ").concat(_this.item_name, " changed"); };
        _this.of = _this.to; //receivedCommand().of(..)
        return _this;
    }
    /**
     * Item to
     *
     * @param {*} value this item should be triggered to
     * @returns {ItemTriggerConfig}
     */
    ItemTriggerConfig.prototype.to = function (value) {
        this.to_value = value;
        return this;
    };
    /**
     * Item from
     * @param {*} value this items should be triggered from
     * @returns {ItemTriggerConfig}
     */
    ItemTriggerConfig.prototype.from = function (value) {
        if (this.op_type != 'changed') {
            throw ".from(..) only available for .changed()";
        }
        this.from_value = value;
        return this;
    };
    /**
     * item changed to OFF
     *
     * @returns {ItemTriggerConfig}
     */
    ItemTriggerConfig.prototype.toOff = function () {
        return this.to('OFF');
    };
    /**
     * item changed to ON
     *
     * @returns {ItemTriggerConfig}
     */
    ItemTriggerConfig.prototype.toOn = function () {
        return this.to('ON');
    };
    /**
     * item recieved command
     *
     * @returns {ItemTriggerConfig}
     */
    ItemTriggerConfig.prototype.receivedCommand = function () {
        this.op_type = 'receivedCommand';
        return this;
    };
    /**
     * item recieved update
     *
     * @returns {ItemTriggerConfig}
     */
    ItemTriggerConfig.prototype.receivedUpdate = function () {
        this.op_type = 'receivedUpdate';
        return this;
    };
    /**
     * item changed state
     *
     * @returns {ItemTriggerConfig}
     */
    ItemTriggerConfig.prototype.changed = function () {
        this.op_type = 'changed';
        return this;
    };
    /**
     * For timespan
     * @param {*} timespan
     * @returns {ItemTriggerConfig}
     */
    ItemTriggerConfig.prototype["for"] = function (timespan) {
        return new operations.TimingItemStateOperation(this, timespan);
    };
    ItemTriggerConfig.prototype._complete = function () {
        return typeof (this.op_type) !== 'undefined';
    };
    ItemTriggerConfig.prototype.describe = function (compact) {
        switch (this.op_type) {
            case "changed":
                if (compact) {
                    var transition = this.from_value + '=>' || '';
                    if (this.to_value) {
                        transition = (transition || '=>') + this.to_value;
                    }
                    return "".concat(this.item_name, " ").concat(transition, "/\u0394");
                }
                else {
                    var transition = 'changed';
                    if (this.from_value) {
                        transition += " from ".concat(this.from_value);
                    }
                    if (this.to_value) {
                        transition += " to ".concat(this.to_value);
                    }
                    return "".concat(this.item_name, " ").concat(transition);
                }
            case "receivedCommand":
                return compact ? "".concat(this.item_name, "/\u2318") : "".concat(this.type, " ").concat(this.item_name, " received command");
            case "receivedUpdate":
                return compact ? "".concat(this.item_name, "/\u21BB") : "".concat(this.type, " ").concat(this.item_name, " received update");
            default:
                throw error("Unknown operation type: " + this.op_type);
        }
    };
    ItemTriggerConfig.prototype._toOHTriggers = function () {
        if (this.type === "memberOf") {
            switch (this.op_type) {
                case "changed":
                    return [triggers.GroupStateChangeTrigger(this.item_name, this.from_value, this.to_value)];
                case 'receivedCommand':
                    return [triggers.GroupCommandTrigger(this.item_name, this.to_value)];
                case 'receivedUpdate':
                    return [triggers.GroupStateUpdateTrigger(this.item_name, this.to_value)];
                default:
                    throw error("Unknown operation type: " + this.op_type);
            }
        }
        else {
            switch (this.op_type) {
                case "changed":
                    return [triggers.ItemStateChangeTrigger(this.item_name, this.from_value, this.to_value)];
                case 'receivedCommand':
                    return [triggers.ItemCommandTrigger(this.item_name, this.to_value)];
                case 'receivedUpdate':
                    return [triggers.ItemStateUpdateTrigger(this.item_name, this.to_value)];
                default:
                    throw error("Unknown operation type: " + this.op_type);
            }
        }
    };
    ItemTriggerConfig.prototype._executeHook = function () {
        var getReceivedCommand = function (args) {
            return args.receivedCommand;
        };
        if (this.op_type === 'receivedCommand') { //add the received command as 'it'
            return function (next, args) {
                var it = getReceivedCommand(args);
                return next(__assign(__assign({}, args), { it: it }));
            };
        }
        else {
            return null;
        }
    };
    return ItemTriggerConfig;
}(TriggerConf));
/**
 * Thing based trigger
 *
 * @memberof TriggerBuilder
 * @extends TriggerConf
 * @hideconstructor
 */
var ThingTriggerConfig = /** @class */ (function (_super) {
    __extends(ThingTriggerConfig, _super);
    function ThingTriggerConfig(thingUID, triggerBuilder) {
        var _this = _super.call(this, triggerBuilder) || this;
        _this.thingUID = thingUID;
        return _this;
    }
    ThingTriggerConfig.prototype._complete = function () {
        return typeof (this.op_type) !== 'undefined';
    };
    ThingTriggerConfig.prototype.describe = function (compact) {
        switch (this.op_type) {
            case "changed":
                var transition = 'changed';
                if (this.to_value) {
                    transition += " to ".concat(this.to_value);
                }
                if (this.from_value) {
                    transition += " from ".concat(this.from_value);
                }
                return "".concat(this.thingUID, " ").concat(transition);
            case "updated":
                return compact ? "".concat(this.thingUID, "/updated") : "Thing ".concat(this.thingUID, " received update");
            default:
                throw error("Unknown operation type: " + this.op_type);
        }
    };
    /**
     * thing changed
     *
     * @returns {ThingTriggerConfig}
     */
    ThingTriggerConfig.prototype.changed = function () {
        this.op_type = 'changed';
        return this;
    };
    /**
     * thing updates
     *
     * @returns {ThingTriggerConfig}
     */
    ThingTriggerConfig.prototype.updated = function () {
        this.op_type = 'updated';
        return this;
    };
    /**
     * thing status changed from
     *
     * @returns {ThingTriggerConfig}
     */
    ThingTriggerConfig.prototype.from = function (value) {
        if (this.op_type != 'changed') {
            throw ".from(..) only available for .changed()";
        }
        this.from_value = value;
        return this;
    };
    /**
     * thing status changed to
     *
     * @returns {ThingTriggerConfig}
     */
    ThingTriggerConfig.prototype.to = function (value) {
        this.to_value = value;
        return this;
    };
    ThingTriggerConfig.prototype._toOHTriggers = function () {
        switch (this.op_type) {
            case "changed":
                return [triggers.ThingStatusChangeTrigger(this.thingUID, this.to_value, this.from_value)];
            case 'updated':
                return [triggers.ThingStatusUpdateTrigger(this.thingUID, this.to_value)];
            default:
                throw error("Unknown operation type: " + this.op_type);
        }
    };
    return ThingTriggerConfig;
}(TriggerConf));
;
/**
 * System based trigger
 *
 * @memberof TriggerBuilder
 * @extends TriggerConf
 * @hideconstructor
 */
var SystemTriggerConfig = /** @class */ (function (_super) {
    __extends(SystemTriggerConfig, _super);
    function SystemTriggerConfig(triggerBuilder) {
        var _this = _super.call(this, triggerBuilder) || this;
        _this._toOHTriggers = function () { return [triggers.SystemStartlevelTrigger(_this.level)]; };
        _this.describe = function (compact) { return compact ? "system:".concat(_this.level) : "system level \"".concat(_this.level, "\""); };
        return _this;
    }
    SystemTriggerConfig.prototype._complete = function () {
        return typeof (this.level) !== 'undefined';
    };
    /**
     * System trigger
     *
     * @returns {SystemTriggerConfig}
     */
    SystemTriggerConfig.prototype.rulesLoaded = function () {
        return this.startLevel(40);
    };
    /**
    * System trigger
    *
    * @returns {SystemTriggerConfig}
    */
    SystemTriggerConfig.prototype.ruleEngineStarted = function () {
        return this.startLevel(50);
    };
    /**
    * System trigger
    *
    * @returns {SystemTriggerConfig}
    */
    SystemTriggerConfig.prototype.userInterfacesStarted = function () {
        return this.startLevel(70);
    };
    /**
    * System trigger
    *
    * @returns {SystemTriggerConfig}
    */
    SystemTriggerConfig.prototype.thingsInitialized = function () {
        return this.startLevel(80);
    };
    /**
    * System trigger
    *
    * @returns {SystemTriggerConfig}
    */
    SystemTriggerConfig.prototype.startupComplete = function () {
        return this.startLevel(100);
    };
    /**
    * System trigger
    *
    * @returns {SystemTriggerConfig}
    */
    SystemTriggerConfig.prototype.startLevel = function (level) {
        if (typeof (this.level) !== 'undefined') {
            throw Error("Level already set");
        }
        this.level = level;
        return this;
    };
    return SystemTriggerConfig;
}(TriggerConf));
;
module.exports = {
    CronTriggerConfig: CronTriggerConfig,
    ChannelTriggerConfig: ChannelTriggerConfig,
    ItemTriggerConfig: ItemTriggerConfig,
    ThingTriggerConfig: ThingTriggerConfig,
    SystemTriggerConfig: SystemTriggerConfig,
    TriggerBuilder: TriggerBuilder
};
