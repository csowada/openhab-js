var assert = require('assert');
var proxyquire = require('proxyquire').noCallThru();
describe('Conditionals', function () {
    var createLogMock = function () {
        var messages = [];
        return {
            messages: messages,
            mock: function (name) {
                return {
                    error: function (a) { return messages.push(a); }
                };
            }
        };
    };
    function itemMock(nameToState) {
        return {
            getItem: function (name) {
                return nameToState(name);
            }
        };
    }
    describe('Function Conditions', function () {
        it('Should pass when the function returns true', function () {
            var condition_conf = proxyquire('../rules/condition-builder', {
                '../log': createLogMock().mock,
                '../items': itemMock(),
                './operation-builder': {}
            });
            var conf = new condition_conf.FunctionConditionConf(function () { return true; });
            assert.strictEqual(conf.check(), true);
        });
        it('Should not pass when the function returns false', function () {
            var condition_conf = proxyquire('../rules/condition-builder', {
                '../log': createLogMock().mock,
                '../items': itemMock(),
                './operation-builder': {}
            });
            var conf = new condition_conf.FunctionConditionConf(function () { return false; });
            assert.strictEqual(conf.check(), false);
        });
    });
    describe('Item Conditions', function () {
        it('Should pass when the item state matches', function () {
            var condition_conf = proxyquire('../rules/condition-builder', {
                '../log': createLogMock().mock,
                '../items': itemMock(function (name) {
                    assert.strictEqual(name, 'myitem');
                    return {
                        state: "mystate"
                    };
                }),
                './operation-builder': {}
            });
            var conf = new condition_conf.ItemStateConditionConf('myitem');
            assert.strictEqual(conf.is('mystate').check(), true);
        });
        it('Should not pass when the item state doesnt matches', function () {
            var condition_conf = proxyquire('../rules/condition-builder', {
                '../log': createLogMock().mock,
                '../items': itemMock(function (name) {
                    assert.strictEqual(name, 'myitem');
                    return {
                        state: "mystate2"
                    };
                }),
                './operation-builder': {}
            });
            var conf = new condition_conf.ItemStateConditionConf('myitem');
            assert.strictEqual(conf.is('mystate').check(), false);
        });
        it('Should not pass when the item doesnt exist', function () {
            var condition_conf = proxyquire('../rules/condition-builder', {
                '../log': createLogMock().mock,
                '../items': itemMock(function (name) {
                    assert.strictEqual(name, 'myitem');
                    return undefined;
                }),
                './operation-builder': {}
            });
            var conf = new condition_conf.ItemStateConditionConf('myitem');
            assert.throws(function () { return conf.is('mystate').check(); }, { message: /myitem/ });
        });
        it('Should not pass when the item is null', function () {
            var condition_conf = proxyquire('../rules/condition-builder', {
                '../log': createLogMock().mock,
                '../items': itemMock(function (name) {
                    assert.strictEqual(name, 'myitem');
                    return null;
                }),
                './operation-builder': {}
            });
            var conf = new condition_conf.ItemStateConditionConf('myitem');
            assert.throws(function () { return conf.is('mystate').check(); }, { message: /myitem/ });
        });
    });
});
