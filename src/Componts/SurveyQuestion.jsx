import React from "react";
import AllTypeQuestion from "./AllTypeQuestion";
import FileUploadOption from "./FileUploadOption";
import TextInputFields from "./TextInputFields";

const SurveyQuestion = ({
  question,
  onSelect,
  onInputChange,
  onFileUpload,

  answers,
}) => {
  if (!question) return null;

  if (question.type === "multi-choice" || question.type === "single-choice") {
    const selectedValues = Array.isArray(answers[question.id])
      ? answers[question.id]
      : [answers[question.id]?.selectedOption];

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
              onChange={() =>
                onSelect(
                  option.value,
                  question.id,
                  question.type === "multi-choice"
                )
              }
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
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <FileUploadOption
            key={index}
            option={option}
            questionId={question.id}
            uploadedFile={answers[question.id]?.[option]}
            onFileUpload={onFileUpload}
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
      />
    );
  }

  return null;
};

export default SurveyQuestion;
