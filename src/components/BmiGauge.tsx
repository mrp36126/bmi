import React from 'react';
import { motion } from 'framer-motion';


interface BmiGaugeProps {
  bmi: number;
  categoryLabel: string;
  categoryColorClass: string;
}

export const BmiGauge: React.FC<BmiGaugeProps> = ({ bmi, categoryLabel, categoryColorClass }) => {
  const minBmi = 12;
  const maxBmi = 42;

  // Calculate needle angle (225 degrees is bottom-left, 495 is bottom-right)
  const getAngle = (val: number) => {
    if (val <= minBmi) return 225;
    if (val >= maxBmi) return 495;
    return 225 + ((val - minBmi) / (maxBmi - minBmi)) * 270;
  };

  const angle = getAngle(bmi);

  // SVG helper coordinates for the arc path
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  // Outer tracks segments
  const radius = 70;
  const cx = 100;
  const cy = 100;

  // 12 to 18.5: Underweight (Sweep: 58.5 deg)
  const dUnderweight = describeArc(cx, cy, radius, 225, 283.5);
  // 18.5 to 25.0: Healthy (Sweep: 58.5 deg)
  const dHealthy = describeArc(cx, cy, radius, 283.5, 342.0);
  // 25.0 to 30.0: Overweight (Sweep: 45 deg)
  const dOverweight = describeArc(cx, cy, radius, 342.0, 387.0);
  // 30.0 to 35.0: Obese Class I (Sweep: 45 deg)
  const dObese1 = describeArc(cx, cy, radius, 387.0, 432.0);
  // 35.0 to 42.0: Obese Class II+ (Sweep: 63 deg)
  const dObese2 = describeArc(cx, cy, radius, 432.0, 495.0);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-64 sm:w-72 sm:h-72">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-sm select-none"
          aria-label={`BMI gauge showing ${bmi}`}
        >
          {/* Background Track Grid */}
          <path
            d={describeArc(cx, cy, radius, 225, 495)}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            className="text-gray-100 dark:text-gray-800"
          />

          {/* Underweight Segment (Blue) */}
          <path
            d={dUnderweight}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Healthy Segment (Green) */}
          <path
            d={dHealthy}
            fill="none"
            stroke="#10b981"
            strokeWidth="10"
          />

          {/* Overweight Segment (Yellow) */}
          <path
            d={dOverweight}
            fill="none"
            stroke="#eab308"
            strokeWidth="10"
          />

          {/* Obese Class I Segment (Orange) */}
          <path
            d={dObese1}
            fill="none"
            stroke="#f97316"
            strokeWidth="10"
          />

          {/* Obese Class II+ Segment (Red) */}
          <path
            d={dObese2}
            fill="none"
            stroke="#ef4444"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Tick markers */}
          {[225, 283.5, 342, 387, 432, 495].map((angle, idx) => {
            const start = polarToCartesian(cx, cy, radius - 8, angle);
            const end = polarToCartesian(cx, cy, radius - 14, angle);
            return (
              <line
                key={idx}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-gray-400 dark:text-gray-500"
              />
            );
          })}

          {/* Needle Group */}
          <motion.g
            initial={{ rotate: 45 }}
            animate={{ rotate: angle }}
            transition={{ type: 'spring', stiffness: 60, damping: 12 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            {/* Needle Line */}
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - 62}
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="text-gray-800 dark:text-white"
            />
            {/* Arrow Tip */}
            <polygon
              points={`${cx - 5},${cy - 56} ${cx + 5},${cy - 56} ${cx},${cy - 68}`}
              fill="currentColor"
              className="text-gray-800 dark:text-white"
            />
          </motion.g>

          {/* Center Pin */}
          <circle
            cx={cx}
            cy={cy}
            r="8"
            fill="currentColor"
            className="text-gray-900 dark:text-white"
          />
          <circle
            cx={cx}
            cy={cy}
            r="3"
            fill="currentColor"
            className="text-emerald-400 dark:text-purple-400"
          />

          {/* Digital Display Texts */}
          <text
            x={cx}
            y={cy + 40}
            textAnchor="middle"
            className="text-3xl font-extrabold tracking-tight fill-gray-900 dark:fill-white font-sans"
          >
            {bmi.toFixed(1)}
          </text>

          <text
            x={cx}
            y={cy + 58}
            textAnchor="middle"
            className="text-[9px] font-extrabold uppercase tracking-widest fill-gray-400 dark:fill-gray-500 font-sans"
          >
            BMI Score
          </text>
        </svg>

        {/* Small text below gauge for Category */}
        <div className="absolute bottom-4 left-0 w-full text-center">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${categoryColorClass}`}>
            {categoryLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
