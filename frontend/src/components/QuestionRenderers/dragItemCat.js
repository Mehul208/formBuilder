import React from "react";
import { useDrag } from "react-dnd";

const DragItemCat = ({ item, categoryIndex, updateItems }) => {
    const [, drag] = useDrag(() => ({
        type: "DIV.ITEM",
        item: { item },
        end: (dragItem, monitor) => {
            if (monitor.didDrop()) {
                updateItems((items) =>
                    items.filter((key) => key.item !== dragItem.item)
                );
            }
        },
    }));
    return (
        <div
            ref={drag}
            id={categoryIndex}
            className="w-28 p-2 m-2 rounded-2xl bg-blue-200 text-center cursor-grab"
        >
            {item}
        </div>
    );
};

export default DragItemCat;
