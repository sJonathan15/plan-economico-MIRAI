import { jsxs, jsx } from 'react/jsx-runtime';
import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:3000/api";
class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
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
  async login(credentials) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
    if (response.token && typeof window !== "undefined") {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  }
  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

const InputField = React.forwardRef(
  ({ label, error, className = "", multiline = false, isTextArea = false, rows = 4, select = false, options = [], ...props }, ref) => {
    const isActuallyTextArea = multiline || isTextArea;
    const inputClasses = `
            w-full px-4 ${isActuallyTextArea ? "h-auto py-3" : "h-16"} rounded-xl bg-slate-50 border-2 transition-all outline-none text-slate-900 font-medium
            ${error ? "border-red-500 bg-red-50 focus:border-red-600" : "border-slate-100 hover:border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10"}
            ${className}
        `;
    return /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col space-y-1.5 w-full", children: [
      /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold text-slate-700 tracking-tight", children: [
        label,
        " ",
        props.required && /* @__PURE__ */ jsx("span", { className: "text-red-500 font-black", children: "*" })
      ] }),
      select ? /* @__PURE__ */ jsx(
        "select",
        {
          ref,
          className: inputClasses,
          ...props,
          children: options.map((opt, i) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, i))
        }
      ) : isActuallyTextArea ? /* @__PURE__ */ jsx(
        "textarea",
        {
          ref,
          className: inputClasses,
          rows,
          ...props
        }
      ) : /* @__PURE__ */ jsx(
        "input",
        {
          ref,
          className: inputClasses,
          ...props
        }
      ),
      error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold text-red-600", children: error })
    ] });
  }
);
InputField.displayName = "InputField";

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
      { keywords: ["alimento", "comida", "restaurante", "postre", "dulce", "café", "pan", "fruta", "gastronomia"], sector: "Gastronomía" },
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
    switch (step) {
      case 1:
        return !!formData.name && !!formData.brand;
      case 2:
        return !!formData.representativeName && !!formData.representativeId;
      case 3:
        return !!formData.addressProvince && !!formData.addressCanton && !!formData.addressParish && !!formData.addressComplete;
      case 4:
        return !!formData.email && !!formData.mobile && (!formData.hasRuc || !!formData.rucNumber);
      default:
        return true;
    }
  };
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((c) => Math.min(c + 1, 5));
      window.scrollTo(0, 0);
    } else {
      alert("Por favor completa los campos obligatorios (*)");
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
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx(InputField, { label: "Nombre del Proyecto *", name: "name", value: formData.name, onChange: handleChange, placeholder: "Ej. Ecofood", required: true }),
              /* @__PURE__ */ jsx(InputField, { label: "Marca / Nombre Comercial *", name: "brand", value: formData.brand, onChange: handleChange, placeholder: "Ej. Ecofood S.A.", required: true }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "label font-bold text-slate-700 text-xs uppercase tracking-wider mb-1", children: "Sector del Emprendimiento *" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    name: "sector",
                    className: "select input w-full border-slate-200 rounded-xl bg-white shadow-sm focus:border-primary-500 focus:ring-0 transition-all text-base",
                    value: formData.sector,
                    onChange: handleChange,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "Tecnología", children: "Tecnología" }),
                      /* @__PURE__ */ jsx("option", { value: "Gastronomía", children: "Gastronomía" }),
                      /* @__PURE__ */ jsx("option", { value: "Comercio", children: "Comercio" }),
                      /* @__PURE__ */ jsx("option", { value: "Servicios", children: "Servicios" }),
                      /* @__PURE__ */ jsx("option", { value: "Producción", children: "Producción" }),
                      /* @__PURE__ */ jsx("option", { value: "Producción / Textil", children: "Producción / Textil" }),
                      /* @__PURE__ */ jsx("option", { value: "Agrícola", children: "Agrícola" }),
                      /* @__PURE__ */ jsx("option", { value: "Turismo", children: "Turismo" }),
                      /* @__PURE__ */ jsx("option", { value: "Artesanías", children: "Artesanías" }),
                      /* @__PURE__ */ jsx("option", { value: "Educación", children: "Educación" }),
                      /* @__PURE__ */ jsx("option", { value: "Salud", children: "Salud" }),
                      /* @__PURE__ */ jsx("option", { value: "Transporte", children: "Transporte" }),
                      /* @__PURE__ */ jsx("option", { value: "Otro", children: "Otro" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-1 italic", children: "El sector se detecta automáticamente según el nombre, pero puedes cambiarlo." })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors", children: logoPreview ? /* @__PURE__ */ jsxs("div", { className: "text-center w-full", children: [
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
          ] })
        ] });
      case 2:
        return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx(InputField, { label: "Nombre Completo *", name: "representativeName", value: formData.representativeName, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx(InputField, { label: "Cédula / Identificación *", name: "representativeId", value: formData.representativeId, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "label font-semibold text-slate-700", children: "Género *" }),
            /* @__PURE__ */ jsxs("select", { name: "representativeGender", className: "select input w-full border-slate-300", value: formData.representativeGender, onChange: handleChange, children: [
              /* @__PURE__ */ jsx("option", { children: "Masculino" }),
              /* @__PURE__ */ jsx("option", { children: "Femenino" }),
              /* @__PURE__ */ jsx("option", { children: "Otro" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(InputField, { label: "Nacionalidad *", name: "representativeNationality", value: formData.representativeNationality, onChange: handleChange }),
          /* @__PURE__ */ jsx(InputField, { label: "Fecha de Nacimiento", type: "date", name: "representativeBirthDate", value: formData.representativeBirthDate, onChange: handleChange }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "label font-semibold text-slate-700", children: "Edad Calculada" }),
            /* @__PURE__ */ jsx("input", { className: "input w-full bg-slate-100 border-slate-300", value: formData.representativeAge, readOnly: true })
          ] })
        ] }) });
      case 3:
        return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsx(InputField, { label: "Provincia *", name: "addressProvince", value: formData.addressProvince, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx(InputField, { label: "Cantón *", name: "addressCanton", value: formData.addressCanton, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx(InputField, { label: "Parroquia *", name: "addressParish", value: formData.addressParish, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx("div", { className: "col-span-full", children: /* @__PURE__ */ jsx(
            InputField,
            {
              label: "Dirección Completa",
              name: "addressComplete",
              value: formData.addressComplete,
              onChange: handleChange,
              multiline: true,
              rows: 4,
              placeholder: "Indica calle principal, secundaria, numeración y puntos de referencia...",
              required: true
            }
          ) })
        ] }) });
      case 4:
        return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx(InputField, { label: "Correo Electrónico *", type: "email", name: "email", value: formData.email, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx(InputField, { label: "Celular *", type: "tel", name: "mobile", value: formData.mobile, onChange: handleChange, required: true }),
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
          formData.hasRuc && /* @__PURE__ */ jsx("div", { className: "animate-in fade-in slide-in-from-top-1", children: /* @__PURE__ */ jsx(InputField, { label: "Número de RUC *", name: "rucNumber", value: formData.rucNumber, onChange: handleChange, placeholder: "Ej. 1790000000001", required: true }) }),
          /* @__PURE__ */ jsx(InputField, { label: "Fecha Inicio Actividades", type: "date", name: "activitiesStartDate", value: formData.activitiesStartDate, onChange: handleChange })
        ] }) });
      case 5:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-6 rounded-xl border border-slate-200", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-slate-800 border-b pb-2 mb-4 flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Datos del Proyecto" }),
              /* @__PURE__ */ jsx("button", { onClick: () => setCurrentStep(1), className: "text-primary-600 text-sm hover:underline", children: "Editar" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Nombre:" }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-medium bg-white px-2 py-1 rounded border border-slate-100 block", children: formData.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Marca:" }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-medium bg-white px-2 py-1 rounded border border-slate-100 block", children: formData.brand })
              ] }),
              logoPreview && /* @__PURE__ */ jsxs("div", { className: "col-span-2 mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-500 block mb-1", children: "Logo:" }),
                /* @__PURE__ */ jsx("img", { src: logoPreview, className: "h-16 object-contain bg-white p-1 rounded border" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-6 rounded-xl border border-slate-200", children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-bold text-slate-800 border-b pb-2 mb-4 flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "Representante" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setCurrentStep(2), className: "text-primary-600 text-sm hover:underline", children: "Editar" })
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-500 block", children: "Nombre:" }),
                  " ",
                  formData.representativeName
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-500 block", children: "Cédula:" }),
                  " ",
                  formData.representativeId
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-500 block", children: "Edad:" }),
                  " ",
                  formData.representativeAge,
                  " años"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-6 rounded-xl border border-slate-200", children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-bold text-slate-800 border-b pb-2 mb-4 flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "Ubicación y Contacto" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setCurrentStep(3), className: "text-primary-600 text-sm hover:underline", children: "Editar" })
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-500 block", children: "Provincia/Cantón:" }),
                  " ",
                  formData.addressProvince,
                  " / ",
                  formData.addressCanton
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-500 block", children: "Email:" }),
                  " ",
                  formData.email
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-500 block", children: "Celular:" }),
                  " ",
                  formData.mobile
                ] }),
                formData.hasRuc && /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-slate-500 block", children: "RUC:" }),
                  " ",
                  formData.rucNumber
                ] })
              ] })
            ] })
          ] })
        ] });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-8", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center max-w-4xl mx-auto px-4 py-2 overflow-x-auto", children: STEPS.map((step, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
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
    /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: `${compact ? "" : "max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100"} overflow-hidden`, children: [
      /* @__PURE__ */ jsxs("div", { className: compact ? "py-4" : "p-8", children: [
        !compact && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-slate-900 tracking-tight mb-2", children: STEPS[currentStep - 1].title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: STEPS[currentStep - 1].description })
        ] }),
        renderStepContent()
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `${compact ? "px-0" : "px-8"} py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center`, children: [
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
    ] }) })
  ] });
};

export { EntrepreneurshipWizard as E };
