import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { BmiForm } from './components/BmiForm';
import { Dashboard } from './components/Dashboard';
import { useLocalStorageTheme } from './hooks/useLocalStorageTheme';
import type { UserMeasurements } from './types';
import type { BmiFormInput } from './utils/bmiSchema';
import { ShieldCheck, HeartHandshake, EyeOff, Sparkles } from 'lucide-react';


function App() {
  const { theme, toggleTheme } = useLocalStorageTheme();
  const [measurements, setMeasurements] = useState<UserMeasurements | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = (data: BmiFormInput) => {
    setMeasurements({
      weight: data.weight,
      height: data.height,
      heightUnit: data.heightUnit,
      age: data.age,
      gender: data.gender,
    });
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 dark:bg-gray-950 dark:text-gray-150 transition-colors duration-300 font-sans flex flex-col antialiased">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/10 dark:bg-emerald-950/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/10 dark:bg-purple-950/15 blur-[120px]" />
      </div>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 relative z-10">
        <AnimatePresence mode="wait">
          {!showResults || !measurements ? (

            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center"
            >
              {/* Left Column: Premium Branding & Insights */}
              <div className="lg:col-span-6 text-left space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <Sparkles className="h-3 w-3 animate-spin" />
                    <span>Calculated Instantly</span>
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl leading-tight">
                    Understand Your Body's{' '}
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                      Weight Profile
                    </span>
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                    BMI Health Dashboard analyzes height, weight, age, and gender parameters locally. It computes your body index under standard WHO criteria, delivering metabolic risk profiles and personalized lifestyle advice.
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-4 sm:space-y-5 max-w-md">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 rounded-xl bg-white dark:bg-gray-900 p-2 text-emerald-500 shadow-sm border border-gray-150/40 dark:border-gray-800/40">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                        WHO Clinical Classifications
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal mt-0.5">
                        Aligned with clinical limits for Underweight, Healthy, and Obesity categories.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 rounded-xl bg-white dark:bg-gray-900 p-2 text-emerald-500 shadow-sm border border-gray-150/40 dark:border-gray-800/40">
                      <EyeOff className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                        100% Local & Private
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal mt-0.5">
                        Your body measurements never leave your computer. We do not use databases, track, or save inputs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 rounded-xl bg-white dark:bg-gray-900 p-2 text-emerald-500 shadow-sm border border-gray-150/40 dark:border-gray-800/40">
                      <HeartHandshake className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                        Actionable Lifestyle Guidance
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal mt-0.5">
                        Receive general weight range advice and metabolic risks cards to review with a qualified specialist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form Card */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-gray-150/40 dark:border-gray-800/40 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md p-6 sm:p-8 shadow-xl">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Enter Measurements
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Provide your current statistics for immediate calculation
                    </p>
                  </div>
                  <BmiForm onSubmit={handleFormSubmit} initialValues={measurements || undefined} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <Dashboard measurements={measurements} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full border-t border-gray-200/20 dark:border-gray-800/20 py-6 text-center text-xs text-gray-400 dark:text-gray-500 relative z-10">
        <p className="m-0">
          &copy; {new Date().getFullYear()} BMI Health Dashboard. All calculations are executed locally and are confidential.
        </p>
      </footer>
    </div>
  );
}

export default App;
