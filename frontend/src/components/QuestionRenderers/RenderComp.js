import React from "react";

const RenderComp = ({ questionData }) => {
    return (
        <div className="p-8 my-4 mx-auto border-2 border-slate-200 rounded-xl">
            <div>
                <h3 className="text-xl font-bold text-slate-500">
                    Read the comprehension and answer the questions below
                </h3>
                <p className="my-4 w-4/5 text-md ">
                    {questionData.comprehensionText}
                </p>
            </div>
            <div>
                <h3 className="text-lg font-medium text-slate-500">
                    Now answer these questions
                </h3>
                <div className="py-2">
                    {questionData.questions.map((item, i) => (
                        <div key={i} className="text-lg mb-4">
                            <h3 className="text-lg font-medium my-2">{`Q${
                                i + 1
                            }. ${item.question}`}</h3>
                            <div className="px-4">
                                {item.options.map((option, k) => (
                                    <div
                                        className="flex items-center pl-3 border-2 w-1/2 rounded-xl my-2 hover:bg-slate-100 cursor-pointer"
                                        key={k}
                                    >
                                        <input
                                            id={option}
                                            type="radio"
                                            value={option}
                                            name={`option-q${i + 1}`}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
                                        />
                                        <label
                                            htmlFor={option}
                                            className="w-full py-3 ml-2 text-sm font-medium cursor-pointer"
                                        >
                                            {option}{" "}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RenderComp;
