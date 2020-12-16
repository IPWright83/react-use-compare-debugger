import { useEffect, useRef } from "react";

import deepCompare from "./deepCompare";
import styles from "./styles";

/**
 * Logs a mutation to the console
 * @param  {Object} m   The mutation to log
 */
const logMutation = (m) => {
    switch (m.type) {
        case "Primitive":
            console.log(`%c${m.key}`, styles.mutations.key);
            break;

        case "Object":
            // This is bad, the same content but a different reference
            if (m.isNonReferentiallyEqual) {
                console.log(
                    `%c${m.key} - %cWARNING This is a new object reference that looks identical to the previous`,
                    styles.mutations.key,
                    styles.mutations.error
                );
            } else {
                // As some fields were skipped, we can't be certain if this was a safe mutation or not
                console.log(
                    `%c${m.key} - %cWARNING This object may be the same as the previous, however some fields were ignored in the comparison`,
                    styles.mutations.key,
                    styles.mutations.warning
                );
            }
            break;
        case "Function":
            // This is bad, the same function string but a different reference
            if (m.isNonReferentiallyEqual) {
                console.log(
                    `%c${m.key} - %cWARNING This is a new function that looks identical to the previous`,
                    styles.mutations.key,
                    styles.mutations.error
                );
            } else {
                console.log(`%c${m.key}`, styles.mutations.key);
                break;
            }
            break;
    }
};

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
    const mutations = deepCompare(ref.current, value, ignoreKeys);

    // Log the mutations
    console.group(`The following mutations were detected: `);
    mutations.forEach((m) => logMutation(m));
    console.groupEnd();

    console.groupEnd();

    return ref.current;
}

export default useCompareDebugger;
