import React, { ReactElement } from "react";
import { useRef } from "react";
import Button from "../components/Button";
import SampleModal, { ModalRef } from "../components/Modal";

export const Modal = () => {
    const modalRef = useRef<ModalRef>(null);

    return (
        <>
            <Button onClick={(e: React.MouseEvent) => modalRef.current?.show()}>Show Modal</Button>

            <SampleModal
                ref={modalRef}
                onTapOutside={() => modalRef.current?.hide()}
                wrapperClassName="flex items-center justify-center"
                panelClassName="max-w-screen-md p-20"
            >
                This is Sample Modal
            </SampleModal>
        </>
    );
};

export default {
    title: "Modal",
    component: SampleModal,
};
