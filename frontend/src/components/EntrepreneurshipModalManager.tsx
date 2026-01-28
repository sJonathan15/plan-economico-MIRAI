import React, { useState, useEffect } from 'react';
import { EntrepreneurshipWizard } from './EntrepreneurshipWizard';

export const EntrepreneurshipModalManager: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    useEffect(() => {
        const handleOpen = (e: any) => {
            const { mode, data } = e.detail || {};
            if (mode === 'edit') {
                setEditData(data);
            } else {
                setEditData(null);
            }
            setIsOpen(true);
        };

        window.addEventListener('open-entrepreneurship-wizard', handleOpen);
        window.addEventListener('entrepreneurship-success', () => setIsOpen(false));

        return () => {
            window.removeEventListener('open-entrepreneurship-wizard', handleOpen);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">
                            {editData ? 'Editar Emprendimiento' : 'Nuevo Emprendimiento'}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium">
                            {editData ? 'Actualiza los datos de tu proyecto' : 'Sigue los pasos para registrar tu proyecto'}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Wizard Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <EntrepreneurshipWizard
                        compact={true}
                        initialData={editData}
                        isEditing={!!editData}
                        onSuccess={() => setIsOpen(false)}
                    />
                </div>
            </div>
        </div>
    );
};
