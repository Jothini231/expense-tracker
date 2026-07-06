import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/income/IncomeOverview';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
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
                onAddIncome = {() => setOpenAddIncomeModel(true)}
              />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Income