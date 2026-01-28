import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React from 'react';

const InputField = React.forwardRef(
  ({ label, error, className = "", multiline = false, isTextArea = false, rows = 4, select = false, options = [], type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isActuallyTextArea = multiline || isTextArea;
    const isPassword = type === "password";
    const inputClasses = `
            ${isActuallyTextArea ? "textarea" : "input"}
            ${error ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10" : ""}
            ${isPassword ? "pr-12" : ""}
        `;
    const inputType = isPassword ? showPassword ? "text" : "password" : type;
    return /* @__PURE__ */ jsxs("div", { className: `mb-6 flex flex-col w-full relative group ${className}`, children: [
      /* @__PURE__ */ jsxs("label", { className: "label", children: [
        label,
        " ",
        props.required && /* @__PURE__ */ jsx("span", { className: "text-red-500 font-black", children: "*" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: select ? /* @__PURE__ */ jsx(
        "select",
        {
          ref,
          className: `${inputClasses} appearance-none cursor-pointer`,
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
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            className: inputClasses,
            type: inputType,
            ...props
          }
        ),
        isPassword && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowPassword(!showPassword),
            className: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 focus:outline-none transition-colors",
            title: showPassword ? "Ocultar contraseña" : "Mostrar contraseña",
            children: showPassword ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" }) }) : /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
            ] })
          }
        )
      ] }) }),
      error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold text-red-600", children: error })
    ] });
  }
);
InputField.displayName = "InputField";

export { InputField as I };
