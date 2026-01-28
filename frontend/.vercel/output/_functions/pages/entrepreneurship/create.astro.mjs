/* empty css                                        */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_BnixJGS5.mjs';
import { E as EntrepreneurshipWizard } from '../../chunks/EntrepreneurshipWizard_6t_25me3.mjs';
import { $ as $$BackButton } from '../../chunks/BackButton_Bqzdv9o6.mjs';
export { renderers } from '../../renderers.mjs';

const $$Create = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Crear Emprendimiento", "subtitle": "Registra la informaci\xF3n general de tu proyecto paso a paso" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="h-[calc(100vh-64px)] bg-[#FAFAFA] p-4"> ${renderComponent($$result2, "BackButton", $$BackButton, { "href": "/entrepreneurship" })} ${renderComponent($$result2, "EntrepreneurshipWizard", EntrepreneurshipWizard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/EntrepreneurshipWizard", "client:component-export": "EntrepreneurshipWizard" })} </div> ` })}`;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/entrepreneurship/create.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/entrepreneurship/create.astro";
const $$url = "/entrepreneurship/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Create,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
