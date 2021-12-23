// rewiremock.cjs.js
var rewiremock = require('rewiremock/node');
/// settings
rewiremock.isolation();
//rewiremock.overrideEntryPoint(module); // this is important
module.exports = rewiremock;
