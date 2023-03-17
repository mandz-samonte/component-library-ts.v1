import { useMonth } from "@datepicker-react/hooks";
import React, { useState, useEffect, useMemo } from "react";
import { useLilius } from "use-lilius";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import classNames from "classnames";
import {
    addWeeks,
    compareAsc,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
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

interface DatepickerProps {}

export default function DatepickerOne({}: DatepickerProps) {
    const [isVisible, setVisible] = useState(false);
    const {
        calendar,
        deselect,
        inRange,
        isSelected,
        select,
        selected,
        selectRange,
        viewing,
        viewNextMonth,
        viewPreviousMonth,
        viewToday,
    } = useLilius({ numberOfMonths: 2 });
    const firstActiveMonth = useMemo(() => calendar[0], [calendar]);
    const secondActiveMonth = useMemo(() => calendar[1], [calendar]);

    const firstSundayOfFirstMonth = useMemo(() => calendar[0][0][6], [calendar]);
    const firstSundayOfSecondMonth = useMemo(() => calendar[1][0][6], [calendar]);

    const onClickDate = (date: Date) => {
        const sorted = selected.sort((a, b) => compareAsc(a, b));

        if (sorted.length === 0) {
            // Check if there's an item in sorted or selected
            // If sorted is empty, then add the date as selected
            // select function only stores 1 date at a time

            select(date);
        } else if (isSelected(date)) {
            // if the date is ALREADY selected

            if (selected.length === 1) {
                // if you select the start date again, you will deselect the range
                deselect(date);
            } else {
                //
                const range = eachDayOfInterval({ start: sorted[0], end: date });
                console.log(range);
                const diff = sorted.filter((d) => range.map((a) => a.getTime()).includes(d.getTime()));

                selectRange(diff[0], diff[diff.length - 1], true);
            }
        } else {
            //
            selectRange(sorted[0], date, true);
        }
    };

    useEffect(() => {
        console.log(firstSundayOfSecondMonth);
    }, []);

    return (
        <div className="relative">
            <div className="px-5 py-3 rounded-lg border border-primary bg-white">
                <span>Select Date</span>
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
                        <span key={firstWeek[6].toDateString()}>{format(firstWeek[6], "MMMM yyyy")}</span>
                    ))}

                    <button
                        onClick={viewNextMonth}
                        className="w-10 h-10 rounded-lg border flex items-center justify-center"
                    >
                        <GrFormNext />
                    </button>
                </div>

                {/* <div className="grid grid-cols-2 gap-x-5">
                    {calendar.map((month) => (
                        <div className="grid grid-cols-7">
                            <Days />

                            {flatten(month).map((day) => (
                                <div
                                    key={format(day, "dd-MM-yyyy")}
                                    className={classNames("w-10 h-10 flex items-center justify-center", {
                                        "text-zinc-300": !inRange(
                                            day,
                                            startOfMonth(firstSundayOfFirstMonth),
                                            endOfMonth(firstSundayOfSecondMonth)
                                        ),
                                        "bg-primary text-white": isToday(day),
                                    })}
                                >
                                    {format(day, "dd")}
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
                                    onClick={() => onClickDate(date)}
                                    className={classNames("w-10 h-10 flex items-center justify-center", {
                                        "text-zinc-400": !inRange(
                                            date,
                                            startOfMonth(firstSundayOfFirstMonth),
                                            endOfMonth(firstSundayOfFirstMonth)
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
                    </div>

                    <div className="flex flex-col">
                        <Days />

                        <div className="grid grid-cols-7 grid-rows-6">
                            {flatten(secondActiveMonth).map((date) => (
                                <div
                                    key={format(date, "dd-MM-yyyy")}
                                    onClick={() => onClickDate(date)}
                                    className={classNames("w-10 h-10 flex items-center justify-center", {
                                        "text-zinc-400": !inRange(
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
                    </div>
                </div>
            </div>
        </div>
    );
}
