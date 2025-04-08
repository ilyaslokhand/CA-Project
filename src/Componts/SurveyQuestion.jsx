import React, { useState } from "react";
import { CheckCircle, Ghost, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StepProgress from "./StepProgress";

const SurveyQuestion = ({
  question,
  onSelect,
  onInputChange,
  onFileUpload,
  selectedOption,
  answers,
}) => {
  if (!question) return null;

  if (question.type === "single-choice") {
    return (
      <div>
        {question.options?.map((option, index) => (
          <label
            key={index}
            className="flex items-center mb-4 p-2 border rounded-lg hover:bg-purple-100 cursor-pointer"
          >
            <input
              type="radio"
              name={`survey-option-${question.id}`}
              value={option.value}
              checked={answers[question.id] === option.value}
              onChange={() => onSelect(option.value)}
              className="mr-2 accent-[#541495]"
            />
            {option.label}
          </label>
        ))}
      </div>
    );
  } else if (question.type === "text-input") {
    return (
      <div className="w-full max-w-2xl">
        {" "}
        {/* Optional max width for layout control */}
        {question.fields.map((field, index) => (
          <div key={index} className="mb-6">
            <label className="block text-base font-semibold text-gray-800 mb-2">
              {field}
            </label>
            <Input
              variant="Ghost"
              type="text"
              placeholder="Type here..."
              value={answers[field] || ""}
              className="w-full h-14 p-4 border rounded-xl bg-pink-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => onInputChange(field, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  } else if (question.type === "file-upload") {
    return (
      <div className="grid grid-cols-2 gap-4 ">
        {question.options.map((option, index) => {
          const fileKey = `${question.id}-${option}`;
          const uploadedFile = answers[fileKey]; // Retrieve correct file

          return (
            <label
              key={index}
              className={`flex items-center justify-between px-6 py-4 rounded-lg cursor-pointer transition-all ${
                uploadedFile
                  ? "bg-purple-600 border border-purple-700"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              <div className="flex items-center gap-2">
                {uploadedFile ? (
                  <CheckCircle className="text-white" size={20} />
                ) : (
                  <Upload className="text-white" size={20} />
                )}
                <span className="text-white font-semibold">
                  {uploadedFile ? uploadedFile.name : option}
                </span>
              </div>

              <input
                type="file"
                accept=".pdf,.jpg,.png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    onFileUpload(option, file); // Pass option to store correctly
                  }
                }}
              />
            </label>
          );
        })}
      </div>
    );
  }

  return null;
};

export default SurveyQuestion;
