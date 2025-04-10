import React from "react";
import { CheckCircle, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

const FileUploadOption = ({
  option,
  questionId,
  uploadedFile,
  onFileUpload,
  onFileRemove,
}) => {
  return (
    <label
      className={`relative w-full px-6 py-4 rounded-lg cursor-pointer transition-all ${
        uploadedFile
          ? "bg-purple-600 border border-purple-700"
          : "bg-purple-500 hover:bg-purple-600"
      }`}
    >
      {uploadedFile && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white underline z-10"
          onClick={(e) => {
            e.stopPropagation();
            onFileRemove(option, questionId);
          }}
        >
          Undo
        </button>
      )}

      <div className="flex items-center gap-2">
        {uploadedFile ? (
          <>
            <CheckCircle className="text-white" size={20} />
            <span className="text-green-300 font-semibold truncate">
              {uploadedFile.name}
            </span>
          </>
        ) : (
          <>
            <Upload className="text-white" size={20} />
            <span className="text-white font-semibold">{option}</span>
          </>
        )}
      </div>

      <Input
        type="file"
        accept=".pdf,.jpg,.png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            onFileUpload(option, file, questionId);
          }
        }}
      />
    </label>
  );
};

export default FileUploadOption;
