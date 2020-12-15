import { useEffect, useRef } from "react";

import deepCompare from "./deepCompare";

/**
 * Debug state changes
 * @param  {String}         component   The name of the component
 * @param  {Object}         value       The current props
 * @param  {Array<String>}  ignoreKeys  Any fields to ignore debugging in props
 * @return {Object}                     The old props
 */
function useCompareDebugger(component, value, ignoreKeys) {
    const ref = useRef();

    // Record the previous value so we can compare later
    useEffect(() => {
        ref.current = value;
    }, [value]);

    // Log the comparison to the console
    console.groupCollapsed(component);
    deepCompare(ref.current, value, ignoreKeys);
    console.groupEnd();

    return ref.current;
}

export default useCompareDebugger;
