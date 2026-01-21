
import React, { useState } from 'react';
import { Student } from '../types';
import { Database, Fingerprint, GraduationCap, ArrowRight, CheckCircle2, Search, FileText, ClipboardList } from 'lucide-react';

interface Props {
  students: Student[];
  onCompleteBio: (id: string) => void;
  onCompleteTranscript: (id: string) => void;
}

type SubSection = 'bio' | 'transcript';

const DataEntryModule: React.FC<Props> = ({ students, onCompleteBio, onCompleteTranscript }) => {
  const [activeTab, setActiveTab] = useState<SubSection>('bio');
  
  const bioPending = students.filter(s => s.payment === 'completed' && s.bioData === 'pending');
  const transcriptPending = students.filter(s => s.payment === 'completed' && s.transcript === 'pending');

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Registrar Workstation</h2>
          <p className="text-slate-500 text-sm">Digitalizing paper records into the master database</p>
        </div>
        
        {/* Subsection Toggle */}
        <div className="bg-slate-200/50 p-1.5 rounded-2xl flex gap-1 self-start">
          <button
            onClick={() => setActiveTab('bio')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'bio' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            Internal Data
          </button>
          <button
            onClick={() => setActiveTab('transcript')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'transcript' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Transcript Portal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar Info */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Workload Status</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600">Bio Pending</span>
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md text-xs font-black">{bioPending.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600">Transcripts Pending</span>
                <span className="bg-cyan-100 text-cyan-600 px-2 py-0.5 rounded-md text-xs font-black">{transcriptPending.length}</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
               <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">Data Secure</span>
               </div>
               <p className="text-[10px] text-slate-400 mt-1">Local encryption active. System offline.</p>
            </div>
          </div>
        </div>

        {/* Main Entry Area */}
        <div className="lg:col-span-3">
          {activeTab === 'bio' ? (
            <div className="space-y-4">
              <div className="bg-orange-600 text-white p-6 rounded-3xl shadow-xl shadow-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase">Internal Data Record</h3>
                    <p className="text-white/80 text-xs">Verify demographics and contact information</p>
                  </div>
                </div>
                <ClipboardList className="w-8 h-8 opacity-20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bioPending.length > 0 ? (
                  bioPending.map(student => (
                    <div key={student.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-orange-300 transition-all group">
                       <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${student.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                            {student.name.charAt(0)}
                          </div>
                          <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">FEE PAID</span>
                       </div>
                       <h4 className="text-lg font-bold text-slate-900 mb-1">{student.name}</h4>
                       <p className="text-xs text-slate-500 font-medium mb-6">{student.class}</p>
                       
                       <button
                         onClick={() => onCompleteBio(student.id)}
                         className="w-full bg-slate-50 hover:bg-orange-600 hover:text-white border border-slate-100 hover:border-orange-500 text-slate-700 font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-orange-100"
                       >
                         Complete Bio Entry
                         <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                    <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">All Bio-data logged</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-cyan-600 text-white p-6 rounded-3xl shadow-xl shadow-cyan-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase">Transcript Portal</h3>
                    <p className="text-white/80 text-xs">Enter academic results and aggregates</p>
                  </div>
                </div>
                <GraduationCap className="w-8 h-8 opacity-20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {transcriptPending.length > 0 ? (
                  transcriptPending.map(student => (
                    <div key={student.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-cyan-300 transition-all group">
                       <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black bg-cyan-50 text-cyan-600`}>
                            {student.name.charAt(0)}
                          </div>
                          <div className="text-right">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Enrollment</p>
                             <p className="text-xs font-bold text-slate-900">{student.id.slice(0, 8)}</p>
                          </div>
                       </div>
                       <h4 className="text-lg font-bold text-slate-900 mb-1">{student.name}</h4>
                       <p className="text-xs text-slate-500 font-medium mb-6">Assigned: {student.class}</p>
                       
                       <button
                         onClick={() => onCompleteTranscript(student.id)}
                         className="w-full bg-slate-50 hover:bg-cyan-600 hover:text-white border border-slate-100 hover:border-cyan-500 text-slate-700 font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-cyan-100"
                       >
                         Log Exam Transcript
                         <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                    <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Transcripts complete</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataEntryModule;
