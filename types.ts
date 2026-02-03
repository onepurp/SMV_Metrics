export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export interface UserInput {
  gender: Gender;
  age: number;
  // Common
  // Male specific
  socioeconomicStatus?: number; // 1-10
  gameBehavior?: number; // 1-10
  physicalFitness?: number; // 1-10
  preSelection?: number; // 1-10
  // Female specific
  physicalBeauty?: number; // 1-10
  promiscuityCount?: number; // Raw number or encoded scale
  attitude?: number; // 1-10 (Cooperative vs Combative)
}

export interface CalculationResult {
  id?: number;
  date: string;
  input: UserInput;
  baseScore: number;
  finalScore: number;
  multipliers: {
    name: string;
    value: number; // The multiplier applied (e.g., 1.2x)
    impact: 'positive' | 'negative' | 'neutral';
    rawScore: number; // The user input (1-10)
  }[];
  notes?: string;
}

export interface ComparisonResult {
  personA: CalculationResult;
  personB: CalculationResult;
  gap: number;
  hypergamyStatus: 'Stable' | 'Hypergamous Tension' | 'Power Imbalance' | 'Equal';
  analysis: string;
}