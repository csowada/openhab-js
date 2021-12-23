var assert = require('assert');
var proxyquire = require('proxyquire').noCallThru();
describe('Triggers', function () {
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
    function triggersMock(lookup) {
        return function (x) { return lookup(x); };
    }
    describe('Item Triggers', function () {
        it('Should create correct item trigger', function (done) {
            var trigger_conf = proxyquire('../rules/trigger-builder', {
                '../log': createLogMock().mock,
                '../triggers': {
                    ItemStateChangeTrigger: function (name, from, to) {
                        assert.strictEqual(name, 'item1');
                        assert.strictEqual(from, undefined);
                        assert.strictEqual(to, 'state1');
                        done();
                    }
                },
                './operation-builder': {},
                './condition-builder': {}
            });
            new trigger_conf.ItemTriggerConfig('item1').changed().to('state1')._toOHTriggers();
        });
    });
});
