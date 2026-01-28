import { c as createComponent, a as createAstro, r as renderTemplate, e as renderSlot, d as renderComponent, f as renderHead, b as addAttribute } from './astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Sidebar } from './Sidebar_DMzcY5ZK.mjs';
/* empty css                             */
/* empty css                             */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$DashboardLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DashboardLayout;
  const { title, subtitle } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/images/Logo_MIRAI_blanco_sinf.png"><meta name="generator"', "><title>", ' | MIRAI</title><script>\n            // Apply sidebar state and check authentication as early as possible\n            (function () {\n                const token =\n                    localStorage.getItem("token") ||\n                    sessionStorage.getItem("token");\n                const path = window.location.pathname;\n                const isPublic = ["/", "/login", "/register"].includes(path);\n\n                if (!token && !isPublic) {\n                    window.location.href = "/login";\n                } else if (token && isPublic) {\n                    window.location.href = "/dashboard";\n                }\n\n                const collapsed =\n                    localStorage.getItem("sidebar-collapsed") === "true";\n                if (collapsed) {\n                    document.documentElement.classList.add("sidebar-collapsed");\n                }\n            })();\n        <\/script>', '</head> <body class="bg-[#E6EBF2] h-screen overflow-hidden flex"> <!-- Sidebar (Fixed Width, Full Height) --> ', ' <!-- App Wrapper (Vertical Flex) --> <div class="flex-1 flex flex-col h-screen overflow-hidden bg-[#E6EBF2]"> <!-- Top Header (Static Height) --> <header class="bg-white pt-8 px-8 pb-4 flex justify-between items-end flex-shrink-0"> <div> <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight"> ', " </h1> ", ' </div> </header> <!-- Main Scrollable Content --> <main class="flex-1 overflow-y-auto p-8 pt-6 bg-[#E6EBF2] custom-scrollbar"> <div class="max-w-7xl mx-auto"> ', " </div> </main> </div> </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "Sidebar", $$Sidebar, {}), title, subtitle && renderTemplate`<p class="text-slate-500 mt-1 font-medium"> ${subtitle} </p>`, renderSlot($$result, $$slots["default"]));
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/layouts/DashboardLayout.astro", void 0);

export { $$DashboardLayout as $ };
