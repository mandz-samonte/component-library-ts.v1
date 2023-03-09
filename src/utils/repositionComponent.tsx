import { RefObject } from "react";

export const ORIGIN_TOP_LEFT = "top-left";
export const ORIGIN_TOP_RIGHT = "top-right";
export const ORIGIN_BOTTOM_LEFT = "bottom-left";
export const ORIGIN_BOTTOM_RIGHT = "bottom-right";

interface RepositionFunctionProps {
    (
        anchor: Element,
        rootRef: RefObject<HTMLElement>,
        preferredOrigin: "top-left" | "top-right" | "bottom-left" | "bottom-right",
        setRenderOrigin: (arg: any) => void,
        yOffset: number
    ): void;
}

const reposition: RepositionFunctionProps = (anchor, rootRef, preferredOrigin, setRenderOrigin, yOffset): void => {
    if (!anchor || !rootRef.current) return;
    const targetBounds = anchor.getBoundingClientRect();
    const menuBounds = rootRef.current.getBoundingClientRect();
    let xOrigin = "left",
        yOrigin = "top";

    let left = [ORIGIN_TOP_LEFT, ORIGIN_BOTTOM_LEFT].includes(preferredOrigin) ? targetBounds.left : targetBounds.right,
        top = targetBounds.bottom + yOffset;

    if (left + menuBounds.width > window.innerWidth) {
        rootRef.current.style.right = window.innerWidth - targetBounds.right + "px";
        xOrigin = "right";
    } else {
        rootRef.current.style.left = left + "px";
    }

    if (top + menuBounds.height > window.innerHeight) {
        rootRef.current.style.bottom = window.innerHeight - targetBounds.top + yOffset + "px";
        rootRef.current.style.top = "";
        yOrigin = "bottom";
    } else {
        rootRef.current.style.top = top + "px";
        rootRef.current.style.bottom = "";
    }

    if (targetBounds.width > menuBounds.width) {
        rootRef.current.style.minWidth = targetBounds.width + "px";
    }

    setRenderOrigin(yOrigin + "-" + xOrigin);
};

export default reposition;
