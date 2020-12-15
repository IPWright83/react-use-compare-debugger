/**
 * Determine if a given value is an Object
 * @param {Any}     value       The value to check
 * @type {Boolean}              True if the given value is an object
 */
const isObject = value => value ? typeof value === "object" : false;

export default isObject;
        
