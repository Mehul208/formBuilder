import React, { useState } from "react";
import DragItemCat from "./dragItemCat";
import DropItemCat from "./dropItemCat";

const RenderCategorize = ({ questionData }) => {
    const [items, updateItems] = useState(questionData.items || []);
    const categories = questionData.categories || [];
    return (
        <div className="p-8 my-4 mx-auto border-2 border-slate-200 rounded-xl">
            <h3 className="text-xl text-center font-bold text-slate-500 ml-2">
                Drag these items into their respective categories
            </h3>

            <div className="flex justify-center my-4">
                {items.length ? (
                    items.map((item, i) => (
                        <DragItemCat
                            {...item}
                            key={item.item}
                            updateItems={updateItems}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
            <div className="flex justify-center">
                {categories.length &&
                    categories.map((category, i) => (
                        <DropItemCat key={i} title={category} />
                    ))}
            </div>
        </div>
    );
};

export default RenderCategorize;
