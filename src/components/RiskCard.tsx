import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { BmiCategory } from '../types';


interface RiskCardProps {
  risks: string[];
  category: BmiCategory;
  borderColorClass: string;
}

export const RiskCard: React.FC<RiskCardProps> = ({ risks, category, borderColorClass }) => {
  const isNormal = category === 'normal';
  const isUnderweight = category === 'underweight';

  const Icon = isNormal ? ShieldCheck : isUnderweight ? AlertTriangle : ShieldAlert;
  const iconColorClass = isNormal
    ? 'text-emerald-500 dark:text-emerald-400'
    : isUnderweight
    ? 'text-blue-500 dark:text-blue-400'
    : 'text-rose-500 dark:text-rose-400';

  const cardTitle = isNormal ? 'Health Outlook' : 'Potential Health Risks';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border-l-4 p-5 ${borderColorClass} bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-xs`}
    >
      <div className="flex items-center space-x-3 border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
        <div className={`rounded-xl bg-gray-50 dark:bg-gray-800/80 p-2 ${iconColorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          {cardTitle}
        </h3>
      </div>

      <ul className="space-y-3">
        {risks.map((risk, index) => (
          <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isNormal ? 'bg-emerald-500' : isUnderweight ? 'bg-blue-500' : 'bg-rose-500'}`} />
            <span>{risk}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
