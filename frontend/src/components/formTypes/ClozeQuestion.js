import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ClozeQuestion = ({ data, setData, index, localData }) => {
    const [sentence, setSentence] = useState(
        (localData && localData.sentence) || ""
    );
    const [underlinedWords, setUnderlinedWords] = useState(
        (localData && localData.underlinedWords) || []
    );
    const [options, setOptions] = useState(
        (localData && localData.options) || []
    );

    const handleSaveQuestion = () => {
        const newData = {
            index,
            type: "cloze",
            questionData: { sentence, underlinedWords, options },
        };
        if (localData) {
            const updatedArray = data.filter((item) => item.index !== index);
            setData([...updatedArray, newData]);
        } else setData([...data, newData]);
        alert("Question saved successfully");
    };

    const handleSentenceChange = (e) => {
        setSentence(e.target.value);
    };

    const handleOptionChange = (e, optionIndex) => {
        const updatedOptions = [...options];
        updatedOptions[optionIndex] = e.target.value;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, ""]);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedOptions = Array.from(options);
        const [removedOption] = reorderedOptions.splice(result.source.index, 1);
        reorderedOptions.splice(result.destination.index, 0, removedOption);
        setOptions(reorderedOptions);
    };

    const handleUnderlineWord = (word) => {
        setUnderlinedWords([...underlinedWords, word]);
        // Automatically add the underlined word to options if not already present
        if (!options.includes(word)) {
            setOptions([...options, word]);
        }
    };

    const handleRemoveUnderline = (word) => {
        setUnderlinedWords(underlinedWords.filter((w) => w !== word));
        // Automatically remove the underlined word from options
        setOptions(options.filter((option) => option !== word));
    };

    return (
        <div className="mb-4">
            <span className="pl-1 font-medium">Write the question to show</span>
            <textarea
                value={sentence}
                onChange={handleSentenceChange}
                placeholder="Enter sentence or paragraph..."
                className="w-full border rounded-md px-2 py-1 my-2"
            />
            <div className="my-2">
                <span className="pl-1 font-medium">
                    Select the words to be replaced by blanks:
                </span>
                <div className="flex flex-wrap m-1">
                    {sentence.split(" ").map((word, index) => (
                        <span
                            key={index}
                            className={`underline cursor-pointer ${
                                underlinedWords.includes(word)
                                    ? "bg-blue-200"
                                    : ""
                            }`}
                            onClick={() =>
                                underlinedWords.includes(word)
                                    ? handleRemoveUnderline(word)
                                    : handleUnderlineWord(word)
                            }
                        >
                            {word} / 
                        </span>
                    ))}
                </div>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="options" direction="vertical">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="mt-4"
                        >
                            {options.map((option, index) => (
                                <Draggable
                                    key={index}
                                    draggableId={`option-${index}`}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="flex items-center mb-2"
                                        >
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) =>
                                                    handleOptionChange(e, index)
                                                }
                                                placeholder="Enter option..."
                                                className="border rounded-md px-2 py-1 flex-grow mr-2"
                                            />
                                            <span
                                                className="text-gray-500 cursor-pointer"
                                                onClick={() =>
                                                    handleAddOption()
                                                }
                                            >
                                                +
                                            </span>
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

export default ClozeQuestion;
