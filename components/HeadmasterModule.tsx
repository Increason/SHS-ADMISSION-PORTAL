
import React, { useState } from 'react';
import { Student, Gender } from '../types';
import { FilePlus, Search, UserPlus } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface Props {
  students: Student[];
  onAddStudent: (name: string, cheatNumber: string, studentClass: string, gender: Gender) => void;
}

const HeadmasterModule: React.FC<Props> = ({ students, onAddStudent }) => {
  const [name, setName] = useState('');
  const [cheatNum, setCheatNum] = useState('');
  const [studentClass, setStudentClass] = useState('Form 1 Science');
  const [gender, setGender] = useState<Gender>('Male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && cheatNum) {
      onAddStudent(name, cheatNum, studentClass, gender);
      setName('');
      setCheatNum('');
    }
  };

  const classes = [
    'Form 1 Science',
    'Form 1 General Arts',
    'Form 1 Business',
    'Form 1 Home Economics',
    'Form 1 Visual Arts',
    'Form 1 Technical'
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-800">Headmaster Office</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Issue Admission Slip (Cheat)</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Student Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Samuel Okai"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Class / Form</label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender</label>
                <div className="flex items-center gap-4 py-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Male" 
                      checked={gender === 'Male'} 
                      onChange={() => setGender('Male')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm font-medium text-slate-700">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Female" 
                      checked={gender === 'Female'} 
                      onChange={() => setGender('Female')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm font-medium text-slate-700">Female</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cheat Number</label>
              <input
                type="text"
                required
                value={cheatNum}
                onChange={(e) => setCheatNum(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. CHT-2024-001"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
            >
              <FilePlus className="w-5 h-5" />
              Issue & Register Student
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Recent Issues</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{students.length} Total</span>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {students.slice().reverse().map(student => (
              <div key={student.id} className="p-4 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100 hover:border-blue-200 transition-colors">
                <div>
                  <p className="font-bold text-slate-800">{student.name}</p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-2">
                    <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-100">{student.cheatNumber || 'N/A'}</span>
                    <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase font-bold text-[9px] tracking-wider">{student.gender}</span>
                    <span>{student.class}</span>
                  </p>
                </div>
                <StatusBadge status={student.cheat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadmasterModule;
