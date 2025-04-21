import React from "react";
import { Input } from "@/components/ui/input";
import UploadSvg from "@/utility/Svg/UploadSvg";
import CheckCircle from "@/utility/Svg/CheckCircle";

const FileUploadOption = ({
  option,
  questionId,
  uploadedFile,
  onFileUpload,
  onFileRemove,
}) => {
  const fileInputRef = React.useRef();

  const handleContainerClick = () => {
    if (!uploadedFile) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`relative w-full px-6 py-4 rounded-lg cursor-pointer transition-all ${
        uploadedFile
          ? "bg-purple-600 border border-purple-700"
          : "bg-purple-500 hover:bg-purple-600"
      }`}
      onClick={handleContainerClick}
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
            <span
              className="text-green-300 font-semibold truncate"
              onClick={(e) => {
                e.stopPropagation();
                if (!uploadedFile.hasOwnProperty("answered_file")) {
                  const fileURL = URL.createObjectURL(uploadedFile);
                  window.open(fileURL, "_blank");
                }
                else {
                  const fileURL = uploadedFile.answered_file;
                  window.open(fileURL, "_blank");
                }
              }}
            >
              {uploadedFile?.name ?? uploadedFile?.file_show_name}
            </span>
          </>
        ) : (
          <>
            <UploadSvg className="text-white" size={20} />
            <span
              className="text-white font-semibold"
              onClick={(e) => e.stopPropagation()}
            >
              {option}
            </span>
          </>
        )}
      </div>

      <Input
        ref={fileInputRef}
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
    </div>
  );
};

export default FileUploadOption;
