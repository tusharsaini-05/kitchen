import { atom } from 'recoil';

export const hotelAtomName = atom<string>({
  key: 'hotelName', // Unique ID
  default: 'all', // Default value for the atom
});