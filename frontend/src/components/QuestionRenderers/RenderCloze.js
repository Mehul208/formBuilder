import React, { useState } from "react";
import DragOption from "./dragOption";
import DropOption from "./dropOption";

const RenderCloze = ({ questionData }) => {
    const [sentence, updateSentence] = useState(
        questionData.sentence.split(" ") || []
    );
    const [words, updateWords] = useState(questionData.underlinedWords || []);
    const [options, setOptions] = useState(questionData.options || []);
    return (
        <div className="p-8 my-4 mx-auto border-2 border-slate-200 rounded-xl">
            <h3 className="text-xl text-center font-bold text-slate-500 mb-5 ">
                Drag these options to their respective positions
            </h3>
            <div>
                <div className="flex justify-center">
                    {options.map((option, i) => (
                        <DragOption
                            option={option}
                            updateOptions={setOptions}
                            key={option}
                        />
                    ))}
                </div>
                <div className="flex flex-wrap items-center">
                    {sentence.length
                        ? sentence.map((word, i) => {
                              const space =
                                  sentence.length - 1 === i ? "." : " ";
                              const index = words.indexOf(word);
                              if (index !== -1) return <DropOption />;
                              return word + space;
                          })
                        : ""}
                </div>
            </div>
        </div>
    );
};

export default RenderCloze;
