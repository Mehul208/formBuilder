import React, { useState } from "react";
import { useDrop } from "react-dnd";

const DropItemCat = ({ title }) => {
    const [dropItems, updateDropItems] = useState([]);
    const handleDrop = (item) => {
        updateDropItems((prevItems) => [...prevItems, item]);
    };
    const [, drop] = useDrop(() => ({
        accept: "DIV.ITEM",
        drop: (item) => handleDrop(item.item),
    }));
    return (
        <div className="p-4 border-2 h-64 rounded-xl mx-2 w-1/2" ref={drop}>
            <h3 className="text-center mb-1">{title}</h3> <hr />
            <div className="flex flex-col items-center py-2">
                {dropItems.map((item, i) => (
                    <div
                        key={i}
                        className="w-28 p-2 my-1 rounded-2xl bg-blue-200 text-center items-center"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DropItemCat;
