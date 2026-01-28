import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../lib/api';
import { InputField } from './InputField';
import { SecurityConfirmModal } from './SecurityConfirmModal';
import { InfoModal } from './InfoModal';

const SelectField = ({ label, value, options, onChange }: {
    label: string,
    value: string,
    options: { label: string, value: string, recommended?: boolean }[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
    const selectedOption = options.find(opt => opt.value === value);
    const isRecommended = selectedOption?.recommended;

    return (
        <div className="flex flex-col gap-1.5 min-w-[200px] flex-1 group">
            <div className="flex justify-between items-center mb-0.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</label>
                {isRecommended && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded-full animate-in fade-in zoom-in duration-300">
                        <svg className="w-2.5 h-2.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-[8px] font-bold text-indigo-600 uppercase tracking-tighter">Recomendado</span>
                    </div>
                )}
            </div>
            <div className="relative group/select">
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 bg-white border border-[#CBD5E1] hover:border-[#94A3B8] rounded-xl focus:ring-2 focus:ring-[#6366F1]/25 focus:border-[#6366F1] outline-none transition-all text-sm font-semibold text-slate-700 appearance-none shadow-sm"
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}{opt.recommended ? ' (Recomendado)' : ''}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748B] group-hover/select:text-[#6366F1] group-focus-within/select:text-[#6366F1] transition-colors">
                    <svg className="w-4 h-4 transition-transform group-hover/select:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

interface Step {
    id: number;
    title: string;
    description: string;
}

const steps: Step[] = [
    { id: 1, title: 'Descripción del Negocio', description: 'Resumen, actividad y enfoque' },
    { id: 2, title: 'Propuesta de Valor', description: 'Valor, diferenciación y beneficios' },
    { id: 3, title: 'Equipo de Trabajo', description: 'Talento humano' },
    { id: 4, title: 'Canales de Comunicación', description: 'Redes, ferias, contacto' },
    { id: 5, title: 'Canales de Comercialización', description: 'Venta y distribución' },
    { id: 6, title: 'Socios Clave', description: 'Aliados estrategicos' },
    { id: 7, title: 'Segmentos de Clientes', description: 'Mercado objetivo' },
    { id: 8, title: 'Cadena de Suministro', description: 'Flujo logístico' },
    { id: 9, title: 'Presupuestos / Parámetros Financieros', description: 'Cálculos base' },
    { id: 10, title: 'Demanda', description: 'Ventas proyectadas' },
    { id: 11, title: 'Equipos y Maquinaria', description: 'Inversión en activos' },
    { id: 12, title: 'Costos Unitarios', description: 'Producción por producto' },
    { id: 13, title: 'Provisiones y Gastos', description: 'Gastos operativos' },
    { id: 14, title: 'Financiamiento', description: 'Fuentes de inversión' },
    { id: 15, title: 'Anexos', description: 'Evidencias y fotografías' },
];

interface Props {
    entrepreneurshipId: number;
}

export const EconomicPlanWizard: React.FC<Props> = ({ entrepreneurshipId }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const [infoModalConfig, setInfoModalConfig] = useState({ isOpen: false, title: '', message: '' });
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const showError = (title: string, message: string) => setInfoModalConfig({ isOpen: true, title, message });

    const getErrorMessage = (error: any): string => {
        if (!navigator.onLine) return "Error de conexión: Verifique su acceso a Internet e intente nuevamente.";
        if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) {
            return "Error de conexión: No se pudo establecer comunicación con el servidor. Verifique su red.";
        }
        if (error.message?.includes("subir") || error.message?.includes("upload")) {
            return "Fallo al procesar imágenes: No se pudieron cargar los archivos. Asegúrese de que el formato sea válido y que los archivos no sean demasiado pesados.";
        }

        if (error.message?.includes("link") || error.message?.includes("vincular") || error.status === 500) {
            return "No se pudo guardar el plan.\n\nOcurrió un problema interno al vincular el plan con el emprendimiento. Este error no está relacionado con los datos ingresados por usted.\n\nPor favor, intente nuevamente en unos momentos. Si el problema persiste, contacte al administrador del sistema.";
        }

        // Specific descriptive message for 500 or unknown errors as requested
        return "Datos Inconsistentes o Incompletos: Aunque todos los campos visibles pueden parecer correctos, existen datos inconsistentes en secciones como 'Provisiones', 'Anexos' o 'Cadena de Suministro' que impiden el procesamiento.\n\nPor favor, revise las secciones anteriores para asegurar que toda la información esté correctamente ingresada.";
    };

    const validatePlanData = (): { isValid: boolean; messages: string[]; firstStep: number } => {
        const errors: string[] = [];
        let firstStep = 0;

        // 1. Business Description
        if (!businessData.businessDescription.trim() || !businessData.mainActivity.trim()) {
            errors.push("Descripción de negocio o actividad principal faltante (Paso 1)");
            if (firstStep === 0) firstStep = 1;
        }

        // 8. Supply Chain
        if (businessData.supplyChainMode === 'IMAGE' && !scImageFile && !supplyChainData.imageUrl) {
            errors.push("Falta cargar el diagrama de la cadena de suministro (Paso 8)");
            if (firstStep === 0) firstStep = 8;
        }

        // 12. Unit Costs
        if (unitCosts.length === 0 || unitCosts.every(u => !u.productName.trim())) {
            errors.push("Debe definir al menos un producto o servicio válido (Paso 12)");
            if (firstStep === 0) firstStep = 12;
        }

        return {
            isValid: errors.length === 0,
            messages: errors,
            firstStep
        };
    };

    // --- High-Level Data ---
    const [businessData, setBusinessData] = useState({
        businessDescription: '',
        mainActivity: '',
        valueProposition: '',
        communicationChannels: '',
        commercializationChannels: '',
        supplyChainMode: 'GUIDED', // GUIDED | IMAGE
    });

    // --- Annexes ---
    const [annexFiles, setAnnexFiles] = useState<{ id: string, file: File, preview: string }[]>([]);

    // --- Relational Lists ---
    const [teamItems, setTeamItems] = useState([
        { id: Date.now(), name: '', experience: '', role: '' },
    ]);
    const [partnerItems, setPartnerItems] = useState([
        { id: Date.now(), name: '', type: 'PROVEEDOR' },
    ]);
    const [segmentItems, setSegmentItems] = useState([
        { id: Date.now(), name: '', percentage: '', ageRange: '', socioeconomicLevel: 'C', characteristics: '' },
    ]);

    // --- Supply Chain Guided ---
    const [supplyChainData, setSupplyChainData] = useState({
        providers: '',
        production: '',
        storage: '',
        distribution: '',
        client: '',
        imageUrl: '',
    });

    const [scImageFile, setScImageFile] = useState<File | null>(null);
    const [scImagePreview, setScImagePreview] = useState<string | null>(null);

    // --- Financial Rates ---
    // --- Financial Base Values ---
    const [baseRates, setBaseRates] = useState({
        prodPrev: '0',
        prodCurr: '0',
        pricePrev: '0',
        priceCurr: '0',
        riskFree: '0.00',
        riskCountry: '0.00',
        riskEnt: '0.00',
        inflationPrev: '0',
        inflationCurr: '0',
        salaryPrev: '0',
        salaryCurr: '0',
    });

    // --- Financial Arrays ---
    const [demandItems, setDemandItems] = useState([
        { id: Date.now(), productName: '', monthlyDemand: '', unitPrice: '' },
    ]);
    const [equipmentItems, setEquipmentItems] = useState([
        { id: Date.now(), description: '', quantity: 1, unitPrice: '', accountType: 'Activo Fijo', financingSource: 'Propio' },
    ]);
    const [unitCosts, setUnitCosts] = useState([
        { id: Date.now(), productName: '', monthlyQuantity: '', unitCost: '' },
    ]);
    const [provisionItems, setProvisionItems] = useState<Record<string, any[]>>({});
    const [financingItems, setFinancingItems] = useState([
        { id: Date.now(), concept: 'Inversión Inicial', amount: '', source: 'Propia' },
    ]);

    // Calculations (Simplified for preview)
    const [totals, setTotals] = useState({
        investment: 0,
        monthlyRevenue: 0,
        monthlyCosts: 0,
    });

    // --- Financial Calculations (Single Source of Truth) ---
    const calculatedRates = useMemo(() => {
        const calcRate = (curr: string, prev: string) => {
            const c = parseFloat(curr);
            const p = parseFloat(prev);
            if (isNaN(c) || isNaN(p)) return 0;
            const absoluteDifference = Math.abs(c - p);
            const base = Math.min(c, p);
            if (base === 0) return 0;
            return absoluteDifference / base;
        };

        // Horizontal Unit Cost Totals
        const unitCostList = unitCosts.map(u => {
            const qty = parseFloat(u.monthlyQuantity.toString()) || 0;
            const cost = parseFloat(u.unitCost.toString()) || 0;
            return { ...u, total: qty * cost };
        });

        const totalMonthlyUnitCost = unitCostList.reduce((sum, item) => sum + item.total, 0);
        const totalAnnualUnitCost = totalMonthlyUnitCost * 12;

        // Provisones de Gastos Administrativos y Ventas calculations
        const productProvisions = unitCostList.map((u, oIdx) => {
            const inputs = provisionItems[u.id.toString()] || [];
            const inputTotals = inputs.map(i => {
                const qty = parseFloat(i.monthlyQuantity) || 0;
                const price = parseFloat(i.unitPrice) || 0;
                return { ...i, total: qty * price };
            });
            const costoTotalProduct = inputTotals.reduce((sum, i) => sum + i.total, 0);
            const monthlyQty = parseFloat(u.monthlyQuantity.toString()) || 0;
            const costoUnitarioProduct = monthlyQty > 0 ? costoTotalProduct / monthlyQty : 0;

            return {
                productId: u.id,
                productName: u.productName || `Producto ${oIdx + 1} `,
                originalIndex: oIdx,
                inputs: inputTotals,
                costoTotalProduct,
                costoUnitarioProduct
            };
        });

        const totalGeneralProvisions = productProvisions.reduce((sum, p) => sum + p.costoTotalProduct, 0);

        return {
            growthRate: calcRate(baseRates.prodCurr, baseRates.prodPrev),
            priceGrowthRate: calcRate(baseRates.priceCurr, baseRates.pricePrev),
            discountRate: parseFloat(baseRates.riskFree) + parseFloat(baseRates.riskCountry) + parseFloat(baseRates.riskEnt),
            inflationRate: calcRate(baseRates.inflationCurr, baseRates.inflationPrev),
            salaryIncreaseRate: calcRate(baseRates.salaryCurr, baseRates.salaryPrev),
            unitCostList,
            totalMonthlyUnitCost,
            totalAnnualUnitCost,
            productProvisions,
            totalGeneralProvisions
        };
    }, [baseRates, unitCosts, provisionItems]);

    // Formatting helper for currency
    const formatCurrency = (value: number) => {
        return '$ ' + value.toLocaleString('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Formatting helper for percentages
    const formatPercent = (value: number) => {
        const percent = value * 100;
        return percent.toFixed(2).replace('.', ',') + ' %';
    };

    const ResultDisplay = ({ label, value }: { label: string, value: number }) => (
        <div className="mt-8 -mx-6 -mb-6 bg-[#FAFAFA] border-t border-slate-100 px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300 rounded-b-[20px]">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 text-indigo-600 transition-transform group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h5 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] leading-none mb-1.5 font-sans">Resultado de Proyección</h5>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide max-w-[200px] leading-tight">{label}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-[20px] border border-slate-100 shadow-sm hover:border-indigo-300 transition-all group">
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Indicador Calculado</span>
                    <span className="text-2xl font-black text-indigo-600 font-mono tracking-tighter leading-none">
                        {formatPercent(value)}
                    </span>
                </div>
                <div className="pl-4 border-l border-slate-100 text-slate-300 group-hover:text-indigo-400 transition-colors" title="Valor calculado automáticamente por el sistema">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        // Recalculate totals (Simplified preview)
        const invTotal = equipmentItems.reduce((sum, item) => sum + (parseFloat(item.unitPrice.toString()) || 0) * (item.quantity || 1), 0);
        const revTotal = demandItems.reduce((sum, item) => sum + (parseFloat(item.unitPrice.toString()) || 0) * (parseFloat(item.monthlyDemand.toString()) || 0), 0);

        setTotals(prev => ({
            ...prev,
            investment: invTotal,
            monthlyRevenue: revTotal,
        }));
    }, [equipmentItems, demandItems]);

    // --- Handlers ---
    const handleArrayChange = (index: number, field: string, value: any, setter: any, list: any[]) => {
        const newList = [...list];
        newList[index] = { ...newList[index], [field]: value };
        setter(newList);
    };
    const handleBusinessChange = (field: string, value: string) => {
        setBusinessData(prev => ({ ...prev, [field]: value }));
    };
    const addListItem = (setter: any, list: any[], blueprint: any) => setter([...list, { id: Date.now(), ...blueprint }]);
    const removeListItem = (index: number, setter: any, list: any[]) => {
        if (list.length > 1) setter(list.filter((_: any, i: number) => i !== index));
    };

    const handleScImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setScImageFile(file);
            setScImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveScImage = () => {
        setScImageFile(null);
        setScImagePreview(null);
        setSupplyChainData(prev => ({ ...prev, imageUrl: '' }));
    };

    const handleAnnexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newAnnexes = files.map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                file,
                preview: URL.createObjectURL(file)
            }));
            setAnnexFiles(prev => [...prev, ...newAnnexes]);
        }
    };

    const removeAnnex = (id: string) => {
        setAnnexFiles(prev => {
            const item = prev.find(i => i.id === id);
            if (item) URL.revokeObjectURL(item.preview);
            return prev.filter(i => i.id !== id);
        });
    };

    const handleSubmit = async () => {
        if (!entrepreneurshipId) {
            showError("Error de Configuración", "No se ha seleccionado un emprendimiento válido.");
            return;
        }

        // --- Pre-flight Validation ---
        const validation = validatePlanData();
        if (!validation.isValid) {
            setInfoModalConfig({
                isOpen: true,
                title: "Información Obligatoria Faltante",
                message: `Para poder guardar el plan, debe corregir lo siguiente:\n\n• ${validation.messages.join('\n• ')}`
            });
            setCurrentStep(validation.firstStep);
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Upload Supply Chain Image (if exists)
            let finalScImageUrl = supplyChainData.imageUrl;
            if (scImageFile) {
                try {
                    const uploadRes = await api.uploadImage('/upload/image', scImageFile, { type: 'supply-chain' });
                    finalScImageUrl = uploadRes.url;
                } catch (uploadErr) {
                    console.error("Error uploading sc image", uploadErr);
                    throw new Error("No se pudo subir la imagen de la cadena de suministro.");
                }
            }

            // 2. Upload Annexes (Multiple)
            const annexUrls: string[] = [];
            for (const item of annexFiles) {
                try {
                    const res = await api.uploadImage('/upload/image', item.file, { type: 'annex' });
                    annexUrls.push(res.url);
                } catch (err) {
                    console.error("Error uploading annex", err);
                    throw new Error("Error al subir uno de los anexas.");
                }
            }

            await api.createPlan({
                entrepreneurshipId,
                ...businessData,
                team: teamItems,
                partners: partnerItems,
                segments: segmentItems,
                supplyChain: { ...supplyChainData, imageUrl: finalScImageUrl },
                annexes: annexUrls,
                rates: calculatedRates,
                demands: demandItems,
                equipments: equipmentItems,
                unitCosts: calculatedRates.unitCostList,
                totalCost: totals.investment, // Mandatory schema field
                totalMonthlyUnitCost: calculatedRates.totalMonthlyUnitCost,
                totalAnnualUnitCost: calculatedRates.totalAnnualUnitCost,
                provisions: calculatedRates.productProvisions,
                totalGeneralProvisions: calculatedRates.totalGeneralProvisions,
                financing: financingItems,
            });
            window.location.href = '/dashboard';
        } catch (error: any) {
            console.error('Submission error:', error);
            showError("Error al Guardar", getErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Render ---
    const renderStep = () => {
        switch (currentStep) {
            case 1: // Business Description
                return (
                    <div className="space-y-6">
                        <InputField label="Descripción general del negocio" isTextArea value={businessData.businessDescription} onChange={e => handleBusinessChange('businessDescription', e.target.value)} />
                        <InputField label="Actividad principal" isTextArea value={businessData.mainActivity} onChange={e => handleBusinessChange('mainActivity', e.target.value)} />
                    </div>
                );
            case 2: // Value Proposition
                return (
                    <div className="space-y-6">
                        <InputField label="Propuesta de valor principal" isTextArea value={businessData.valueProposition} onChange={e => handleBusinessChange('valueProposition', e.target.value)} />
                    </div>
                );
            case 3: // Team
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4">Integrantes del Equipo</h3>
                            {teamItems.map((item, idx) => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 mb-4 bg-[#FAFAFA] p-4 rounded-lg border">
                                    <div className="col-span-4"><InputField label="Nombre" value={item.name} onChange={e => handleArrayChange(idx, 'name', e.target.value, setTeamItems, teamItems)} /></div>
                                    <div className="col-span-4"><InputField label="Rol" value={item.role} onChange={e => handleArrayChange(idx, 'role', e.target.value, setTeamItems, teamItems)} /></div>
                                    <div className="col-span-3"><InputField label="Experiencia" value={item.experience} onChange={e => handleArrayChange(idx, 'experience', e.target.value, setTeamItems, teamItems)} /></div>
                                    <div className="col-span-1 border-l flex flex-col items-center justify-center group/delete">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/delete:text-red-500 transition-colors duration-300">
                                            Quitar
                                        </span>
                                        <button
                                            onClick={() => removeListItem(idx, setTeamItems, teamItems)}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 border bg-white shadow-sm hover:shadow-red-200 hover:shadow-lg active:scale-90"
                                            title="Quitar elemento"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => addListItem(setTeamItems, teamItems, { name: '', experience: '', role: '' })} className="text-primary-600 font-bold">+ Agregar Integrante</button>
                        </div>
                    </div>
                );
            case 4: // Communication Channels
                return (
                    <div className="space-y-6">
                        <InputField label="Canales de Comunicación (Ej: Redes Sociales, Ferias, Contacto Directo)" isTextArea value={businessData.communicationChannels} onChange={e => handleBusinessChange('communicationChannels', e.target.value)} />
                    </div>
                );
            case 5: // Commercialization Channels
                return (
                    <div className="space-y-6">
                        <InputField label="Canales de Comercialización (Ej: Venta Directa, Distribuidores, Online)" isTextArea value={businessData.commercializationChannels} onChange={e => handleBusinessChange('commercializationChannels', e.target.value)} />
                    </div>
                );
            case 6: // Partners
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-slate-800 mb-4">Socios Clave</h3>
                        {partnerItems.map((item, idx) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 mb-4 bg-[#FAFAFA] p-4 rounded-lg border">
                                <div className="col-span-6"><InputField label="Nombre" value={item.name} onChange={e => handleArrayChange(idx, 'name', e.target.value, setPartnerItems, partnerItems)} /></div>
                                <div className="col-span-5"><InputField label="Tipo" select options={[{ label: 'Proveedor', value: 'PROVEEDOR' }, { label: 'Institución', value: 'INSTITUCION' }, { label: 'Aliado', value: 'ALIADO' }]} value={item.type} onChange={e => handleArrayChange(idx, 'type', e.target.value, setPartnerItems, partnerItems)} /></div>
                                <div className="col-span-1 border-l flex flex-col items-center justify-center group/delete">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/delete:text-red-500 transition-colors duration-300">
                                        Quitar
                                    </span>
                                    <button
                                        onClick={() => removeListItem(idx, setPartnerItems, partnerItems)}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 border bg-white shadow-sm hover:shadow-red-200 hover:shadow-lg active:scale-90"
                                        title="Quitar elemento"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addListItem(setPartnerItems, partnerItems, { name: '', type: 'PROVEEDOR' })} className="text-primary-600 font-bold">+ Agregar Socio</button>
                    </div>
                );
            case 7: // Segments
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-slate-800 mb-4">Segmentos de Clientes</h3>
                        {segmentItems.map((item, idx) => (
                            <div key={item.id} className="bg-[#FAFAFA] p-4 rounded-lg mb-4 border">
                                <div className="grid grid-cols-2 gap-4 mb-2">
                                    <InputField label="Nombre del segmento" value={item.name} onChange={e => handleArrayChange(idx, 'name', e.target.value, setSegmentItems, segmentItems)} />
                                    <InputField label="Porcentaje (%)" type="number" value={item.percentage} onChange={e => handleArrayChange(idx, 'percentage', e.target.value, setSegmentItems, segmentItems)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-2">
                                    <InputField label="Rango de Edad" value={item.ageRange} onChange={e => handleArrayChange(idx, 'ageRange', e.target.value, setSegmentItems, segmentItems)} />
                                    <InputField label="Nivel Socioeconómico" select options={[{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C+', value: 'C+' }, { label: 'C-', value: 'C-' }]} value={item.socioeconomicLevel} onChange={e => handleArrayChange(idx, 'socioeconomicLevel', e.target.value, setSegmentItems, segmentItems)} />
                                </div>
                                <InputField label="Características" isTextArea value={item.characteristics} onChange={e => handleArrayChange(idx, 'characteristics', e.target.value, setSegmentItems, segmentItems)} />
                                <div className="flex flex-col items-end group/delete mt-2">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/delete:text-red-500 transition-colors duration-300">
                                        Quitar
                                    </span>
                                    <button
                                        onClick={() => removeListItem(idx, setSegmentItems, segmentItems)}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 border bg-white shadow-sm hover:shadow-red-200 hover:shadow-lg active:scale-90"
                                        title="Quitar elemento"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addListItem(setSegmentItems, segmentItems, { name: '', percentage: '', ageRange: '', socioeconomicLevel: 'C', characteristics: '' })} className="text-primary-600 font-bold">+ Agregar Segmento</button>
                    </div>
                );
            case 8: // Supply Chain
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 p-1.5 bg-slate-100/50 border rounded-[20px] mb-8">
                            <button
                                onClick={() => handleBusinessChange('supplyChainMode', 'GUIDED')}
                                className={`flex flex-col items-center justify-center py-4 px-6 rounded-[20px] transition-all duration-300 ${businessData.supplyChainMode === 'GUIDED' ? 'bg-white text-indigo-600 border shadow-xl translate-y-[-2px]' : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'}`}
                            >
                                <div className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center transition-colors ${businessData.supplyChainMode === 'GUIDED' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-black uppercase tracking-widest">Modo Guiado</span>
                                <span className="text-[10px] opacity-60 font-bold mt-0.5">Descripción por pasos</span>
                            </button>
                            <button
                                onClick={() => handleBusinessChange('supplyChainMode', 'IMAGE')}
                                className={`flex flex-col items-center justify-center py-4 px-6 rounded-[20px] transition-all duration-300 ${businessData.supplyChainMode === 'IMAGE' ? 'bg-white text-indigo-600 border shadow-xl translate-y-[-2px]' : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'}`}
                            >
                                <div className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center transition-colors ${businessData.supplyChainMode === 'IMAGE' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-black uppercase tracking-widest">Diagrama</span>
                                <span className="text-[10px] opacity-60 font-bold mt-0.5">Captura / Imagen</span>
                            </button>
                        </div>

                        {businessData.supplyChainMode === 'GUIDED' ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                <InputField label="Proveedores" value={supplyChainData.providers} onChange={e => setSupplyChainData({ ...supplyChainData, providers: e.target.value })} />
                                <InputField label="Producción" value={supplyChainData.production} onChange={e => setSupplyChainData({ ...supplyChainData, production: e.target.value })} />
                                <InputField label="Almacenamiento" value={supplyChainData.storage} onChange={e => setSupplyChainData({ ...supplyChainData, storage: e.target.value })} />
                                <InputField label="Distribución" value={supplyChainData.distribution} onChange={e => setSupplyChainData({ ...supplyChainData, distribution: e.target.value })} />
                                <InputField label="Cliente final" value={supplyChainData.client} onChange={e => setSupplyChainData({ ...supplyChainData, client: e.target.value })} />
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                <div className="p-8 border-2 border-dashed border-slate-200 rounded-[20px] flex flex-col items-center justify-center bg-[#FAFAFA] hover:bg-slate-100 transition-colors">
                                    {scImagePreview ? (
                                        <div className="text-center w-full">
                                            <img src={scImagePreview} alt="Diagrama Preview" className="h-48 mx-auto object-contain mb-4 bg-white p-2 rounded shadow-sm" />
                                            <div className="flex gap-2 justify-center">
                                                <label className="btn btn-sm btn-outline cursor-pointer bg-white">
                                                    Cambiar Imagen
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleScImageChange} />
                                                </label>
                                                <div className="flex flex-col items-center group/delete">
                                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/delete:text-red-500 transition-colors duration-300">
                                                        Quitar
                                                    </span>
                                                    <button
                                                        onClick={handleRemoveScImage}
                                                        className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 border bg-white shadow-sm hover:shadow-red-200 hover:shadow-lg active:scale-90"
                                                        title="Quitar elemento"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer text-center w-full py-8">
                                            <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-3">
                                                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            </div>
                                            <div className="font-bold text-slate-700">Subir Diagrama</div>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleScImageChange} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 9: // Financial Parameters
                return (
                    <div className="space-y-8">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                            <p className="text-sm text-blue-700">
                                <b>Nota:</b> Ingrese los valores base. El sistema calculará automáticamente los porcentajes financieros para las proyecciones.
                            </p>
                        </div>

                        {/* Crecimiento de Producción */}
                        <div className="card p-6">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded">01</span>
                                Crecimiento de la Producción
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Producción año anterior (unidades)" type="number" value={baseRates.prodPrev} onChange={e => setBaseRates({ ...baseRates, prodPrev: e.target.value })} />
                                <InputField label="Producción año actual (unidades)" type="number" value={baseRates.prodCurr} onChange={e => setBaseRates({ ...baseRates, prodCurr: e.target.value })} />
                            </div>
                            <ResultDisplay label="Tasa de crecimiento de la producción" value={calculatedRates.growthRate} />
                        </div>

                        {/* Crecimiento de Precio */}
                        <div className="card p-6">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded">02</span>
                                Crecimiento del Precio (PVP)
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Precio anterior (USD)" type="number" value={baseRates.pricePrev} onChange={e => setBaseRates({ ...baseRates, pricePrev: e.target.value })} />
                                <InputField label="Precio actual (USD)" type="number" value={baseRates.priceCurr} onChange={e => setBaseRates({ ...baseRates, priceCurr: e.target.value })} />
                            </div>
                            <ResultDisplay label="Tasa de crecimiento del precio de venta al público" value={calculatedRates.priceGrowthRate} />
                        </div>

                        {/* Tasa de Descuento */}
                        <div className="card p-6">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded">03</span>
                                Parámetros para Tasa de Descuento
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <SelectField
                                    label="Tasa libre de riesgo"
                                    value={baseRates.riskFree}
                                    onChange={e => setBaseRates({ ...baseRates, riskFree: e.target.value })}
                                    options={[
                                        { label: "Seleccione una opción...", value: "0.00" },
                                        { label: "Bono del Estado (académica) - 4%", value: "0.04", recommended: true },
                                        { label: "Depósito a plazo fijo - 3%", value: "0.03" },
                                        { label: "Otro valor - 0%", value: "0.00" }
                                    ]}
                                />
                                <SelectField
                                    label="Prima riesgo país"
                                    value={baseRates.riskCountry}
                                    onChange={e => setBaseRates({ ...baseRates, riskCountry: e.target.value })}
                                    options={[
                                        { label: "Seleccione nivel...", value: "0.00" },
                                        { label: "Bajo - 3%", value: "0.03" },
                                        { label: "Medio - 4.6% (Ecuador, EMBI)", value: "0.04", recommended: true },
                                        { label: "Alto - 6%", value: "0.06" }
                                    ]}
                                />
                                <SelectField
                                    label="Riesgo de emprendimiento"
                                    value={baseRates.riskEnt}
                                    onChange={e => setBaseRates({ ...baseRates, riskEnt: e.target.value })}
                                    options={[
                                        { label: "Seleccione condición...", value: "0.00" },
                                        { label: "Negocio nuevo - 8%", value: "0.08", recommended: true },
                                        { label: "En crecimiento - 5%", value: "0.0493" },
                                        { label: "Consolidado - 3%", value: "0.03" }
                                    ]}
                                />
                            </div>
                            <ResultDisplay label="Tasa de descuento" value={calculatedRates.discountRate} />
                        </div>

                        {/* Inflación */}
                        <div className="card p-6">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded">04</span>
                                Tasa de Inflación
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Índice precios año anterior" type="number" value={baseRates.inflationPrev} onChange={e => setBaseRates({ ...baseRates, inflationPrev: e.target.value })} />
                                <InputField label="Índice precios año actual" type="number" value={baseRates.inflationCurr} onChange={e => setBaseRates({ ...baseRates, inflationCurr: e.target.value })} />
                            </div>
                            <ResultDisplay label="Tasa de inflación" value={calculatedRates.inflationRate} />
                        </div>

                        {/* Incremento Salarial */}
                        <div className="card p-6">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded">05</span>
                                Incremento de Sueldos y Salarios
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Sueldo anterior (USD)" type="number" value={baseRates.salaryPrev} onChange={e => setBaseRates({ ...baseRates, salaryPrev: e.target.value })} />
                                <InputField label="Sueldo actual (USD)" type="number" value={baseRates.salaryCurr} onChange={e => setBaseRates({ ...baseRates, salaryCurr: e.target.value })} />
                            </div>
                            <ResultDisplay label="Tasa de incremento de sueldo y salarios" value={calculatedRates.salaryIncreaseRate} />
                        </div>
                    </div>
                );
            case 10: // Demand
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl">
                            <span className="font-bold">Ingresos Mensuales Estimados</span>
                            <span className="text-xl font-mono text-green-400">${totals.monthlyRevenue.toFixed(2)}</span>
                        </div>
                        {demandItems.map((item, idx) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 bg-[#FAFAFA] p-4 rounded-lg items-end border mb-4">
                                <div className="col-span-6"><InputField label="Producto" value={item.productName} onChange={e => handleArrayChange(idx, 'productName', e.target.value, setDemandItems, demandItems)} /></div>
                                <div className="col-span-2"><InputField label="Demanda Mes" type="number" value={item.monthlyDemand} onChange={e => handleArrayChange(idx, 'monthlyDemand', e.target.value, setDemandItems, demandItems)} /></div>
                                <div className="col-span-3"><InputField label="Precio Unitario" type="number" value={item.unitPrice} onChange={e => handleArrayChange(idx, 'unitPrice', e.target.value, setDemandItems, demandItems)} /></div>
                                <div className="col-span-1 border-l flex flex-col items-center justify-center group/delete">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/delete:text-red-500 transition-colors duration-300">
                                        Quitar
                                    </span>
                                    <button
                                        onClick={() => removeListItem(idx, setDemandItems, demandItems)}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 border bg-white shadow-sm hover:shadow-red-200 hover:shadow-lg active:scale-90"
                                        title="Quitar elemento"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addListItem(setDemandItems, demandItems, { productName: '', monthlyDemand: '', unitPrice: '' })} className="font-bold text-primary-600">+ Agregar Producto</button>
                    </div>
                );
            case 11: // Equipments
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl">
                            <span className="font-bold">Inversión Inicial en Equipos</span>
                            <span className="text-xl font-mono text-blue-400">${totals.investment.toFixed(2)}</span>
                        </div>
                        {equipmentItems.map((item, idx) => (
                            <div key={item.id} className="bg-[#FAFAFA] p-4 rounded-lg space-y-4 border mb-4">
                                <div className="grid grid-cols-12 gap-4 items-end">
                                    <div className="col-span-5"><InputField label="Descripción" value={item.description} onChange={e => handleArrayChange(idx, 'description', e.target.value, setEquipmentItems, equipmentItems)} /></div>
                                    <div className="col-span-2"><InputField label="Cantidad" type="number" value={item.quantity} onChange={e => handleArrayChange(idx, 'quantity', parseInt(e.target.value), setEquipmentItems, equipmentItems)} /></div>
                                    <div className="col-span-4"><InputField label="Precio Unitario" type="number" value={item.unitPrice} onChange={e => handleArrayChange(idx, 'unitPrice', e.target.value, setEquipmentItems, equipmentItems)} /></div>
                                    <div className="col-span-1 border-l flex flex-col items-center justify-center group/delete">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/delete:text-red-500 transition-colors duration-300">
                                            Quitar
                                        </span>
                                        <button
                                            onClick={() => removeListItem(idx, setEquipmentItems, equipmentItems)}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 border bg-white shadow-sm hover:shadow-red-200 hover:shadow-lg active:scale-90"
                                            title="Quitar elemento"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                                    <InputField label="Tipo de Cuenta" select options={[{ label: 'Maquinaria y Equipos', value: 'Maquinaria y Equipos' }, { label: 'Muebles y Enseres', value: 'Muebles y Enseres' }, { label: 'Software', value: 'Software' }, { label: 'Otros', value: 'Otros' }]} value={item.accountType} onChange={e => handleArrayChange(idx, 'accountType', e.target.value, setEquipmentItems, equipmentItems)} />
                                    <InputField label="Financiamiento" select options={[{ label: 'Propio', value: 'Propio' }, { label: 'Préstamo', value: 'Prestamo' }, { label: 'Donación', value: 'Donacion' }]} value={item.financingSource} onChange={e => handleArrayChange(idx, 'financingSource', e.target.value, setEquipmentItems, equipmentItems)} />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addListItem(setEquipmentItems, equipmentItems, { description: '', quantity: 1, unitPrice: '', accountType: 'Maquinaria y Equipos', financingSource: 'Propio' })} className="font-bold text-primary-600">+ Agregar Activo</button>
                    </div>
                );
            case 12: // Unit Costs
                return (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">Costos Unitarios de Producción</h3>
                                <p className="text-xs text-slate-400 mt-0.5">Define los costos operativos directos por cada producto o servicio.</p>
                            </div>
                            <div className="text-[10px] font-black text-slate-400 bg-[#FAFAFA] px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-widest">
                                {unitCosts.length} {unitCosts.length === 1 ? 'Producto' : 'Productos'}
                            </div>
                        </div>

                        <div className="space-y-2">
                            {calculatedRates.unitCostList.map((item, idx) => (
                                <div key={item.id} className="group relative bg-white hover:bg-[#FAFAFA]/50 p-4 rounded-xl border border-transparent hover:border-slate-100 transition-all">
                                    <div className="grid grid-cols-12 gap-6 items-center">
                                        <div className="col-span-12 md:col-span-5">
                                            <InputField label="Producto o Servicio" value={item.productName} onChange={e => handleArrayChange(idx, 'productName', e.target.value, setUnitCosts, unitCosts)} />
                                        </div>
                                        <div className="col-span-5 md:col-span-2">
                                            <InputField label="Cant. Mensual" type="number" value={item.monthlyQuantity} onChange={e => handleArrayChange(idx, 'monthlyQuantity', e.target.value, setUnitCosts, unitCosts)} />
                                        </div>
                                        <div className="col-span-5 md:col-span-2">
                                            <InputField label="Costo Unitario" type="number" value={item.unitCost} onChange={e => handleArrayChange(idx, 'unitCost', e.target.value, setUnitCosts, unitCosts)} />
                                        </div>
                                        <div className="col-span-10 md:col-span-2 flex flex-col items-end justify-center pt-5">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Costo Total</span>
                                            <span className="text-sm font-bold text-indigo-600 font-mono">
                                                {formatCurrency(item.total)}
                                            </span>
                                        </div>
                                        <div className="col-span-2 md:col-span-1 border-l flex flex-col items-center justify-center group/delete">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/delete:text-red-500 transition-colors duration-300">
                                                Quitar
                                            </span>
                                            <button
                                                onClick={() => removeListItem(idx, setUnitCosts, unitCosts)}
                                                className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 border bg-white shadow-sm hover:shadow-red-200 hover:shadow-lg active:scale-90"
                                                title="Quitar elemento"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center -mt-2">
                            <button
                                onClick={() => addListItem(setUnitCosts, unitCosts, { productName: '', monthlyQuantity: '', unitCost: '' })}
                                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all group"
                            >
                                <div className="w-5 h-5 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                Agregar Producto o Servicio
                            </button>
                        </div>

                        {/* Integrated Summary Section */}
                        <div className="mt-12 bg-[#FAFAFA] border border-slate-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-10">
                            <div className="space-y-1 text-center md:text-left">
                                <h4 className="font-bold text-slate-700 text-sm flex items-center justify-center md:justify-start gap-2">
                                    <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Resumen de Costos Directos
                                </h4>
                                <p className="text-xs text-slate-400">Totales proyectados basados en los insumos anteriores.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12">
                                <div className="text-center sm:text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Mensual</p>
                                    <p className="text-lg font-bold text-slate-600 font-mono">
                                        {formatCurrency(calculatedRates.totalMonthlyUnitCost)}
                                    </p>
                                </div>
                                <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
                                <div className="text-center sm:text-left relative">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0">
                                        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter border border-emerald-200">
                                            Proyección Anual
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Costo Total (12 Meses)</p>
                                    <p className="text-3xl font-black text-emerald-600 font-mono tracking-tighter">
                                        {formatCurrency(calculatedRates.totalAnnualUnitCost)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 13: // Provisions
                return (
                    <div className="space-y-10">
                        {calculatedRates.productProvisions
                            .filter(prod => Object.prototype.hasOwnProperty.call(provisionItems, prod.productId.toString()))
                            .map((prod, pIdx) => (
                                <div key={prod.productId} className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                                        <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">
                                                {prod.originalIndex + 1}
                                            </span>
                                            PRODUCTO {prod.originalIndex + 1}: {prod.productName}
                                        </h4>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            Detalle de Insumos
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="border-b border-slate-100">
                                                        <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Insumos al mes del producto</th>
                                                        <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidad</th>
                                                        <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cantidad</th>
                                                        <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Precio Unitario</th>
                                                        <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Costo Total</th>
                                                        <th className="pb-3"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {(provisionItems[prod.productId.toString()] || []).length === 0 ? (
                                                        <tr>
                                                            <td colSpan={6} className="py-8 text-center bg-[#FAFAFA] rounded-xl">
                                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No hay insumos agregados para este producto</p>
                                                                <button
                                                                    onClick={() => {
                                                                        const key = prod.productId.toString();
                                                                        setProvisionItems({
                                                                            ...provisionItems,
                                                                            [key]: [{ id: Date.now(), item: '', unit: '', monthlyQuantity: '0', unitPrice: '0' }]
                                                                        });
                                                                    }}
                                                                    className="mt-3 text-[10px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest transition-colors"
                                                                >
                                                                    + Comenzar a agregar insumos
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        prod.inputs.map((input: any, iIdx: number) => (
                                                            <tr key={input.id} className="group/row">
                                                                <td className="py-3 pr-4">
                                                                    <input
                                                                        type="text"
                                                                        value={input.item}
                                                                        onChange={(e) => {
                                                                            const key = prod.productId.toString();
                                                                            const newList = [...(provisionItems[key] || [])];
                                                                            newList[iIdx] = { ...newList[iIdx], item: e.target.value };
                                                                            setProvisionItems({ ...provisionItems, [key]: newList });
                                                                        }}
                                                                        className="w-full px-3 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-300 transition-all hover:border-slate-300"
                                                                        placeholder="Ingrese insumo..."
                                                                    />
                                                                </td>
                                                                <td className="py-3 pr-4">
                                                                    <input
                                                                        type="text"
                                                                        value={input.unit}
                                                                        onChange={(e) => {
                                                                            const key = prod.productId.toString();
                                                                            const newList = [...(provisionItems[key] || [])];
                                                                            newList[iIdx] = { ...newList[iIdx], unit: e.target.value };
                                                                            setProvisionItems({ ...provisionItems, [key]: newList });
                                                                        }}
                                                                        className="w-24 px-3 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 outline-none text-sm font-semibold text-slate-600 transition-all hover:border-slate-300"
                                                                        placeholder="e.g. kg"
                                                                    />
                                                                </td>
                                                                <td className="py-3 pr-4">
                                                                    <input
                                                                        type="number"
                                                                        value={input.monthlyQuantity}
                                                                        onChange={(e) => {
                                                                            const key = prod.productId.toString();
                                                                            const newList = [...(provisionItems[key] || [])];
                                                                            newList[iIdx] = { ...newList[iIdx], monthlyQuantity: e.target.value };
                                                                            setProvisionItems({ ...provisionItems, [key]: newList });
                                                                        }}
                                                                        className="input-sm w-20 font-bold font-mono"
                                                                    />
                                                                </td>
                                                                <td className="py-3 pr-4">
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                                                                        <input
                                                                            type="number"
                                                                            value={input.unitPrice}
                                                                            onChange={(e) => {
                                                                                const key = prod.productId.toString();
                                                                                const newList = [...(provisionItems[key] || [])];
                                                                                newList[iIdx] = { ...newList[iIdx], unitPrice: e.target.value };
                                                                                setProvisionItems({ ...provisionItems, [key]: newList });
                                                                            }}
                                                                            className="input-sm w-24 pl-6 pr-3 font-bold font-mono"
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 text-right">
                                                                    <span className="text-sm font-black text-indigo-600 font-mono">
                                                                        {formatCurrency(input.total)}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 pl-4 text-right">
                                                                    <div className="flex flex-col items-center group/delete">
                                                                        <button
                                                                            onClick={() => {
                                                                                const key = prod.productId.toString();
                                                                                const newList = (provisionItems[key] || []).filter((_, i) => i !== iIdx);
                                                                                setProvisionItems({ ...provisionItems, [key]: newList });
                                                                            }}
                                                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                                                            title="Quitar insumo"
                                                                        >
                                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {(provisionItems[prod.productId.toString()] || []).length > 0 && (
                                            <button
                                                onClick={() => {
                                                    const key = prod.productId.toString();
                                                    const current = provisionItems[key] || [];
                                                    setProvisionItems({
                                                        ...provisionItems,
                                                        [key]: [...current, { id: Date.now(), item: '', unit: '', monthlyQuantity: '0', unitPrice: '0' }]
                                                    });
                                                }}
                                                className="mt-4 flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors"
                                            >
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                                                </svg>
                                                Agregar Insumo
                                            </button>
                                        )}

                                        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end items-center gap-8">
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Costo Total del Producto</p>
                                                <p className="text-lg font-black text-slate-900 font-mono leading-none">
                                                    {formatCurrency(prod.costoTotalProduct)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Costo Unitario (Gastos)</p>
                                                <p className="text-lg font-black text-indigo-600 font-mono leading-none">
                                                    {formatCurrency(prod.costoUnitarioProduct).replace('$', '$ ')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        <div className="flex flex-col items-center gap-6 py-10 border-2 border-dashed border-slate-100 rounded-3xl bg-[#FAFAFA]/50">
                            <button
                                onClick={() => {
                                    if (unitCosts.length === 0) {
                                        setInfoModalConfig({
                                            isOpen: true,
                                            title: "Configuración Necesaria",
                                            message: "Primero debe definir los productos en la sección de Costos Unitarios para poder asignarles provisiones."
                                        });
                                        return;
                                    }
                                    const nextProd = unitCosts.find(u => !Object.prototype.hasOwnProperty.call(provisionItems, u.id.toString()));
                                    if (nextProd) {
                                        setProvisionItems({
                                            ...provisionItems,
                                            [nextProd.id.toString()]: []
                                        });
                                    } else {
                                        setInfoModalConfig({
                                            isOpen: true,
                                            title: "Límite de Productos",
                                            message: "No hay más productos disponibles para agregar.\n\nSi desea agregar un nuevo bloque de provisiones, primero debe definir el producto o servicio en la sección anterior (Paso 12: Costos Unitarios de Producción)."
                                        });
                                    }
                                }}
                                className="group flex flex-col items-center gap-3 transition-all active:scale-95"
                            >
                                <div className="w-14 h-14 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-md">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                                    + Agregar otro producto
                                </span>
                            </button>
                        </div>

                        <div className="bg-[#FAFAFA] border border-slate-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="text-center md:text-left">
                                    <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Resumen Consolidado</h4>
                                    <p className="text-slate-700 text-sm font-bold uppercase tracking-tight">TOTAL GENERAL DE PROVISIONES DE GASTOS ADMINISTRATIVOS Y VENTAS</p>
                                </div>
                                <div className="bg-white px-6 py-3 rounded-xl border shadow-sm">
                                    <span className="text-3xl font-black text-slate-900 font-mono">
                                        {formatCurrency(calculatedRates.totalGeneralProvisions)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 14: // Financing
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-slate-800 mb-4">Estructura de Financiamiento</h3>
                        {financingItems.map((item, idx) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 bg-[#FAFAFA] p-4 rounded-lg items-end mb-4 border border-slate-100">
                                <div className="col-span-5"><InputField label="Concepto" value={item.concept} onChange={e => handleArrayChange(idx, 'concept', e.target.value, setFinancingItems, financingItems)} /></div>
                                <div className="col-span-3"><InputField label="Monto" type="number" value={item.amount} onChange={e => handleArrayChange(idx, 'amount', e.target.value, setFinancingItems, financingItems)} /></div>
                                <div className="col-span-3"><InputField label="Fuente" select options={[{ label: 'Propia', value: 'Propia' }, { label: 'Préstamo', value: 'Prestamo' }, { label: 'Donación', value: 'Donacion' }]} value={item.source} onChange={e => handleArrayChange(idx, 'source', e.target.value, setFinancingItems, financingItems)} /></div>
                                <div className="col-span-1 border-l flex flex-col items-center justify-center group/delete">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/delete:text-red-500 transition-colors duration-300">
                                        Quitar
                                    </span>
                                    <button
                                        onClick={() => removeListItem(idx, setFinancingItems, financingItems)}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 border bg-white shadow-sm hover:shadow-red-200 hover:shadow-lg active:scale-90"
                                        title="Quitar elemento"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addListItem(setFinancingItems, financingItems, { concept: '', amount: '', source: 'Propia' })} className="font-bold text-primary-600">+ Agregar Rubro</button>
                    </div>
                );
            case 15: // Annexes
                return (
                    <div className="space-y-6">
                        <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center bg-[#FAFAFA] hover:bg-[#FAFAFA]/50 hover:border-indigo-300 transition-all group/annex">
                            <label className="cursor-pointer text-center w-full py-4">
                                <div className="bg-white p-6 rounded-full shadow-md inline-block mb-4 border border-slate-100 group-hover/annex:scale-110 group-hover/annex:text-indigo-600 transition-all">
                                    <svg className="w-10 h-10 text-primary-600 group-hover/annex:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                </div>
                                <div className="font-bold text-slate-700 text-lg">Subir Imágenes de Evidencia</div>
                                <div className="text-sm text-slate-500 mt-2">Fotos, capturas o documentos gráficos</div>
                                <input type="file" className="hidden" accept="image/*" multiple onChange={handleAnnexChange} />
                            </label>
                        </div>

                        {annexFiles.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                {annexFiles.map((item) => (
                                    <div key={item.id} className="relative group rounded-xl overflow-hidden border shadow-sm bg-white p-2">
                                        <img src={item.preview} alt="Annex Preview" className="h-24 w-full object-cover rounded-lg" />
                                        <div className="absolute top-1 right-1 flex flex-col items-center group/delete">
                                            <button
                                                onClick={() => removeAnnex(item.id)}
                                                className="w-9 h-9 flex items-center justify-center rounded-xl text-white bg-red-500 hover:bg-red-600 transition-all shadow-md active:scale-90"
                                                title="Quitar elemento"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <span className="text-[8px] font-black text-white/90 bg-red-500/80 px-1.5 py-0.5 rounded-full uppercase tracking-widest mt-1 opacity-0 group-hover/delete:opacity-100 transition-opacity">
                                                Quitar
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="bg-indigo-900 text-white p-6 rounded-2xl mt-8">
                            <h3 className="font-bold text-lg mb-2">Finalizar Registro</h3>
                            <p className="text-sm opacity-80 leading-relaxed">
                                Al presionar el botón de abajo, se procesarán todos los cálculos financieros (VAN, TIR, Flujo de Caja) y se generará tu reporte completo.
                            </p>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="flex flex-col space-y-8">
            {/* Steps Header (Integrated) */}
            <div className="w-full">
                <div className="flex justify-between items-center max-w-4xl mx-auto px-4 py-2 overflow-x-auto">
                    {steps.map((step, idx) => (
                        <div key={step.id} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold transition-all ${currentStep === step.id ? 'border-indigo-600 bg-indigo-600 text-white' : currentStep > step.id ? 'border-green-500 bg-green-500 text-white' : 'border-slate-300 text-slate-400'}`}
                                onClick={() => setCurrentStep(step.id)}
                            >
                                {currentStep > step.id ? '✓' : step.id}
                            </div>
                            <span className={`ml-2 text-sm font-bold whitespace-nowrap hidden md:block ${currentStep === step.id ? 'text-indigo-900' : 'text-slate-500'}`}>{step.title}</span>
                            {idx < steps.length - 1 && (
                                <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Area (Natural Height, No internal scroll) */}
            <div className="w-full">
                <div className="max-w-4xl mx-auto card overflow-hidden border-indigo-100/30">
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{steps[currentStep - 1].title}</h2>
                            <p className="text-slate-500 font-medium">{steps[currentStep - 1].description}</p>
                        </div>
                        {renderStep()}
                    </div>

                    {/* Footer Actions Inside Card */}
                    <div className="px-8 py-6 bg-[#FAFAFA]/50 border-t border-slate-100 flex justify-between items-center">
                        <button
                            disabled={currentStep === 1}
                            onClick={() => setCurrentStep(c => c - 1)}
                            className={`btn btn-secondary ${currentStep === 1 ? 'invisible' : ''}`}
                        >
                            Atrás
                        </button>

                        {currentStep < steps.length ? (
                            <button onClick={() => setCurrentStep(c => c + 1)} className="btn btn-primary px-10">
                                Siguiente
                            </button>
                        ) : (
                            <button onClick={handleSubmit} disabled={isSubmitting} className="btn bg-green-600 hover:bg-green-700 text-white px-10 shadow-lg shadow-green-200">
                                {isSubmitting ? 'Guardando...' : 'Finalizar y Guardar Plan'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <InfoModal
                isOpen={infoModalConfig.isOpen}
                onClose={() => setInfoModalConfig({ ...infoModalConfig, isOpen: false })}
                title={infoModalConfig.title}
                message={infoModalConfig.message}
            />

            <SecurityConfirmModal
                isOpen={showSecurityModal}
                onClose={() => {
                    setShowSecurityModal(false);
                    setItemToDelete(null);
                }}
                onConfirm={() => {
                    if (itemToDelete) itemToDelete.action();
                    setShowSecurityModal(false);
                    setItemToDelete(null);
                }}
                title={itemToDelete?.title || "Confirmar Eliminación"}
                message={itemToDelete?.message || "¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer."}
            />
        </div>
    );
};
