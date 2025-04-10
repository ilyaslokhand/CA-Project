import React from "react";
import { Ghost } from "lucide-react";
import { Input } from "@/components/ui/input";

const TextInputFields = ({
  question,
  answers,
  onInputChange,
  wrapperClassName,
}) => {
  return (
    <div
      className={wrapperClassName || "w-full max-w-2xl grid grid-cols-1 gap-6"}
    >
      {question.fields?.map((field, index) => (
        <div key={index}>
          <label className="block text-base font-semibold text-gray-800 mb-2">
            {field}
          </label>
          <Input
            variant={Ghost}
            type="text"
            placeholder="Type here..."
            value={answers[question.id]?.texts?.[index]?.[field] || ""}
            className="w-full h-14 p-4 border rounded-xl bg-pink-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              onInputChange(field, e.target.value, question.id, index)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default TextInputFields;
