
import { AppState, Student } from '../types';

const STORAGE_KEY = 'shs_admission_data_v1';

const DEFAULT_DATA: AppState = {
  students: [
    { id: '1', name: 'Kwame Mensah', class: 'Form 1 Science', gender: 'Male', cheat: 'completed', form: 'completed', payment: 'completed', bioData: 'completed', transcript: 'completed', rectorReview: 'pending', createdAt: Date.now(), updatedAt: Date.now() },
    { id: '2', name: 'Ama Darko', class: 'Form 1 General Arts', gender: 'Female', cheat: 'completed', form: 'completed', payment: 'pending', bioData: 'pending', transcript: 'pending', rectorReview: 'pending', createdAt: Date.now(), updatedAt: Date.now() },
    { id: '3', name: 'Kofi Asante', class: 'Form 1 Business', gender: 'Male', cheat: 'completed', form: 'pending', payment: 'pending', bioData: 'pending', transcript: 'pending', rectorReview: 'pending', createdAt: Date.now(), updatedAt: Date.now() },
  ],
  formInventory: 150,
  totalRevenue: 25000,
};

export const loadData = (): AppState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse storage', e);
    }
  }
  return DEFAULT_DATA;
};

export const saveData = (data: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const exportData = (data: AppState) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shs-admission-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
};
