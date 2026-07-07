import React, { useState } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from '../EmojiPickerPopup';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';

const AddExpenseForm = ({onAddExpense}) => {
   const [expense,setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChange = (key,value) => setExpense({...expense, [key]: value});

    const handleScanReceipt = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("receipt", file);

        try {
            const toastId = toast.loading("Analyzing receipt with AI...");
            const response = await axiosInstance.post(API_PATHS.EXPENSE.ANALYZE_RECEIPT, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 30000 // Give Gemini 30 seconds to process the image
            });
            
            const { amount, date, category } = response.data;
            
            setExpense(prev => ({
                ...prev,
                amount: amount || prev.amount,
                date: date || prev.date,
                category: category || prev.category
            }));

            toast.success("Receipt analyzed successfully!", { id: toastId });
        } catch (error) {
            console.error("Failed to analyze receipt", error);
            toast.error("Failed to analyze receipt. Please try again.");
        }
        
        // Reset file input so same file can be selected again
        e.target.value = null;
    };

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Add Expense</h2>
            <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-blue-200 shadow-sm flex items-center gap-2">
                <span>Scan Receipt ✨</span>
                <input 
                    type="file" 
                    accept="image/jpeg, image/png, image/jpg" 
                    className="hidden" 
                    onChange={handleScanReceipt}
                />
            </label>
        </div>

        <EmojiPickerPopup
            icon={expense.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <Input 
            value={expense.category}
            onChange={({target}) => handleChange("category", target.value)}
            label="Category"
            placeholder="Rent, Groceries, etc "
            type="text"
        />

        <Input 
            value={expense.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Amount"
            placeholder=""
            type="number"
        />

        <Input 
            value={expense.date}
            onChange={({target}) => handleChange("date", target.value)}
            label="Date"
            placeholder=""
            type="date"
        />

    <div className='flex justify-end mt-6'>
        <button
            type='button'
            className='add-btn add-btn-fill'
            onClick={() => onAddExpense(expense)}
        >
            Add Expense
        </button>
    </div>
        
    </div>
  )
}

export default AddExpenseForm