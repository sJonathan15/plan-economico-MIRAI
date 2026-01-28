import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { E as EntrepreneurshipWizard } from './EntrepreneurshipWizard_6t_25me3.mjs';

const EntrepreneurshipModalManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    const handleOpen = (e) => {
      const { mode, data } = e.detail || {};
      if (mode === "edit") {
        setEditData(data);
      } else {
        setEditData(null);
      }
      setIsOpen(true);
    };
    window.addEventListener("open-entrepreneurship-wizard", handleOpen);
    window.addEventListener("entrepreneurship-success", () => setIsOpen(false));
    return () => {
      window.removeEventListener("open-entrepreneurship-wizard", handleOpen);
    };
  }, []);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-900", children: editData ? "Editar Emprendimiento" : "Nuevo Emprendimiento" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm font-medium", children: editData ? "Actualiza los datos de tu proyecto" : "Sigue los pasos para registrar tu proyecto" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsOpen(false),
          className: "w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors",
          children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-8", children: /* @__PURE__ */ jsx(
      EntrepreneurshipWizard,
      {
        compact: true,
        initialData: editData,
        isEditing: !!editData,
        onSuccess: () => setIsOpen(false)
      }
    ) })
  ] }) });
};

export { EntrepreneurshipModalManager as E };
