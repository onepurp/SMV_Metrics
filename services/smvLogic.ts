import { Gender, UserInput, CalculationResult } from '../types';

// Curve helpers
const getMaleBaseScore = (age: number): number => {
  // Peak 36-38. Starts low. Slow decline.
  if (age < 18) return 3.0;
  if (age < 25) return 4.0 + (age - 18) * 0.2; // 18-24: 4.0 -> 5.2
  if (age < 30) return 5.4 + (age - 25) * 0.3; // 25-29: 5.4 -> 6.6
  if (age < 36) return 6.9 + (age - 30) * 0.35; // 30-35: 6.9 -> 8.6
  if (age <= 38) return 9.0; // Peak
  if (age < 45) return 9.0 - (age - 38) * 0.1; // Slow decline
  if (age < 60) return 8.3 - (age - 45) * 0.2;
  return Math.max(1, 5.3 - (age - 60) * 0.1);
};

const getFemaleBaseScore = (age: number): number => {
  // Peak 22-24. High start. "The Wall" at 30.
  if (age < 18) return 6.0;
  if (age <= 21) return 7.0 + (age - 18) * 0.5; // 18-21: 7 -> 8.5
  if (age <= 24) return 9.5; // Peak
  if (age < 27) return 9.0 - (age - 24) * 0.3; // 25-26: Slight dip
  if (age < 30) return 8.1 - (age - 27) * 0.5; // 27-29: Pre-wall drop
  if (age === 30) return 6.0; // The Wall impact
  if (age < 40) return 6.0 - (age - 30) * 0.2; // 30s decline
  return Math.max(1, 4.0 - (age - 40) * 0.15);
};

export const calculateSMV = (input: UserInput): CalculationResult => {
  const baseScore = input.gender === Gender.Male 
    ? getMaleBaseScore(input.age) 
    : getFemaleBaseScore(input.age);

  let finalScore = baseScore;
  const multipliers: CalculationResult['multipliers'] = [];

  if (input.gender === Gender.Male) {
    // Male Multipliers
    // 1. Socioeconomic (Money/Status) - Heavy weighting for men
    const statusVal = input.socioeconomicStatus ?? 5;
    const statusMult = 0.5 + (statusVal / 10); // 0.6x to 1.5x
    finalScore *= statusMult;
    multipliers.push({
      name: 'Status & Money',
      value: statusMult,
      rawScore: statusVal,
      impact: statusMult >= 1 ? 'positive' : 'negative'
    });

    // 2. Game/Behavior - Critical
    const gameVal = input.gameBehavior ?? 5;
    const gameMult = 0.7 + (gameVal / 10) * 0.8; // 0.78x to 1.5x
    finalScore *= gameMult;
    multipliers.push({
      name: 'Game & Frame',
      value: gameMult,
      rawScore: gameVal,
      impact: gameMult >= 1 ? 'positive' : 'negative'
    });

    // 3. Fitness
    const fitVal = input.physicalFitness ?? 5;
    const fitMult = 0.8 + (fitVal / 10) * 0.4; // 0.84x to 1.2x
    finalScore *= fitMult;
    multipliers.push({
      name: 'Physical Fitness',
      value: fitMult,
      rawScore: fitVal,
      impact: fitMult >= 1 ? 'positive' : 'negative'
    });

  } else {
    // Female Multipliers
    // 1. Physical Beauty - Heaviest weighting
    const beautyVal = input.physicalBeauty ?? 5;
    const beautyMult = 0.5 + (beautyVal / 10); // 0.6x to 1.5x
    finalScore *= beautyMult;
    multipliers.push({
      name: 'Physical Beauty',
      value: beautyMult,
      rawScore: beautyVal,
      impact: beautyMult >= 1 ? 'positive' : 'negative'
    });

    // 2. Promiscuity (Body Count) - Negative modifier
    // Input is 1-10 where 1 is Low Count (Good) and 10 is High Count (Bad) for the calculator scale
    const nCount = input.promiscuityCount ?? 5; // 1 (Virgin) -> 10 (Very High)
    // Formula: Low count adds value or neutral, High count penalizes heavily
    // If nCount is 1 (Virgin): 1.2x
    // If nCount is 5 (Average): 1.0x
    // If nCount is 10 (High): 0.6x
    const promMult = 1.2 - ((nCount - 1) * 0.066); 
    finalScore *= Math.max(0.5, promMult);
    multipliers.push({
      name: 'Past History (N-Count)',
      value: promMult,
      rawScore: nCount,
      impact: promMult >= 1 ? 'positive' : 'negative'
    });

    // 3. Attitude / Cooperation
    const attVal = input.attitude ?? 5;
    const attMult = 0.8 + (attVal / 10) * 0.4; // 0.84x to 1.2x
    finalScore *= attMult;
    multipliers.push({
      name: 'Femininity & Attitude',
      value: attMult,
      rawScore: attVal,
      impact: attMult >= 1 ? 'positive' : 'negative'
    });
  }

  // Normalize to 0-10 scale strictly for display
  finalScore = Math.min(10, Math.max(1, finalScore));

  return {
    date: new Date().toISOString(),
    input,
    baseScore,
    finalScore,
    multipliers
  };
};

export const getAgeCurveData = (gender: Gender) => {
  const data = [];
  for (let age = 18; age <= 60; age++) {
    data.push({
      age,
      score: gender === Gender.Male ? getMaleBaseScore(age) : getFemaleBaseScore(age)
    });
  }
  return data;
};