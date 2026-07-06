import React from 'react'
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ["#2563eb", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpenses },
    { name: "Total Income", amount: totalIncome }
  ];

  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
      <div className='mb-2'>
        <h5 className='text-base font-semibold text-gray-800'>Financial Overview</h5>
        <p className='text-xs text-gray-400 mt-0.5'>Balance breakdown</p>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`LKR${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        showLegend={false}
        height={300}
      />

      {/* Legend summary */}
      <div className='grid grid-cols-3 gap-2 mt-2'>
        {balanceData.map((item, index) => (
          <div key={index} className='text-center'>
            <div className='w-2.5 h-2.5 rounded-full mx-auto mb-1' style={{ backgroundColor: COLORS[index] }}></div>
            <p className='text-[10px] text-gray-400 leading-tight'>{item.name}</p>
            <p className='text-xs font-semibold text-gray-700'>LKR {item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FinanceOverview