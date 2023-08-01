import React from "react";
import { useDrag } from "react-dnd";

const DragOption = ({ option, updateOptions }) => {
    const [, drag] = useDrag(() => ({
        type: "DIV.OPTION",
        item: { option },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                updateOptions((options) =>
                    options.filter((key) => key !== item.option)
                );
            }
        },
    }));
    return (
        <div
            ref={drag}
            id={option}
            className="w-28 p-2 m-2 rounded-2xl bg-purple-200 text-center cursor-grab"
        >
            {option}
        </div>
    );
};

export default DragOption;
