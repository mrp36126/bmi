import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

interface RecommendationCardProps {
  recommendations: string[];
  colorClass: string; // text color or bullet color helper
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-2xl border border-gray-100 dark:border-gray-800 p-5 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-xs"
    >
      <div className="flex items-center space-x-3 border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
        <div className="rounded-xl bg-teal-50 dark:bg-teal-950/20 p-2 text-teal-600 dark:text-teal-400">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Lifestyle Guidance & Advice
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 rounded-xl bg-gray-50/55 dark:bg-gray-800/35 p-3 border border-gray-100/40 dark:border-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
          >
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <Check className="h-3 w-3" />
            </div>
            <p className="text-sm leading-normal text-gray-700 dark:text-gray-300">
              {rec}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-[10px] text-gray-400 dark:text-gray-500 text-center font-medium">
        * Recommendations are for general wellness and do not replace clinical advice.
      </div>
    </motion.div>
  );
};
