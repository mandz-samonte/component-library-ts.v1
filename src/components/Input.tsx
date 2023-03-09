import React, { forwardRef, ReactNode, useState, isValidElement, Ref, HTMLAttributes } from "react";
import classNames from "classnames";
import { uniqueId } from "lodash";

interface InputWrapperProps {
    children?: ReactNode;
    className?: string;
    labelFor?: string;
    label?: string | ReactNode;
    subLabel?: string | ReactNode;
    error?: string | ReactNode;
    guide?: string;
    required?: boolean;
    labelClassName?: string;
}

interface LabelTextProps {
    children?: string | ReactNode;
    text?: string | ReactNode;
    subLabel?: string | ReactNode;
    className?: string;
}

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
    className?: string;
    id?: any;
    label?: string | ReactNode;
    labelClassName?: string;
    subLabel?: string | ReactNode;
    fieldClassName?: string;
    prefixLabel?: string | ReactNode;
    prefixClassName?: string;
    suffixLabel?: string | ReactNode;
    suffixClassName?: string;
    error?: string | ReactNode;
    required?: boolean;
    guide?: string;
}

export default function Input({
    className,
    id,
    label,
    labelClassName,
    subLabel,
    fieldClassName,
    prefixLabel,
    prefixClassName,
    suffixLabel,
    suffixClassName,
    error,
    required,
    guide,
    ...props
}: InputProps) {
    const [htmlId] = useState(id || uniqueId("in_"));

    return (
        <InputWrapper
            className={className}
            label={label}
            labelClassName={labelClassName}
            subLabel={subLabel}
            labelFor={htmlId}
            error={error}
            required={required}
            guide={guide}
        >
            {prefixLabel}
            <input
                id={htmlId}
                className={classNames(
                    "peer bg-neutral-50 px-4 py-3 outline-none border-y-2 border-stone-50 border-b-neutral-400 focus:border-b-primary font-medium w-full placeholder:text-neutral-400 placeholder:font-normal",
                    {
                        "border-b-red-500 focus:border-b-primary": error,
                        "rounded-r-md": !suffixLabel,
                        "rounded-l-md": !prefixLabel,
                    },
                    fieldClassName
                )}
                {...props}
            />
            {suffixLabel && (
                <div
                    className={classNames(
                        "bg-neutral-200 border-y-2 border-neutral-200 peer-focus:border-b-primary border-l-0 border-b-neutral-400 rounded-r-md shrink-0",
                        {
                            "border-b-red-500 focus:border-b-primary": error,
                        },
                        suffixClassName
                    )}
                >
                    {suffixLabel}
                </div>
            )}
        </InputWrapper>
    );
}

const LabelText = forwardRef(
    ({ text, children, subLabel = false, className }: LabelTextProps, ref: Ref<HTMLSpanElement>) => {
        return (
            <span
                className={classNames(
                    " font-medium",
                    {
                        "text-slate-600 text-sm": !subLabel,
                        "text-slate-500 text-xs": subLabel,
                    },
                    className
                )}
                ref={ref}
            >
                {text || children}
            </span>
        );
    }
);

export const InputWrapper = forwardRef(
    (
        { children, className, labelFor, label, labelClassName, subLabel, error, guide, required }: InputWrapperProps,
        ref: Ref<HTMLDivElement>
    ) => {
        return (
            <div className={classNames("flex flex-col", className)} ref={ref}>
                {label && (
                    <label className="flex gap-y-1 mb-1" htmlFor={labelFor}>
                        {isValidElement(label) ? (
                            label
                        ) : (
                            <LabelText className={labelClassName} subLabel={subLabel}>
                                {label}
                            </LabelText>
                        )}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                {children}
                {guide && <div className="w-full text-xs text-slate-500 mt-1 italic">{guide}</div>}
                {error && <span className="text-red-600 text-2xs text-right mt-1">{error}</span>}
            </div>
        );
    }
);
