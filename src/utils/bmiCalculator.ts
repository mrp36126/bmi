import type { HeightUnit, BmiCategory, BmiCategoryDetails } from '../types';


export const calculateBmi = (weight: number, height: number, heightUnit: HeightUnit): number => {
  const heightInMeters = heightUnit === 'cm' ? height / 100 : height;
  if (heightInMeters <= 0) return 0;
  const rawBmi = weight / (heightInMeters * heightInMeters);
  return Math.round(rawBmi * 10) / 10;
};

export const classifyBmi = (bmi: number): BmiCategory => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25.0) return 'normal';
  if (bmi < 30.0) return 'overweight';
  if (bmi < 35.0) return 'obese1';
  if (bmi < 40.0) return 'obese2';
  return 'obese3';
};

export const calculateHealthyWeightRange = (height: number, heightUnit: HeightUnit) => {
  const heightInMeters = heightUnit === 'cm' ? height / 100 : height;
  if (heightInMeters <= 0) return { min: 0, max: 0 };
  const min = 18.5 * (heightInMeters * heightInMeters);
  const max = 24.9 * (heightInMeters * heightInMeters);
  return {
    min: Math.round(min * 10) / 10,
    max: Math.round(max * 10) / 10,
  };
};

export const calculateWeightDifference = (
  weight: number,
  height: number,
  heightUnit: HeightUnit,
  bmi: number
): number => {
  const range = calculateHealthyWeightRange(height, heightUnit);
  if (bmi < 18.5) {
    return Math.round((range.min - weight) * 10) / 10; // Gain needed
  }
  if (bmi > 24.9) {
    return Math.round((weight - range.max) * 10) / 10; // Loss needed
  }
  return 0;
};

