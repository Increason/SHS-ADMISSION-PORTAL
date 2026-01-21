
import React from 'react';
import { Status } from '../types';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: Status;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showIcon = true }) => {
  const styles = {
    completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    failed: 'bg-rose-100 text-rose-800 border-rose-200'
  };

  const Icon = {
    completed: CheckCircle,
    pending: Clock,
    failed: XCircle
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span className="capitalize">{status}</span>
    </span>
  );
};

export const StatusIcon: React.FC<{ status: Status }> = ({ status }) => {
  if (status === 'completed') return <CheckCircle className="w-5 h-5 text-emerald-500" />;
  if (status === 'pending') return <Clock className="w-5 h-5 text-amber-500" />;
  return <XCircle className="w-5 h-5 text-rose-500" />;
};
