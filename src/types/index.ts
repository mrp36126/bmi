export type Gender = 'male' | 'female' | 'other';
export type HeightUnit = 'cm' | 'm';

export interface UserMeasurements {
  weight: number;
  height: number;
  heightUnit: HeightUnit;
  age: number;
  gender: Gender;
}

export type BmiCategory = 'underweight' | 'normal' | 'overweight' | 'obese1' | 'obese2' | 'obese3';

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  healthyWeightMin: number;
  healthyWeightMax: number;
  weightDifference: number; // weight difference to nearest normal range (0 if already normal)
}

export interface BmiCategoryDetails {
  category: BmiCategory;
  label: string;
  minBmi: number;
  maxBmi: number;
  colorClass: string;     // e.g. "bg-bmi-healthy"
  textColorClass: string; // e.g. "text-bmi-healthy"
  borderColorClass: string; // e.g. "border-bmi-healthy"
  gradientClass: string;   // gradient for premium display
  risks: string[];
  recommendations: string[];
  description: string;
}
