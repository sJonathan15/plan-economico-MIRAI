import { c as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$BackButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="back-button" class="group flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-all font-bold text-sm mb-6"> <div class="p-2 rounded-lg bg-[#FAFAFA] group-hover:bg-indigo-50 transition-colors"> <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path> </svg> </div> <span>Volver</span> </button> `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/BackButton.astro", void 0);

export { $$BackButton as $ };
