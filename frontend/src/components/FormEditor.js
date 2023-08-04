import React, { useEffect, useState } from "react";
import FormQuestion from "./FormQuestion";
import { Link, useParams } from "react-router-dom";
import { getData, updateData } from "../services/formApi";

const FormEditor = () => {
    const [questions, setQuestions] = useState([]);
    const [headerImage, setHeaderImage] = useState(null);
    const [data, setData] = useState([]);
    const [existingData, setExistingData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const { formId } = useParams();

    useEffect(() => {
        const getFormData = async () => {
            setLoading(true);
            setError();
            try {
                const res = await getData({ formId: formId });
                if (res.data) {
                    setExistingData(res.data.formData);
                    setData(res.data.formData);
                }
                if (res.error) setError(res.error);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        if (!existingData) {
            getFormData();
        }
        console.log(existingData, data);
    }, [existingData, formId, data]);

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
            if (data.length) {
                const postData = {formId:formId, newFormData:data}
                const res = await updateData(postData);
                console.log(res);
                alert("Form saved successfully");
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
            {error && <div>{error}</div>}
            {loading ? (
                "loading ..."
            ) : (
                <>
                    <div className="my-8 flex justify-center items-center">
                        <label
                            htmlFor="headerImage"
                            className="font-semibold mx-4"
                        >
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
                        {existingData &&
                            existingData.map((question) => (
                                <FormQuestion
                                    key={question.index}
                                    index={question.index}
                                    question={{ type: question.type }}
                                    onChange={handleQuestionChange}
                                    data={data}
                                    setData={setData}
                                    existingData={question.questionData}
                                />
                            ))}
                        {questions.map((question, index) => (
                            <FormQuestion
                                key={
                                    existingData
                                        ? existingData.length + index
                                        : index
                                }
                                index={
                                    existingData
                                        ? existingData.length + index
                                        : index
                                }
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
                </>
            )}
        </div>
    );
};

export default FormEditor;
