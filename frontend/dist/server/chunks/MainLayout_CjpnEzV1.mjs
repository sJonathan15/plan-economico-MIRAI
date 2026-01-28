import { c as createComponent, a as createAstro, r as renderTemplate, d as renderComponent, b as addAttribute, e as renderSlot, f as renderHead } from './astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Sidebar } from './Sidebar_DMzcY5ZK.mjs';
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
  const { title, layoutMode = "default", bgClass = "" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/images/Logo_MIRAI_blanco_sinf.png"><meta name="generator"', "><title>", ` | Plan Econ\xF3mico</title><script>
      // Apply sidebar state and check authentication as early as possible
      (function () {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const path = window.location.pathname;
        const isPublic = ["/", "/login", "/register"].includes(path);

        if (token && isPublic) {
          window.location.href = "/dashboard";
        } else if (!token && !isPublic && path.startsWith("/dashboard")) {
          // This shouldn't normally happen in MainLayout unless it's used for protected pages
          window.location.href = "/login";
        }

        const collapsed = localStorage.getItem("sidebar-collapsed") === "true";
        if (collapsed) {
          document.documentElement.classList.add("sidebar-collapsed");
        }
      })();
    <\/script>`, '</head> <body class="bg-[#E6EBF2]"> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), layoutMode === "app" ? renderTemplate`<div class="flex min-h-screen"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <main${addAttribute(`flex-1 transition-all duration-300 app-main-container h-screen overflow-y-auto custom-scrollbar ${bgClass}`, "class")}> <div class="p-4 md:p-4 pb-20"> ${renderSlot($$result, $$slots["default"])} </div> </main> </div>` : renderTemplate`<div${addAttribute(`${bgClass} min-h-screen`, "class")}> ${renderSlot($$result, $$slots["default"])} </div>`);
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
