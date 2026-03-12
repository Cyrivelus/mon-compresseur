import React from 'react';
import Upload from './components/Upload'; // On appelle ton composant

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-50 rounded-2xl mb-4">
            <span className="text-3xl">⚡</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            GoCompress
          </h1>
          <p className="text-gray-500 mt-2">
            Compression Gzip ultra-rapide propulsée par Go
          </p>
        </div>

        {/* C'est ici que ton bouton d'upload apparaîtra */}
        <Upload />

        <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
          <span>Backend: Go Serverless</span>
          <span>Storage: Firebase</span>
        </div>
      </div>
    </div>
  );
}

export default App;