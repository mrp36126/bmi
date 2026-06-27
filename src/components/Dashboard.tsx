import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Scale, ArrowRight, Heart } from 'lucide-react';
import type { UserMeasurements } from '../types';
import {
  calculateBmi,
  classifyBmi,
  calculateHealthyWeightRange,
  calculateWeightDifference,
  categoryDetails
} from '../utils/bmiCalculator';
import { BmiGauge } from './BmiGauge';
import { BmiSpectrum } from './BmiSpectrum';
import { RiskCard } from './RiskCard';
import { RecommendationCard } from './RecommendationCard';
import { Disclaimer } from './Disclaimer';

interface DashboardProps {
  measurements: UserMeasurements;
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ measurements, onBack }) => {
  const { weight, height, heightUnit, age, gender } = measurements;

  const bmi = calculateBmi(weight, height, heightUnit);
  const category = classifyBmi(bmi);
  const details = categoryDetails[category];
  const range = calculateHealthyWeightRange(height, heightUnit);
  const difference = calculateWeightDifference(weight, height, heightUnit, bmi);

  const formattedGender =
    gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Prefer not to say';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.2 } },
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Back Button and User Specs Summary */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft className="mr-1.5 h-4 w-4" />
          Edit Measurements
        </button>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <span className="rounded-lg bg-gray-100 dark:bg-gray-800/80 px-2.5 py-1.5">
            Height: {height} {heightUnit}
          </span>
          <span className="rounded-lg bg-gray-100 dark:bg-gray-800/80 px-2.5 py-1.5">
            Weight: {weight} kg
          </span>
          <span className="rounded-lg bg-gray-100 dark:bg-gray-800/80 px-2.5 py-1.5">
            Age: {age} yrs
          </span>
          <span className="rounded-lg bg-gray-100 dark:bg-gray-800/80 px-2.5 py-1.5">
            Gender: {formattedGender}
          </span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Gauge and Core Summary */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/30 dark:bg-gray-905/30 backdrop-blur-md p-6 shadow-xs text-center relative overflow-hidden"
        >
          {/* Subtle category-dependent backing glow */}
          <div className={`absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl opacity-15 dark:opacity-20 ${details.colorClass}`} />

          <div className="mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Current Classification
            </span>
            <h2 className={`text-2xl font-black mt-1 ${details.textColorClass}`}>
              {details.label}
            </h2>
          </div>

          <BmiGauge
            bmi={bmi}
            categoryLabel={details.label}
            categoryColorClass={`${details.textColorClass} ring-${category === 'normal' ? 'emerald' : category === 'underweight' ? 'blue' : 'rose'}-500/20 bg-${category === 'normal' ? 'emerald' : category === 'underweight' ? 'blue' : 'rose'}-50 dark:bg-${category === 'normal' ? 'emerald' : category === 'underweight' ? 'blue' : 'rose'}-950/20`}
          />

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/50">
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              {details.description}
            </p>
          </div>
        </motion.div>

        {/* Right Column: Calculations & Spectrum Details */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/30 dark:bg-gray-905/30 backdrop-blur-md p-6 shadow-xs"
        >
          <div className="space-y-6">
            {/* Header details */}
            <div className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Analysis & Insights
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Calculations based on healthy weight metrics for a height of {height} {heightUnit}
              </p>
            </div>

            {/* BMI Spectrum */}
            <BmiSpectrum bmi={bmi} />

            {/* Health Info Block: Healthy weight range & Difference */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
              {/* Healthy Weight Card */}
              <div className="rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 p-4 border border-gray-100/50 dark:border-gray-850/50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Ideal Weight Range
                </span>
                <p className="text-base font-extrabold text-gray-800 dark:text-gray-200 mt-1">
                  {range.min} kg – {range.max} kg
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                  Calculated using 18.5 – 24.9 ideal BMI indices
                </p>
              </div>

              {/* Status/Difference Card */}
              <div className="rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 p-4 border border-gray-100/50 dark:border-gray-850/50 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Weight Adjustment
                  </span>
                  <div className="mt-1 flex items-baseline">
                    {category === 'normal' ? (
                      <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                        Perfect Balance
                      </p>
                    ) : (
                      <p className={`text-base font-extrabold ${category === 'underweight' ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {difference > 0 ? `${difference} kg` : '0 kg'}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
                  {category === 'normal' ? (
                    'Your weight is currently optimal'
                  ) : category === 'underweight' ? (
                    'Gain needed to reach normal BMI'
                  ) : (
                    'Loss needed to reach normal BMI'
                  )}
                </p>
              </div>
            </div>

            {/* Target Alignment Card */}
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 dark:from-emerald-950/10 dark:to-teal-950/10 p-4 border border-emerald-100/20 dark:border-emerald-950/20 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 p-2 text-emerald-600 dark:text-emerald-400">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-250">
                    Ideal BMI Interval
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal">
                    The clinical healthy reference range is 18.5 to 24.9.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs font-black text-gray-800 dark:text-gray-200">
                <span>18.5</span>
                <ArrowRight className="h-3 w-3 text-gray-400" />
                <span>24.9</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risks & Recommendations Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div variants={itemVariants}>
          <RiskCard
            risks={details.risks}
            category={category}
            borderColorClass={details.borderColorClass}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <RecommendationCard
            recommendations={details.recommendations}
            colorClass={details.textColorClass}
          />
        </motion.div>
      </div>

      {/* Recalculate CTA bar */}
      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-gray-150/40 dark:border-gray-800/40 bg-gray-50/20 dark:bg-gray-900/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
      >
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500">
            <Heart className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Ready to adjust your targets?
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Update weight or explore other height parameters.
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="w-full sm:w-auto rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-950 px-5 py-3 text-xs font-bold shadow-xs hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        >
          Check Another Score
        </button>
      </motion.div>

      {/* Disclaimer */}
      <motion.div variants={itemVariants}>
        <Disclaimer />
      </motion.div>
    </motion.div>
  );
};
