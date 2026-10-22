import { useState, useEffect } from 'react';

interface JalaliDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const JalaliDatePicker = ({ value, onChange, error }: JalaliDatePickerProps) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    if (value) {
      const parts = value.split('/');
      if (parts.length === 3) {
        setYear(parts[0]);
        setMonth(parts[1]);
        setDay(parts[2]);
      }
    }
  }, [value]);

  useEffect(() => {
    if (year && month && day) {
      const y = year.toString().padStart(4, '0');
      const m = month.toString().padStart(2, '0');
      const d = day.toString().padStart(2, '0');
      onChange(`${y}/${m}/${d}`);
    }
  }, [year, month, day, onChange]);

  const handleChange = () => {
    if (year && month && day) {
      const y = year.toString().padStart(4, '0');
      const m = month.toString().padStart(2, '0');
      const d = day.toString().padStart(2, '0');
      onChange(`${y}/${m}/${d}`);
    } else {
      onChange('');
    }
  };

  const years = Array.from({ length: 39 }, (_, i) => 1430 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const getDaysInMonth = (month: number, year: number) => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    // Leap year calculation for Persian calendar
    const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    return isLeap ? 30 : 29;
  };

  const days = month && year ? Array.from({ length: getDaysInMonth(parseInt(month), parseInt(year)) }, (_, i) => i + 1) : Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="mb-1 block text-[12px] font-medium text-ink">سال</label>
          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              handleChange();
            }}
            className="w-full min-h-11 rounded-xl border border-border bg-white px-3 text-[14px] text-ink outline-none transition focus:border-brand-dark focus:ring-4 focus:ring-brand-light"
          >
            <option value="">سال</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[12px] font-medium text-ink">ماه</label>
          <select
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              handleChange();
            }}
            className="w-full min-h-11 rounded-xl border border-border bg-white px-3 text-[14px] text-ink outline-none transition focus:border-brand-dark focus:ring-4 focus:ring-brand-light"
          >
            <option value="">ماه</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[12px] font-medium text-ink">روز</label>
          <select
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
              handleChange();
            }}
            className="w-full min-h-11 rounded-xl border border-border bg-white px-3 text-[14px] text-ink outline-none transition focus:border-brand-dark focus:ring-4 focus:ring-brand-light"
          >
            <option value="">روز</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-xs font-medium text-error">{error}</p>}
    </div>
  );
};

export default JalaliDatePicker;
