import React from 'react';
import { motion } from 'framer-motion';

interface BmiSpectrumProps {
  bmi: number;
}

export const BmiSpectrum: React.FC<BmiSpectrumProps> = ({ bmi }) => {
  // Map BMI scale from 12 to 42
  const minBmi = 12;
  const maxBmi = 42;

  const getPercentage = (val: number) => {
    if (val <= minBmi) return 0;
    if (val >= maxBmi) return 100;
    return ((val - minBmi) / (maxBmi - minBmi)) * 100;
  };

  const indicatorPercent = getPercentage(bmi);

  // Boundary markers
  const boundaries = [
    { value: 18.5, label: '18.5' },
    { value: 25.0, label: '25.0' },
    { value: 30.0, label: '30.0' },
    { value: 35.0, label: '35.0' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          BMI Spectrum
        </h3>
        <span className="text-xs font-semibold text-emerald-600 dark:text-teal-400 bg-emerald-50 dark:bg-teal-950/20 px-2.5 py-1 rounded-md">
          WHO Classifications
        </span>
      </div>

      <div className="relative pt-8 pb-4">
        {/* Animated Tooltip Indicator */}
        <div className="absolute top-0 left-0 w-full">
          <motion.div
            initial={{ left: '0%' }}
            animate={{ left: `${indicatorPercent}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="absolute -translate-x-1/2 flex flex-col items-center"
          >
            {/* Tooltip bubble */}
            <span className="rounded-lg bg-gray-900 px-2.5 py-1 text-xs font-extrabold text-white shadow-md dark:bg-white dark:text-gray-900 whitespace-nowrap">
              {bmi.toFixed(1)}
            </span>
            {/* Pointer arrow */}
            <div className="h-1.5 w-1.5 rotate-45 bg-gray-900 dark:bg-white -mt-0.5" />
          </motion.div>
        </div>

        {/* Spectrum Bar */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 flex shadow-inner">
          <div className="h-full bg-bmi-underweight" style={{ width: `${getPercentage(18.5)}%` }} title="Underweight (< 18.5)" />
          <div className="h-full bg-bmi-healthy" style={{ width: `${getPercentage(25.0) - getPercentage(18.5)}%` }} title="Normal Weight (18.5 - 24.9)" />
          <div className="h-full bg-bmi-overweight" style={{ width: `${getPercentage(30.0) - getPercentage(25.0)}%` }} title="Overweight (25.0 - 29.9)" />
          <div className="h-full bg-bmi-obese1" style={{ width: `${getPercentage(35.0) - getPercentage(30.0)}%` }} title="Obese Class I (30.0 - 34.9)" />
          <div className="h-full bg-bmi-obese2" style={{ width: `${100 - getPercentage(35.0)}%` }} title="Obese Class II+ (>= 35.0)" />
        </div>

        {/* Slider Thumb Circle */}
        <div className="absolute top-[28px] left-0 w-full pointer-events-none">
          <motion.div
            initial={{ left: '0%' }}
            animate={{ left: `${indicatorPercent}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="absolute -translate-x-1/2 h-7 w-7 rounded-full border-4 border-white bg-gray-900 dark:bg-white shadow-md flex items-center justify-center -mt-2"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-gray-900" />
          </motion.div>
        </div>

        {/* Boundary Ticks / Labels */}
        <div className="relative mt-3 h-6 text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500">
          <span className="absolute left-0">12.0</span>
          {boundaries.map((tick) => (
            <span
              key={tick.value}
              className="absolute -translate-x-1/2"
              style={{ left: `${getPercentage(tick.value)}%` }}
            >
              {tick.label}
            </span>
          ))}
          <span className="absolute right-0">42.0+</span>
        </div>
      </div>

      {/* Quick Legend indicators */}
      <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400">
        <div className="flex flex-col items-center py-1 rounded-lg bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100/30 dark:border-blue-900/10">
          <span className="h-2 w-2 rounded-full bg-bmi-underweight mb-1" />
          <span>Underweight</span>
        </div>
        <div className="flex flex-col items-center py-1 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/30 dark:border-emerald-900/10">
          <span className="h-2 w-2 rounded-full bg-bmi-healthy mb-1" />
          <span>Healthy</span>
        </div>
        <div className="flex flex-col items-center py-1 rounded-lg bg-yellow-50/50 dark:bg-yellow-950/10 border border-yellow-100/30 dark:border-yellow-900/10">
          <span className="h-2 w-2 rounded-full bg-bmi-overweight mb-1" />
          <span>Overweight</span>
        </div>
        <div className="flex flex-col items-center py-1 rounded-lg bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100/30 dark:border-orange-900/10">
          <span className="h-2 w-2 rounded-full bg-bmi-obese1 mb-1" />
          <span>Obese I</span>
        </div>
        <div className="flex flex-col items-center py-1 rounded-lg bg-red-50/50 dark:bg-red-950/10 border border-red-100/30 dark:border-red-900/10">
          <span className="h-2 w-2 rounded-full bg-bmi-obese2 mb-1" />
          <span>Obese II+</span>
        </div>
      </div>
    </div>
  );
};
