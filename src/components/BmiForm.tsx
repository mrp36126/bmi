import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Scale, Ruler, Calendar, Users, Calculator } from 'lucide-react';
import { bmiFormSchema } from '../utils/bmiSchema';
import type { BmiFormInput } from '../utils/bmiSchema';


interface BmiFormProps {
  onSubmit: (data: BmiFormInput) => void;
  initialValues?: BmiFormInput;
}

export const BmiForm: React.FC<BmiFormProps> = ({ onSubmit, initialValues }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BmiFormInput>({
    resolver: zodResolver(bmiFormSchema),
    defaultValues: initialValues || {
      heightUnit: 'cm',
    },
    mode: 'onTouched',
  });

  const heightUnit = watch('heightUnit');

  const handleUnitToggle = (newUnit: 'cm' | 'm') => {
    const currentUnit = getValues('heightUnit');
    if (currentUnit === newUnit) return;

    const currentHeight = getValues('height');
    setValue('heightUnit', newUnit, { shouldValidate: false });

    if (currentHeight !== undefined && currentHeight !== null && !isNaN(currentHeight)) {
      if (newUnit === 'm') {
        // cm -> m
        const converted = Math.round((currentHeight / 100) * 100) / 100;
        setValue('height', converted, { shouldValidate: true });
      } else {
        // m -> cm
        const converted = Math.round(currentHeight * 100);
        setValue('height', converted, { shouldValidate: true });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-left"
      noValidate
    >
      {/* Weight Input */}
      <div className="space-y-2">
        <label
          htmlFor="weight"
          className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          <Scale className="mr-2 h-4.5 w-4.5 text-emerald-500" />
          Weight (kg)
        </label>
        <div className="relative rounded-2xl shadow-xs">
          <input
            id="weight"
            type="number"
            step="any"
            placeholder="e.g. 72.5"
            aria-invalid={errors.weight ? 'true' : 'false'}
            aria-describedby={errors.weight ? 'weight-error' : undefined}
            className={`w-full rounded-2xl px-4 py-3.5 pr-12 text-gray-900 dark:text-white glass-input dark:glass-input hover:border-gray-300 dark:hover:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 ${
              errors.weight ? 'border-red-500 dark:border-red-500/50' : ''
            }`}
            {...register('weight', { valueAsNumber: true })}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <span className="text-sm font-medium text-gray-400 dark:text-gray-500">kg</span>
          </div>
        </div>
        {errors.weight && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            id="weight-error"
            className="text-xs font-medium text-red-600 dark:text-red-400 pl-1"
          >
            {errors.weight.message}
          </motion.p>
        )}
      </div>

      {/* Height Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="height"
            className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            <Ruler className="mr-2 h-4.5 w-4.5 text-emerald-500" />
            Height
          </label>
          {/* Height Unit Segment Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => handleUnitToggle('cm')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                heightUnit === 'cm'
                  ? 'bg-white text-gray-900 shadow-xs dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              cm
            </button>
            <button
              type="button"
              onClick={() => handleUnitToggle('m')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                heightUnit === 'm'
                  ? 'bg-white text-gray-900 shadow-xs dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              m
            </button>
          </div>
        </div>
        <div className="relative rounded-2xl shadow-xs">
          <input
            id="height"
            type="number"
            step="any"
            placeholder={heightUnit === 'cm' ? 'e.g. 178' : 'e.g. 1.78'}
            aria-invalid={errors.height ? 'true' : 'false'}
            aria-describedby={errors.height ? 'height-error' : undefined}
            className={`w-full rounded-2xl px-4 py-3.5 pr-12 text-gray-900 dark:text-white glass-input dark:glass-input hover:border-gray-300 dark:hover:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 ${
              errors.height ? 'border-red-500 dark:border-red-500/50' : ''
            }`}
            {...register('height', { valueAsNumber: true })}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
              {heightUnit}
            </span>
          </div>
        </div>
        {errors.height && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            id="height-error"
            className="text-xs font-medium text-red-600 dark:text-red-400 pl-1"
          >
            {errors.height.message}
          </motion.p>
        )}
      </div>

      {/* Age and Gender Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Age */}
        <div className="space-y-2">
          <label
            htmlFor="age"
            className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            <Calendar className="mr-2 h-4.5 w-4.5 text-emerald-500" />
            Age
          </label>
          <input
            id="age"
            type="number"
            placeholder="e.g. 28"
            aria-invalid={errors.age ? 'true' : 'false'}
            aria-describedby={errors.age ? 'age-error' : undefined}
            className={`w-full rounded-2xl px-4 py-3.5 text-gray-900 dark:text-white glass-input dark:glass-input hover:border-gray-300 dark:hover:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 ${
              errors.age ? 'border-red-500 dark:border-red-500/50' : ''
            }`}
            {...register('age', { valueAsNumber: true })}
          />
          {errors.age && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              id="age-error"
              className="text-xs font-medium text-red-600 dark:text-red-400 pl-1"
            >
              {errors.age.message}
            </motion.p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label
            htmlFor="gender"
            className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            <Users className="mr-2 h-4.5 w-4.5 text-emerald-500" />
            Gender
          </label>
          <select
            id="gender"
            defaultValue=""
            aria-invalid={errors.gender ? 'true' : 'false'}
            aria-describedby={errors.gender ? 'gender-error' : undefined}
            className={`w-full rounded-2xl px-4 py-3.5 text-gray-900 dark:text-white glass-input dark:glass-input hover:border-gray-300 dark:hover:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 bg-transparent ${
              errors.gender ? 'border-red-500 dark:border-red-500/50' : ''
            }`}
            {...register('gender')}
          >
            <option value="" disabled className="text-gray-400 dark:text-gray-600">
              Select Gender
            </option>
            <option value="male" className="text-gray-900 dark:bg-gray-900 dark:text-white">
              Male
            </option>
            <option value="female" className="text-gray-900 dark:bg-gray-900 dark:text-white">
              Female
            </option>
            <option value="other" className="text-gray-900 dark:bg-gray-900 dark:text-white">
              Prefer not to say
            </option>
          </select>
          {errors.gender && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              id="gender-error"
              className="text-xs font-medium text-red-600 dark:text-red-400 pl-1"
            >
              {errors.gender.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:shadow-teal-950/20 dark:focus:ring-purple-500 dark:focus:ring-offset-gray-900 transition-all duration-200 cursor-pointer"
      >
        <Calculator className="mr-2 h-5 w-5" />
        Calculate BMI
      </motion.button>
    </form>
  );
};
