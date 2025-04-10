import React from "react";
import FileUploadOption from "./FileUploadOption";

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

      {question.uploadOptions?.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {question.uploadOptions.map((option, index) => (
            <FileUploadOption
              key={index}
              option={option}
              questionId={question.id}
              uploadedFile={answers[question.id]?.[option]}
              onFileUpload={onFileUpload}
            />
          ))}
        </div>
      )}

      {question.fields?.length > 0 && (
        <TextInputFields
          question={question}
          answers={answers}
          onInputChange={onInputChange}
          wrapperClassName="grid grid-cols-1 gap-6 max-w-xl"
        />
      )}
    </div>
  );
};

export default AllTypeQuestion;
