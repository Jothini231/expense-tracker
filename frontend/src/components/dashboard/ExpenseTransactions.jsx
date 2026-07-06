import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h5 className='text-base font-semibold text-gray-800'>Expenses</h5>
          <p className='text-xs text-gray-400 mt-0.5'>Last 30 days spending</p>
        </div>
        <button
          className='flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer'
          onClick={onSeeMore}
        >
          See All <LuArrowRight className='text-sm' />
        </button>
      </div>

      <div className='space-y-1'>
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("DD MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
        {(!transactions || transactions.length === 0) && (
          <p className='text-sm text-gray-400 text-center py-6'>No expenses found</p>
        )}
      </div>
    </div>
  )
}

export default ExpenseTransactions