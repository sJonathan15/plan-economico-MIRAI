import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate } from './astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$BackButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BackButton;
  const { href, class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(href ? `window.location.href='${href}'` : "window.history.back()", "onclick")}${addAttribute([
    "group flex items-center px-4 py-2 text-sm font-bold text-slate-500 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all duration-300 shadow-sm active:scale-95 mb-4",
    className
  ], "class:list")}> <svg class="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> <span>Volver</span> </button>`;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/BackButton.astro", void 0);

export { $$BackButton as $ };
