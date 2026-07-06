import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/income/IncomeOverview';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import Model from '../../components/Model';
import AddIncomeForm from '../../components/income/AddIncomeForm';
import toast from 'react-hot-toast';
const Income = () => {

  const [incomeData,setIncomeData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddIncomeModel, setopenAddIncomeModel] = useState(false);

  //Get All income details
  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response =   await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

      if(response.data){
        setIncomeData(response.data);
      }
    }catch(error){
      console.log("Something went wrong.try again.", error);
    }finally{
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income;

    if(!source.trim()){
      toast.error("Source is required.");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if(!date){
      toast.error("Date is required.");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon,
      });

      setopenAddIncomeModel(false);
      toast.success("Income added successfully.");
      fetchIncomeDetails();
    }catch(error){
      console.error("Error adding income.",error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    fetchIncomeDetails();

    return() => {};
  },[]);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="p-5 max-w-7xl mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          <div className=''> 
            <IncomeOverview
                transactions={incomeData}
                onAddIncome={() => setopenAddIncomeModel(true)}
              />
          </div>
        </div>
      </div>

      <Model
          isOpen={openAddIncomeModel}
          onClose={() => setopenAddIncomeModel(false)}
          title="Add Income"
        >
        <AddIncomeForm  onAddIncome={handleAddIncome}/>
      </Model>
    </DashboardLayout>
  )
}

export default Income