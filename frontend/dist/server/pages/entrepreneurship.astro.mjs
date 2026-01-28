/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import { $ as $$DashboardLayout } from '../chunks/DashboardLayout_CSXYABb9.mjs';
import { E as EntrepreneurshipModalManager } from '../chunks/EntrepreneurshipModalManager_C63vTjSD.mjs';
import { $ as $$BackButton } from '../chunks/BackButton_qXsGqafz.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Mis Emprendimientos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> ${renderComponent($$result2, "EntrepreneurshipModalManager", EntrepreneurshipModalManager, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/EntrepreneurshipModalManager", "client:component-export": "EntrepreneurshipModalManager" })} ${renderComponent($$result2, "BackButton", $$BackButton, { "href": "/dashboard" })} <div class="flex justify-between items-center mb-6"> <h1 class="text-3xl font-bold text-slate-800">
Mis Emprendimientos
</h1> <button id="btn-new-entrepreneurship" class="btn btn-primary btn-sm shadow-md">
+ Nuevo Emprendimiento
</button> </div> <div id="entrepreneurship-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> <!-- Loaded via React/Client Script --> <p class="text-slate-500">Cargando emprendimientos...</p> </div> </div> ` })}  <!-- Security Confirmation Modal HTML --> <dialog id="security_confirm_modal" class="modal"> <div class="modal-box bg-white p-0 rounded-2xl max-w-md w-full overflow-hidden"> <div class="p-6 border-b border-slate-100 flex justify-between items-center"> <h3 class="text-xl font-black text-slate-900">Confirmar Acción</h3> <button type="button" class="btn btn-ghost btn-sm btn-circle" id="btn-close-security-modal">✕</button> </div> <div class="p-8"> <div class="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> </div> <p class="text-slate-500 font-medium mb-6 leading-relaxed">
Para continuar, por favor ingresa tu contraseña de inicio de
                sesión. Esta acción no se puede deshacer.
</p> <form id="security-confirm-form" class="space-y-4"> <input type="hidden" id="security-action-type"> <input type="hidden" id="security-target-id"> <div> <label class="block text-sm font-bold text-slate-700 mb-2">Tu Contraseña</label> <input type="password" id="security-password" class="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:border-indigo-600 focus:outline-none transition-all" placeholder="••••••••" required> <p id="security-error" class="mt-2 text-sm font-bold text-red-600 hidden flex items-center gap-1"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path> </svg>
Contraseña incorrecta
</p> </div> <div class="flex flex-col gap-3 pt-2"> <button type="submit" id="security-submit-btn" class="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 active:scale-95"> <span>Confirmar y Eliminar</span> </button> <button type="button" id="security-cancel-btn" class="w-full h-14 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all">
Cancelar
</button> </div> </form> </div> </div> <form method="dialog" class="modal-backdrop"> <button>close</button> </form> </dialog>`;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/entrepreneurship/index.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/entrepreneurship/index.astro";
const $$url = "/entrepreneurship";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
