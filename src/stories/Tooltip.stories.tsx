import TooltipWrapper from "../components/TooltipWrapper";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import React from "react";

export const Tooltip = () => {
    return (
        <TooltipWrapper text="Sample Tooltip">
            <AiOutlineQuestionCircle />
        </TooltipWrapper>
    );
};

export default {
    title: "Tooltip",
    component: TooltipWrapper,
};
