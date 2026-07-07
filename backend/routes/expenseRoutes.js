const express = require("express");

const{
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
    analyzeReceipt
} = require("../controllers/expenseController");
const {protect} = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/add" , protect , addExpense);
router.get("/get", protect , getAllExpense);
router.delete("/:id" , protect , deleteExpense);
router.get("/downloadExcel", protect, downloadExpenseExcel);
router.post("/analyze-receipt", protect, upload.single("receipt"), analyzeReceipt);

module.exports = router;