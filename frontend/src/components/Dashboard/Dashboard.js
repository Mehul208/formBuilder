import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createForm, getAllForms } from "../../services/formApi";

const Dashboard = () => {
    const [forms, setForms] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    // Load forms from local storage on component mount
    useEffect(() => {
        const getForms = async () => {
            setLoading(true);
            setError();
            try {
                const res = await getAllForms();
                if (res.data) setForms(res.data);
                if (res.error) setError(res.error);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        if (!forms) getForms();
    }, [forms]);

    // Save forms to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("forms", JSON.stringify(forms));
    }, [forms]);

    const handleCreateForm = async () => {
        const formName = prompt("Enter the form name:");
        try {
            if (formName) {
                const newForm = {
                    formId: generateUniqueID(),
                    name: formName,
                };
                const res = await createForm(newForm);
                console.log(res);
                alert(res.message);
                setForms([...forms, newForm]);
            }
        } catch (error) {}
    };

    const handleDeleteForm = (formId) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this form?"
        );
        if (shouldDelete) {
            const updatedForms = forms.filter((form) => form.formId !== formId);
            setForms(updatedForms);
        }
    };

    const generateUniqueID = () => {
        return (
            Date.now().toString(36) + Math.random().toString(36).substring(2, 5)
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center border-b-2 pb-6 font-medium mb-4">
                Dashboard
            </h1>
            <div className="mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handleCreateForm}
                >
                    Create New Form
                </button>
            </div>
            {error && <div>{error}</div>}
            {loading ? (
                "loading ... "
            ) : (
                <div className="flex">
                    {forms &&
                        forms.length &&
                        forms.map((form) => (
                            <div
                                key={form.formId}
                                className="border-2 border-slate-300 rounded-md flex flex-col justify-center items-center mb-2 w-64 h-32 mr-4"
                            >
                                <h4 className="text-slate-900 font-medium text-lg">
                                    {form.name}
                                </h4>

                                <div className="mt-4">
                                    <Link to={`/editor/${form.formId}`}>
                                        <button className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded mx-2 "
                                        onClick={() =>
                                            handleDeleteForm(form.formId)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/preview/${form.formId}`}>
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                                            Preview
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
