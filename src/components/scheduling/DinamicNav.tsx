
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type DinamicNavProps = {
  currentStep: number;
  steps: string[];
};

export const DinamicNav = ({ currentStep, steps }: DinamicNavProps) => {
  const [showNavs, setShowNavs] = useState<string[]>([]);
  const { watch } = useFormContext();
  const dependentsWatch = watch("dependientesCount") || 0;

  useEffect(() => {
    if (dependentsWatch > 0) {
      setShowNavs(steps);
    } else {
      const newSteps = steps.filter((step) => step !== "Datos dependientes");
      setShowNavs(newSteps);
    }
  }, [dependentsWatch, steps]);

  const progress =
    showNavs.length > 1 ? ((currentStep - 1) / (showNavs.length - 1)) * 100 : 0;

  const visualProgressOffset = 2.5;
  const finalProgress = Math.min(
    100,
    progress +
      (currentStep > 0 && showNavs.length > 1 ? visualProgressOffset : 0)
  );

  return (
    <div className="w-full px-4 flex flex-col items-center">
      <div className="relative w-full lg:w-11/12 flex items-center justify-between">
        
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 transform -translate-y-1/2 z-0" />

        <motion.div
          className="absolute top-1/2 left-0 h-0.5 bg-blue-500 transform -translate-y-1/2 z-10"
          initial={false}
          animate={{ width: `${finalProgress}%` }} 
          transition={{ duration: 0.5 }}
        />

        {showNavs.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={index}
              className="relative z-20 top-3 flex flex-col items-center flex-1"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold border-5 border-white
                ${
                  isCompleted
                    ? "bg-blue-600 text-white"
                    : isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span
                className={`mt-2 text-sm text-center ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
