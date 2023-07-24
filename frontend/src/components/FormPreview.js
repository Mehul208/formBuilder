import React from 'react';
import { useParams } from 'react-router-dom';

const FormPreview = () => {
  const { formId } = useParams();
  // Fetch form data by formId from the backend API and render the form preview

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Form Preview</h1>
      {/* Render the form questions here */}
    </div>
  );
};

export default FormPreview;
