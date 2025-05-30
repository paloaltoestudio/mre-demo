import { motion } from "framer-motion";

type DinamicNavProps = {
  currentStep: number;
  steps: string[];
};

export const DinamicNav = ({ currentStep, steps }: DinamicNavProps) => {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full lg:w-10/12 px-4">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 transform -translate-y-1/2 z-0" />

        <motion.div
          className="absolute top-1/2 left-0 h-0.5 bg-blue-500 transform -translate-y-1/2 z-10"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />

        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={index}
              className="relative z-20 top-3 flex flex-col items-center w-full"
            >
              <div
                className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold border-5 border-white 
                  ${
                    isCompleted
                      ? "bg-blue-600 text-white"
                      : isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-500"
                  }
                `}
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
