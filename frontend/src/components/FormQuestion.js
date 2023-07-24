import React, { useState } from "react";
import ComprehensiveQuestion from "./formTypes/ComprehensiveQuestion";
import ClozeQuestion from "./formTypes/ClozeQuestion";
import CategorizeQuestion from "./formTypes/CategorizeQuestion";

const FormQuestion = ({ index, question, onChange, data, setData }) => {
    const [questiontype, setQuestiontype] = useState();
    const [categorizeData, setCategorizeData] = useState([]);
    const handleQuestionTypeChange = (e) => {
        onChange(index, { ...question, type: e.target.value });
        setQuestiontype(e.target.value);
    };

    const handleQuestionContentChange = (e) => {
        onChange(index, { ...question, content: e.target.value });
    };

    return (
        <div className="mb-8 p-8 w-1/2 mx-auto border-2 border-slate-200 rounded-2xl">
            <select
                value={question.type}
                onChange={handleQuestionTypeChange}
                className="border rounded-md px-2 py-1"
            >
                <option value="">Select Question Type</option>
                <option value="categorize">Categorize</option>
                <option value="cloze">Cloze</option>
                <option value="comp">Comprehension</option>
            </select>
            {questiontype === "comp" ? (
                <ComprehensiveQuestion
                    index={index}
                    data={data}
                    setData={setData}
                />
            ) : questiontype === "cloze" ? (
                <ClozeQuestion index={index} data={data} setData={setData} />
            ) : questiontype === "categorize" ? (
                <CategorizeQuestion
                    index={index}
                    data={data}
                    setData={setData}
                />
            ) : (
                <p className="my-2">Please select a question type</p>
            )}
        </div>
    );
};

export default FormQuestion;
