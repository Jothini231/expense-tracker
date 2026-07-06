import React, { useEffect, useState } from 'react'
import CustomPieChart from '../charts/CustomPieChart'

const COLORS = ["#2563eb", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithchart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
      <div className='mb-2'>
        <h5 className='text-base font-semibold text-gray-800'>Income Sources</h5>
        <p className='text-xs text-gray-400 mt-0.5'>Last 60 days breakdown</p>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`LKR${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  )
}

export default RecentIncomeWithchart