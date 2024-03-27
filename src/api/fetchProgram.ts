import { Program } from '../types/types';

const fetchPrograms = async (): Promise<Program[]> => {
  const response = await fetch('https://api.moscow.mba/products');
  if (!response.ok) {
    throw new Error('Ответ не был получен');
  }

  return response.json();
};

export default fetchPrograms;
