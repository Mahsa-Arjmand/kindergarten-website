import * as jalaali from 'jalaali-js';

export const toJalali = (dateString: string): string => {
  const date = new Date(dateString);
  const jalaaliDate = jalaali.toJalaali(date);
  return `${jalaaliDate.jy}/${String(jalaaliDate.jm).padStart(2, '0')}/${String(jalaaliDate.jd).padStart(2, '0')}`;
};

export const toJalaliWithTime = (dateString: string): string => {
  const date = new Date(dateString);
  const jalaaliDate = jalaali.toJalaali(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${jalaaliDate.jy}/${String(jalaaliDate.jm).padStart(2, '0')}/${String(jalaaliDate.jd).padStart(2, '0')} - ${hours}:${minutes}`;
};

export const toJalaliLocale = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fa-IR');
};

export const toJalaliLocaleWithTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('fa-IR');
};
