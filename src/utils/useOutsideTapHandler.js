import {useCallback, useEffect} from "react";

export default function useOutsideTapHandler(ref, callback, triggerOnBlur = false) {

    const cb = useCallback(callback, [callback]);
    useEffect(() => {
        registerTapOutsideHandler(ref, cb, triggerOnBlur);
        return () => {
            unregisterTapOutsideHandler(cb);
        };
    }, [ref, cb, triggerOnBlur]);

}

const callbacks = [];
const wrappedCallbacks = [];

export function registerTapOutsideHandler(ref, cb, triggerOnBlur = false) {
    const wrappedCb = (event) => {
        if (event.type === "blur" || (ref.current && !ref.current.contains(event.target))) {
            cb();
        }
    }
    // Bind the event listener
    document.addEventListener("mousedown", wrappedCb);
    if (triggerOnBlur) {
        window.addEventListener("blur", wrappedCb);
    }

    callbacks.push(cb);
    wrappedCallbacks.push(wrappedCb);
}

export function unregisterTapOutsideHandler(cb) {
    const cbIndex = callbacks.indexOf(cb);
    if (cbIndex >= 0) {
        const wrappedCb = wrappedCallbacks[cbIndex];
        document.removeEventListener("mousedown", wrappedCb);
        window.removeEventListener("blur", wrappedCb);

        callbacks.splice(cbIndex,1);
        wrappedCallbacks.splice(cbIndex,1);
    }

}