import { format, startOfMonth, endOfMonth } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd MMM yyyy HH:mm:ss');
};

export const formatCurrency = (amount: number): string => {
  return `฿${amount.toFixed(2)}`;
};

export const getMonthRange = (date: Date = new Date()) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date)
  };
};