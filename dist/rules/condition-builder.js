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
var OperationBuilder = require('./operation-builder').OperationBuilder;
var getItem = require('../items').getItem;
/**
 * Condition that wraps a function to determine whether if passes
 *
 * @hideconstructor
 */
var ConditionBuilder = /** @class */ (function () {
    function ConditionBuilder(builder, fn) {
        this.builder = builder;
        this.fn = fn;
        if (fn) {
            this.builder.setCondition(new FunctionConditionConf(fn));
        }
    }
    ConditionBuilder.prototype._then = function (condition) {
        this.builder.setCondition(condition);
        return new OperationBuilder(this.builder, fn);
    };
    /**
     * Move to the rule operations
     *
     * @param {*} function the optional function to execute
     * @returns {OperationBuilder}
     */
    ConditionBuilder.prototype.then = function (fn) {
        if (!this.fn) {
            throw new Error("'then' can only be called when 'if' is passed a function");
        }
        return new OperationBuilder(this.builder, fn);
    };
    /**
    * Condition of an item in determining whether to process rule.
    *
    * @memberof ConditionBuilder
    * @param {String} itemName the name of the item to assess the state
    * @returns {ItemStateConditionConf} the operation config
    */
    ConditionBuilder.prototype.stateOfItem = function (s) {
        this.condition = new conditions.ItemStateConditionConf(s);
        return this.condition;
    };
    return ConditionBuilder;
}());
/**
 * {RuleBuilder} RuleBuilder conditions
 * @memberof ConditionBuilder
 */
var ConditionConf = /** @class */ (function () {
    function ConditionConf(conditionBuilder) {
        this.conditionBuilder = conditionBuilder;
    }
    /**
     *
     * @param {*} function an optional function
     * @returns ConditionBuilder
     */
    ConditionConf.prototype.then = function (fn) {
        return this.conditionBuilder._then(fn);
    };
    return ConditionConf;
}());
/**
 * Condition that wraps a function to determine whether if passes
 *
 * @memberof ConditionBuilder
 * @extends ConditionBuilder.ConditionConf
 * @hideconstructor
 */
var FunctionConditionConf = /** @class */ (function (_super) {
    __extends(FunctionConditionConf, _super);
    /**
     * Creates a new function condition. Don't call directly.
     *
     * @param {*} fn callback which determines whether the condition passes
     */
    function FunctionConditionConf(fn, conditionBuilder) {
        var _this = _super.call(this, conditionBuilder) || this;
        _this.fn = fn;
        return _this;
    }
    /**
     * Checks whether the rule operations should be run
     *
     * @private
     * @param  {...any} args rule trigger arguments
     * @returns {Boolean} true only if the operations should be run
     */
    FunctionConditionConf.prototype.check = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var answer = this.fn(args);
        return answer;
    };
    return FunctionConditionConf;
}(ConditionConf));
/**
 * Condition that wraps a function to determine whether if passes
 *
 * @memberof ConditionBuilder
 * @extends ConditionBuilder.ConditionConf
 * @hideconstructor
 */
var ItemStateConditionConf = /** @class */ (function (_super) {
    __extends(ItemStateConditionConf, _super);
    function ItemStateConditionConf(item_name, conditionBuilder) {
        var _this = _super.call(this, conditionBuilder) || this;
        _this.item_name = item_name;
        return _this;
    }
    /**
     * Checks if item state is equal to vlaue
     * @param {*} value
     * @returns {this}
     */
    ItemStateConditionConf.prototype.is = function (value) {
        this.values = [value];
        return this;
    };
    /**
     * Checks if item state matches any array of values
     * @param  {...any} values
     * @returns {this}
     */
    ItemStateConditionConf.prototype["in"] = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.values = values;
        return this;
    };
    ItemStateConditionConf.prototype.check = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var item = getItem(this.item_name);
        if (typeof item === 'undefined' || item === null) {
            throw Error("Cannot find item: ".concat(this.item_name));
        }
        return this.values.includes(item.state);
    };
    return ItemStateConditionConf;
}(ConditionConf));
module.exports = {
    FunctionConditionConf: FunctionConditionConf,
    ItemStateConditionConf: ItemStateConditionConf,
    ConditionBuilder: ConditionBuilder
};
