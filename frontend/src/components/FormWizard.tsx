import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { InputField } from './InputField';

interface Step {
    id: number;
    title: string;
    description: string;
}

const steps: Step[] = [
    { id: 1, title: 'Datos Generales', description: 'Información del emprendimiento' },
    { id: 2, title: 'Inversión', description: 'Costos iniciales y equipamiento' },
    { id: 3, title: 'Costos', description: 'Costos fijos y variables' },
    { id: 4, title: 'Ingresos', description: 'Proyección de ventas y resumen' },
];

export const FormWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Entrepreneurship Management
    const [creationMode, setCreationMode] = useState<'create' | 'select'>('create');
    const [existingEntrepreneurships, setExistingEntrepreneurships] = useState<any[]>([]);
    const [selectedEntId, setSelectedEntId] = useState<string>('');

    // Form State
    const [generalData, setGeneralData] = useState({
        name: '',
        sector: '',
        description: '',
    });

    const [investmentItems, setInvestmentItems] = useState([
        { id: 1, name: '', amount: '', quantity: 1 },
    ]);

    const [fixedCosts, setFixedCosts] = useState([
        { id: 1, name: '', amount: '' },
    ]);

    const [variableCosts, setVariableCosts] = useState([
        { id: 1, name: '', amount: '', unit: '' },
    ]);

    const [incomeItems, setIncomeItems] = useState([
        { id: 1, name: '', amount: '', quantity: 1 },
    ]);

    // Calculations
    const [totals, setTotals] = useState({
        investment: 0,
        fixedCosts: 0,
        variableCosts: 0,
        income: 0,
        totalCost: 0,
        netProfit: 0,
    });

    useEffect(() => {
        // Load user data and entrepreneurships
        const loadInitData = async () => {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                // Try to fetch fresh data to get entrepreneurships
                try {
                    const profile = await api.getProfile();
                    setUserData(profile);
                    if (profile.entrepreneurships && profile.entrepreneurships.length > 0) {
                        setExistingEntrepreneurships(profile.entrepreneurships);
                        setCreationMode('select');
                        // Auto-select first one
                        const first = profile.entrepreneurships[0];
                        setSelectedEntId(first.id.toString());
                    }
                } catch (e) {
                    console.error("Failed to load profile", e);
                    // Fallback to local storage (which might not have ents)
                    setUserData(JSON.parse(userStr));
                }
            }
        };
        loadInitData();
    }, []);

    // When selectedEntId changes, we update generalData for display (optional, read-only view?)
    useEffect(() => {
        if (creationMode === 'select' && selectedEntId) {
            const ent = existingEntrepreneurships.find(e => e.id.toString() === selectedEntId);
            if (ent) {
                setGeneralData({
                    name: ent.name,
                    sector: ent.sector,
                    description: ent.description || ''
                });
            }
        } else if (creationMode === 'create') {
            // clear if switching back? or keep? Let's clear to avoid confusion if it was prefilled by selection
            // actually better to only clear if it matches the selected one to avoid clearing user input
            // for simplicity, let's just leave it or reset it. 
            // setGeneralData({ name: '', sector: '', description: '' }); 
        }
    }, [selectedEntId, creationMode, existingEntrepreneurships]);

    useEffect(() => {
        // Recalculate totals whenever data changes
        const invTotal = investmentItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0) * (item.quantity || 1), 0);
        const fixedTotal = fixedCosts.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        const varTotal = variableCosts.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        const incTotal = incomeItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0) * (item.quantity || 1), 0);

        setTotals({
            investment: invTotal,
            fixedCosts: fixedTotal,
            variableCosts: varTotal,
            income: incTotal,
            totalCost: invTotal + fixedTotal + varTotal,
            netProfit: incTotal - (fixedTotal + varTotal), // Simplified for MVP
        });
    }, [investmentItems, fixedCosts, variableCosts, incomeItems]);

    // Generic handler for array inputs
    const handleArrayChange = (
        index: number,
        field: string,
        value: string | number,
        setter: React.Dispatch<React.SetStateAction<any[]>>,
        list: any[]
    ) => {
        const newList = [...list];
        newList[index] = { ...newList[index], [field]: value };
        setter(newList);
    };

    const addItem = (setter: React.Dispatch<React.SetStateAction<any[]>>, list: any[]) => {
        setter([...list, { id: Date.now(), name: '', amount: '', quantity: 1 }]);
    };

    const removeItem = (index: number, setter: React.Dispatch<React.SetStateAction<any[]>>, list: any[]) => {
        if (list.length > 1) {
            const newList = list.filter((_, i) => i !== index);
            setter(newList);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            let finalEntId = selectedEntId ? parseInt(selectedEntId) : 0;

            // 1. Create Entrepreneurship if needed
            if (creationMode === 'create') {
                const entResult = await api.createEntrepreneurship({
                    name: generalData.name,
                    sector: generalData.sector,
                    description: generalData.description,
                });

                if (!entResult.entrepreneurship?.id) {
                    throw new Error('Failed to create entrepreneurship');
                }
                finalEntId = entResult.entrepreneurship.id;
            }

            if (!finalEntId) {
                alert("Error: No se pudo identificar el emprendimiento.");
                return;
            }

            // 2. Create Plan
            await api.createPlan({
                entrepreneurshipId: finalEntId,
                investment: { items: investmentItems, total: totals.investment },
                fixedCosts: { items: fixedCosts, total: totals.fixedCosts },
                variableCosts: { items: variableCosts, total: totals.variableCosts },
                income: { items: incomeItems, total: totals.income },
                profitability: {
                    roi: ((totals.netProfit / totals.investment) * 100).toFixed(2) + '%',
                    margin: ((totals.netProfit / totals.income) * 100).toFixed(2) + '%'
                },
                totalCost: totals.totalCost,
                netProfit: totals.netProfit,
            });

            // Redirect to dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error al guardar el plan. Por favor intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render Steps
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-slate-800">Datos del Emprendimiento</h3>
                            {existingEntrepreneurships.length > 0 && (
                                <div className="flex bg-slate-100 p-1 rounded-lg">
                                    <button
                                        onClick={() => setCreationMode('select')}
                                        className={`px-3 py-1 text-sm rounded ${creationMode === 'select' ? 'bg-white shadow-sm text-primary-600 font-medium border border-slate-100' : 'text-slate-500'}`}
                                    >
                                        Seleccionar
                                    </button>
                                    <button
                                        onClick={() => {
                                            setCreationMode('create');
                                            setGeneralData({ name: '', sector: '', description: '' });
                                        }}
                                        className={`px-3 py-1 text-sm rounded ${creationMode === 'create' ? 'bg-white shadow text-primary-600 font-medium' : 'text-slate-500'}`}
                                    >
                                        Crear Nuevo
                                    </button>
                                </div>
                            )}
                        </div>

                        {creationMode === 'select' && existingEntrepreneurships.length > 0 ? (
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mb-6">
                                <InputField
                                    label="Selecciona un emprendimiento existente"
                                    select
                                    options={existingEntrepreneurships.map(ent => ({ label: ent.name, value: ent.id }))}
                                    value={selectedEntId}
                                    onChange={(e) => setSelectedEntId(e.target.value)}
                                />
                                <div className="mt-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                                    <p className="text-sm text-slate-500 mb-1">Sector: <span className="font-medium text-slate-700">{generalData.sector}</span></p>
                                    <p className="text-sm text-slate-500">Descripción: <span className="font-medium text-slate-700">{generalData.description}</span></p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <InputField
                                    label="Nombre del Proyecto"
                                    placeholder="Ej. Cafetería Universitaria"
                                    value={generalData.name}
                                    onChange={(e) => setGeneralData({ ...generalData, name: e.target.value })}
                                />
                                <InputField
                                    label="Sector Económico"
                                    placeholder="Ej. Alimentos y Bebidas"
                                    value={generalData.sector}
                                    onChange={(e) => setGeneralData({ ...generalData, sector: e.target.value })}
                                />
                                <InputField
                                    label="Descripción del Negocio"
                                    placeholder="Describe brevemente de qué trata tu proyecto..."
                                    multiline
                                    value={generalData.description}
                                    onChange={(e) => setGeneralData({ ...generalData, description: e.target.value })}
                                />
                            </>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-slate-800">Inversión Inicial</h3>
                            <span className="text-lg font-bold text-green-600">Total: ${totals.investment.toFixed(2)}</span>
                        </div>

                        {investmentItems.map((item, index) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 items-end bg-[#FAFAFA] p-4 rounded-lg border border-slate-100">
                                <div className="col-span-12 md:col-span-5">
                                    <InputField
                                        label="Concepto"
                                        placeholder="Ej. Maquinaria"
                                        value={item.name}
                                        onChange={(e) => handleArrayChange(index, 'name', e.target.value, setInvestmentItems, investmentItems)}
                                    />
                                </div>
                                <div className="col-span-6 md:col-span-2">
                                    <InputField
                                        label="Cant."
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleArrayChange(index, 'quantity', parseFloat(e.target.value), setInvestmentItems, investmentItems)}
                                    />
                                </div>
                                <div className="col-span-6 md:col-span-4">
                                    <InputField
                                        label="Precio Unitario"
                                        type="number"
                                        placeholder="0.00"
                                        value={item.amount}
                                        onChange={(e) => handleArrayChange(index, 'amount', e.target.value, setInvestmentItems, investmentItems)}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-1 flex justify-end">
                                    <button
                                        onClick={() => removeItem(index, setInvestmentItems, investmentItems)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={() => addItem(setInvestmentItems, investmentItems)}
                            className="btn btn-secondary w-full border-dashed border-2 py-3 text-slate-500 hover:text-primary-600 hover:border-primary-300"
                        >
                            + Agregar Item
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-8">
                        {/* Fixed Costs */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-slate-800">Costos Fijos (Mensuales)</h3>
                                <span className="text-lg font-bold text-blue-600">Total: ${totals.fixedCosts.toFixed(2)}</span>
                            </div>

                            {fixedCosts.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 items-end bg-[#FAFAFA] p-4 rounded-lg border border-slate-100 mb-3">
                                    <div className="col-span-12 md:col-span-7">
                                        <InputField
                                            label="Concepto"
                                            placeholder="Ej. Alquiler"
                                            value={item.name}
                                            onChange={(e) => handleArrayChange(index, 'name', e.target.value, setFixedCosts, fixedCosts)}
                                        />
                                    </div>
                                    <div className="col-span-10 md:col-span-4">
                                        <InputField
                                            label="Monto Mensual"
                                            type="number"
                                            placeholder="0.00"
                                            value={item.amount}
                                            onChange={(e) => handleArrayChange(index, 'amount', e.target.value, setFixedCosts, fixedCosts)}
                                        />
                                    </div>
                                    <div className="col-span-2 md:col-span-1 flex justify-end">
                                        <button
                                            onClick={() => removeItem(index, setFixedCosts, fixedCosts)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => addItem(setFixedCosts, fixedCosts)} className="text-sm text-primary-600 font-medium hover:underline">+ Agregar Costo Fijo</button>
                        </div>

                        <hr className="border-slate-200" />

                        {/* Variable Costs */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-slate-800">Costos Variables (Por Unidad)</h3>
                                <span className="text-lg font-bold text-orange-600">Total: ${totals.variableCosts.toFixed(2)}</span>
                            </div>

                            {variableCosts.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 items-end bg-[#FAFAFA] p-4 rounded-lg border border-slate-100 mb-3">
                                    <div className="col-span-12 md:col-span-7">
                                        <InputField
                                            label="Concepto"
                                            placeholder="Ej. Materia Prima"
                                            value={item.name}
                                            onChange={(e) => handleArrayChange(index, 'name', e.target.value, setVariableCosts, variableCosts)}
                                        />
                                    </div>
                                    <div className="col-span-10 md:col-span-4">
                                        <InputField
                                            label="Costo Unitario"
                                            type="number"
                                            placeholder="0.00"
                                            value={item.amount}
                                            onChange={(e) => handleArrayChange(index, 'amount', e.target.value, setVariableCosts, variableCosts)}
                                        />
                                    </div>
                                    <div className="col-span-2 md:col-span-1 flex justify-end">
                                        <button
                                            onClick={() => removeItem(index, setVariableCosts, variableCosts)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => addItem(setVariableCosts, variableCosts)} className="text-sm text-primary-600 font-medium hover:underline">+ Agregar Costo Variable</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-slate-800">Proyección de Ingresos</h3>
                                <span className="text-lg font-bold text-green-600">Total: ${totals.income.toFixed(2)}</span>
                            </div>

                            {incomeItems.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 items-end bg-[#FAFAFA] p-4 rounded-lg border border-slate-100 mb-3">
                                    <div className="col-span-12 md:col-span-5">
                                        <InputField
                                            label="Producto/Servicio"
                                            placeholder="Ej. Café Americano"
                                            value={item.name}
                                            onChange={(e) => handleArrayChange(index, 'name', e.target.value, setIncomeItems, incomeItems)}
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-2">
                                        <InputField
                                            label="Ventas Mes"
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleArrayChange(index, 'quantity', parseFloat(e.target.value), setIncomeItems, incomeItems)}
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-4">
                                        <InputField
                                            label="Precio Venta"
                                            type="number"
                                            placeholder="0.00"
                                            value={item.amount}
                                            onChange={(e) => handleArrayChange(index, 'amount', e.target.value, setIncomeItems, incomeItems)}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-1 flex justify-end">
                                        <button
                                            onClick={() => removeItem(index, setIncomeItems, incomeItems)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => addItem(setIncomeItems, incomeItems)} className="text-sm text-primary-600 font-medium hover:underline">+ Agregar Ingreso</button>
                        </div>

                        <div className="bg-slate-900 text-white p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">Resumen Financiero</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-slate-400">Inversión Inicial:</div>
                                <div className="text-right font-mono">${totals.investment.toFixed(2)}</div>

                                <div className="text-slate-400">Total Ingresos:</div>
                                <div className="text-right font-mono text-green-400">+${totals.income.toFixed(2)}</div>

                                <div className="text-slate-400">Total Egreso Mensual:</div>
                                <div className="text-right font-mono text-red-400">-${(totals.fixedCosts + totals.variableCosts).toFixed(2)}</div>

                                <div className="border-t border-slate-700 mt-2 pt-2 text-white font-bold text-lg">Utilidad Neta:</div>
                                <div className={`border-t border-slate-700 mt-2 pt-2 text-right font-mono font-bold text-lg ${totals.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    ${totals.netProfit.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full min-h-[600px] bg-[#E6EBF2]">
            {/* Sidebar / Progress */}
            <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
                <div className="flex justify-between items-center max-w-2xl mx-auto">
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center relative z-10 group cursor-pointer" onClick={() => setCurrentStep(step.id)}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep >= step.id
                                ? 'bg-primary-600 text-white shadow-lg scale-110'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                                }`}>
                                {step.id}
                            </div>
                            <span className={`text-xs mt-2 font-medium transition-colors ${currentStep >= step.id ? 'text-primary-700' : 'text-slate-400'}`}>
                                {step.title}
                            </span>
                        </div>
                    ))}
                    {/* Progress Bar Background */}
                    <div className="absolute top-[88px] left-0 w-full h-0.5 bg-slate-200 -z-0 hidden md:block"></div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <div
                    className="max-w-3xl mx-auto card"
                >
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{steps[currentStep - 1].title}</h2>
                        <p className="text-slate-500 font-medium">{steps[currentStep - 1].description}</p>
                    </div>

                    {renderStep()}
                </div>
            </div>

            {/* Footer Navigation */}
            <div
                className="p-6 bg-white/50 border-t flex justify-between items-center"
            >
                <button
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    className={`btn btn-secondary ${currentStep === 1 ? 'invisible' : ''}`}
                >
                    Atrás
                </button>

                {currentStep < 4 ? (
                    <button
                        onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                        className="btn btn-primary"
                    >
                        Siguiente
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn btn-primary bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Guardando...' : 'Finalizar y Guardar'}
                    </button>
                )}
            </div>
        </div>
    );
};
