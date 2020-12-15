import isObject from "./isObject";
import logValue from "./logValue";
import isFunction from "./isFunction";

/**
 * Deep compare and log the properties of 2 objects using reference equality
 * @param  {Object}         previous    The previous object tree
 * @param  {Object}         current     The current object tree
 * @param  {Array<String>}  ignoreKeys  Any fields to ignore recursing into
 */
const deepCompare = (previous, current, ignoreKeys = []) => {
    // Grab the current set of keys
    const keys = Object.keys(current);

    for (const key of keys) {
        // Grab the values out
        const currentValue = current[key];
        const previousValue = previous ? previous[key] : undefined;

        // Recurse for nested objects, unless it's in the ignore list
        if (isObject(currentValue) && !isFunction(currentValue)) {
            
            if (ignoreKeys.includes(key)) {
                logValue(key, previousValue, currentValue);
                continue;
            }

            console.group(`${key} ${currentValue === previousValue}`);
            deepCompare(previousValue, currentValue);
            console.groupEnd();
            continue;
        }

        // Ignore some keys
        logValue(key, previousValue, currentValue);
    }
};

export default deepCompare;
