import React from 'react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    icon?: React.ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
    icon
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="modal-box bg-white p-0 rounded-[24px] max-w-md w-full overflow-hidden shadow-2xl"
            >
                <div
                    className="p-6 border-b flex justify-between items-center bg-slate-50/50"
                >
                    <h3 className="text-xl font-black text-slate-900">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8 text-center sm:text-left">
                    <div className="flex justify-center sm:justify-start mb-6">
                        {icon || (
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                        {message}
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-xl shadow-indigo-500/10 transition-all flex items-center justify-center active:scale-95"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};
