import { Estimation } from '../const/const';

export const getCustomFormat = (date: Date): string => {
  const format = 'mm day, yyyy';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return format.replace('mm', month).replace('day', day).replace('yyyy', year.toString());
};

export const formatTime = (time: number): string => {
  const hours = Number(Math.floor(time / 60));
  const minutes = time - hours * 60;
  return `${hours}h ${minutes}m`;
};

export const getEstimation = (estimation: number): string => {
  if (estimation >= 0 && estimation < 3) {
    return Estimation.Bad;
  }

  if (estimation >= 3 && estimation < 5) {
    return Estimation.Normal;
  }

  if (estimation >= 5 && estimation < 8) {
    return Estimation.Good;
  }

  if (estimation >= 8 && estimation < 10) {
    return Estimation.Good;
  }

  return Estimation.Awesome;
};

export const getItemsById = <T extends { connectId: number }>(
  idList: number[],
  array: T[]
): T[] => array.filter((item) => idList.includes(item.connectId));
