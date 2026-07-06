import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='relative overflow-hidden flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
      {/* Background decoration */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 ${color}`}></div>

      {/* Icon */}
      <div className={`relative w-13 h-13 flex items-center justify-center text-[22px] text-white ${color} rounded-xl shadow-lg flex-shrink-0`}
        style={{ width: '52px', height: '52px' }}>
        {icon}
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0'>
        <p className='text-xs font-medium text-gray-400 uppercase tracking-wider mb-1'>{label}</p>
        <p className='text-xl font-bold text-gray-800 truncate'>LKR {value}</p>
      </div>
    </div>
  )
}

export default InfoCard