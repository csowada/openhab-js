/**
 * OSGi module.
 * This module provides access to OSGi services.
 *
 */
/**
 * Gets a service registered with OSGi. Allows providing multiple classes/names to try for lookup.
 *
 * @param {Array<String|HostClass>} classOrNames the class of the service to get
 *
 * @returns an instance of the service, or null if it cannot be found
 * @throws {Error} if no services of the requested type(s) can be found
 * @memberOf osgi
 */
export declare const getService: (...classOrNames: any[]) => any;
/**
 * Finds services registered with OSGi.
 *
 * @param {String} className the class of the service to get
 * @param {*} [filter] an optional filter used to filter the returned services
 * @returns {Object[]} any instances of the service that can be found
 * @memberOf osgi
 */
export declare const findServices: (className: any, filter: any) => any[];
export declare const registerService: (service: any, ...interfaceNames: any[]) => void;
export declare const registerPermanentService: (service: any, interfaceNames: any, properties?: any) => any;
export declare const unregisterService: (serviceToUnregister: any) => void;
