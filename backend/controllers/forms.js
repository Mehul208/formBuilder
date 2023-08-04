const FormSchema = require("../models/forms");

const getForms = async (req, res) => {
    try {
        const data = await FormSchema.find().select("-formData");
        if (data) return res.status(200).send({ data: data });
        return res.status(404).json({ error: "Nothing Found" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const createForm = async (req, res) => {
    try {
        const { formId, name } = req.body;
        if (!formId || !name)
            return res.status(304).send({ error: "Please provide all values" });
        const existingForm = await FormSchema.findOne({ formId: formId });
        if (existingForm)
            return res.status(304).send({ error: "Form already exists" });

        await new FormSchema({
            formId: formId,
            name: name,
        }).save();

        return res.status(201).send({ message: "Form created successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getFormData = async (req, res) => {
    try {
        const { formId } = req.body;
        if (!formId)
            return res.status(304).send({ error: "Please provide a form Id" });
        const formdata = await FormSchema.findOne({ formId: formId });
        if (formdata) return res.status(201).send({ data: formdata });
        return res.status(404).send({ error: "Not found" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateFormData = async (req, res) => {
    try {
        const { formId, newFormData } = req.body;
        if (!formId)
            return res.status(304).send({ error: "Please provide a form Id" });
        await FormSchema.updateOne(
            { formId: formId },
            { formData: newFormData }
        );
        return res.status(201).send({ message: "Data Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getForms, createForm, updateFormData, getFormData };
