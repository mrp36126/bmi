import React from 'react';
import { Sun, Moon, Activity } from 'lucide-react';
import type { Theme } from '../hooks/useLocalStorageTheme';


interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-gray-200/30 dark:border-gray-800/30 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:py-5">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20 dark:shadow-emerald-950/30">
            <Activity className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl m-0 leading-none">
              BMI Health <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">
              Personal Health Assessment Tool
            </span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>
      </div>
    </header>
  );
};
