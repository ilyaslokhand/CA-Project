// import React from "react";
// import { Bell, Menu } from "lucide-react";

// const StepProgress = () => {
//   const steps = [1, 2, 3, 4, 5]; // Step numbers
//   const activeStep = 2; // Current active step

//   return (
//     <div className="flex items-center justify-between p-4 bg-white ">
//       {/* Left: Sidebar Toggle + Report Title */}
//       <div className="flex items-center space-x-4">
//         <h2 className="text-lg font-semibold">
//           Annual Report 2024{" "}
//           <span className="text-yellow-500 text-sm">View Only</span>
//         </h2>
//       </div>

//       {/* Right: Notification Icon */}
//       <Bell className="text-purple-500 cursor-pointer" size={20} />

//       {/* Step Progress Bar */}
//       <div className="absolute left-1/2 top-16 transform -translate-x-1/2 w-[60%] flex items-center">
//         {steps.map((step, index) => (
//           <div key={step} className="flex items-center w-full">
//             {/* Step Circle */}
//             <div
//               className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${
//                 step === activeStep
//                   ? "bg-purple-500"
//                   : step < activeStep
//                   ? "bg-green-500"
//                   : "bg-gray-300"
//               }`}
//             >
//               {step}
//             </div>

//             {/* Progress Line */}
//             {index < steps.length - 1 && (
//               <div
//                 className={`h-1 w-full ${
//                   step < activeStep ? "bg-purple-500" : "bg-gray-200"
//                 }`}
//               ></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StepProgress;
