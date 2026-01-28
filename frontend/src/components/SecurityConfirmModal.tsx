import React, { useState } from 'react';
import { api } from '../lib/api';
import { InputField } from './InputField';

interface SecurityConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    actionLabel?: string;
}

export const SecurityConfirmModal: React.FC<SecurityConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmar Acción de Seguridad",
    message = "Para continuar, por favor ingresa tu contraseña de inicio de sesión. Esta acción no se puede deshacer.",
    actionLabel = "Confirmar y Eliminar"
}) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.verifyPassword(password);
            onConfirm();
            setPassword('');
            onClose();
        } catch (err: any) {
            setError(err.message || 'Contraseña incorrecta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="modal-box bg-white p-0 rounded-[24px] max-w-md w-full overflow-hidden shadow-2xl transition-all duration-300"
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

                <div className="p-8">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <p className="text-slate-500 font-medium mb-6 leading-relaxed">
                        {message}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="Tu Contraseña"
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            error={error || undefined}
                            autoFocus
                        />

                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <span>{actionLabel}</span>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full h-14 text-slate-500 font-bold hover:bg-[#FAFAFA] rounded-xl transition-all"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
