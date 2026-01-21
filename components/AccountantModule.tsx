
import React, { useState } from 'react';
import { Student } from '../types';
import { CreditCard, DollarSign, Wallet } from 'lucide-react';

interface Props {
  students: Student[];
  revenue: number;
  onProcessPayment: (id: string, amount: number) => void;
}

const AccountantModule: React.FC<Props> = ({ students, revenue, onProcessPayment }) => {
  const pending = students.filter(s => s.form === 'completed' && s.payment === 'pending');
  // Local state to track custom amounts for each pending student
  const [amounts, setAmounts] = useState<Record<string, string>>({});

  const handleAmountChange = (id: string, value: string) => {
    // Only allow numeric input
    if (/^\d*\.?\d*$/.test(value)) {
      setAmounts(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleProcess = (id: string) => {
    const amountStr = amounts[id] || '500'; // Default to 500 if empty
    const amountNum = parseFloat(amountStr);
    if (!isNaN(amountNum) && amountNum > 0) {
      onProcessPayment(id, amountNum);
    } else {
      alert("Please enter a valid amount");
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Accounting Center</h2>
        <div className="bg-emerald-600 text-white px-5 py-2.5 rounded-2xl shadow-xl shadow-emerald-100 flex items-center gap-3">
          <Wallet className="w-5 h-5 opacity-80" />
          <span className="text-lg font-bold tracking-tight">Total: GH₵ {revenue.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-800">Pending Fee Payments</h3>
          <p className="text-slate-500 text-sm mt-1">Collect admission fees from registered students. Enter the amount received.</p>
        </div>
        
        <div className="p-2">
          {pending.length > 0 ? (
            pending.map(student => (
              <div key={student.id} className="m-2 p-6 rounded-2xl border border-slate-100 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform ${student.gender === 'Male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">{student.name}</h4>
                    <p className="text-slate-400 text-sm font-medium">{student.class}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="flex flex-col items-end">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 mr-1">Enter Amount (GH₵)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₵</span>
                      <input
                        type="text"
                        value={amounts[student.id] ?? '500'}
                        onChange={(e) => handleAmountChange(student.id, e.target.value)}
                        placeholder="500.00"
                        className="w-32 pl-7 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-800 transition-all text-right"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleProcess(student.id)}
                    className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Confirm Payment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-slate-200" />
              </div>
              <p className="text-slate-400 font-bold text-lg">Treasury is all caught up!</p>
              <p className="text-slate-300">No pending payments found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountantModule;
