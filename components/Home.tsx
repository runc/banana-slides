import React, { useState, useRef, useCallback } from 'react';
import { ArrowRight, Sparkles, Clock, Trash2, Play, TestTube2, Paperclip, File as FileIcon, Image as ImageIcon, Music, FileText, X, Languages } from 'lucide-react';
import { PresentationData, Attachment, Language } from '../types';
import ConfirmationModal from './ConfirmationModal';
import { translations } from '../utils/i18n';

interface HomeProps {
  onSubmit: (topic: string, attachments: Attachment[]) => void;
  history: PresentationData[];
  onLoadHistory: (presentation: PresentationData) => void;
  onDeleteHistory: (id: string) => void;
  onTestPage: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const ALLOWED_MIME_TYPES = [
    'image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif',
    'audio/wav', 'audio/mp3', 'audio/aiff', 'audio/aac', 'audio/ogg', 'audio/flac',
    'application/pdf'
];

const Home: React.FC<HomeProps> = ({ onSubmit, history, onLoadHistory, onDeleteHistory, onTestPage, language, setLanguage }) => {
  const [input, setInput] = useState('');
  const [presentationToDelete, setPresentationToDelete] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const t = translations[language].home;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || attachments.length > 0) {
      onSubmit(input, attachments);
    }
  };

  const formatDate = (ts: number) => {
    // Use proper locale for date
    const locale = language === 'zh' ? 'zh-CN' : 'en-US';
    return new Date(ts).toLocaleDateString(locale, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const confirmDelete = () => {
    if (presentationToDelete) {
        onDeleteHistory(presentationToDelete);
        setPresentationToDelete(null);
    }
  };

  const processFile = (file: File): Promise<Attachment> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
              const result = reader.result as string;
              // Remove Data URL prefix (e.g., "data:image/png;base64,")
              const base64Data = result.split(',')[1];
              resolve({
                  name: file.name,
                  mimeType: file.type,
                  data: base64Data
              });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
      });
  };

  const handleFiles = async (files: FileList | null) => {
      if (!files) return;
      
      const newAttachments: Attachment[] = [];
      for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (ALLOWED_MIME_TYPES.some(type => file.type.match(new RegExp(type.replace('*', '.*'))))) {
             try {
                 const attachment = await processFile(file);
                 newAttachments.push(attachment);
             } catch (e) {
                 console.error("Failed to process file", file.name, e);
             }
          } else {
              alert(`File type ${file.type} not supported.`);
          }
      }
      setAttachments(prev => [...prev, ...newAttachments]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
  }, []);

  const removeAttachment = (index: number) => {
      setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (mimeType: string) => {
      if (mimeType.startsWith('image/')) return <ImageIcon size={14} className="text-blue-400"/>;
      if (mimeType.startsWith('audio/')) return <Music size={14} className="text-pink-400"/>;
      if (mimeType === 'application/pdf') return <FileText size={14} className="text-red-400"/>;
      return <FileIcon size={14} className="text-zinc-400"/>;
  };

  const toggleLanguage = () => {
      setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 bg-zinc-950 relative overflow-hidden h-full">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-50">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition text-sm font-medium"
          >
            <Languages size={16} />
            {language === 'en' ? 'English' : '中文'}
          </button>
      </div>

      <div className="z-10 w-full max-w-4xl text-center flex flex-col h-full">
        <div className="flex-none pt-12 space-y-6">
            <h1 className="text-6xl font-tracking-tighter font-bold text-white mb-4">
            {t.title}
            </h1>
            <p className="text-xl text-zinc-400 font-light">
            {t.subtitlePrefix} <span className="text-purple-400 font-medium">{t.subtitleHighlight}</span> {t.subtitleSuffix}
            </p>

            <div className="w-full max-w-2xl mx-auto">
                <form 
                    onSubmit={handleSubmit} 
                    className="w-full relative group"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur transition duration-500 ${isDragging ? 'opacity-70' : 'opacity-25 group-hover:opacity-40'}`}></div>
                
                <div className={`relative bg-zinc-900 border rounded-2xl p-2 flex flex-col shadow-2xl transition-colors ${isDragging ? 'border-purple-500 bg-zinc-900/80' : 'border-zinc-800'}`}>
                    
                    {/* Attachments List */}
                    {attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 px-4 pt-4 pb-2">
                            {attachments.map((att, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-zinc-800 rounded-lg pl-3 pr-2 py-1.5 border border-zinc-700 animate-in fade-in zoom-in duration-200">
                                    {getFileIcon(att.mimeType)}
                                    <span className="text-xs text-zinc-200 max-w-[150px] truncate" title={att.name}>{att.name}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => removeAttachment(idx)}
                                        className="p-1 hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-white transition"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <textarea
                        className="w-full bg-transparent text-lg text-zinc-100 placeholder-zinc-500 p-4 min-h-[120px] outline-none resize-none"
                        placeholder={isDragging ? t.dropFiles : t.placeholder}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    
                    {/* Drag Overlay Text */}
                    {isDragging && (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 rounded-2xl z-20 pointer-events-none">
                            <div className="text-purple-400 font-medium flex flex-col items-center gap-2 animate-bounce">
                                <Paperclip size={32} />
                                <span>{t.dropFiles}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center px-4 pb-2 border-t border-zinc-800/50 pt-3 mt-2">
                        <div className="flex items-center gap-3">
                            <input 
                                type="file" 
                                multiple 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept={ALLOWED_MIME_TYPES.join(',')}
                                onChange={(e) => handleFiles(e.target.files)}
                            />
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-zinc-400 hover:text-white transition p-2 hover:bg-zinc-800 rounded-lg flex items-center gap-2 text-xs font-medium group/attach"
                            >
                                <Paperclip size={16} className="group-hover/attach:rotate-45 transition-transform" />
                                <span className="hidden sm:inline">{t.attach}</span>
                            </button>
                            <span className="text-xs text-zinc-600 flex items-center gap-1">
                                <Sparkles size={12} /> {t.poweredBy}
                            </span>
                        </div>
                        <button
                            type="submit"
                            disabled={!input.trim() && attachments.length === 0}
                            className="bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl p-3 transition-colors duration-200 flex items-center justify-center"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
                </form>

                {/* Suggestions */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {t.suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => setInput(suggestion)}
                            className="px-3 py-1.5 text-xs text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:text-zinc-300 transition cursor-pointer"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex-1 mt-10 w-full flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-zinc-500 text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                    <Clock size={14} /> {t.history}
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-10 pr-2 custom-scrollbar text-left">
                {history.length === 0 ? (
                     <div className="col-span-full py-12 text-center text-zinc-600 border border-zinc-900 rounded-xl border-dashed">
                        <p>{t.noHistory}</p>
                     </div>
                ) : (
                    history.sort((a,b) => b.createdAt - a.createdAt).map((deck) => (
                        <div key={deck.id} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:bg-zinc-900 hover:border-zinc-700 transition flex flex-col h-32">
                             <div 
                                onClick={() => onLoadHistory(deck)}
                                className="flex-1 cursor-pointer"
                             >
                                <h4 className="text-zinc-200 font-medium line-clamp-2 mb-2">{deck.topic}</h4>
                                <span className="text-xs text-zinc-500">{formatDate(deck.createdAt)} • {deck.slides.length} slides</span>
                             </div>
                             
                             <div className="flex justify-end items-center gap-2 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setPresentationToDelete(deck.id); }}
                                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded transition"
                                    title={t.delete}
                                >
                                    <Trash2 size={14} />
                                </button>
                                <button 
                                    onClick={() => onLoadHistory(deck)}
                                    className="p-1.5 text-purple-400 hover:bg-purple-900/20 rounded transition"
                                    title={t.open}
                                >
                                    <Play size={14} />
                                </button>
                             </div>
                        </div>
                    ))
                )}
            </div>
        </div>

        {/* Builder Info & Test Link */}
        <div className="py-4 text-center flex flex-col items-center gap-2">
            <p className="text-xs text-zinc-600">
                Built by <a href="https://twitter.com/dotey" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">@dotey (宝玉)</a>
            </p>
            <button 
                onClick={onTestPage}
                className="text-[10px] text-zinc-700 hover:text-zinc-500 flex items-center gap-1 transition"
            >
                <TestTube2 size={10} /> Test Page
            </button>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={!!presentationToDelete}
        title={t.deletePresentationTitle}
        message={t.deletePresentationConfirm}
        confirmText={t.delete}
        cancelText={translations[language].modals.cancel}
        isDangerous={true}
        onClose={() => setPresentationToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Home;