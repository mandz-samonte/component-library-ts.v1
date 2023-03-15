import React from "react";
import SampleSelect from "../components/Select";

export const Select = () => (
    <SampleSelect
        options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
        ]}
    />
);

export default {
    title: "Select",
    component: SampleSelect,
};
