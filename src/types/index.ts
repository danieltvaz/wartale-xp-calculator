import { MAPS } from "../constants/maps";

export type Class = "ATA" | "AS" | "MS" | "MGS" | "KS" | "FS" | "SS" | "PRS" | "ASS" | "BS";

export type Character = {
  name: string;
  className: Class;
  id: number;
  level: number;
};

export type AnyObjectWithId = {
  id: string | number;
  [key: string]: any;
};

export type XPHistory = {
  id: number;
  currentLevel: number;
  unit: Unit;
  currentXp: number;
  targetXp: number;
  perMinute: number;
  perHour: number;
  nextLevelIn: { hours: number; minutes: number };
  date: number;
  characterId: number;
  map: number;
  partySize: number;
};

export type Unit = "m" | "bi" | "tri" | "unit";

export interface RequireContext {
  keys(): string[];
  <T>(id: string): T;
  <T>(id: string, deep?: boolean): T;
  <T>(id: string, deep?: boolean, filter?: RegExp): T;
}

export type Map = typeof MAPS;
