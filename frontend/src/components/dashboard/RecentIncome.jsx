import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard';

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h5 className='text-base font-semibold text-gray-800'>Income</h5>
          <p className='text-xs text-gray-400 mt-0.5'>Recent income entries</p>
        </div>
        <button
          className='flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-500 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer'
          onClick={onSeeMore}
        >
          See All <LuArrowRight className='text-sm' />
        </button>
      </div>

      <div className='space-y-1'>
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
        {(!transactions || transactions.length === 0) && (
          <p className='text-sm text-gray-400 text-center py-6'>No income records found</p>
        )}
      </div>
    </div>
  )
}

export default RecentIncome