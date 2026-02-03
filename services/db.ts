import Dexie, { Table } from 'dexie';
import { CalculationResult } from '../types';

interface RationalMetricsDB extends Dexie {
  calculations: Table<CalculationResult, number>;
}

const db = new Dexie('RationalMetricsDB') as RationalMetricsDB;

// Cast to any to prevent TypeScript error "Property 'version' does not exist"
(db as any).version(1).stores({
  calculations: '++id, date, finalScore, [input.gender+input.age]'
});

export { db };

export const saveCalculation = async (result: CalculationResult) => {
  return await db.calculations.add(result);
};

export const getHistory = async () => {
  return await db.calculations.orderBy('date').reverse().toArray();
};

export const getCalculation = async (id: number) => {
  return await db.calculations.get(id);
};

export const deleteCalculation = async (id: number) => {
  return await db.calculations.delete(id);
};