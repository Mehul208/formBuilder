import React, { useEffect, useState } from "react";
import FormQuestion from "./FormQuestion";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const FormEditor = () => {
    const [questions, setQuestions] = useState([]);
    const [headerImage, setHeaderImage] = useState(null);
    const [data, setData] = useState([]);
    const { formId } = useParams();
    // const [formData, setFormData] = useState(localStorage.getItem("forms"));

    // useEffect(()=>{
    //     const localData = localStorage.getItem("forms");
    //     const existing = localData.find((form)=>form.id === formId);
    //     console.log(existing);
    // })

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
            <h1 className="text-3xl font-bold mb-4">Form Editor</h1>
            <div className="mb-4">
                <label htmlFor="headerImage" className="font-semibold">
                    Header Image:
                </label>
                {headerImage && <img src={headerImage} alt="header" />}
                <input
                    type="file"
                    id="headerImage"
                    onChange={handleHeaderImageChange}
                    className="block mt-2"
                />
            </div>

            <div className="mt-4">
                {questions.map((question, index) => (
                    <FormQuestion
                        key={index}
                        index={index}
                        question={question}
                        onChange={handleQuestionChange}
                        data={data}
                        setData={setData}
                    />
                ))}
                <div>
                    <button
                        onClick={handleAddQuestion}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                        Add Question
                    </button>
                </div>
            </div>
            <button
                onClick={handleSaveForm}
                className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded mt-6"
            >
                Save Form
            </button>
            <Link
                to={`/preview/${formId}`}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded mt-6 ml-4"
            >
                Preview Form
            </Link>
        </div>
    );
};

export default FormEditor;
