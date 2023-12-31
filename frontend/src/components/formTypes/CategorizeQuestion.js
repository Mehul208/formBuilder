import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const CategorizeQuestion = ({ data, setData, index, existingData }) => {
    const [categories, setCategories] = useState(
        (existingData && existingData.categories) || [""]
    );
    const [items, setItems] = useState(
        (existingData && existingData.items) || [{ item: "", categoryIndex: 0 }]
    );

    const handleSaveQuestion = () => {
        const newData = {
            index,
            type: "categorize",
            questionData: { categories, items },
        };
        if (existingData) {
            console.log("in 19");
            const updatedArray = data.filter((item) => item.index !== index);
            setData([...updatedArray, newData]);
        } else setData([...data, newData]);
        alert("Question saved successfully");
    };

    const handleCategoryChange = (e, index) => {
        const updatedCategories = [...categories];
        updatedCategories[index] = e.target.value;
        setCategories(updatedCategories);
    };

    const handleAddCategory = () => {
        setCategories([...categories, ""]);
    };

    const handleItemChange = (e, index) => {
        const updatedItems = [...items];
        updatedItems[index].item = e.target.value;
        setItems(updatedItems);
        console.log(items);
    };

    const handleAddItem = () => {
        setItems([...items, { item: "", categoryIndex: 0 }]);
    };

    const handleCategorySelect = (e, itemIndex) => {
        const updatedItems = [...items];
        updatedItems[itemIndex].categoryIndex = parseInt(e.target.value, 10);
        setItems(updatedItems);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(items);
        const [removedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removedItem);
        setItems(reorderedItems);
    };

    return (
        <div className="mb-4">
            <div>
                <span className="pl-1 font-medium">Categories:</span>
                <div className="my-2">
                    {categories.map((category, index) => (
                        <input
                            key={index}
                            type="text"
                            value={category}
                            onChange={(e) => handleCategoryChange(e, index)}
                            placeholder="Enter category title..."
                            className="border rounded-md px-2 py-1 mr-2"
                        />
                    ))}
                    <span
                        className="text-gray-500 cursor-pointer"
                        onClick={() => handleAddCategory()}
                    >
                        +
                    </span>
                </div>
            </div>
            <div>
                <span className="pl-1 font-medium">Items:</span>
                <div className="my-2">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={item.item}
                                onChange={(e) => handleItemChange(e, index)}
                                placeholder="Enter item..."
                                className="border rounded-md px-2 py-1 flex-grow mr-2"
                            />
                            <select
                                value={item.categoryIndex}
                                onChange={(e) => handleCategorySelect(e, index)}
                                className="border rounded-md px-2 py-1"
                            >
                                {categories.map((category, categoryIndex) => (
                                    <option
                                        key={categoryIndex}
                                        value={categoryIndex}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {index === items.length - 1 && ( // Add new item input box if last item
                                <span
                                    className="text-gray-500 cursor-pointer mx-2"
                                    onClick={() => handleAddItem()}
                                >
                                    +
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="items" direction="vertical">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="mt-4"
                        >
                            {items.map((item, index) => (
                                <Draggable
                                    key={index}
                                    draggableId={`item-${index}`}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className="bg-gray-200 px-2 py-1 rounded-md mb-2">
                                                {item.item}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button
                onClick={handleSaveQuestion}
                className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded mt-6"
            >
                Save Question
            </button>
        </div>
    );
};

export default CategorizeQuestion;
