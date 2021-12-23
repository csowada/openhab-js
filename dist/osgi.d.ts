declare const _default: {
    getService: (...classOrNames: any[]) => any;
    findServices: (className: any, filter: any) => any[];
    registerService: (service: any, ...interfaceNames: any[]) => void;
    registerPermanentService: (service: any, interfaceNames: any, properties?: any) => any;
    unregisterService: (serviceToUnregister: any) => void;
};
export = _default;
