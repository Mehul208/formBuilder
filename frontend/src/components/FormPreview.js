import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RenderCategorize from "./QuestionRenderers/RenderCategorize";
import RenderCloze from "./QuestionRenderers/RenderCloze";
import RenderComp from "./QuestionRenderers/RenderComp";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const FormPreview = () => {
    const { formId } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        if (!data) {
            let formData = JSON.parse(localStorage.getItem("forms"));
            formData = formData.find((form) => form.id === formId);
            console.log(formData);
            setData(formData || []);
        }
    }, [data, formId]);

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-4">Form Preview</h1>
            <form>
                <div className="w-1/2 mx-auto">
                    {data
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
                                              questionData={form.questionData}
                                              key={i}
                                          />
                                      );
                                  default:
                                      return <p>Error Occured</p>;
                              }
                          })
                        : "Loading ...."}
                </div>
            </form>
        </div>
    );
};

export default FormPreview;
