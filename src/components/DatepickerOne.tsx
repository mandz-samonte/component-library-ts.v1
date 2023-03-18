import { useMonth } from "@datepicker-react/hooks";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLilius } from "use-lilius";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import classNames from "classnames";
import { BsArrowRightShort } from "react-icons/bs";
import {
    addWeeks,
    compareAsc,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isBefore,
    isEqual,
    isToday,
    startOfMonth,
    startOfWeek,
} from "date-fns";
import { flatten } from "lodash";

function Days() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="grid grid-cols-7">
            {days.map((day) => (
                <span key={day} className="text-center w-10 h-8 text-sm text-zinc-400 font-medium">
                    {day}
                </span>
            ))}
        </div>
    );
}

interface DatepickerProps {
    type?: "default" | "multi" | "range";
}

export default function DatepickerOne({ type = "default" }: DatepickerProps) {
    const [isVisible, setVisible] = useState(false);
    const {
        calendar,
        selected,
        deselect,
        inRange,
        isSelected,
        select,
        selectRange,
        viewNextMonth,
        viewPreviousMonth,
        toggle,
    } = useLilius({ numberOfMonths: 2 });
    const firstActiveMonth = useMemo(() => calendar[0], [calendar]);
    const secondActiveMonth = useMemo(() => calendar[1], [calendar]);

    const firstSundayOfFirstMonth = useMemo(() => calendar[0][0][6], [calendar]);
    const firstSundayOfSecondMonth = useMemo(() => calendar[1][0][6], [calendar]);

    const datesClassName = useCallback(
        (date: Date, firstSunday: Date) => {
            return classNames("w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-zinc-100", {
                "text-zinc-400": !inRange(date, startOfMonth(firstSunday), endOfMonth(firstSunday)),
                "!bg-primary !text-white":
                    (type === "range" &&
                        (isEqual(date, selected[0]) || isEqual(date, selected[selected.length - 1]))) ||
                    (type === "multi" && isSelected(date)),
                "bg-zinc-200": type === "range" && isSelected(date),
                "border border-primary text-primary": isToday(date),
            });
        },
        [selected]
    );

    const selectDateRange = (date: Date) => {
        const sorted = selected.sort((a, b) => compareAsc(a, b));

        if (sorted.length === 0) {
            select(date);
        } else if (isBefore(date, selected[0])) {
            selectRange(date, sorted[0], true);
        } else if (isSelected(date) && selected.length === 1) {
            deselect(date);
        } else {
            selectRange(sorted[0], date, true);
        }
    };

    const onSelect = (date: Date) => {
        switch (type) {
            case "multi":
                return toggle(date);
            case "range":
                return selectDateRange(date);
            default:
                return;
        }
    };

    return (
        <div className="relative">
            <div className="px-5 py-3 rounded-lg border border-primary bg-white">
                {selected?.length === 0 ? (
                    <span>Select Date</span>
                ) : (
                    <span className="flex items-center gap-x-2">
                        {selected[0] && format(selected[0], "dd-MM-yyyy")}{" "}
                        <BsArrowRightShort className="text-primary" />{" "}
                        {selected[selected.length - 1] && format(selected[selected.length - 1], "dd-MM-yyyy")}
                    </span>
                )}
            </div>

            <div className="absolute top-full mt-2 bg-white rounded-lg shadow-md flex flex-col p-5">
                <div className="flex items-center justify-between mb-5">
                    <button
                        onClick={viewPreviousMonth}
                        className="w-10 h-10 rounded-lg border flex items-center justify-center"
                    >
                        <GrFormPrevious />
                    </button>

                    {calendar.map(([firstWeek]) => (
                        <span key={firstWeek[6].toDateString()} className="font-medium">
                            {format(firstWeek[6], "MMMM yyyy")}
                        </span>
                    ))}

                    <button
                        onClick={viewNextMonth}
                        className="w-10 h-10 rounded-lg border flex items-center justify-center"
                    >
                        <GrFormNext />
                    </button>
                </div>

                {/* <div className="grid grid-cols-2 gap-x-5 ">
                    {calendar.map((month) => (
                        <div key={format(firstSundayOfFirstMonth, "MMMM-yyyy")} className="grid grid-cols-7">
                            {flatten(month).map((date) => (
                                <div
                                    key={format(date, "dd-MM-yyyy")}
                                    onClick={() => onSelectDateRange(date)}
                                    className={classNames("w-10 h-10 flex items-center justify-center", {
                                        "text-zinc-400":
                                            !inRange(
                                                date,
                                                startOfMonth(firstSundayOfFirstMonth),
                                                endOfMonth(firstSundayOfFirstMonth)
                                            ) &&
                                            !inRange(
                                                date,
                                                startOfMonth(firstSundayOfSecondMonth),
                                                endOfMonth(firstSundayOfSecondMonth)
                                            ),
                                        "!bg-primary !text-white":
                                            isEqual(date, selected[0]) || isEqual(date, selected[selected.length - 1]),
                                        "bg-zinc-200": isSelected(date),
                                        "border border-primary text-primary": isToday(date),
                                    })}
                                >
                                    {format(date, "dd")}
                                </div>
                            ))}
                        </div>
                    ))}
                </div> */}

                <div className="grid grid-cols-2 gap-x-5">
                    <div className="flex flex-col">
                        <Days />

                        <div className="grid grid-cols-7 grid-rows-6">
                            {flatten(firstActiveMonth).map((date) => (
                                <div
                                    key={format(date, "dd-MM-yyyy")}
                                    onClick={() => onSelect(date)}
                                    className={datesClassName(date, firstSundayOfFirstMonth)}
                                >
                                    {format(date, "dd")}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <Days />

                        <div className="grid grid-cols-7 grid-rows-6">
                            {flatten(secondActiveMonth).map((date) => (
                                <div
                                    key={format(date, "dd-MM-yyyy")}
                                    onClick={() => onSelect(date)}
                                    className={datesClassName(date, firstSundayOfSecondMonth)}
                                >
                                    {format(date, "dd")}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
