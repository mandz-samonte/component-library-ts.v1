import classNames from "classnames";
import { find, isPlainObject, isString, uniqueId } from "lodash";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import useOutsideTapHandler from "../utils/useOutsideTapHandler";
import { BsFillCaretDownFill } from "react-icons/bs";

interface SelectProps {
    inputClassName?: string;
    className?: string;
    options?: Array<any>;
    labelKey?: string;
    valueKey?: string;
    value?: any;
    onChange?: (item: any) => void;
}

export default function Select({
    value,
    valueKey = "value",
    labelKey = "label",
    options = [],
    inputClassName,
    className,
    onChange = () => {},
}: SelectProps) {
    const [visible, setVisible] = useState(false);
    const rootRef = useRef(null);
    const [localValue, setLocalValue] = useState<any>(value);
    const currentValue = useMemo(() => {
        if (!localValue) return;
        return isString(localValue) && isPlainObject(options?.[0])
            ? find(options, { [valueKey]: localValue }) // if value is string but options is object
            : find(options, localValue); // if value is object and options is also an object & if value is string and options is also string
    }, [localValue]);

    const onChangeLocal = (value: any) => {
        setLocalValue(value);
        onChange(value);
    };

    useEffect(() => {
        if (value !== localValue) {
            setLocalValue(value);
        }
    }, [value]);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    useOutsideTapHandler(rootRef, hide);

    return (
        <div ref={rootRef} className={classNames("relative", className)}>
            <div
                onClick={show}
                className={classNames(
                    "px-5 py-3 border border-zinc-200 rounded-lg bg-white cursor-pointer flex items-center",
                    inputClassName
                )}
            >
                <span>{currentValue?.[labelKey] || currentValue || "Select"}</span>
                <BsFillCaretDownFill className="ml-auto" />
            </div>

            {visible && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg flex flex-col top-full w-64">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onChangeLocal(option)}
                            className={classNames("px-5 py-2 hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg", {
                                "bg-slate-200": option === currentValue,
                            })}
                        >
                            {isPlainObject(option) ? option?.[labelKey] : option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
