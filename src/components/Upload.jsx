import React, { useState } from "react";
import {
  Upload as UploadIcon,
  CheckCircle,
  AlertCircle,
  FileArchive,
} from "lucide-react";

const Upload = () => {
  const [status, setStatus] = useState("idle"); // idle, uploading, success, error
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Appel à ton API Go sur Vercel (ou local via vercel dev)
      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${file.name}.gz`;
        document.body.appendChild(a);
        a.click();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
          status === "uploading"
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 bg-gray-50 hover:border-blue-300"
        }`}
      >
        {status === "idle" && (
          <label className="flex flex-col items-center cursor-pointer">
            <UploadIcon className="w-12 h-12 text-blue-500 mb-4" />
            <span className="text-sm font-medium text-gray-700">
              Cliquez pour choisir un fichier
            </span>
            <span className="text-xs text-gray-400 mt-1">
              N'importe quel fichier à compresser en .gz
            </span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        )}

        {status === "uploading" && (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium text-blue-700">
              Compression de {fileName}...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <p className="text-sm font-medium text-green-700">
              Compression réussie !
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Compresser un autre fichier
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-sm font-medium text-red-700">
              Erreur lors de la compression
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-xs font-semibold text-gray-600 hover:text-gray-800"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
