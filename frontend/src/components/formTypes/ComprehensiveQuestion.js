import React, { useState } from "react";

const ComprehensiveQuestion = ({ data, setData, index }) => {
    const [comprehensionText, setComprehensionText] = useState("");
    const [questions, setQuestions] = useState([]);

    const handleSaveQuestion = () => {
        const newData = {
            index,
            type: "comp",
            questionData: { comprehensionText, questions },
        };
        setData([...data, newData]);
        console.log(data);
    };

    const handleComprehensionTextChange = (e) => {
        setComprehensionText(e.target.value);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", options: [] }]);
    };

    const handleQuestionChange = (index, updatedQuestion) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = updatedQuestion;
        setQuestions(updatedQuestions);
        console.log(questions);
    };

    return (
        <div className="mb-4">
            <textarea
                value={comprehensionText}
                onChange={handleComprehensionTextChange}
                placeholder="Enter main comprehension text..."
                className="w-full border rounded-md px-2 py-1"
            />
            <button
                onClick={handleAddQuestion}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
                Add Question
            </button>
            <div className="mt-4">
                {questions.map((question, index) => (
                    <div key={index} className="mb-4">
                        <input
                            type="text"
                            value={question.question}
                            onChange={(e) =>
                                handleQuestionChange(index, {
                                    ...question,
                                    question: e.target.value,
                                })
                            }
                            placeholder="Enter question..."
                            className="border rounded-md px-2 py-1"
                        />
                        <div className="mt-2">
                            {question.options.map((option, optionIndex) => (
                                <input
                                    key={optionIndex}
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                        const updatedOptions = [
                                            ...question.options,
                                        ];
                                        updatedOptions[optionIndex] =
                                            e.target.value;
                                        handleQuestionChange(index, {
                                            ...question,
                                            options: updatedOptions,
                                        });
                                    }}
                                    placeholder={`Enter option ${
                                        optionIndex + 1
                                    }...`}
                                    className="border rounded-md px-2 py-1 ml-2"
                                />
                            ))}
                        </div>
                        <button
                            onClick={() =>
                                handleQuestionChange(index, {
                                    ...question,
                                    options: [...question.options, ""],
                                })
                            }
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-2 ml-2"
                        >
                            Add Option
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={handleSaveQuestion}
                className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded mt-6"
            >
                Save Question
            </button>
        </div>
    );
};

export default ComprehensiveQuestion;
