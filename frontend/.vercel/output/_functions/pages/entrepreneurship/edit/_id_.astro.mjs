/* empty css                                           */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_BnixJGS5.mjs';
import { $ as $$BackButton } from '../../../chunks/BackButton_Bqzdv9o6.mjs';
export { renderers } from '../../../renderers.mjs';

const $$id = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Editar Emprendimiento", "subtitle": "Modifica los datos generales, ubicaci\xF3n o contacto de tu proyecto" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="wizard-container" class="h-full bg-[#FAFAFA] p-4 overflow-y-auto custom-scrollbar"> ${renderComponent($$result2, "BackButton", $$BackButton, { "href": "/entrepreneurship" })} <p class="text-center pt-20 text-slate-500">
Cargando datos del emprendimiento...
</p> </div> ` })} `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/entrepreneurship/edit/[id].astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/entrepreneurship/edit/[id].astro";
const $$url = "/entrepreneurship/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
