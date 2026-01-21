
import React from 'react';
import { Student } from '../types';
import { ShoppingCart, Package, CheckCircle2 } from 'lucide-react';

interface Props {
  students: Student[];
  inventory: number;
  onSellForm: (id: string) => void;
}

const SecretaryModule: React.FC<Props> = ({ students, inventory, onSellForm }) => {
  const pending = students.filter(s => s.cheat === 'completed' && s.form === 'pending');

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Secretary Dashboard</h2>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
          <Package className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-semibold text-slate-600">Stock:</span>
          <span className="text-lg font-bold text-blue-600">{inventory}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Ready for Form Purchase</h3>
          <p className="text-slate-500 text-sm">Students with issued cheats waiting to buy forms</p>
        </div>
        
        <div className="divide-y divide-slate-100">
          {pending.length > 0 ? (
            pending.map(student => (
              <div key={student.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800">{student.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                     <span className="text-xs font-semibold text-emerald-600 uppercase">Cheat Verified</span>
                  </div>
                </div>
                <button
                  onClick={() => onSellForm(student.id)}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Record Sale
                </button>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No students currently waiting for forms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecretaryModule;
