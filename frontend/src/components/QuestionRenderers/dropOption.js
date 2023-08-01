import React, { useState } from "react";
import { useDrop } from "react-dnd";

const DropOption = () => {
    const [dropOption, setDropOption] = useState("");
    const [, drop] = useDrop(() => ({
        accept: "DIV.OPTION",
        drop: (item) => setDropOption(item.option),
    }));
    return (
        <div
            className="w-28 mx-2 rounded-2xl border-2 border-gray-400 bg-slate-200 leading-loose text-center"
            ref={drop}
            style={{ height: "40px" }}
        >
            {dropOption}
        </div>
    );
};

export default DropOption;
