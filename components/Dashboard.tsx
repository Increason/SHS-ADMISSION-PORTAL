
import React, { useState } from 'react';
import { Student } from '../types';
import { FileText, DollarSign, Database, CheckCircle, TrendingUp, GraduationCap, Fingerprint, Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';
import { StatusIcon } from './StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { generateAdmissionsIntelligence } from '../services/aiService';

interface DashboardProps {
  students: Student[];
  totalRevenue: number;
}

const Dashboard: React.FC<DashboardProps> = ({ students, totalRevenue }) => {
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const fetchAiInsights = async () => {
    setIsGenerating(true);
    const insights = await generateAdmissionsIntelligence(students, totalRevenue);
    setAiInsights(insights);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">System Intelligence</h2>
          <p className="text-slate-500">Live analytics for {total} synchronized student records</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-200">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cloud Revenue</p>
            <p className="text-xl font-bold text-slate-900">GH₵ {totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </header>

      {/* AI Intelligence Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-200 overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <BrainCircuit className="w-48 h-48" />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
             <div className="flex items-center gap-2 mb-4">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                   <Sparkles className="w-5 h-5 text-yellow-300" />
                </div>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-blue-100">Gemini Cloud Intelligence</span>
             </div>
             <h3 className="text-3xl font-black mb-4 tracking-tight">Executive Admissions Insight</h3>
             <p className="text-blue-50 text-lg opacity-80 leading-relaxed">
               Leverage AI to analyze bottlenecks, predict enrollment outcomes, and optimize school revenue streams.
             </p>
          </div>
          
          <button 
            onClick={fetchAiInsights}
            disabled={isGenerating}
            className="self-start lg:self-center bg-white text-blue-700 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
            {isGenerating ? 'ANALYZING...' : 'GENERATE INSIGHTS'}
          </button>
        </div>

        {aiInsights && (
          <div className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 animate-in slide-in-from-top-4 duration-500">
            <h4 className="font-black text-sm uppercase tracking-widest text-blue-200 mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Summary Report
            </h4>
            <div className="prose prose-invert max-w-none text-blue-50">
              <p className="whitespace-pre-wrap leading-relaxed">
                {aiInsights}
              </p>
            </div>
          </div>
        )}
      </div>

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
          <h3 className="text-lg font-bold text-slate-800 mb-6">Real-time Cycle Progress</h3>
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
          <h3 className="text-lg font-bold text-slate-800 mb-4">Admissions Outlook</h3>
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
    </div>
  );
};

export default Dashboard;
