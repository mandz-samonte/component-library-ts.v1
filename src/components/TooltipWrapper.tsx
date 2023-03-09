import React, { MouseEventHandler, ReactNode, Ref, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import reposition, {
    ORIGIN_TOP_LEFT,
    ORIGIN_BOTTOM_LEFT,
    ORIGIN_BOTTOM_RIGHT,
    ORIGIN_TOP_RIGHT,
} from "../utils/repositionComponent";

interface TooltipProps {
    children?: ReactNode;
    anchor?: Element;
    preferredOrigin?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    visible?: boolean;
}

export default function TooltipWrapper({ children, text }) {
    const [visible, setVisible] = useState<boolean>(false);
    const [anchor, setAnchor] = useState<Element>();

    const onMouseEnter = (e: React.MouseEvent) => {
        setAnchor(e.currentTarget);
        setVisible(true);
    };

    const onMouseLeave = () => {
        setAnchor(undefined);
        setVisible(false);
    };

    return (
        <>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {children}
            </div>

            <Tooltip anchor={anchor} visible={visible}>
                {text}
            </Tooltip>
        </>
    );
}

function Tooltip({ children, anchor, preferredOrigin = "bottom-right", visible }: TooltipProps) {
    const [renderOrigin, setRenderOrigin] = useState(preferredOrigin);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!anchor) return;
        const cb = () => reposition(anchor, rootRef, preferredOrigin, setRenderOrigin, 5);
        if (visible) {
            cb();
            window.addEventListener("scroll", cb);
        } else {
            window.removeEventListener("scroll", cb);
        }
        return () => {
            if (cb) {
                window.removeEventListener("scroll", cb);
            }
        };
    }, [visible, anchor, rootRef, preferredOrigin]);

    return ReactDOM.createPortal(
        <div
            className={classNames(
                "bg-white px-3 py-2 text-sm rounded-lg shadow-lg border border-zinc-200 w-full max-w-xs",
                {
                    "origin-top-left": renderOrigin === ORIGIN_TOP_LEFT,
                    "origin-top-right": renderOrigin === ORIGIN_TOP_RIGHT,
                    "origin-bottom-left": renderOrigin === ORIGIN_BOTTOM_LEFT,
                    "origin-bottom-right": renderOrigin === ORIGIN_BOTTOM_RIGHT,
                    "opacity-0 pointer-events-none": !visible,
                }
            )}
            ref={rootRef}
        >
            {children}
        </div>,
        document.body
    );
}
