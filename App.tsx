
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, FileText, DollarSign, Database, Home, 
  Award, Menu, X, Bell, User, Download, CloudOff, RefreshCcw
} from 'lucide-react';
import { Role, Student, AppState, Gender } from './types';
import { loadData, saveData, exportData } from './services/persistence';
import Dashboard from './components/Dashboard';
import HeadmasterModule from './components/HeadmasterModule';
import SecretaryModule from './components/SecretaryModule';
import AccountantModule from './components/AccountantModule';
import DataEntryModule from './components/DataEntryModule';
import RectorModule from './components/RectorModule';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState<AppState>(loadData());
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync state to persistence on every data change
  useEffect(() => {
    saveData(data);
    setIsSyncing(true);
    const timer = setTimeout(() => setIsSyncing(false), 800);
    return () => clearTimeout(timer);
  }, [data]);

  const addStudent = useCallback((name: string, cheatNum: string, studentClass: string, gender: Gender) => {
    const newStudent: Student = {
      id: crypto.randomUUID(),
      name,
      class: studentClass,
      gender,
      cheatNumber: cheatNum,
      cheat: 'completed',
      form: 'pending',
      payment: 'pending',
      bioData: 'pending',
      transcript: 'pending',
      rectorReview: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setData(prev => ({ ...prev, students: [...prev.students, newStudent] }));
  }, []);

  const updateStudentStatus = useCallback((id: string, field: keyof Student, status: any) => {
    setData(prev => ({
      ...prev,
      students: prev.students.map(s => s.id === id ? { ...s, [field]: status, updatedAt: Date.now() } : s)
    }));
  }, []);

  const sellForm = useCallback((id: string) => {
    updateStudentStatus(id, 'form', 'completed');
    setData(prev => ({ ...prev, formInventory: prev.formInventory - 1 }));
  }, [updateStudentStatus]);

  const processPayment = useCallback((id: string, amount: number) => {
    updateStudentStatus(id, 'payment', 'completed');
    setData(prev => ({ ...prev, totalRevenue: prev.totalRevenue + amount }));
  }, [updateStudentStatus]);

  const renderContent = () => {
    switch(currentRole) {
      case 'dashboard': return <Dashboard students={data.students} totalRevenue={data.totalRevenue} />;
      case 'headmaster': return <HeadmasterModule students={data.students} onAddStudent={addStudent} />;
      case 'secretary': return <SecretaryModule students={data.students} inventory={data.formInventory} onSellForm={sellForm} />;
      case 'accountant': return <AccountantModule students={data.students} revenue={data.totalRevenue} onProcessPayment={processPayment} />;
      case 'dataEntry': return (
        <DataEntryModule 
          students={data.students} 
          onCompleteBio={(id) => updateStudentStatus(id, 'bioData', 'completed')} 
          onCompleteTranscript={(id) => updateStudentStatus(id, 'transcript', 'completed')}
        />
      );
      case 'rector': return <RectorModule students={data.students} onReview={(id, result) => updateStudentStatus(id, 'rectorReview', result)} />;
      default: return <Dashboard students={data.students} totalRevenue={data.totalRevenue} />;
    }
  };

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home, color: 'text-slate-400' },
    { id: 'headmaster' as const, label: 'Headmaster', icon: FileText, color: 'text-blue-500' },
    { id: 'secretary' as const, label: 'Secretary', icon: Users, color: 'text-emerald-500' },
    { id: 'accountant' as const, label: 'Accountant', icon: DollarSign, color: 'text-purple-500' },
    { id: 'dataEntry' as const, label: 'Data Entry', icon: Database, color: 'text-orange-500' },
    { id: 'rector' as const, label: 'Rector', icon: Award, color: 'text-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
               <Award className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block leading-none">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">SHS ADMISSION</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Management Pro</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
             <CloudOff className="w-4 h-4" />
             <span className="text-xs font-bold uppercase tracking-wider">Offline Mode</span>
             {isSyncing ? <RefreshCcw className="w-3 h-3 animate-spin text-emerald-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
          </div>
          <button onClick={() => exportData(data)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Backup Data">
            <Download className="w-5 h-5" />
          </button>
          <div className="w-[1px] h-6 bg-slate-200 mx-2" />
          <div className="flex items-center gap-3">
             <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-900">Administrator</p>
                <p className="text-[10px] text-slate-400 font-medium">System Manager</p>
             </div>
             <div className="w-9 h-9 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/100/100" alt="Avatar" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 h-screen overflow-hidden">
        <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col p-6 space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Navigation</p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentRole(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                currentRole === item.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 font-bold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-semibold'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentRole === item.id ? 'text-white' : item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="mt-auto p-4 bg-slate-900 rounded-2xl text-white">
             <p className="text-xs font-bold opacity-60 mb-2 uppercase tracking-widest">Active Cycle</p>
             <p className="text-sm font-bold">2024/2025 Intake</p>
             <div className="w-full bg-white/10 h-1.5 rounded-full mt-3">
                <div className="bg-blue-400 h-1.5 rounded-full w-2/3" />
             </div>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto pb-24">
            {renderContent()}
          </div>
        </main>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 animate-in slide-in-from-left duration-300">
             <div className="flex items-center gap-3 mb-10">
                <Award className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-black text-slate-900">SHS PRO</h1>
             </div>
             <div className="space-y-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentRole(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                      currentRole === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="font-bold">{item.label}</span>
                  </button>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
