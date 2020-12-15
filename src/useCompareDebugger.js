import { useEffect, useRef } from "react";

import deepCompare from "./deepCompare";

/**
 * Debug state changes
 * @param  {String}         component   The name of the component you are testing
 * @param  {Object}         value       The current props
 * @param  {Array<String>}  ignoreKeys  Any fields to ignore recursing into
 * @return {Object}                     The old props
 */
function useCompareDebugger(component, value, ignoreKeys) {
    if (process.env.NODE_ENV !== "development") {
        console.warn(
            `The useCompareDebugger should only be used when developing. It is still registered for ${component}`
        );
    }

    const ref = useRef();

    // Record the previous value so we can compare later
    useEffect(() => {
        ref.current = value;
    }, [value]);

    // Log the comparison to the console
    console.groupCollapsed(`${component} ${new Date().toLocaleTimeString()}`);
    deepCompare(ref.current, value, ignoreKeys);
    console.groupEnd();

    return ref.current;
}

export default useCompareDebugger;
