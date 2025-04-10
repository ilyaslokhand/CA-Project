import React from "react";

const StepProgress = ({ totalSteps, currentStep, answers, questions }) => {
  const start = Math.max(0, currentStep - 2);
  const end = Math.min(questions.length, currentStep + 2);

  const getStepColor = (q, step) => {
    let isAnswered = false;

    if (q.type === "text-input") {
      isAnswered = q.fields.some((field) => answers[q.id]?.[field]?.trim());
    } else if (q.type === "file-upload") {
      isAnswered = q.options.some((opt) => answers[q.id]?.[opt]);
    } else {
      isAnswered = answers[q.id] !== undefined && answers[q.id] !== "";
    }

    const isCurrent = step === currentStep;
    const isSkipped = step < currentStep && !isAnswered;
    const isCompleted = step < currentStep && isAnswered;

    if (isCurrent) return "bg-[#A855F7] text-white";
    if (isSkipped) return "bg-yellow-400 text-black";
    if (isCompleted) return "bg-green-500 text-white";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <>
      <div className="md:flex items-center justify-center hidden mb-6 px-4 min-h-[60px]">
        {questions.map((q, index) => {
          const step = index + 1;
          return (
            <React.Fragment key={step}>
              <div className="relative z-10">
                <div
                  className={`flex items-center justify-center rounded-full w-10 h-10 font-bold text-sm ${getStepColor(
                    q,
                    step
                  )}`}
                >
                  {step}
                </div>
              </div>
              {step !== totalSteps && (
                <div className="flex-1 h-1 relative -ml-1 -mr-1">
                  <div className="absolute top-1/2 w-full h-1 bg-gray-200 transform -translate-y-1/2" />
                  {step < currentStep && (
                    <div className="absolute top-1/2 left-0 h-1 bg-purple-500 transform -translate-y-1/2 w-full" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Mobile View – Only two steps visible */}
      <div className="flex md:hidden items-center justify-center mb-6 px-4">
        {questions.slice(start, end).map((q, index) => {
          const actualIndex = start + index;
          const step = actualIndex + 1;

          return (
            <React.Fragment key={step}>
              <div className="relative z-10">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${getStepColor(
                    q,
                    step
                  )}`}
                >
                  {step}
                </div>
              </div>
              {step !== totalSteps && index !== end - start - 1 && (
                <div className="w-8 h-1 bg-gray-300 mx-2" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default StepProgress;
