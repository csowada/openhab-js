"use strict";
/**
 * OSGi module.
 * This module provides access to OSGi services.
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregisterService = exports.registerPermanentService = exports.registerService = exports.findServices = exports.getService = void 0;
const log_1 = __importDefault(require("./log"));
const bundleContext = require('@runtime/osgi').bundleContext;
const lifecycle = require('@runtime/osgi').lifecycle;
const Hashtable = Java.type('java.util.Hashtable');
const log = (0, log_1.default)('osgi');
/**
 * Map of interface names to sets of services registered (by this module)
 */
const registeredServices = {};
const jsObjectToHashtable = function (obj) {
    if (obj === null) {
        return null;
    }
    let rv = new Hashtable();
    for (let k in obj) {
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
const lookupService = function (classOrName) {
    var bc = bundleContext;
    if (bundleContext === undefined) {
        log.warn("bundleContext is undefined");
        var FrameworkUtil = Java.type("org.osgi.framework.FrameworkUtil");
        var _bundle = FrameworkUtil.getBundle(scriptExtension.class);
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
const getService = function (...classOrNames) {
    let rv = null;
    for (let classOrName of classOrNames) {
        try {
            rv = lookupService(classOrName);
        }
        catch (e) {
            log.warn(`Failed to get service ${classOrName}: {}`, e);
        }
        if (typeof rv !== 'undefined' && rv !== null) {
            return rv;
        }
    }
    throw Error(`Failed to get any services of type(s): ${classOrNames}`);
};
exports.getService = getService;
/**
 * Finds services registered with OSGi.
 *
 * @param {String} className the class of the service to get
 * @param {*} [filter] an optional filter used to filter the returned services
 * @returns {Object[]} any instances of the service that can be found
 * @memberOf osgi
 */
const findServices = function (className, filter) {
    if (bundleContext !== null) {
        var refs = bundleContext.getAllServiceReferences(className, filter);
        return refs != null ? [...refs].map(ref => bundleContext.getService(ref)) : [];
    }
};
exports.findServices = findServices;
const registerService = function (service, ...interfaceNames) {
    lifecycle.addDisposeHook(() => (0, exports.unregisterService)(service));
    (0, exports.registerPermanentService)(service, interfaceNames, null);
};
exports.registerService = registerService;
const registerPermanentService = function (service, interfaceNames, properties = null) {
    let registration = bundleContext.registerService(interfaceNames, service, jsObjectToHashtable(properties));
    for (let interfaceName of interfaceNames) {
        if (typeof registeredServices[interfaceName] === 'undefined') {
            registeredServices[interfaceName] = new Set();
        }
        registeredServices[interfaceName].add({ service, registration });
        log.debug("Registered service {} of as {}", service, interfaceName);
    }
    return registration;
};
exports.registerPermanentService = registerPermanentService;
const unregisterService = function (serviceToUnregister) {
    log.debug("Unregistering service {}", serviceToUnregister);
    for (let interfaceName in registeredServices) {
        let servicesForInterface = registeredServices[interfaceName];
        servicesForInterface.forEach(({ service, registration }) => {
            if (service == serviceToUnregister) {
                servicesForInterface.delete({ service, registration });
                registration.unregister();
                log.debug("Unregistered service: {}", service);
            }
        });
    }
};
exports.unregisterService = unregisterService;
