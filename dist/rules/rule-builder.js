/**
 * @typedef { import("./trigger-builder").TriggerBuilder } TriggerBuilder
 */
var items = require('../items');
var rules = require('./rules');
var triggers = require('./trigger-builder');
var conditions = require('./condition-builder');
/**
 * Creates rules in a fluent style.
 * @param {boolean} toggleable if this builder is toggleable
 */
var RuleBuilder = /** @class */ (function () {
    function RuleBuilder(toggleable) {
        this._triggerConfs = [];
        this.toggleable = toggleable || false;
    }
    /**
     * Specifies when the rule should occur. Will create a standard rule.
     *
     * @returns {TriggerBuilder} rule builder
     */
    RuleBuilder.prototype.when = function () {
        return new triggers.TriggerBuilder(this);
    };
    RuleBuilder.prototype.addTrigger = function (triggerConf) {
        if (!triggerConf._complete()) {
            throw Error("Trigger is not complete!");
        }
        this._triggerConfs.push(triggerConf);
        return this;
    };
    RuleBuilder.prototype.setCondition = function (condition) {
        if (typeof condition === 'function') {
            condition = new conditions.FunctionConditionConf(condition);
        }
        this.condition = condition;
        return this;
    };
    RuleBuilder.prototype.setOperation = function (operation, optionalRuleGroup) {
        var _this = this;
        if (typeof operation === 'function') {
            var operationFunction_1 = operation;
            operation = {
                _complete: function () { return true; },
                _run: function (x) { return operationFunction_1(x); },
                describe: function () { return "custom function"; }
            };
        }
        else {
            //first check complete
            if (!operation._complete()) {
                throw Error("Operation is not complete!");
            }
        }
        this.operation = operation;
        this.optionalRuleGroup = optionalRuleGroup;
        var generatedTriggers = this._triggerConfs.flatMap(function (x) { return x._toOHTriggers(); });
        var ruleClass = this.toggleable ? rules.SwitchableJSRule : rules.JSRule;
        var fnToExecute = operation._run.bind(operation); //bind the function to it's instance
        var _loop_1 = function (triggerConf) {
            var next = fnToExecute;
            if (typeof triggerConf._executeHook === 'function') {
                var maybeHook = triggerConf._executeHook();
                if (maybeHook) {
                    var hook_1 = maybeHook.bind(triggerConf); //bind the function to it's instance
                    fnToExecute = function (args) {
                        return hook_1(next, args);
                    };
                }
            }
        };
        //chain (of responsibility for) the execute hooks
        for (var _i = 0, _a = this._triggerConfs; _i < _a.length; _i++) {
            var triggerConf = _a[_i];
            _loop_1(triggerConf);
        }
        if (typeof this.condition !== 'undefined') { //if conditional, check it first
            var fnWithoutCheck_1 = fnToExecute;
            fnToExecute = function (x) { return _this.condition.check(x) && fnWithoutCheck_1(x); };
        }
        return ruleClass({
            name: this.name || items.safeItemName(this.describe(true)),
            description: this.description || this.describe(true),
            triggers: generatedTriggers,
            ruleGroup: optionalRuleGroup,
            execute: function (data) {
                fnToExecute(data);
            }
        });
    };
    RuleBuilder.prototype.describe = function (compact) {
        return (compact ? "" : "When ") +
            this._triggerConfs.map(function (t) { return t.describe(compact); }).join(" or ") +
            (compact ? "→" : " then ") +
            this.operation.describe(compact) +
            ((!compact && this.optionalRuleGroup) ? " (in group ".concat(this.optionalRuleGroup, ")") : "");
    };
    return RuleBuilder;
}());
/**
* Create a new {RuleBuilder} chain for easily creating rules.
*
* @example <caption>Basic rule</caption>
* rules.when().item("F1_Light").changed().then().send("changed").toItem("F2_Light").build("My Rule", "My First Rule");
*
* @example <caption>Rule with function</caption>
* rules.when().item("F1_light").changed().to("100").then(event => {
*   console.log(event)
*  }).build("Test Rule", "My Test Rule");
*
* @memberof rules
* @param {boolean} withToggle rule can be toggled on or off (optional)
* @returns {TriggerBuilder} rule builder
*/
var when = function (withToggle) { return new RuleBuilder(withToggle).when(); };
module.exports = {
    when: when
};
// export classes to create clean d.ts file with TypeScript
module.exports.RuleBuilder = RuleBuilder;
