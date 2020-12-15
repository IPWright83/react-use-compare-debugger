/**
 * Determine if a given value is an Object
 * @param {Any}     value       The value to check
 * @type {Boolean}              True if the given value is a Function
 */
const isFunction = value => value && {}.toString.call(value) === "[object Function]";

export default isFunction;
        
