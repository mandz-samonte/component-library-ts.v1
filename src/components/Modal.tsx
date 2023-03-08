import {
    forwardRef,
    ReactElement,
    ReactNode,
    useRef,
    useEffect,
    useImperativeHandle,
    useState,
    RefObject,
    Ref,
} from "react";
import ReactDOM from "react-dom";
import useOutsideTapHandler from "../utils/useOutsideTapHandler";
import classNames from "classnames";
import React from "react";

interface ModalWrapperProps {
    visible?: boolean;
    className?: string;
    children?: ReactNode;
}

interface ModalProps {
    visible?: boolean;
    wrapperClassName?: string;
    panelClassName?: string;
    onTapOutside?: () => void;
    children?: ReactNode;
}

export interface ModalRef {
    show: () => void;
    hide: () => void;
}

export function ModalWrapper({ visible = false, className, children }: ModalWrapperProps): ReactElement {
    return ReactDOM.createPortal(
        <div
            className={classNames(
                "fixed top-0 left-0 right-0 bottom-0 z-40 overflow-y-auto",
                {
                    "opacity-0 pointer-events-none": !visible,
                },
                className
            )}
        >
            {children}
        </div>,
        document.body
    );
}

const Modal = forwardRef(
    (
        { children, visible = false, wrapperClassName, panelClassName, onTapOutside = () => null }: ModalProps,
        ref: Ref<ModalRef>
    ) => {
        const panelRef = useRef<HTMLDivElement>(null);
        useOutsideTapHandler(panelRef, onTapOutside || (() => null));

        const [showModal, setShowModal] = useState(visible);

        useEffect(() => {
            setShowModal(visible);
        }, [visible]);

        useImperativeHandle(ref, () => ({
            show: () => setShowModal(true),
            hide: () => setShowModal(false),
        }));

        return (
            <ModalWrapper
                className={classNames("bg-black/30 transition-opacity flex justify-center", wrapperClassName)}
                visible={showModal}
            >
                <div
                    className={classNames(
                        "w-full shadow-xl shadow-black/10 rounded-xl transition-transform  bg-white",
                        panelClassName,
                        {
                            "-translate-y-[2rem]": !showModal,
                        }
                    )}
                    ref={panelRef}
                >
                    {children}
                </div>
            </ModalWrapper>
        );
    }
);

export default Modal;
