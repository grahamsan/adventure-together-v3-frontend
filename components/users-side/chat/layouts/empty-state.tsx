'use client';

import { MessageCircle } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="hidden lg:flex flex-1 max-h-[100vw] items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Blobs animés */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>
      
      {/* Contenu */}
      <div className="relative text-center space-y-4 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg">
          <MessageCircle className="w-10 h-10 text-[[var(--BRAND-500)]]" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Bienvenue sur Messages</h3>
          <p className="text-gray-600">Sélectionnez une conversation pour commencer</p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
      `}</style>
    </div>
  );
}
