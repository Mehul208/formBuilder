const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
    index: { type: Number, required: true },
    type: { type: String, required: true },
    questionData: { type: Object, required: true },
});

const formSchema = new mongoose.Schema(
    {
        formId: { type: String, required: true },
        name: { type: String, required: true },
        formData: { type: [formDataSchema], default: [] },
    },
    { timestamps: true }
);

const FormSchema = mongoose.model("forms", formSchema);

module.exports = FormSchema;
