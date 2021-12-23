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
 * OSGi module.
 * This module provides access to OSGi services.
 *
 */
var log = require('./log')('osgi');
var bundleContext = require('@runtime/osgi').bundleContext;
var lifecycle = require('@runtime/osgi').lifecycle;
var Hashtable = Java.type('java.util.Hashtable');
/**
 * Map of interface names to sets of services registered (by this module)
 */
var registeredServices = {};
var jsObjectToHashtable = function (obj) {
    if (obj === null) {
        return null;
    }
    var rv = new Hashtable();
    for (var k in obj) {
        rv.put(k, obj[k]);
    }
    return rv;
};
/**
 * Gets a service registered with OSGi.
 *
 * @private
 * @param {String|HostClass} classOrName the class of the service to get
 * @returns an instance of the service, or null if it cannot be found
 * @memberOf osgi
 */
var lookupService = function (classOrName) {
    var bc = bundleContext;
    if (bundleContext === undefined) {
        log.warn("bundleContext is undefined");
        var FrameworkUtil = Java.type("org.osgi.framework.FrameworkUtil");
        var _bundle = FrameworkUtil.getBundle(scriptExtension["class"]);
        bc = (_bundle !== null) ? _bundle.getBundleContext() : null;
    }
    if (bc !== null) {
        var classname = (typeof classOrName === "object") ? classOrName.getName() : classOrName;
        var ref = bc.getServiceReference(classname);
        return (ref !== null) ? bc.getService(ref) : null;
    }
};
/**
 * Gets a service registered with OSGi. Allows providing multiple classes/names to try for lookup.
 *
 * @param {Array<String|HostClass>} classOrNames the class of the service to get
 *
 * @returns an instance of the service, or null if it cannot be found
 * @throws {Error} if no services of the requested type(s) can be found
 * @memberOf osgi
 */
var getService = function () {
    var classOrNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classOrNames[_i] = arguments[_i];
    }
    var rv = null;
    for (var _a = 0, classOrNames_1 = classOrNames; _a < classOrNames_1.length; _a++) {
        var classOrName = classOrNames_1[_a];
        try {
            rv = lookupService(classOrName);
        }
        catch (e) {
            log.warn("Failed to get service ".concat(classOrName, ": {}"), e);
        }
        if (typeof rv !== 'undefined' && rv !== null) {
            return rv;
        }
    }
    throw Error("Failed to get any services of type(s): ".concat(classOrNames));
};
/**
 * Finds services registered with OSGi.
 *
 * @param {String} className the class of the service to get
 * @param {*} [filter] an optional filter used to filter the returned services
 * @returns {Object[]} any instances of the service that can be found
 * @memberOf osgi
 */
var findServices = function (className, filter) {
    if (bundleContext !== null) {
        var refs = bundleContext.getAllServiceReferences(className, filter);
        return refs != null ? __spreadArray([], refs, true).map(function (ref) { return bundleContext.getService(ref); }) : [];
    }
};
var registerService = function (service) {
    var interfaceNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interfaceNames[_i - 1] = arguments[_i];
    }
    lifecycle.addDisposeHook(function () { return unregisterService(service); });
    registerPermanentService(service, interfaceNames, null);
};
var registerPermanentService = function (service, interfaceNames, properties) {
    if (properties === void 0) { properties = null; }
    var registration = bundleContext.registerService(interfaceNames, service, jsObjectToHashtable(properties));
    for (var _i = 0, interfaceNames_1 = interfaceNames; _i < interfaceNames_1.length; _i++) {
        var interfaceName = interfaceNames_1[_i];
        if (typeof registeredServices[interfaceName] === 'undefined') {
            registeredServices[interfaceName] = new Set();
        }
        registeredServices[interfaceName].add({ service: service, registration: registration });
        log.debug("Registered service {} of as {}", service, interfaceName);
    }
    return registration;
};
var unregisterService = function (serviceToUnregister) {
    log.debug("Unregistering service {}", serviceToUnregister);
    var _loop_1 = function (interfaceName) {
        var servicesForInterface = registeredServices[interfaceName];
        servicesForInterface.forEach(function (_a) {
            var service = _a.service, registration = _a.registration;
            if (service == serviceToUnregister) {
                servicesForInterface["delete"]({ service: service, registration: registration });
                registration.unregister();
                log.debug("Unregistered service: {}", service);
            }
        });
    };
    for (var interfaceName in registeredServices) {
        _loop_1(interfaceName);
    }
};
module.exports = {
    getService: getService,
    findServices: findServices,
    registerService: registerService,
    registerPermanentService: registerPermanentService,
    unregisterService: unregisterService
};
