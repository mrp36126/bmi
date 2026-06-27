import React from 'react';
import { Info } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-950/30 dark:bg-blue-950/10 transition-colors duration-300">
      <div className="flex items-start space-x-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
        <div className="space-y-1">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">
            Important Medical Disclaimer
          </h4>
          <p className="text-xs leading-relaxed text-blue-700/90 dark:text-blue-400/90">
            BMI is a general screening tool and does not directly measure body fat or overall health. Factors such as muscle mass, age, sex, pregnancy status, and general body composition can influence BMI results. Always consult a qualified healthcare professional or clinical provider for personalized medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};
