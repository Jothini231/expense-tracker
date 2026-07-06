import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartdata] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartdata(result);
    return () => {};
  }, [data]);

  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
      <div className='mb-2'>
        <h5 className='text-base font-semibold text-gray-800'>Spending Chart</h5>
        <p className='text-xs text-gray-400 mt-0.5'>Last 30 days by category</p>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  )
}

export default Last30DaysExpenses
