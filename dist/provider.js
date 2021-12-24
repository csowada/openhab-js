"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractProvider = void 0;
const osgi = __importStar(require("./osgi"));
function getAllFunctionNames(obj) {
    var props = [];
    var o = obj;
    do {
        props = props.concat(Object.getOwnPropertyNames(o));
        o = Object.getPrototypeOf(o);
    } while (o.constructor.name !== 'AbstractProvider');
    return props.filter(p => typeof obj[p] === 'function');
}
class AbstractProvider {
    constructor(type) {
        this.typeName = type.class.getName();
        this.javaType = Java.extend(type); //require('@runtime/osgi').classutil.extend(type);
    }
    registerService() {
        let javaConfig = {};
        let functionNamesToBind = getAllFunctionNames(this).
            filter(f => f !== 'constructor').
            filter(f => f !== 'javaType');
        for (let fn of functionNamesToBind) {
            javaConfig[fn] = this[fn].bind(this);
        }
        let hostProvider = this.processHostProvider(new this.javaType(javaConfig));
        this.hostProvider = hostProvider;
        osgi.registerService(this.hostProvider, this.typeName);
    }
    processHostProvider(hostProvider) {
        return hostProvider;
    }
}
exports.AbstractProvider = AbstractProvider;
// export = {
//     AbstractProvider
// }
