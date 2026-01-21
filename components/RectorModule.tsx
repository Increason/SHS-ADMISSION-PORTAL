
import React from 'react';
import { Student } from '../types';
import { Award, ShieldCheck, ShieldAlert, History, UserCheck, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface Props {
  students: Student[];
  onReview: (id: string, result: 'completed' | 'failed') => void;
}

const RectorModule: React.FC<Props> = ({ students, onReview }) => {
  // Only students who have BOTH Bio and Transcripts logged can be reviewed
  const pending = students.filter(s => s.bioData === 'completed' && s.transcript === 'completed' && s.rectorReview === 'pending');
  const reviewed = students.filter(s => s.rectorReview !== 'pending');

  return (
    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Rector's Executive Review</h2>
          <p className="text-slate-500 text-sm font-medium italic">Final stage authorization for high school placement</p>
        </div>
        <div className="hidden md:flex p-2 bg-rose-50 border border-rose-100 rounded-2xl items-center gap-3">
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-black text-rose-500 uppercase">Waitlist</p>
            <p className="text-lg font-black text-rose-700 leading-none">{pending.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
           {pending.length > 0 ? (
             pending.map(student => (
               <div key={student.id} className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl shadow-slate-100/50 flex flex-col md:flex-row gap-10 hover:border-blue-200 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-8">
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-lg ${student.gender === 'Male' ? 'bg-blue-600 text-white shadow-blue-100' : 'bg-rose-600 text-white shadow-rose-100'}`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{student.name}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg ${student.gender === 'Male' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}`}>
                             {student.gender}
                          </span>
                          <span className="text-sm font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg uppercase">{student.class}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      <div className="flex flex-col items-center p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                         <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Finance</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                         <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Bio-Data</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                         <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Transcript</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-blue-50/50 rounded-2xl border border-blue-100">
                         <Award className="w-4 h-4 text-blue-600 mb-1" />
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-4 justify-center">
                    <button
                      onClick={() => onReview(student.id, 'failed')}
                      className="flex-1 bg-white hover:bg-rose-50 text-rose-600 border border-rose-100 font-black px-8 py-5 rounded-3xl transition-all flex items-center justify-center gap-2 group active:scale-95"
                    >
                      <ShieldAlert className="w-5 h-5 group-hover:shake" />
                      Decline
                    </button>
                    <button
                      onClick={() => onReview(student.id, 'completed')}
                      className="flex-1 bg-slate-900 hover:bg-emerald-600 text-white font-black px-10 py-5 rounded-3xl transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      Approve
                    </button>
                  </div>
               </div>
             ))
           ) : (
             <div className="bg-white rounded-[2.5rem] p-24 border border-dashed border-slate-200 text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-black text-slate-300 uppercase tracking-[0.3em]">Decision Deck Clear</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">All students with completed digital files have been reviewed.</p>
             </div>
           )}
        </div>

        {/* History Panel */}
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <History className="w-5 h-5 text-slate-400" />
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Archived Decisions</h3>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 flex-grow scrollbar-thin">
            {reviewed.slice().reverse().map(student => (
              <div key={student.id} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate group-hover:text-blue-600 transition-colors">{student.name}</p>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{student.class}</p>
                </div>
                <StatusBadge status={student.rectorReview} />
              </div>
            ))}
            {reviewed.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-300 font-bold uppercase tracking-widest text-xs">No records found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RectorModule;
