import React from "react";
import AllTypeQuestion from "./AllTypeQuestion";
import FileUploadOption from "./FileUploadOption";
import TextInputFields from "./TextInputFields";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

const SurveyQuestion = ({
  question,
  onSelect,
  onInputChange,
  onFileUpload,
  onFileRemove,
  answers,
  
}) => {

  const uploading = useSelector((state) => state.upload.loading);



  if (!question) return null;

  let selectedValues = [];
  if (question.type === "multi-choice" || question.type === "single-choice") {
    selectedValues = answers[question.id]?.mcqOption || [];
  }

  if (question.type === "multi-choice" || question.type === "single-choice") {
    return (
      <div>
        {question.options?.map((option, index) => (
          <label
            key={index}
            className="flex items-center mb-4 p-2 border rounded-lg hover:bg-purple-100 cursor-pointer"
          >
            <input
              type={question.type === "multi-choice" ? "checkbox" : "radio"}
              name={`question-${question.id}`}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => {
                onSelect(
                  option.value,
                  question.id,
                  question.type === "multi-choice"
                );
              }}
              className="mr-2 accent-[#541495]"
            />
            {option.label}
          </label>
        ))}
      </div>
    );
  } else if (question.type === "text-input") {
    return (
      <TextInputFields
        question={question}
        answers={answers}
        onInputChange={onInputChange}
      />
    );
  } else if (question.type === "file-upload") {
    return (
      <div className="grid grid-cols-2 gap-4 relative">
      {uploading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
          <ClipLoader color="#8B5CF6" size={24} />
        </div>
      )}
        {question.options.map((option, index) => (
          <FileUploadOption
            key={index}
            option={option}
            questionId={question.id}
            uploadedFile={ answers[question.id]?.[option] || 
              answers[question.id]?.files?.find(file => file.label === option) || 
              null }
            onFileUpload={onFileUpload}
            onFileRemove={onFileRemove}
          />
        ))}
      </div>
    );
  } else if (question.type === "All-Type") {
    return (
      <AllTypeQuestion
        question={question}
        onSelect={onSelect}
        onInputChange={onInputChange}
        onFileUpload={onFileUpload}
        answers={answers}
        onFileRemove={onFileRemove}
      />
    );
  }

  return null;
};

export default SurveyQuestion;
