
export type Status = 'pending' | 'completed' | 'failed';
export type Gender = 'Male' | 'Female';

export interface Student {
  id: string;
  name: string;
  class: string;
  gender: Gender;
  cheat: Status;
  form: Status;
  payment: Status;
  bioData: Status;       // Replaces parts of dataEntry
  transcript: Status;    // Replaces parts of dataEntry
  rectorReview: Status;
  createdAt: number;
  updatedAt: number;
  cheatNumber?: string;
  amountPaid?: number;
}

export type Role = 'dashboard' | 'headmaster' | 'secretary' | 'accountant' | 'dataEntry' | 'rector';

export interface AppState {
  students: Student[];
  formInventory: number;
  totalRevenue: number;
}
