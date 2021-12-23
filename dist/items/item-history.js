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
 * @typedef { import("../global").HostItem } HostItem
 * @typedef { import("../global").HostGroupFunction } HostGroupFunction
 * @typedef { import("@js-joda").ZoneDateTime } ZoneDateTime
 *
 */
var PersistenceExtensions = Java.type("org.openhab.core.persistence.extensions.PersistenceExtensions");
var DateTime = Java.type('java.time.ZonedDateTime');
/**
 * Class representing the historic state of an openHAB Item
 *
 *
 * @memberOf items
 * @hideconstructor
 */
var ItemHistory = /** @class */ (function () {
    function ItemHistory(item) {
        this.item = item;
    }
    /**
     * Gets the average value of the state of a given Item since a certain point in time.
     *
     * @example
     * var item = items.getItem("KitchenDimmer");
     * console.log("KitchenDimmer averageSince", item.history.averageSince(yesterday));
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {(Number | null)}
     */
    ItemHistory.prototype.averageSince = function (timestamp, serviceId) {
        return this._decimalOrNull(PersistenceExtensions.averageSince.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Checks if the state of a given item has changed since a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {boolean}
     */
    ItemHistory.prototype.changedSince = function (timestamp, serviceId) {
        return PersistenceExtensions.changedSince.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false));
    };
    /**
     * Gets the difference value of the state of a given item since a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {(Number | null)}
     */
    ItemHistory.prototype.deltaSince = function (timestamp, serviceId) {
        return this._decimalOrNull(PersistenceExtensions.deltaSince.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Gets the standard deviation of the state of the given Item since a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {(Number | null)}
     */
    ItemHistory.prototype.deviationSince = function (timestamp, serviceId) {
        return this._decimalOrNull(PersistenceExtensions.deviationSince.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Gets the evolution rate of the state of a given Item since a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {(Number | null)}
     */
    ItemHistory.prototype.evolutionRate = function (timestamp, serviceId) {
        return this._decimalOrNull(PersistenceExtensions.evolutionRate.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Retrieves the historic item state for a given item at a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {*} state
     */
    ItemHistory.prototype.historicState = function (timestamp, serviceId) {
        return this._stateOrNull(PersistenceExtensions.historicState.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Query the last update time of a given item.
     *
     * @param {string} [serviceId] optional persistance service ID
     * @returns {(Date | null)}
     */
    ItemHistory.prototype.lastUpdate = function (serviceId) {
        console.log.apply(console, __spreadArray(["Last Update"], arguments, false));
        return this._dateOrNull(PersistenceExtensions.lastUpdate.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Gets the historic item with the maximum value of the state of a given item since a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {*} state
     */
    ItemHistory.prototype.maximumSince = function (timestamp, serviceId) {
        return this._stateOrNull(PersistenceExtensions.maximumSince.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Gets the historic item with the minimum value of the state of a given item since a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {*} state
     */
    ItemHistory.prototype.minimumSince = function (timestamp, serviceId) {
        return this._stateOrNull(PersistenceExtensions.minimumSince.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Persists the state of a given item
     *
     * @param {string} [serviceId] optional persistance service ID
     */
    ItemHistory.prototype.persist = function (serviceId) {
        PersistenceExtensions.persist.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false));
    };
    /**
     * Returns the previous state of a given item.
     *
     * @param {boolean} [skipEqual] optional, if true, skips equal state values and searches the first state not equal the current state
     * @param {string} [serviceId] optional persistance service ID
     * @returns {*} state
     */
    ItemHistory.prototype.previousState = function (skipEqual, serviceId) {
        return this._stateOrNull(PersistenceExtensions.previousState.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Gets the sum of the state of a given item since a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {(Number | null)}
     */
    ItemHistory.prototype.sumSince = function (timestamp, serviceId) {
        return this._decimalOrNull(PersistenceExtensions.sumSince.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Checks if the state of a given item has been updated since a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {boolean}
     */
    ItemHistory.prototype.updatedSince = function (timestamp, serviceId) {
        return PersistenceExtensions.updatedSince.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false));
    };
    /**
     * Gets the variance of the state of the given Item since a certain point in time.
     *
     * @param {(Date | ZoneDateTime)} timestamp
     * @param {string} [serviceId] optional persistance service ID
     * @returns {*} state
     */
    ItemHistory.prototype.varianceSince = function (timestamp, serviceId) {
        return this._stateOrNull(PersistenceExtensions.varianceSince.apply(PersistenceExtensions, __spreadArray([this.item], arguments, false)));
    };
    /**
     * Retrieves the historic item state for a given item at the current point in time.
     * @param {string} [serviceId] optional persistance service ID
     * @returns {*} state
     */
    ItemHistory.prototype.latestState = function (serviceId) {
        return this.historicState.apply(this, __spreadArray([DateTime.now()], arguments, false));
    };
    ItemHistory.prototype._stateOrNull = function (result) {
        return result === null ? null : result.state;
    };
    ItemHistory.prototype._dateOrNull = function (result) {
        return result === null ? null : new Date(result.toInstant().toEpochMilli());
    };
    ItemHistory.prototype._decimalOrNull = function (result) {
        return result === null ? null : result.toBigDecimal();
    };
    return ItemHistory;
}());
module.exports = ItemHistory;
