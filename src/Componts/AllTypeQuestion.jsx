import React from "react";
import { CheckCircle, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

const AllTypeQuestion = ({
  question,
  onSelect,
  onInputChange,
  onFileUpload,
  answers,
}) => {
  if (!question) return null;

  return (
    <div className="space-y-6">
      {/* Single Choice Options */}
      {question.singleChoiceOptions?.length > 0 && (
        <div>
          {question.singleChoiceOptions.map((option, index) => (
            <label
              key={index}
              className="flex items-center mb-4 p-2 border rounded-lg hover:bg-purple-100 cursor-pointer"
            >
              <input
                type="radio"
                name={`survey-option-${question.id}`}
                value={option.value}
                checked={answers[question.id]?.selectedOption === option.value}
                onChange={() => onSelect(option.value, question.id)}
                className="mr-2 accent-[#541495]"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}

      {/* File Uploads */}
      {question.uploadOptions?.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {question.uploadOptions.map((option, index) => {
            const uploadedFile = answers[question.id]?.[option];

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
                      onFileUpload(option, file, question.id);
                    }
                  }}
                />
              </label>
            );
          })}
        </div>
      )}

      {/* Text Fields */}
      {question.fields?.length > 0 && (
        <div className="grid grid-cols-1 gap-6 max-w-xl">
          {question.fields.map((field, index) => (
            <div key={index}>
              <label className="block text-base font-semibold text-gray-800 mb-2">
                {field}
              </label>
              <Input
                variant="Ghost"
                type="text"
                placeholder="Type here..."
                value={answers[question.id]?.[field] || ""}
                className="w-full h-14 p-4 border rounded-xl bg-pink-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  onInputChange(field, e.target.value, question.id)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTypeQuestion;
