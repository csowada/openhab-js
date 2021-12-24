import { AbstractProvider } from "../provider";
export declare class StaticCallbackMetadataProvider extends AbstractProvider {
    metadataCallbacks: any[];
    constructor();
    addProviderChangeListener(listener: any): void;
    removeProviderChangeListener(listener: any): void;
    addMetadataCallback(callback: any): void;
    getAll(): any;
}
declare const _default: () => StaticCallbackMetadataProvider;
export default _default;
