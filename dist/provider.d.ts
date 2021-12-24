export declare class AbstractProvider {
    javaType: any;
    typeName: string;
    hostProvider: any;
    constructor(type: any);
    registerService(): void;
    processHostProvider(hostProvider: any): any;
}
