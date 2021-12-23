import logger from "./log"

const log = logger("utils");

const HashSet: any = Java.type("java.util.HashSet");
const ArrayList: any = Java.type("java.util.ArrayList");

function getAllPropertyNames (obj) {
    const proto     = Object.getPrototypeOf(obj);
    const inherited = (proto) ? getAllPropertyNames(proto) : [];
    return [...new Set(Object.getOwnPropertyNames(obj).concat(inherited))];
}

export let jsSetToJavaSet = function(set) {
    let rv = new HashSet();

    set.forEach(e => rv.add(e));

    return rv;
}

export let jsArrayToJavaSet = function (arr) {
    let set = new HashSet();

    for (let i of arr) {
        set.add(i);
    }

    return set;
};

export let jsArrayToJavaList = function (arr) {
    let list = new ArrayList();

    for (let i of arr) {
        list.add(i);
    }

    return list;
}

export let javaSetToJsArray = function<T>(set: java.util.Set<T>): T[] {
    return Java.from(new ArrayList(set));
}

export let javaSetToJsSet = function<T>(set: java.util.Set<T>) : Set<T> {
    return new Set(exports.javaSetToJsArray(set));
}

export let randomUUID = () => Java.type<any>("java.util.UUID").randomUUID();

export let dumpObject = function (obj) {
    try {
        log.info("Dumping object...");
        log.info("  typeof obj = {}", (typeof obj));
        let isJavaObject = Java.isJavaObject(obj);
        log.info("  Java.isJavaObject(obj) = {}", isJavaObject)
        let isJavaType = Java.isType(obj);
        log.info("  Java.isType(obj) = {}", isJavaType)
        if (isJavaObject) {
            if (isJavaType) {
                log.info("  Java.typeName(obj) = {}", Java.typeName(obj));
            } else {
                log.info("  Java.typeName(obj.class) = {}", Java.typeName(obj.class));
                if(Java.typeName(obj.class) == 'java.util.HashMap'){
                    log.info("Dumping contents...");
                    let keys = obj.keySet().toArray();
                    for (var key in keys) {
                        log.info(`${keys[key]}(${typeof keys[key]}) = ${obj.get(keys[key])}(${typeof obj.get(keys[key])})`);
                        if(typeof keys[key] === 'object') {
                            log.info("Dumping key...");
                            exports.dumpObject(keys[key]);
                        }
                    }
                }
            }
        } else if (typeof obj === 'string'){
            log.info("String value = " + obj);
        }

        log.info("getAllPropertyNames(obj) = {}", getAllPropertyNames(obj));
        // log.info("obj.toString() = {}", obj.toString());
        // log.info("JSON.stringify(obj) = {}", JSON.stringify(obj));
    } catch(e) {
        log.info("Failed to dump object: " + e.message);
    }
}

export let isJsInstanceOfJava = function(instance, type) {
    if(!Java.isType(type)) {
        throw Error("type is not a java class");
    }

    if(instance === null || instance === undefined || instance.class === null || instance.class === undefined) {
        return false;
    }

    return type.class.isAssignableFrom(instance.class);
}