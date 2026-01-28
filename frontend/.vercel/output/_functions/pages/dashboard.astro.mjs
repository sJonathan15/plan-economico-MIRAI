/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$DashboardLayout } from '../chunks/DashboardLayout_BnixJGS5.mjs';
export { renderers } from '../renderers.mjs';

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Panel de Control", "subtitle": "Resumen estrat\xE9gico de tus proyectos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center card gap-6"> <div> <h1 class="text-3xl font-black text-slate-900 tracking-tight">
¡Bienvenido, <span id="user-name" class="text-indigo-600">Usuario</span>!
</h1> <p class="text-slate-500 font-medium mt-1">
Gestiona tus emprendimientos y potencia tus planes de
                    negocio.
</p> </div> <div class="flex gap-4"> <a href="/entrepreneurship" class="btn btn-secondary btn-sm shadow-sm"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path> </svg> <span>Emprendimientos</span> </a> <a href="/plan/create" class="btn btn-primary btn-sm shadow-md"> <svg class="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path> </svg> <span>Nuevo Plan</span> </a> </div> </div> <!-- Stats --> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"> <div class="card-featured p-6 flex items-center space-x-4"> <div class="p-3 bg-blue-100 rounded-lg text-blue-600"> <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path> </svg> </div> <div> <p class="text-sm text-slate-500 font-medium">
Emprendimientos
</p> <h3 id="entrepreneurship-count" class="text-2xl font-bold text-slate-900">
-
</h3> </div> </div> <div class="card-featured p-6 flex items-center space-x-4"> <div class="p-3 bg-purple-100 rounded-lg text-purple-600"> <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg> </div> <div> <p class="text-sm text-slate-500 font-medium">
Planes Creados
</p> <h3 id="plans-count" class="text-2xl font-bold text-slate-900">
-
</h3> </div> </div> </div> <!-- Recent Plans --> <h2 class="text-xl font-black text-slate-800 mb-6 flex items-center"> <span class="bg-indigo-50 text-indigo-600 p-2 rounded-xl mr-3 shadow-sm border border-indigo-100/50"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </span>
Planes Recientes
</h2> <div id="loading" class="text-center py-20"> <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div> <p class="mt-2 text-slate-500">Cargando datos...</p> </div> <div id="empty-state" class="hidden text-center py-20 card"> <div class="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4"> <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path> </svg> </div> <h3 class="text-lg font-medium text-slate-900">
No hay planes creados
</h3> <p class="text-slate-500 mb-6 max-w-sm mx-auto">
Comienza creando tu primer plan económico para tu
                emprendimiento.
</p> <a href="/plan/create" class="btn btn-primary btn-sm w-fit mx-auto shadow-md">Crear Primer Plan</a> </div> <div id="plans-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> <!-- Plans will be inserted here --> </div> </div> ` })} <!-- Security Confirmation Modal HTML --> <dialog id="security_confirm_modal" class="modal"> <div class="modal-box bg-white p-0 rounded-[24px] max-w-md w-full overflow-hidden shadow-2xl"> <div class="p-6 border-b flex justify-between items-center bg-slate-50/50"> <h3 class="text-xl font-black text-slate-900">Confirmar Acción</h3> <button type="button" class="btn btn-ghost btn-sm btn-circle" id="btn-close-security-modal">✕</button> </div> <div class="p-8"> <div class="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> </div> <p class="text-slate-500 font-medium mb-6 leading-relaxed">
Para continuar, por favor ingresa tu contraseña de inicio de
                sesión. Esta acción no se puede deshacer.
</p> <form id="security-confirm-form" class="space-y-4"> <input type="hidden" id="security-action-type"> <input type="hidden" id="security-target-id"> <div> <label class="block text-sm font-bold text-slate-700 mb-2">Tu Contraseña</label> <div class="relative group/input"> <input type="password" id="security-password" class="input" placeholder="••••••••" required> <button type="button" id="toggle-security-password" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"> <svg class="w-5 h-5 toggle-icon-show" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path> </svg> <svg class="w-5 h-5 toggle-icon-hide hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path> </svg> </button> </div> <p id="security-error" class="mt-2 text-sm font-bold text-red-600 hidden flex items-center gap-1"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path> </svg>
Contraseña incorrecta
</p> </div> <div class="flex flex-col gap-3 pt-2"> <button type="submit" id="security-submit-btn" class="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 active:scale-95"> <span>Confirmar y Eliminar</span> </button> <button type="button" id="security-cancel-btn" class="w-full h-14 text-slate-500 font-bold hover:bg-[#FAFAFA] rounded-xl transition-all">
Cancelar
</button> </div> </form> </div> </div> </dialog> `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Dashboard,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
