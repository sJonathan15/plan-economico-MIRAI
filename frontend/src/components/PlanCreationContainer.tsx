import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { EconomicPlanWizard } from './EconomicPlanWizard';

export const PlanCreationContainer: React.FC = () => {
    const [step, setStep] = useState<'SELECT' | 'WIZARD'>('SELECT');
    const [ents, setEnts] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEnts = async () => {
            try {
                const data = await api.getEntrepreneurships();
                // Handle various response shapes (array directly or object with property)
                const list = Array.isArray(data) ? data : (data.entrepreneurships || []);
                setEnts(list);

                // Check URL param ?entId=123
                const urlParams = new URLSearchParams(window.location.search);
                const preSelected = urlParams.get('entId');
                if (preSelected) {
                    const numericId = parseInt(preSelected);
                    if (!isNaN(numericId)) {
                        setSelectedId(numericId);
                        setStep('WIZARD');
                    }
                }

            } catch (e) {
                console.error("Error loading entrepreneurships", e);
            } finally {
                setLoading(false);
            }
        };
        loadEnts();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                    <p className="mt-4 text-slate-500">Cargando datos...</p>
                </div>
            </div>
        );
    }

    if (step === 'SELECT') {
        return (
            <div className="max-w-xl mx-auto pt-20 px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Crear Nuevo Plan Económico</h2>
                    <p className="text-slate-500 mb-8">Primero, selecciona el Emprendimiento al que pertenece este plan.</p>

                    {ents.length === 0 ? (
                        <div className="alert bg-yellow-50 border-yellow-200 text-yellow-800 p-4 rounded-lg">
                            <div className="font-bold mb-2">No tienes emprendimientos registrados.</div>
                            <div className="text-sm mb-4">Debes crear uno antes de hacer un plan económico.</div>
                            <div className="flex justify-center">
                                <a href="/entrepreneurship/create" className="btn btn-primary btn-sm inline-block shadow-md">Crear Emprendimiento</a>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 text-left">
                            <label className="block font-medium text-slate-700">Seleccionar Proyecto:</label>
                            <select
                                className="select input w-full text-lg border-slate-300"
                                onChange={(e) => setSelectedId(parseInt(e.target.value))}
                                defaultValue=""
                            >
                                <option value="" disabled>-- Elige un proyecto --</option>
                                {ents.map((e: any) => (
                                    <option key={e.id} value={e.id}>{e.name} ({e.sector})</option>
                                ))}
                            </select>

                            <button
                                className={`btn btn-primary btn-sm w-full mt-4 ${!selectedId ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!selectedId}
                                onClick={() => setStep('WIZARD')}
                            >
                                Continuar al Plan Financiero
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <EconomicPlanWizard entrepreneurshipId={selectedId!} />
    );
};
