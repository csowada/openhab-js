import { AbstractProvider } from "../provider";
import utils from "../utils";

const METADATA_PROVIDER_CLASS = "org.openhab.core.items.MetadataProvider";

export class StaticCallbackMetadataProvider extends AbstractProvider {

    metadataCallbacks: any[];

    constructor(){
        super(METADATA_PROVIDER_CLASS);
        this.metadataCallbacks = [];
    }

    addProviderChangeListener(listener: any) {
    }

    removeProviderChangeListener(listener: any) {
    }

    addMetadataCallback(callback) {
        this.metadataCallbacks.push(callback);
    }

    getAll(){
        require('../log')('metadata-provider').debug("///"+this.metadataCallbacks.length);
        require('../log')('metadata-provider').debug("///"+this.metadataCallbacks.flatMap(c => c()).length);

        for(let x of this.metadataCallbacks.flatMap(c => c())) {
            require('../log')('metadata-provider').debug(x);
        }

        return utils.jsArrayToJavaList(this.metadataCallbacks.flatMap(c => c()));
    }
}

export default () => new StaticCallbackMetadataProvider();

// module.exports = {
//     staticCallbackMetadataProvider: () => new StaticCallbackMetadataProvider()
    
// }

// // seperate export class for just for TypeScript
// module.exports.StaticCallbackMetadataProvider = StaticCallbackMetadataProvider;