import React from 'react';
import Upload from './components/Upload';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">GoCompress ⚡</h1>
        <p className="text-gray-500 mb-8">
          Compressez vos fichiers instantanément avec Go & Vercel.
        </p>
        
        {/* Ton composant d'upload */}
        <Upload />

        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
          Technologies : React 19 • Go 1.23 • Firebase Storage
        </div>
      </div>
    </div>
  );
}

export default App;