const xlsx = require('xlsx');
const User = require("../models/User");
const Expense = require("../models/Expense");
const { GoogleGenAI } = require('@google/genai');

exports.addExpense = async(req , res) => {
  const userId = req.user.id;

  try{
    const { icon, category, amount, date} = req.body;

    if(!category || !amount || !date){
        return res.status(400).json({message : "All fields are required" });
    }

    const newExpense = new Expense({
        userId,
        icon,
        category,
        amount,
        date: new Date(date)
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  }catch(err){
    res.status(500).json({message: "Server error"});
  }
}

exports.getAllExpense = async(req , res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    }catch(error){
        res.status(500).json({message: " Server Error"});
    }
}

exports.deleteExpense = async(req , res) => {

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully" });
    }catch(error){
        res.status(500).json({message : "Server error"});
    }
}

exports.downloadExpenseExcel = async (req, res) =>{
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date:-1});

        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb , ws, "expense");
        xlsx.writeFile(wb,'Expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

exports.analyzeReceipt = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No receipt image provided" });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                'Analyze this receipt and extract the total amount, vendor name, and date. Suggest a single category strictly from this list: Food, Travel, Entertainment, Shopping, Rent, Groceries, Utilities, Health, Other. Return ONLY valid JSON in this exact structure, with no markdown formatting: {"amount": number, "vendor": "string", "date": "YYYY-MM-DD", "category": "string"}',
                {
                    inlineData: {
                        data: req.file.buffer.toString("base64"),
                        mimeType: req.file.mimetype
                    }
                }
            ],
            config: {
                responseMimeType: "application/json",
            }
        });

        const data = JSON.parse(response.text);
        res.status(200).json(data);
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: "Failed to analyze receipt", error: error.message });
    }
};