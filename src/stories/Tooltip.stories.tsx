import TooltipWrapper from "../components/TooltipWrapper";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import React from "react";

export const Tooltip = () => {
    return (
        <div className="flex items-start">
            <TooltipWrapper text="Sample Tooltip">
                <AiOutlineQuestionCircle />
            </TooltipWrapper>
        </div>
    );
};

export default {
    title: "Tooltip",
    component: TooltipWrapper,
};
