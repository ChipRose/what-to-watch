import type { FilmsType, GenreNameType, GroupedFilmsType } from '../types/film';

import { Estimation, months } from '../const/const';

export const getCustomFormat = (date: string): string => {
  const format = 'mm day, yyyy';
  const dateParsed = new Date(date);

  const day = dateParsed.getDate().toString();
  const month = months[dateParsed.getMonth()];
  const year = dateParsed.getFullYear().toString();

  return format.replace('mm', month).replace('day', day).replace('yyyy', year);
};

export const formatTime = (time: number): string => {
  const hours = Number(Math.floor(time / 60));
  const minutes = time - hours * 60;
  return `${hours}h ${minutes}m`;
};

export const getEstimation = (estimation: number): string => {
  if (estimation > 0 && estimation <= 3) {
    return Estimation.Bad;
  }

  if (estimation > 3 && estimation <= 5) {
    return Estimation.Normal;
  }

  if (estimation > 5 && estimation <= 8) {
    return Estimation.Good;
  }

  if (estimation > 8 && estimation <= 10) {
    return Estimation.VeryGood;
  }

  return Estimation.Awesome;
};

export const getItemsByKey = <T, K extends keyof T>(
  idList: T[K][],
  array: T[],
  key: K
): T[] => (array.filter((item) => idList.includes(item[key])));

export const calcArraySumProps = <T, K extends keyof T>(array: T[], key: K): { sum: number; average: number; length: number } => {
  if (!array?.length) {
    return { sum: 0, average: 0, length: 0 };
  }

  const sum = Number(array.reduce((accumulator, currentValue) => {
    const value = Number(currentValue[key]) || 0;
    return accumulator + value;
  }, 0).toFixed(1));

  const average = Number((sum / array?.length).toFixed(1));
  const length = array?.length;

  return { sum, average, length };
};

export const groupByGenre = (
  items: FilmsType
): Record<string, FilmsType> => {
  if (!items?.length) {
    return {};
  }

  const grouped = items.reduce<GroupedFilmsType>((acc, item) => {
    const genreKey = item.genre.toString().toLowerCase() as GenreNameType | null;
    if (!genreKey) {
      return acc;
    }
    if (!acc[genreKey]) {
      acc[genreKey] = [];
    }
    acc[genreKey].push(item);
    return acc;
  }, {} as GroupedFilmsType);

  return {
    all: items,
    ...grouped,
  };
};
