import React, { forwardRef, MouseEventHandler, RefObject, useImperativeHandle, useRef, useState } from "react";
import Button from "../components/Button";
import DropdownWrapper from "../components/DropdownWrapper";

interface DropdownRef {
    show: () => void;
    hide: () => void;
}

const DropdownMenu = forwardRef((props, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [anchor, setAnchor] = useState<HTMLElement>();

    const show = (target: HTMLElement, data?: any) => {
        setAnchor(target);
        setVisible(true);
    };

    const hide = () => {
        setAnchor(undefined);
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }));

    return (
        <DropdownWrapper anchor={anchor} visible={visible} onTapOutside={hide}>
            <div className="w-64 flex flex-col bg-white shadow-lg border border-zinc-200 rounded-lg">
                <span className="p-5 text-xs text-zinc-400 font-semibold uppercase">This is a Dropdown Menu</span>
                <span className="px-5 py-3 hover:bg-zinc-100 cursor-pointer">Menu 1</span>
                <span className="px-5 py-3 hover:bg-zinc-100 cursor-pointer">Menu 2</span>
            </div>
        </DropdownWrapper>
    );
});

export const Dropdown = () => {
    const dropdownRef = useRef<DropdownRef>(null);

    return (
        <>
            <Button onClick={(e: React.MouseEvent) => dropdownRef.current?.show()}>Dropdown</Button>

            <DropdownMenu ref={dropdownRef} />
        </>
    );
};

export default {
    title: "Dropdown",
    component: DropdownWrapper,
};
