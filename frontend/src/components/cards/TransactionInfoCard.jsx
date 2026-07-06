import React from "react";
import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const isIncome = type === "income";

  return (
    <div className="group flex items-center gap-3.5 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
      {/* Icon */}
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${
        isIncome ? "bg-green-50" : "bg-red-50"
      }`}>
        {icon ? (
          <img src={icon} alt={title} className="w-5 h-5 object-contain" />
        ) : (
          <LuUtensils className={`text-base ${isIncome ? "text-green-500" : "text-red-400"}`} />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-700 truncate">{title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{date}</p>
      </div>

      {/* Amount + Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {!hideDeleteBtn && (
          <button
            className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
            onClick={onDelete}
          >
            <LuTrash2 size={15} />
          </button>
        )}

        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
          isIncome
            ? "bg-green-50 text-green-600"
            : "bg-red-50 text-red-500"
        }`}>
          {isIncome ? <LuTrendingUp size={13} /> : <LuTrendingDown size={13} />}
          {isIncome ? "+" : "-"} LKR{amount}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
