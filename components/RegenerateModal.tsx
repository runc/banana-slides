import React, { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface RegenerateModalProps {
  isOpen: boolean;
  initialPrompt: string;
  onClose: () => void;
  onConfirm: (newPrompt: string) => void;
  language: Language;
}

const RegenerateModal: React.FC<RegenerateModalProps> = ({ isOpen, initialPrompt, onClose, onConfirm, language }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const t = translations[language].modals;

  useEffect(() => {
    if (isOpen) {
        setPrompt(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <RefreshCw size={18} className="text-purple-400"/> {t.regenerateTitle}
                </h3>
                <button onClick={onClose} className="text-zinc-500 hover:text-white transition">
                    <X size={20} />
                </button>
            </div>
            
            <p className="text-sm text-zinc-400">
                {t.regenerateDesc}
            </p>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
                placeholder={t.newSlidePlaceholder}
            />

            <div className="flex justify-end gap-3 pt-2">
                <button 
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition"
                >
                    {t.cancel}
                </button>
                <button 
                    onClick={() => onConfirm(prompt)}
                    className="px-4 py-2 rounded-lg text-sm bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg shadow-purple-900/30 transition"
                >
                    {t.generateNewImage}
                </button>
            </div>
        </div>
    </div>
  );
};

export default RegenerateModal;