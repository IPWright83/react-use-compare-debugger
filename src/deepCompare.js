import isObject from "./isObject";
import logValue from "./logValue";
import isFunction from "./isFunction";

/**
 * Deep compare and log the properties of 2 objects using reference equality
 * @param  {Object}         previous    The previous object tree
 * @param  {Object}         current     The current object tree
 * @param  {String}         lastKey     The key of the parent object
 */
const handleNoKeys = (previous, current, lastKey) => {
    // Handle the case where we have an empty object or array
    const _isMatch = current === previous;

    // Determine what types things are, taking into account
    // we could be dealing with some array to object switcharoos
    const isPreviousArray = Array.isArray(previous);
    const isPreviousObject = isObject(previous);
    const isCurrentArray = Array.isArray(current);
    const isCurrentObject = isObject(current);

    const previousValue = isPreviousArray ? "[]" :
                          isPreviousObject ? "{}" :
                          previous;

    const currentValue = isCurrentArray ? "[]" :
                         isCurrentObject ? "{}" :
                         current;

    logValue("this", previousValue, currentValue);

    if (!_isMatch) {
        const type = isPreviousArray && isCurrentArray ? "Array" :
                     isCurrentObject && isPreviousObject ? "Object" :
                     (isPreviousArray && isCurrentObject || isCurrentArray && isPreviousObject) ? "Mixed" : "Primitive";

        return { lastKey, type, isNonReferentiallyEqual: true };
    }
}

/**
 * Deep compare and log the properties of 2 objects using reference equality
 * @param  {Object}         previous    The previous object tree
 * @param  {Object}         current     The current object tree
 * @param  {Array<String>}  ignoreKeys  Any fields to ignore recursing into
 * @param  {String}         lastKey     The key of the parent object
 * @return {Array<Object>}              An array of fields that were mutated
 */
const deepCompare = (previous, current, ignoreKeys = [], depth = 0, lastKey = "") => {
    // Abort due to excessive depth
    if (depth > 100) {
        return [];
    }

    // Grab the current set of keys
    const keys = Object.keys(current);
    const mutations = [];

    // Handle the case where we have an empty object or array
    if (keys.length === 0) {
        const mutation = handleNoKeys();
        if (mutation) {
            mutations.push(mutation);
        }
    }

    for (const key of keys) {
        // Grab the values out
        const currentValue = current[key];
        const previousValue = previous ? previous[key] : undefined;

        const _isObject = isObject(currentValue);
        const _isArray = Array.isArray(currentValue);
        const _isFunction = isFunction(currentValue);
        const _isMatch = currentValue === previousValue;
        const _type = _isArray ? "Array" : _isObject ? "Object" : typeof currentValue;

        // Recurse for nested objects, unless it's in the ignore list
        if (_isObject && !_isFunction) {
            if (ignoreKeys.includes(key)) {
                logValue(key, previousValue, currentValue);

                // Record the object is different, but we're not sure if it's nonReferentiallyEqual
                // as we haven't recursed into it
                if (_isMatch === false) {
                    mutations.push({ key, type: _type, isNonReferentiallyEqual: false });
                }

                continue;
            }

            // For an Object or array, start a new nested console group
            const matchText = _isMatch ? "true values are indentical" : "false value has changed";
            const groupName = `${key} (${matchText}) - ${_type}`;
            if (_isMatch) {
                console.groupCollapsed(groupName);
            } else {
                console.group(groupName);
            }

            // Grab the set of mutations from the deepCompare
            const objMutations = deepCompare(previousValue, currentValue, ignoreKeys, depth++, key);
            if (objMutations.length === 0 && _isMatch === false) {
                mutations.push({ key, type: _type, isNonReferentiallyEqual: true });
            } else {
                mutations.push(...objMutations.map((o) => ({ ...o, key: `${key}.${o.key}` })));
            }

            console.groupEnd();
            continue;
        }

        // Ignore some keys
        logValue(key, previousValue, currentValue);

        // Add to the list of mutations
        if (currentValue !== previousValue) {
            // If this is a function, determine if it is essentially the same
            if (_isFunction) {
                const currentF = (currentValue || "").toString();
                const previousF = (previousValue || "").toString();
                mutations.push({
                    key,
                    type: "Function",
                    isNonReferentiallyEqual: currentF == previousF,
                });
                continue;
            }

            mutations.push({ key, type: "Primitive" });
        }
    }

    return mutations;
};

export default deepCompare;
