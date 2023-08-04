import React, { useEffect, useState } from "react";
import FormQuestion from "./FormQuestion";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const FormEditor = () => {
    const [questions, setQuestions] = useState([]);
    const [headerImage, setHeaderImage] = useState(null);
    const [data, setData] = useState([]);
    const [localData, setLocalData] = useState();
    const { formId } = useParams();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("forms"));
        const existing = storedData.find((form) => form.id === formId);
        if (!localData && existing && existing.formData) {
            setLocalData(existing.formData);
            setData(existing.formData);
        }
        console.log(data);
    }, [localData, formId, data]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { type: "", content: "" }]);
    };

    const handleQuestionChange = (index, updatedQuestion) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = updatedQuestion;
        setQuestions(updatedQuestions);
        console.log(questions);
    };

    const handleSaveForm = async () => {
        try {
            // const formData = { questions, headerImage };
            // const response = await axios.post("/api/forms", formData);
            // console.log(response.data); // Assuming the API returns the saved form data
            // Redirect to the form preview page with the formId
            // You can use a router or window.location to redirect
            if (data.length) {
                const localData = JSON.parse(localStorage.getItem("forms"));
                let currentForm = localData.find((form) => form.id === formId);
                currentForm["formData"] = data;
                let updatedData = localData.filter(
                    (form) => form.id !== formId
                );
                localStorage.setItem(
                    "forms",
                    JSON.stringify([...updatedData, currentForm])
                );
                alert("Form saved successfully")
            }
        } catch (error) {
            console.error("Error saving form:", error);
        }
    };

    const handleHeaderImageChange = (e) => {
        const file = e.target.files[0];
        setHeaderImage(file);
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl text-center border-b-2 pb-6 font-medium mb-4">
                Form Editor
            </h1>
            <div className="my-8 flex justify-center items-center">
                <label htmlFor="headerImage" className="font-semibold mx-4">
                    Header Image:
                </label>
                {headerImage && <img src={headerImage} alt="header" />}
                <input
                    type="file"
                    id="headerImage"
                    onChange={handleHeaderImageChange}
                    className="block"
                />
            </div>

            <div className="mt-4">
                {localData &&
                    localData.map((question) => (
                        <FormQuestion
                            key={question.index}
                            index={question.index}
                            question={{ type: question.type }}
                            onChange={handleQuestionChange}
                            data={data}
                            setData={setData}
                            localData={question.questionData}
                        />
                    ))}
                {questions.map((question, index) => (
                    <FormQuestion
                        key={localData ? localData.length + index : index}
                        index={localData ? localData.length + index : index}
                        question={question}
                        onChange={handleQuestionChange}
                        data={data}
                        setData={setData}
                    />
                ))}
                <div className="text-center">
                    <button
                        onClick={handleAddQuestion}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                        Add Question
                    </button>
                    <button
                        onClick={handleSaveForm}
                        className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded mt-6 mx-4"
                    >
                        Save Form
                    </button>
                    <Link
                        to={`/preview/${formId}`}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded mt-6"
                    >
                        Preview Form
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FormEditor;