export const categoryDetails: Record<BmiCategory, BmiCategoryDetails> = {
  underweight: {
    category: 'underweight',
    label: 'Underweight',
    minBmi: 0,
    maxBmi: 18.4,
    colorClass: 'bg-bmi-underweight',
    textColorClass: 'text-bmi-underweight',
    borderColorClass: 'border-bmi-underweight/30',
    gradientClass: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-950/20 dark:to-indigo-950/20',
    description: 'Your BMI is below 18.5, indicating your weight is lower than what is generally considered healthy for your height. This might suggest nutritional deficiencies or underlying health concerns.',
    risks: [
      'Nutritional deficiencies (anemia, vitamin deficiencies)',
      'Weakened immune function and high risk of infections',
      'Osteoporosis and bone fragility, increasing fracture risk',
      'Persistent fatigue, low energy levels, and brain fog',
      'Reduced muscle mass, muscle wasting, and physical weakness',
      'Potential fertility challenges and hormonal imbalances'
    ],
    recommendations: [
      'Focus on nutrient-dense foods (nuts, avocados, seeds, lean protein, and whole grains)',
      'Increase healthy calorie intake gradually by eating 5–6 smaller meals daily',
      'Incorporate strength training to build lean muscle mass rather than fat',
      'Consult a healthcare provider or registered dietitian for a supervised weight-gain plan'
    ]
  },
  normal: {
    category: 'normal',
    label: 'Normal Weight',
    minBmi: 18.5,
    maxBmi: 24.9,
    colorClass: 'bg-bmi-healthy',
    textColorClass: 'text-bmi-healthy',
    borderColorClass: 'border-bmi-healthy/30',
    gradientClass: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/20 dark:to-teal-950/20',
    description: 'Your BMI falls within the healthy range of 18.5 to 24.9. Maintaining this weight profile reduces the likelihood of developing serious weight-related conditions.',
    risks: [
      'Minimal risk of weight-related chronic diseases',
      'Optimal body composition and efficient metabolic rate',
      'Excellent cardiovascular and blood circulation health',
      'Strong bone density and balanced joint pressure'
    ],
    recommendations: [
      'Continue eating a balanced diet rich in whole foods, vegetables, and lean proteins',
      'Stay physically active with a mix of cardio and resistance exercise (150 min/week)',
      'Prioritize hydration, sleep hygiene, and stress management',
      'Monitor changes periodically to maintain your healthy equilibrium'
    ]
  },
  overweight: {
    category: 'overweight',
    label: 'Overweight',
    minBmi: 25.0,
    maxBmi: 29.9,
    colorClass: 'bg-bmi-overweight',
    textColorClass: 'text-bmi-overweight',
    borderColorClass: 'border-bmi-overweight/30',
    gradientClass: 'from-yellow-500/10 to-amber-500/10 dark:from-yellow-950/20 dark:to-amber-950/20',
    description: 'Your BMI is between 25.0 and 29.9. This indicates you carry slightly more weight than recommended for your height, which can increase metabolic strain and cardiovascular risks.',
    risks: [
      'Elevated blood pressure (hypertension) and heart strain',
      'Increased risk of developing insulin resistance or Type 2 diabetes',
      'Adverse lipid profile (high LDL cholesterol, low HDL, high triglycerides)',
      'Joint strain and localized pain, especially in knees, hips, and lower back',
      'Mild sleep breathing disruption (sleep apnea) and daytime fatigue'
    ],
    recommendations: [
      'Gradually increase physical activity, combining cardiovascular and strength workouts',
      'Minimize intake of highly processed foods, refined sugars, and sweetened beverages',
      'Practice portion control and focus on high-fiber foods to increase satiety',
      'Aim for a sustainable weight reduction (e.g., 0.5 kg per week) through consistency'
    ]
  },
  obese1: {
    category: 'obese1',
    label: 'Obese Class I',
    minBmi: 30.0,
    maxBmi: 34.9,
    colorClass: 'bg-bmi-obese1',
    textColorClass: 'text-bmi-obese1',
    borderColorClass: 'border-bmi-obese1/30',
    gradientClass: 'from-orange-500/10 to-red-500/10 dark:from-orange-950/20 dark:to-red-950/20',
    description: 'Your BMI is 30.0 to 34.9, placing you in Obesity Class I. This level indicates an accumulation of body fat that begins to significantly affect multiple health indicators and long-term vitality.',
    risks: [
      'Coronary artery disease, heart attacks, and circulatory failure',
      'High risk of chronic Type 2 diabetes requiring medical management',
      'Moderate to severe sleep apnea and nighttime oxygen depletion',
      'Fatty liver disease (metabolic-associated steatohepatitis)',
      'Accelerated wear on weight-bearing joints, leading to osteoarthritis'
    ],
    recommendations: [
      'Schedule a general check-up with a doctor to evaluate metabolic risk factors',
      'Adopt a structured, nutritious eating plan targeting a moderate calorie deficit',
      'Start with gentle, low-impact exercise (walking, swimming, water aerobics) to protect joints',
      'Focus on behavioral modification, habit tracking, and building support systems'
    ]
  },
  obese2: {
    category: 'obese2',
    label: 'Obese Class II',
    minBmi: 35.0,
    maxBmi: 39.9,
    colorClass: 'bg-bmi-obese2',
    textColorClass: 'text-bmi-obese2',
    borderColorClass: 'border-bmi-obese2/30',
    gradientClass: 'from-red-500/10 to-rose-500/10 dark:from-red-950/20 dark:to-rose-950/20',
    description: 'Your BMI is between 35.0 and 39.9, classifying as Obesity Class II. The risk of developing severe vascular, metabolic, and joint complications is highly elevated at this range.',
    risks: [
      'Severe hypertension and high risk of thromboembolism or stroke',
      'Advanced sleep apnea, chronic daytime sleepiness, and asthma exacerbation',
      'Renal strain and increased likelihood of chronic kidney disease',
      'Gallbladder disease and elevated inflammatory markers in the blood',
      'Compromised mobility and chronic musculoskeletal discomfort'
    ],
    recommendations: [
      'Seek professional support from a physician, bariatric specialist, or registered dietitian',
      'Implement a personalized, medically-supervised dietary and lifestyle protocol',
      'Focus on non-weight-bearing physical activities (e.g. swimming or recumbent stationary cycling)',
      'Track vital parameters (blood pressure, blood glucose) regularly to assess health improvement'
    ]
  },
  obese3: {
    category: 'obese3',
    label: 'Obese Class III',
    minBmi: 40.0,
    maxBmi: 100.0,
    colorClass: 'bg-bmi-obese3',
    textColorClass: 'text-bmi-obese3',
    borderColorClass: 'border-bmi-obese3/30',
    gradientClass: 'from-rose-600/10 to-red-800/10 dark:from-rose-950/30 dark:to-red-950/30',
    description: 'Your BMI is 40.0 or higher, classified as Obesity Class III (Severe or Morbid Obesity). This state is associated with the highest risk of chronic disease and reduced life expectancy.',
    risks: [
      'Substantially reduced life expectancy and elevated premature mortality risk',
      'Severe, complex heart failure, chronic venous insufficiency, and stroke',
      'Severe insulin-dependent Type 2 diabetes with elevated neuropathy risk',
      'Severe osteoarthritis resulting in critical mobility limitations and joint damage',
      'Pulmonary hypertension and chronic obesity hypoventilation syndrome'
    ],
    recommendations: [
      'Consult a multidisciplinary medical team (endocrinologist, cardiologist, bariatric expert)',
      'Explore clinical treatment pathways, including pharmacotherapy and bariatric surgery options',
      'Incorporate assisted or low-impact exercises in safe environments under therapist guidance',
      'Set small, bite-sized health targets (e.g. improving glycemic control or minor mobility goals)'
    ]
  }
};
