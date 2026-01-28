import { c as createComponent, a as createAstro, r as renderTemplate, d as renderComponent, e as renderSlot, f as renderHead, b as addAttribute } from './astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import { $ as $$Sidebar } from './Sidebar_De0f-nZ5.mjs';
/* empty css                             */
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, layoutMode = "default" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", ' | Plan Econ\xF3mico</title><script>\n      // Apply sidebar state as early as possible to prevent flicker\n      (function () {\n        const collapsed = localStorage.getItem("sidebar-collapsed") === "true";\n        if (collapsed) {\n          document.documentElement.classList.add("sidebar-collapsed");\n        }\n      })();\n    <\/script>', '</head> <body class="bg-slate-50"> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), layoutMode === "app" ? renderTemplate`<div class="flex min-h-screen"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <main class="flex-1 transition-all duration-300 app-main-container h-screen overflow-y-auto custom-scrollbar"> <div class="p-4 md:p-4 pb-20"> ${renderSlot($$result, $$slots["default"])} </div> </main> </div>` : renderTemplate`${renderSlot($$result, $$slots["default"])}`);
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
