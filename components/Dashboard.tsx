
import React from 'react';
import { Student } from '../types';
import { FileText, DollarSign, Database, CheckCircle, TrendingUp, GraduationCap, Fingerprint } from 'lucide-react';
import { StatusIcon } from './StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  students: Student[];
  totalRevenue: number;
}

const Dashboard: React.FC<DashboardProps> = ({ students, totalRevenue }) => {
  const total = students.length;
  const stats = [
    { label: 'Cheat Issued', count: students.filter(s => s.cheat === 'completed').length, color: 'blue', icon: FileText },
    { label: 'Forms Sold', count: students.filter(s => s.form === 'completed').length, color: 'emerald', icon: FileText },
    { label: 'Payments', count: students.filter(s => s.payment === 'completed').length, color: 'purple', icon: DollarSign },
    { label: 'Bio Records', count: students.filter(s => s.bioData === 'completed').length, color: 'orange', icon: Fingerprint },
    { label: 'Transcripts', count: students.filter(s => s.transcript === 'completed').length, color: 'cyan', icon: GraduationCap },
    { label: 'Rector Approved', count: students.filter(s => s.rectorReview === 'completed').length, color: 'pink', icon: CheckCircle },
  ];

  const chartData = stats.map(s => ({ name: s.label.split(' ')[0], value: s.count }));
  const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#f97316', '#06b6d4', '#ec4899'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">System Overview</h2>
          <p className="text-slate-500">Managing {total} active applicants across 6 workflow stages</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-200">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Revenue</p>
            <p className="text-xl font-bold text-slate-900">GH₵ {totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center`}>
                <stat.icon className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-400 font-bold">{Math.round((stat.count / (total || 1)) * 100)}%</p>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-slate-900">{stat.count}</p>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-3">
              <div 
                className="h-1 rounded-full transition-all duration-1000" 
                style={{ width: `${(stat.count / (total || 1)) * 100}%`, backgroundColor: COLORS[idx] }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Workflow Saturation</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Outcome Distribution</h3>
          <div className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Approved', value: students.filter(s => s.rectorReview === 'completed').length },
                      { name: 'Processing', value: students.filter(s => s.rectorReview === 'pending').length },
                      { name: 'Failed', value: students.filter(s => s.rectorReview === 'failed').length },
                    ]}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div>
              <p className="text-xs font-bold text-emerald-600">Approved</p>
              <p className="text-lg font-black">{students.filter(s => s.rectorReview === 'completed').length}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-amber-600">Active</p>
              <p className="text-lg font-black">{students.filter(s => s.rectorReview === 'pending').length}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-rose-600">Denied</p>
              <p className="text-lg font-black">{students.filter(s => s.rectorReview === 'failed').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Master Admission Ledger</h3>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-black">LATEST 10</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Info</th>
                <th className="px-6 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 1-3</th>
                <th className="px-6 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 4-6</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.slice(-10).reverse().map(student => {
                const steps = [student.cheat, student.form, student.payment, student.bioData, student.transcript, student.rectorReview];
                const completedCount = steps.filter(s => s === 'completed').length;
                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${student.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-none">{student.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{student.class}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <div title="Cheat"><StatusIcon status={student.cheat} /></div>
                        <div title="Form"><StatusIcon status={student.form} /></div>
                        <div title="Payment"><StatusIcon status={student.payment} /></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <div title="Bio-Data"><StatusIcon status={student.bioData} /></div>
                        <div title="Transcript"><StatusIcon status={student.transcript} /></div>
                        <div title="Rector"><StatusIcon status={student.rectorReview} /></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end">
                         <span className={`text-sm font-black ${completedCount === 6 ? 'text-emerald-600' : 'text-slate-800'}`}>
                           {completedCount}/6 Stages
                         </span>
                         <div className="w-20 bg-slate-100 h-1 rounded-full mt-1 overflow-hidden">
                           <div className="bg-emerald-500 h-full" style={{ width: `${(completedCount/6)*100}%` }} />
                         </div>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
