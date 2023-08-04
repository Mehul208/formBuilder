import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RenderCategorize from "./QuestionRenderers/RenderCategorize";
import RenderCloze from "./QuestionRenderers/RenderCloze";
import RenderComp from "./QuestionRenderers/RenderComp";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getData } from "../services/formApi";

const FormPreview = () => {
    const { formId } = useParams();
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getFormData = async () => {
            setLoading(true);
            setError();
            try {
                const res = await getData({ formId: formId });
                if (res.data) {
                    setData(res.data);
                }
                if (res.error) setError(res.error);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        if (!data) {
            getFormData();
        }
    }, [data, formId]);

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl text-center border-b-2 pb-6 font-medium mb-4">
                Form Preview
            </h1>
            {error && <div>{error}</div>}
            {loading ? (
                "loading ... "
            ) : (
                <form>
                    <div className="w-1/2 mx-auto">
                        {data && data.formData
                            ? data.formData.map((form, i) => {
                                  switch (form.type) {
                                      case "categorize":
                                          return (
                                              <DndProvider
                                                  backend={HTML5Backend}
                                                  key={i}
                                              >
                                                  <RenderCategorize
                                                      questionData={
                                                          form.questionData
                                                      }
                                                  />
                                              </DndProvider>
                                          );
                                      case "cloze":
                                          return (
                                              <DndProvider
                                                  backend={HTML5Backend}
                                                  key={i}
                                              >
                                                  <RenderCloze
                                                      questionData={
                                                          form.questionData
                                                      }
                                                  />
                                              </DndProvider>
                                          );
                                      case "comp":
                                          return (
                                              <RenderComp
                                                  questionData={
                                                      form.questionData
                                                  }
                                                  key={i}
                                              />
                                          );
                                      default:
                                          return <p>Error Occured</p>;
                                  }
                              })
                            : "Create questions to see the preview"}
                    </div>
                </form>
            )}
        </div>
    );
};

export default FormPreview;
