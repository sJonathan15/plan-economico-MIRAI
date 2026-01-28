import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { InputField } from './InputField';

interface Props {
    initialData?: any;
    isEditing?: boolean;
    onSuccess?: () => void;
    compact?: boolean;
}

const STEPS = [
    { id: 1, title: 'Datos del Proyecto', description: 'Identidad y Logo' },
    { id: 2, title: 'Representante', description: 'Datos Personales' },
    { id: 3, title: 'Ubicación', description: 'Geolocalización' },
    { id: 4, title: 'Contacto y Legal', description: 'Vías de comunicación' },
    { id: 5, title: 'Revisión', description: 'Confirmar datos' },
];

export const EntrepreneurshipWizard: React.FC<Props> = ({ initialData, isEditing = false, onSuccess, compact = false }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // 1. Project
        name: '',
        brand: '',
        logoUrl: '',
        sector: 'Tecnología',
        description: '',

        // 2. Representative
        representativeName: '',
        representativeId: '',
        representativeGender: 'Otro',
        representativeNationality: '',
        representativeBirthDate: '',
        representativeAge: 0,

        // 3. Location
        addressProvince: '',
        addressCanton: '',
        addressParish: '',
        addressComplete: '',

        // 4. Contact & Legal
        email: '',
        phone: '',
        mobile: '',
        hasRuc: false,
        rucNumber: '',
        activitiesStartDate: '',
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [missingFields, setMissingFields] = useState<string[]>([]);

    // Load Initial Data
    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({
                ...prev,
                ...initialData,
                representativeBirthDate: initialData.representativeBirthDate ? new Date(initialData.representativeBirthDate).toISOString().split('T')[0] : '',
                activitiesStartDate: initialData.activitiesStartDate ? new Date(initialData.activitiesStartDate).toISOString().split('T')[0] : '',
            }));
            if (initialData.logoUrl) {
                const url = initialData.logoUrl.startsWith('http') ? initialData.logoUrl : `${import.meta.env.PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000'}${initialData.logoUrl}`;
                setLogoPreview(url);
            }
        }
    }, [initialData]);

    // Calculate Age
    useEffect(() => {
        if (formData.representativeBirthDate) {
            const birth = new Date(formData.representativeBirthDate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            setFormData(prev => ({ ...prev, representativeAge: age }));
        }
    }, [formData.representativeBirthDate]);

    // Auto-detect Sector based on name keywords
    useEffect(() => {
        if (!formData.name) return;
        const name = formData.name.toLowerCase();

        const detectionRules = [
            { keywords: ['alimento', 'comida', 'restaurante', 'postre', 'dulce', 'café', 'pan', 'fruta', 'gastronomia'], sector: 'Alimentos' },
            { keywords: ['app', 'software', 'web', 'tecnología', 'digital', 'system', 'red', 'computo'], sector: 'Tecnología' },
            { keywords: ['ropa', 'textil', 'moda', 'prenda', 'calzado', 'zapato'], sector: 'Producción / Textil' },
            { keywords: ['consultoría', 'asesoría', 'servicio', 'limpieza', 'mantenimiento', 'soporte'], sector: 'Servicios' },
            { keywords: ['granja', 'cultivo', 'planta', 'siembra', 'fruta', 'verdura', 'agrícola', 'campo'], sector: 'Agrícola' },
            { keywords: ['hotel', 'viaje', 'turístico', 'guía', 'hospedaje'], sector: 'Turismo' },
            { keywords: ['clase', 'curso', 'tutor', 'enseñanza', 'educación', 'escuela'], sector: 'Educación' },
            { keywords: ['medicina', 'doctor', 'salud', 'clínica', 'fisioterap'], sector: 'Salud' },
            { keywords: ['transporte', 'mudanza', 'logística', 'entrega', 'delivery'], sector: 'Transporte' },
            { keywords: ['artesanía', 'manualidad', 'decoración', 'arte'], sector: 'Artesanías' },
        ];

        for (const rule of detectionRules) {
            if (rule.keywords.some(k => name.includes(k))) {
                setFormData(prev => ({ ...prev, sector: rule.sector }));
                break;
            }
        }
    }, [formData.name]);

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveLogo = () => {
        setLogoFile(null);
        setLogoPreview(null);
        setFormData(prev => ({ ...prev, logoUrl: '' }));
    };

    const validateStep = (step: number) => {
        const newErrors: Record<string, string> = {};
        const missing: string[] = [];

        if (step === 1) {
            if (!formData.name) {
                newErrors.name = "El nombre del proyecto es obligatorio";
                missing.push("Nombre del Proyecto");
            }
            if (!formData.brand) {
                newErrors.brand = "La marca o nombre comercial es obligatoria";
                missing.push("Marca / Nombre Comercial");
            }
        } else if (step === 2) {
            if (!formData.representativeName) {
                newErrors.representativeName = "El nombre del representante es obligatorio";
                missing.push("Nombre del Representante");
            }
            if (!formData.representativeId) {
                newErrors.representativeId = "La identificación es obligatoria";
                missing.push("Cédula / Identificación");
            }
        } else if (step === 3) {
            if (!formData.addressProvince) {
                newErrors.addressProvince = "La provincia es obligatoria";
                missing.push("Provincia");
            }
            if (!formData.addressCanton) {
                newErrors.addressCanton = "El cantón es obligatorio";
                missing.push("Cantón");
            }
            if (!formData.addressParish) {
                newErrors.addressParish = "La parroquia es obligatoria";
                missing.push("Parroquia");
            }
            if (!formData.addressComplete) {
                newErrors.addressComplete = "La dirección completa es obligatoria";
                missing.push("Dirección Completa");
            }
        } else if (step === 4) {
            if (!formData.email) {
                newErrors.email = "El correo electrónico es obligatorio";
                missing.push("Correo Electrónico");
            }
            if (!formData.mobile) {
                newErrors.mobile = "El número de celular es obligatorio";
                missing.push("Número de Celular");
            }
            if (formData.hasRuc && !formData.rucNumber) {
                newErrors.rucNumber = "El número de RUC es obligatorio si tiene RUC";
                missing.push("Número de RUC");
            }
            if (!formData.activitiesStartDate) {
                newErrors.activitiesStartDate = "La fecha de inicio de actividades es obligatoria";
                missing.push("Fecha de Inicio de Actividades");
            }
        }

        setErrors(newErrors);
        setMissingFields(missing);
        return missing.length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(c => Math.min(c + 1, 5));
            window.scrollTo(0, 0);
        } else {
            setShowErrorModal(true);
            setTimeout(() => {
                const firstError = document.querySelector('.border-red-500');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    };

    const prevStep = () => setCurrentStep(c => Math.max(c - 1, 1));

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            // Upload Logic
            let finalLogoUrl = formData.logoUrl;
            if (logoFile) {
                try {
                    const uploadRes = await api.uploadImage('/upload/image', logoFile, { type: 'logo' });
                    finalLogoUrl = uploadRes.url;
                } catch (uploadErr) {
                    console.error("Error uploading logo", uploadErr);
                    // alert("Error al subir el logo, se continuará sin él.");
                }
            }

            const age = parseInt(String(formData.representativeAge));
            const payload = {
                ...formData,
                logoUrl: finalLogoUrl,
                description: formData.description || 'Sin descripción',
                sector: formData.sector || 'General',
                representativeAge: isNaN(age) ? null : age,
                activitiesStartDate: formData.activitiesStartDate ? new Date(formData.activitiesStartDate).toISOString() : null,
                representativeBirthDate: formData.representativeBirthDate ? new Date(formData.representativeBirthDate).toISOString() : null,
            };

            if (isEditing && initialData?.id) {
                await api.updateEntrepreneurship(initialData.id, payload);
            } else {
                await api.createEntrepreneurship(payload);
            }

            window.dispatchEvent(new CustomEvent('entrepreneurship-success'));

            if (onSuccess) {
                onSuccess();
            } else {
                window.location.href = '/entrepreneurship';
            }

        } catch (error) {
            console.error(error);
            alert("Error al guardar el emprendimiento");
        } finally {
            setSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm mb-6">
                            Completa los datos básicos de identidad de tu proyecto.
                        </div>
                        <div className="space-y-4">
                            <InputField label="Nombre del Proyecto *" name="name" value={formData.name} onChange={handleChange} placeholder="Ej. Ecofood" required error={errors.name} />
                            <InputField label="Marca / Nombre Comercial *" name="brand" value={formData.brand} onChange={handleChange} placeholder="Ej. Ecofood S.A." required error={errors.brand} />
                            <InputField
                                label="Sector del Emprendimiento *"
                                name="sector"
                                select
                                options={[
                                    { label: 'Tecnología', value: 'Tecnología' },
                                    { label: 'Alimentos', value: 'Alimentos' },
                                    { label: 'Comercio', value: 'Comercio' },
                                    { label: 'Servicios', value: 'Servicios' },
                                    { label: 'Producción', value: 'Producción' },
                                    { label: 'Producción / Textil', value: 'Producción / Textil' },
                                    { label: 'Agrícola', value: 'Agrícola' },
                                    { label: 'Turismo', value: 'Turismo' },
                                    { label: 'Artesanías', value: 'Artesanías' },
                                    { label: 'Educación', value: 'Educación' },
                                    { label: 'Salud', value: 'Salud' },
                                    { label: 'Transporte', value: 'Transporte' },
                                    { label: 'Otro', value: 'Otro' },
                                ]}
                                value={formData.sector}
                                onChange={handleChange}
                            />
                            <p className="text-[10px] text-slate-400 mt-1 italic">El sector se detecta automáticamente según el nombre, pero puedes cambiarlo.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl bg-[#FAFAFA] hover:bg-slate-100 transition-colors">
                            {logoPreview ? (
                                <div className="text-center w-full">
                                    <img src={logoPreview} alt="Preview" className="h-40 mx-auto object-contain mb-4 bg-white p-2 rounded shadow-sm" />
                                    <div className="flex gap-2 justify-center">
                                        <label className="btn btn-sm btn-outline cursor-pointer">
                                            Cambiar Logo
                                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                                        </label>
                                        <button onClick={handleRemoveLogo} className="btn btn-sm btn-error btn-outline">Eliminar</button>
                                    </div>
                                </div>
                            ) : (
                                <label className="cursor-pointer text-center w-full py-8">
                                    <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-3">
                                        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div className="font-semibold text-slate-700">Subir Logo</div>
                                    <div className="text-xs text-slate-500 mt-1">Recomendado: 500x500px</div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                                </label>
                            )}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Nombre Completo *" name="representativeName" value={formData.representativeName} onChange={handleChange} required error={errors.representativeName} />
                            <InputField label="Cédula / Identificación *" name="representativeId" value={formData.representativeId} onChange={handleChange} required error={errors.representativeId} />
                            <InputField
                                label="Género *"
                                name="representativeGender"
                                select
                                options={[
                                    { label: 'Masculino', value: 'Masculino' },
                                    { label: 'Femenino', value: 'Femenino' },
                                    { label: 'Otro', value: 'Otro' },
                                ]}
                                value={formData.representativeGender}
                                onChange={handleChange}
                            />
                            <InputField label="Nacionalidad *" name="representativeNationality" value={formData.representativeNationality} onChange={handleChange} />
                            <InputField label="Fecha de Nacimiento" type="date" name="representativeBirthDate" value={formData.representativeBirthDate} onChange={handleChange} />
                            <InputField label="Edad Calculada" value={formData.representativeAge} readOnly disabled className="bg-[#FAFAFA]" />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <InputField label="Provincia *" name="addressProvince" value={formData.addressProvince} onChange={handleChange} required error={errors.addressProvince} />
                            <InputField label="Cantón *" name="addressCanton" value={formData.addressCanton} onChange={handleChange} required error={errors.addressCanton} />
                            <InputField label="Parroquia *" name="addressParish" value={formData.addressParish} onChange={handleChange} required error={errors.addressParish} />
                            <div className="col-span-full">
                                <InputField
                                    label="Dirección Completa *"
                                    name="addressComplete"
                                    value={formData.addressComplete}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    placeholder="Indica calle principal, secundaria, numeración y puntos de referencia..."
                                    required
                                    error={errors.addressComplete}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Correo Electrónico *" type="email" name="email" value={formData.email} onChange={handleChange} required error={errors.email} />
                            <InputField label="Celular *" type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required error={errors.mobile} />
                            <InputField label="Teléfono Convencional" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                            <div className="flex flex-col justify-center">
                                <label className="font-semibold text-slate-700 mb-2">¿Dispone de RUC?</label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="hasRuc" className="radio radio-primary" checked={formData.hasRuc === true} onChange={() => setFormData(p => ({ ...p, hasRuc: true }))} /> Sí
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="hasRuc" className="radio radio-primary" checked={formData.hasRuc === false} onChange={() => setFormData(p => ({ ...p, hasRuc: false, rucNumber: '' }))} /> No
                                    </label>
                                </div>
                            </div>
                            {formData.hasRuc && (
                                <div className="animate-in fade-in slide-in-from-top-1">
                                    <InputField label="Número de RUC *" name="rucNumber" value={formData.rucNumber} onChange={handleChange} placeholder="Ej. 1790000000001" required error={errors.rucNumber} />
                                </div>
                            )}
                            <InputField label="Fecha Inicio Actividades *" type="date" name="activitiesStartDate" value={formData.activitiesStartDate} onChange={handleChange} required error={errors.activitiesStartDate} />
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-8">
                        <div className="bg-[#FAFAFA] p-6 rounded-xl border border-slate-100">
                            <h4 className="font-black text-slate-800 border-b pb-2 mb-4 flex justify-between border-slate-100 uppercase tracking-tighter text-sm">
                                <span>Datos del Proyecto</span>
                                <button onClick={() => setCurrentStep(1)} className="text-indigo-600 text-xs hover:underline">Editar</button>
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-slate-400 font-bold uppercase text-[10px]">Nombre:</span> <span className="font-semibold bg-white px-3 py-2 rounded-lg border border-slate-100 block mt-1">{formData.name}</span></div>
                                <div><span className="text-slate-400 font-bold uppercase text-[10px]">Marca:</span> <span className="font-semibold bg-white px-3 py-2 rounded-lg border border-slate-100 block mt-1">{formData.brand}</span></div>
                                {logoPreview && (
                                    <div className="col-span-2 mt-2">
                                        <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Logo:</span>
                                        <img src={logoPreview} className="h-20 object-contain bg-white p-2 rounded-lg border border-slate-100" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#FAFAFA] p-6 rounded-xl border border-slate-100">
                                <h4 className="font-black text-slate-800 border-b pb-2 mb-4 flex justify-between border-slate-100 uppercase tracking-tighter text-sm">
                                    <span>Representante</span>
                                    <button onClick={() => setCurrentStep(2)} className="text-indigo-600 text-xs hover:underline">Editar</button>
                                </h4>
                                <ul className="space-y-3 text-sm">
                                    <li><span className="text-slate-400 font-bold uppercase text-[10px] block">Nombre:</span> <span className="font-semibold">{formData.representativeName}</span></li>
                                    <li><span className="text-slate-400 font-bold uppercase text-[10px] block">Cédula:</span> <span className="font-semibold">{formData.representativeId}</span></li>
                                    <li><span className="text-slate-400 font-bold uppercase text-[10px] block">Edad:</span> <span className="font-semibold">{formData.representativeAge} años</span></li>
                                </ul>
                            </div>
                            <div className="bg-[#FAFAFA] p-6 rounded-xl border border-slate-100">
                                <h4 className="font-black text-slate-800 border-b pb-2 mb-4 flex justify-between border-slate-100 uppercase tracking-tighter text-sm">
                                    <span>Ubicación y Contacto</span>
                                    <button onClick={() => setCurrentStep(3)} className="text-indigo-600 text-xs hover:underline">Editar</button>
                                </h4>
                                <ul className="space-y-3 text-sm">
                                    <li><span className="text-slate-400 font-bold uppercase text-[10px] block">Provincia/Cantón:</span> <span className="font-semibold">{formData.addressProvince} / {formData.addressCanton}</span></li>
                                    <li><span className="text-slate-400 font-bold uppercase text-[10px] block">Email:</span> <span className="font-semibold">{formData.email}</span></li>
                                    <li><span className="text-slate-400 font-bold uppercase text-[10px] block">Celular:</span> <span className="font-semibold">{formData.mobile}</span></li>
                                    {formData.hasRuc && <li><span className="text-slate-400 font-bold uppercase text-[10px] block">RUC:</span> <span className="font-semibold">{formData.rucNumber}</span></li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="flex flex-col space-y-10">
            {/* Steps Header (Integrated) */}
            <div className="w-full">
                <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-2 overflow-x-auto">
                    {STEPS.map((step, idx) => (
                        <div key={step.id} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold transition-all ${currentStep === step.id ? 'border-indigo-600 bg-indigo-600 text-white' : currentStep > step.id ? 'border-green-500 bg-green-500 text-white' : 'border-slate-300 text-slate-400'}`}
                                onClick={() => { if (validateStep(step.id - 1) || step.id < currentStep) setCurrentStep(step.id); }}
                            >
                                {currentStep > step.id ? '✓' : step.id}
                            </div>
                            <span className={`ml-2 text-sm font-bold whitespace-nowrap hidden md:block ${currentStep === step.id ? 'text-indigo-900' : 'text-slate-500'}`}>{step.title}</span>
                            {idx < STEPS.length - 1 && (
                                <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Payload (Natural Height) */}
            <div className="w-full">
                <div className={`${compact ? '' : 'max-w-4xl mx-auto card overflow-hidden border-indigo-100/30'}`}>
                    <div className={compact ? 'py-4' : 'p-8'}>
                        {!compact && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{STEPS[currentStep - 1].title}</h2>
                                <p className="text-slate-500 font-medium">{STEPS[currentStep - 1].description}</p>
                            </div>
                        )}
                        {renderStepContent()}
                    </div>

                    {/* Footer Actions Inside Card */}
                    <div className={`${compact ? 'px-0' : 'px-8'} py-6 bg-[#FAFAFA]/50 border-t border-slate-100 flex justify-between items-center`}>
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`btn btn-secondary ${currentStep === 1 ? 'invisible' : ''}`}
                        >
                            Atrás
                        </button>

                        {currentStep < 5 ? (
                            <button onClick={nextStep} className="btn btn-primary px-10">
                                Siguiente
                            </button>
                        ) : (
                            <button onClick={handleSubmit} disabled={submitting} className="btn bg-green-600 hover:bg-green-700 text-white px-10 shadow-lg shadow-green-200">
                                {submitting ? 'Guardando...' : (isEditing ? 'Actualizar Emprendimiento' : 'Finalizar y Guardar')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Error Modal */}
            {showErrorModal && (
                <div className="modal modal-open">
                    <div className="modal-box bg-white rounded-[20px] p-0 overflow-hidden max-w-md shadow-2xl border border-slate-100">
                        <div className="p-6 bg-red-50 border-b border-red-100 flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-black text-red-900">Campos Obligatorios Faltantes</h3>
                        </div>
                        <div className="p-8">
                            <p className="text-slate-600 mb-6 font-medium">Por favor complete los siguientes campos obligatorios para continuar:</p>
                            <ul className="space-y-3">
                                {missingFields.map((field, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-800 font-bold bg-[#FAFAFA] p-3 rounded-xl border border-slate-100">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        {field}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <button
                                    onClick={() => setShowErrorModal(false)}
                                    className="w-full btn bg-slate-900 hover:bg-slate-800 text-white border-none h-14 rounded-xl font-black transition-all active:scale-95"
                                >
                                    Entendido, completaré los datos
                                </button>
                            </div>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setShowErrorModal(false)}>close</button>
                    </form>
                </div>
            )}
        </div>
    );
};

function shouldShowSaveLabel(isEditing: boolean, loading: boolean) {
    if (loading) return 'Guardando...';
    return isEditing ? 'Actualizar Emprendimiento' : 'Guardar Emprendimiento';
}
