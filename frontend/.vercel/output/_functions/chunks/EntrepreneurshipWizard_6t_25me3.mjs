import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { I as InputField } from './InputField_D6T3iZ-K.mjs';

const API_URL = "http://localhost:3000/api";
class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || sessionStorage.getItem("token");
    }
    return null;
  }
  getHeaders() {
    const headers = {
      "Content-Type": "application/json"
    };
    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }
  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8e3);
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...options,
      signal: controller.signal,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }
      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Server not responding");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
  // Auth methods
  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData)
    });
  }
  async login(credentials, rememberMe = false) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
    if (response.token && typeof window !== "undefined") {
      const storage = rememberMe ? localStorage : sessionStorage;
      this.logout();
      storage.setItem("token", response.token);
      storage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  }
  getUser() {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  async forgotPassword(email) {
    const response = await fetch(`${this.baseUrl}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Error al solicitar recuperación");
    }
    return await response.json();
  }
  async resetPassword(token, password) {
    const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Error al restablecer contraseña");
    }
    return await response.json();
  }
  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
  }
  async verifyPassword(password) {
    return this.request("/auth/verify-password", {
      method: "POST",
      body: JSON.stringify({ password })
    });
  }
  // User methods
  async getProfile() {
    return this.request("/users/me");
  }
  async updateProfile(data) {
    return this.request("/users/me", {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  async changePassword(data) {
    return this.request("/users/me/password", {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  // Entrepreneurship methods
  async createEntrepreneurship(data) {
    return this.request("/entrepreneurships", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  async getEntrepreneurships() {
    return this.request("/entrepreneurships");
  }
  async getEntrepreneurship(id) {
    return this.request(`/entrepreneurships/${id}`);
  }
  async updateEntrepreneurship(id, data) {
    return this.request(`/entrepreneurships/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  async deleteEntrepreneurship(id) {
    return this.request(`/entrepreneurships/${id}`, {
      method: "DELETE"
    });
  }
  // Plan methods
  async createPlan(data) {
    return this.request("/plans", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  async getPlans() {
    return this.request("/plans");
  }
  async getPlan(id) {
    return this.request(`/plans/${id}`);
  }
  async updatePlan(id, data) {
    return this.request(`/plans/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  async deletePlan(id) {
    return this.request(`/plans/${id}`, {
      method: "DELETE"
    });
  }
  async deleteDocument(id) {
    return this.request(`/documents/${id}`, {
      method: "DELETE"
    });
  }
  async exportPlan(id) {
    const token = this.getToken();
    const url = `${this.baseUrl}/plans/${id}/export`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `plan_economico.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);
  }
  async uploadImage(endpoint, file, extraData = {}) {
    const formData = new FormData();
    if (extraData.type) formData.append("type", extraData.type);
    formData.append("image", file);
    const token = this.getToken();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        ...token && { "Authorization": `Bearer ${token}` }
      },
      body: formData
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Error in upload" }));
      throw new Error(error.error || "Error in upload");
    }
    return response.json();
  }
}
const api = new ApiClient(API_URL);

const STEPS = [
  { id: 1, title: "Datos del Proyecto", description: "Identidad y Logo" },
  { id: 2, title: "Representante", description: "Datos Personales" },
  { id: 3, title: "Ubicación", description: "Geolocalización" },
  { id: 4, title: "Contacto y Legal", description: "Vías de comunicación" },
  { id: 5, title: "Revisión", description: "Confirmar datos" }
];
const EntrepreneurshipWizard = ({ initialData, isEditing = false, onSuccess, compact = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // 1. Project
    name: "",
    brand: "",
    logoUrl: "",
    sector: "Tecnología",
    description: "",
    // 2. Representative
    representativeName: "",
    representativeId: "",
    representativeGender: "Otro",
    representativeNationality: "",
    representativeBirthDate: "",
    representativeAge: 0,
    // 3. Location
    addressProvince: "",
    addressCanton: "",
    addressParish: "",
    addressComplete: "",
    // 4. Contact & Legal
    email: "",
    phone: "",
    mobile: "",
    hasRuc: false,
    rucNumber: "",
    activitiesStartDate: ""
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        representativeBirthDate: initialData.representativeBirthDate ? new Date(initialData.representativeBirthDate).toISOString().split("T")[0] : "",
        activitiesStartDate: initialData.activitiesStartDate ? new Date(initialData.activitiesStartDate).toISOString().split("T")[0] : ""
      }));
      if (initialData.logoUrl) {
        const url = initialData.logoUrl.startsWith("http") ? initialData.logoUrl : `${"http://localhost:3000/api"?.replace("/api", "") || "http://localhost:3000"}${initialData.logoUrl}`;
        setLogoPreview(url);
      }
    }
  }, [initialData]);
  useEffect(() => {
    if (formData.representativeBirthDate) {
      const birth = new Date(formData.representativeBirthDate);
      const today = /* @__PURE__ */ new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || m === 0 && today.getDate() < birth.getDate()) {
        age--;
      }
      setFormData((prev) => ({ ...prev, representativeAge: age }));
    }
  }, [formData.representativeBirthDate]);
  useEffect(() => {
    if (!formData.name) return;
    const name = formData.name.toLowerCase();
    const detectionRules = [
      { keywords: ["alimento", "comida", "restaurante", "postre", "dulce", "café", "pan", "fruta", "gastronomia"], sector: "Alimentos" },
      { keywords: ["app", "software", "web", "tecnología", "digital", "system", "red", "computo"], sector: "Tecnología" },
      { keywords: ["ropa", "textil", "moda", "prenda", "calzado", "zapato"], sector: "Producción / Textil" },
      { keywords: ["consultoría", "asesoría", "servicio", "limpieza", "mantenimiento", "soporte"], sector: "Servicios" },
      { keywords: ["granja", "cultivo", "planta", "siembra", "fruta", "verdura", "agrícola", "campo"], sector: "Agrícola" },
      { keywords: ["hotel", "viaje", "turístico", "guía", "hospedaje"], sector: "Turismo" },
      { keywords: ["clase", "curso", "tutor", "enseñanza", "educación", "escuela"], sector: "Educación" },
      { keywords: ["medicina", "doctor", "salud", "clínica", "fisioterap"], sector: "Salud" },
      { keywords: ["transporte", "mudanza", "logística", "entrega", "delivery"], sector: "Transporte" },
      { keywords: ["artesanía", "manualidad", "decoración", "arte"], sector: "Artesanías" }
    ];
    for (const rule of detectionRules) {
      if (rule.keywords.some((k) => name.includes(k))) {
        setFormData((prev) => ({ ...prev, sector: rule.sector }));
        break;
      }
    }
  }, [formData.name]);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setFormData((prev) => ({ ...prev, logoUrl: "" }));
  };
  const validateStep = (step) => {
    const newErrors = {};
    const missing = [];
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
      setCurrentStep((c) => Math.min(c + 1, 5));
      window.scrollTo(0, 0);
    } else {
      setShowErrorModal(true);
      setTimeout(() => {
        const firstError = document.querySelector(".border-red-500");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };
  const prevStep = () => setCurrentStep((c) => Math.max(c - 1, 1));
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let finalLogoUrl = formData.logoUrl;
      if (logoFile) {
        try {
          const uploadRes = await api.uploadImage("/upload/image", logoFile, { type: "logo" });
          finalLogoUrl = uploadRes.url;
        } catch (uploadErr) {
          console.error("Error uploading logo", uploadErr);
        }
      }
      const age = parseInt(String(formData.representativeAge));
      const payload = {
        ...formData,
        logoUrl: finalLogoUrl,
        description: formData.description || "Sin descripción",
        sector: formData.sector || "General",
        representativeAge: isNaN(age) ? null : age,
        activitiesStartDate: formData.activitiesStartDate ? new Date(formData.activitiesStartDate).toISOString() : null,
        representativeBirthDate: formData.representativeBirthDate ? new Date(formData.representativeBirthDate).toISOString() : null
      };
      if (isEditing && initialData?.id) {
        await api.updateEntrepreneurship(initialData.id, payload);
      } else {
        await api.createEntrepreneurship(payload);
      }
      window.dispatchEvent(new CustomEvent("entrepreneurship-success"));
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = "/entrepreneurship";
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
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-50 p-4 rounded-lg text-blue-800 text-sm mb-6", children: "Completa los datos básicos de identidad de tu proyecto." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(InputField, { label: "Nombre del Proyecto *", name: "name", value: formData.name, onChange: handleChange, placeholder: "Ej. Ecofood", required: true, error: errors.name }),
            /* @__PURE__ */ jsx(InputField, { label: "Marca / Nombre Comercial *", name: "brand", value: formData.brand, onChange: handleChange, placeholder: "Ej. Ecofood S.A.", required: true, error: errors.brand }),
            /* @__PURE__ */ jsx(
              InputField,
              {
                label: "Sector del Emprendimiento *",
                name: "sector",
                select: true,
                options: [
                  { label: "Tecnología", value: "Tecnología" },
                  { label: "Alimentos", value: "Alimentos" },
                  { label: "Comercio", value: "Comercio" },
                  { label: "Servicios", value: "Servicios" },
                  { label: "Producción", value: "Producción" },
                  { label: "Producción / Textil", value: "Producción / Textil" },
                  { label: "Agrícola", value: "Agrícola" },
                  { label: "Turismo", value: "Turismo" },
                  { label: "Artesanías", value: "Artesanías" },
                  { label: "Educación", value: "Educación" },
                  { label: "Salud", value: "Salud" },
                  { label: "Transporte", value: "Transporte" },
                  { label: "Otro", value: "Otro" }
                ],
                value: formData.sector,
                onChange: handleChange
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-1 italic", children: "El sector se detecta automáticamente según el nombre, pero puedes cambiarlo." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl bg-[#FAFAFA] hover:bg-slate-100 transition-colors", children: logoPreview ? /* @__PURE__ */ jsxs("div", { className: "text-center w-full", children: [
            /* @__PURE__ */ jsx("img", { src: logoPreview, alt: "Preview", className: "h-40 mx-auto object-contain mb-4 bg-white p-2 rounded shadow-sm" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center", children: [
              /* @__PURE__ */ jsxs("label", { className: "btn btn-sm btn-outline cursor-pointer", children: [
                "Cambiar Logo",
                /* @__PURE__ */ jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleLogoChange })
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: handleRemoveLogo, className: "btn btn-sm btn-error btn-outline", children: "Eliminar" })
            ] })
          ] }) : /* @__PURE__ */ jsxs("label", { className: "cursor-pointer text-center w-full py-8", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-full shadow-sm inline-block mb-3", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-primary-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-slate-700", children: "Subir Logo" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 mt-1", children: "Recomendado: 500x500px" }),
            /* @__PURE__ */ jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleLogoChange })
          ] }) })
        ] });
      case 2:
        return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx(InputField, { label: "Nombre Completo *", name: "representativeName", value: formData.representativeName, onChange: handleChange, required: true, error: errors.representativeName }),
          /* @__PURE__ */ jsx(InputField, { label: "Cédula / Identificación *", name: "representativeId", value: formData.representativeId, onChange: handleChange, required: true, error: errors.representativeId }),
          /* @__PURE__ */ jsx(
            InputField,
            {
              label: "Género *",
              name: "representativeGender",
              select: true,
              options: [
                { label: "Masculino", value: "Masculino" },
                { label: "Femenino", value: "Femenino" },
                { label: "Otro", value: "Otro" }
              ],
              value: formData.representativeGender,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsx(InputField, { label: "Nacionalidad *", name: "representativeNationality", value: formData.representativeNationality, onChange: handleChange }),
          /* @__PURE__ */ jsx(InputField, { label: "Fecha de Nacimiento", type: "date", name: "representativeBirthDate", value: formData.representativeBirthDate, onChange: handleChange }),
          /* @__PURE__ */ jsx(InputField, { label: "Edad Calculada", value: formData.representativeAge, readOnly: true, disabled: true, className: "bg-[#FAFAFA]" })
        ] }) });
      case 3:
        return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsx(InputField, { label: "Provincia *", name: "addressProvince", value: formData.addressProvince, onChange: handleChange, required: true, error: errors.addressProvince }),
          /* @__PURE__ */ jsx(InputField, { label: "Cantón *", name: "addressCanton", value: formData.addressCanton, onChange: handleChange, required: true, error: errors.addressCanton }),
          /* @__PURE__ */ jsx(InputField, { label: "Parroquia *", name: "addressParish", value: formData.addressParish, onChange: handleChange, required: true, error: errors.addressParish }),
          /* @__PURE__ */ jsx("div", { className: "col-span-full", children: /* @__PURE__ */ jsx(
            InputField,
            {
              label: "Dirección Completa *",
              name: "addressComplete",
              value: formData.addressComplete,
              onChange: handleChange,
              multiline: true,
              rows: 4,
              placeholder: "Indica calle principal, secundaria, numeración y puntos de referencia...",
              required: true,
              error: errors.addressComplete
            }
          ) })
        ] }) });
      case 4:
        return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx(InputField, { label: "Correo Electrónico *", type: "email", name: "email", value: formData.email, onChange: handleChange, required: true, error: errors.email }),
          /* @__PURE__ */ jsx(InputField, { label: "Celular *", type: "tel", name: "mobile", value: formData.mobile, onChange: handleChange, required: true, error: errors.mobile }),
          /* @__PURE__ */ jsx(InputField, { label: "Teléfono Convencional", type: "tel", name: "phone", value: formData.phone, onChange: handleChange }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center", children: [
            /* @__PURE__ */ jsx("label", { className: "font-semibold text-slate-700 mb-2", children: "¿Dispone de RUC?" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "hasRuc", className: "radio radio-primary", checked: formData.hasRuc === true, onChange: () => setFormData((p) => ({ ...p, hasRuc: true })) }),
                " Sí"
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "hasRuc", className: "radio radio-primary", checked: formData.hasRuc === false, onChange: () => setFormData((p) => ({ ...p, hasRuc: false, rucNumber: "" })) }),
                " No"
              ] })
            ] })
          ] }),
          formData.hasRuc && /* @__PURE__ */ jsx("div", { className: "animate-in fade-in slide-in-from-top-1", children: /* @__PURE__ */ jsx(InputField, { label: "Número de RUC *", name: "rucNumber", value: formData.rucNumber, onChange: handleChange, placeholder: "Ej. 1790000000001", required: true, error: errors.rucNumber }) }),
          /* @__PURE__ */ jsx(InputField, { label: "Fecha Inicio Actividades *", type: "date", name: "activitiesStartDate", value: formData.activitiesStartDate, onChange: handleChange, required: true, error: errors.activitiesStartDate })
        ] }) });
      case 5:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#FAFAFA] p-6 rounded-xl border border-slate-100", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-black text-slate-800 border-b pb-2 mb-4 flex justify-between border-slate-100 uppercase tracking-tighter text-sm", children: [
              /* @__PURE__ */ jsx("span", { children: "Datos del Proyecto" }),
              /* @__PURE__ */ jsx("button", { onClick: () => setCurrentStep(1), className: "text-indigo-600 text-xs hover:underline", children: "Editar" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px]", children: "Nombre:" }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold bg-white px-3 py-2 rounded-lg border border-slate-100 block mt-1", children: formData.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px]", children: "Marca:" }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold bg-white px-3 py-2 rounded-lg border border-slate-100 block mt-1", children: formData.brand })
              ] }),
              logoPreview && /* @__PURE__ */ jsxs("div", { className: "col-span-2 mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px] block mb-1", children: "Logo:" }),
                /* @__PURE__ */ jsx("img", { src: logoPreview, className: "h-20 object-contain bg-white p-2 rounded-lg border border-slate-100" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#FAFAFA] p-6 rounded-xl border border-slate-100", children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-black text-slate-800 border-b pb-2 mb-4 flex justify-between border-slate-100 uppercase tracking-tighter text-sm", children: [
                /* @__PURE__ */ jsx("span", { children: "Representante" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setCurrentStep(2), className: "text-indigo-600 text-xs hover:underline", children: "Editar" })
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px] block", children: "Nombre:" }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: formData.representativeName })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px] block", children: "Cédula:" }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: formData.representativeId })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px] block", children: "Edad:" }),
                  " ",
                  /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                    formData.representativeAge,
                    " años"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#FAFAFA] p-6 rounded-xl border border-slate-100", children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-black text-slate-800 border-b pb-2 mb-4 flex justify-between border-slate-100 uppercase tracking-tighter text-sm", children: [
                /* @__PURE__ */ jsx("span", { children: "Ubicación y Contacto" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setCurrentStep(3), className: "text-indigo-600 text-xs hover:underline", children: "Editar" })
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px] block", children: "Provincia/Cantón:" }),
                  " ",
                  /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                    formData.addressProvince,
                    " / ",
                    formData.addressCanton
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px] block", children: "Email:" }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: formData.email })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px] block", children: "Celular:" }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: formData.mobile })
                ] }),
                formData.hasRuc && /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px] block", children: "RUC:" }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: formData.rucNumber })
                ] })
              ] })
            ] })
          ] })
        ] });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-10", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center max-w-6xl mx-auto px-4 py-2 overflow-x-auto", children: STEPS.map((step, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold transition-all ${currentStep === step.id ? "border-indigo-600 bg-indigo-600 text-white" : currentStep > step.id ? "border-green-500 bg-green-500 text-white" : "border-slate-300 text-slate-400"}`,
          onClick: () => {
            if (validateStep(step.id - 1) || step.id < currentStep) setCurrentStep(step.id);
          },
          children: currentStep > step.id ? "✓" : step.id
        }
      ),
      /* @__PURE__ */ jsx("span", { className: `ml-2 text-sm font-bold whitespace-nowrap hidden md:block ${currentStep === step.id ? "text-indigo-900" : "text-slate-500"}`, children: step.title }),
      idx < STEPS.length - 1 && /* @__PURE__ */ jsx("div", { className: `w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-green-500" : "bg-slate-300"}` })
    ] }, step.id)) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: `${compact ? "" : "max-w-4xl mx-auto card overflow-hidden border-indigo-100/30"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: compact ? "py-4" : "p-8", children: [
        !compact && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-slate-900 tracking-tight mb-2", children: STEPS[currentStep - 1].title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: STEPS[currentStep - 1].description })
        ] }),
        renderStepContent()
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `${compact ? "px-0" : "px-8"} py-6 bg-[#FAFAFA]/50 border-t border-slate-100 flex justify-between items-center`, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: prevStep,
            disabled: currentStep === 1,
            className: `btn btn-secondary ${currentStep === 1 ? "invisible" : ""}`,
            children: "Atrás"
          }
        ),
        currentStep < 5 ? /* @__PURE__ */ jsx("button", { onClick: nextStep, className: "btn btn-primary px-10", children: "Siguiente" }) : /* @__PURE__ */ jsx("button", { onClick: handleSubmit, disabled: submitting, className: "btn bg-green-600 hover:bg-green-700 text-white px-10 shadow-lg shadow-green-200", children: submitting ? "Guardando..." : isEditing ? "Actualizar Emprendimiento" : "Finalizar y Guardar" })
      ] })
    ] }) }),
    showErrorModal && /* @__PURE__ */ jsxs("div", { className: "modal modal-open", children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-box bg-white rounded-[20px] p-0 overflow-hidden max-w-md shadow-2xl border border-slate-100", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-red-50 border-b border-red-100 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-red-900", children: "Campos Obligatorios Faltantes" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 mb-6 font-medium", children: "Por favor complete los siguientes campos obligatorios para continuar:" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: missingFields.map((field, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-slate-800 font-bold bg-[#FAFAFA] p-3 rounded-xl border border-slate-100", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-red-500 rounded-full" }),
            field
          ] }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowErrorModal(false),
              className: "w-full btn bg-slate-900 hover:bg-slate-800 text-white border-none h-14 rounded-xl font-black transition-all active:scale-95",
              children: "Entendido, completaré los datos"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("form", { method: "dialog", className: "modal-backdrop", children: /* @__PURE__ */ jsx("button", { onClick: () => setShowErrorModal(false), children: "close" }) })
    ] })
  ] });
};

export { EntrepreneurshipWizard as E };
