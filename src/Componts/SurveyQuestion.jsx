import React, { useState } from "react";
import { CheckCircle, Ghost, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
            className="flex items-center my-2 p-2 border rounded-lg hover:bg-purple-100 cursor-pointer"
          >
            <input
              type="radio"
              name="survey-option"
              value={option}
              checked={selectedOption === option}
              onChange={() => onSelect(option)}
              className="mr-2 accent-purple-500"
            />
            {option}
          </label>
        ))}
      </div>
    );
  } else if (question.type === "text-input") {
    return (
      <div>
        {question.fields.map((field, index) => (
          <Input
            variant="Ghost"
            key={index}
            type="text"
            placeholder={field}
            value={answers[field] || ""}
            className="block w-full p-2 my-2 border rounded-lg text-left"
            onChange={(e) => onInputChange(field, e.target.value)}
          />
        ))}
      </div>
    );
  } else if (question.type === "file-upload") {
    return (
      <div className="grid grid-cols-2 gap-4">
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
