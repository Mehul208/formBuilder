const {
    getForms,
    getFormData,
    createForm,
    updateFormData,
} = require("../controllers/forms");

const router = require("express").Router();

router.get("/all", getForms);
router.post("/data", getFormData);
router.post("/create", createForm);
router.post("/update", updateFormData);

module.exports = router;
