import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 relative overflow-hidden">
      {/* Decorative gradient blobs for a modern feel */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>

      {/* Moving dotted background animation */}
      <div className="absolute inset-0 bg-dots z-0"></div>

      <div className="z-10 w-full max-w-md px-10 py-10 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/60 mx-4">
        <div className="flex flex-col items-center justify-center mb-6">
          <img src="/logo.png" alt="SpendWise Logo" className="w-14 h-14 mb-4 drop-shadow-md transform transition-transform hover:scale-105" />
          <h2 className="text-2xl font-extrabold tracking-tight">
            <span className="text-black">Spend</span>
            <span className="text-primary">Wise</span>
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
