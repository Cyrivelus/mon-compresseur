import React, { useState } from "react";

const App = () => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [status, setStatus] = useState("Prêt"); // 'Prêt', 'Compression...', 'Erreur', 'Terminé'

  const handleCompress = async (file) => {
    if (!file) return;

    setIsCompressing(true);
    setStatus("Compression...");

    const formData = new FormData();
    formData.append("file", file);

    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:3000/api/compress"
        : "/api/compress";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

      const blob = await response.blob();

      // Gestion propre de l'extension .zst (moteur Go Zstandard)
      const baseName = file.name.includes(".")
        ? file.name.substring(0, file.name.lastIndexOf("."))
        : file.name;
      const fileName = `${baseName}.zst`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 150);

      setStatus("Terminé");
      setTimeout(() => setStatus("Prêt"), 3000);
    } catch (error) {
      console.error("Échec du traitement:", error);
      setStatus("Erreur");
      alert("La compression a échoué. Vérifiez la connexion au backend Go.");
    } finally {
      setIsCompressing(false);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleCompress(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans antialiased text-slate-900">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-900 text-white rounded-xl mb-4 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            GoCompress Pro
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Optimisation haute performance via Zstandard & Go
          </p>
        </div>

        {/* Upload Zone */}
        <div className="relative group">
          <label
            className={`
            flex flex-col items-center justify-center w-full h-40 
            border-2 border-dashed rounded-xl cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              isCompressing
                ? "bg-slate-50 border-slate-300 cursor-not-allowed"
                : "bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50"
            }
          `}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className={`w-8 h-8 mb-3 ${isCompressing ? "animate-bounce text-slate-400" : "text-slate-400"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-1 text-sm font-medium text-slate-700">
                {isCompressing
                  ? "Traitement en cours..."
                  : "Cliquez pour compresser"}
              </p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Ratio cible : 3:1
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={onFileChange}
              disabled={isCompressing}
            />
          </label>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 h-1 bg-slate-100 rounded-full overflow-hidden">
          {isCompressing && (
            <div
              className="h-full bg-slate-900 animate-progress origin-left"
              style={{ width: "100%" }}
            ></div>
          )}
        </div>

        {/* Footer Meta */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Node 24 / Go 1.26
          </div>
          <div>AES-256 Encryption</div>
        </div>
      </div>
    </div>
  );
};

export default App;
