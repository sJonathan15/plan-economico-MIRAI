/* empty css                                        */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_CSXYABb9.mjs';
import { $ as $$BackButton } from '../../chunks/BackButton_qXsGqafz.mjs';
export { renderers } from '../../renderers.mjs';

const $$Create = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Plan Econ\xF3mico", "subtitle": "Construye el an\xE1lisis financiero de tu emprendimiento" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="h-[calc(100vh-64px)] bg-slate-50 p-4"> ${renderComponent($$result2, "BackButton", $$BackButton, { "href": "/dashboard" })} ${renderComponent($$result2, "PlanCreationContainer", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/PlanCreationContainer", "client:component-export": "PlanCreationContainer" })} </div> ` })}`;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/plan/create.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/plan/create.astro";
const $$url = "/plan/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Create,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
