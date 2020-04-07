import { IWeapon } from './weapon.interface';

export interface IHero {
  id: string;
  name: string;
  colorTheme: string;
  character: string;
  crimes: number;
  dob: Date;
  weapons: [IWeapon];
}