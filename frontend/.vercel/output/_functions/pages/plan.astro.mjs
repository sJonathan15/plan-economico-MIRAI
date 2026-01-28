/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$DashboardLayout } from '../chunks/DashboardLayout_BnixJGS5.mjs';
import { $ as $$BackButton } from '../chunks/BackButton_Bqzdv9o6.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Mis Planes", "subtitle": "Listado y seguimiento de tus planes de negocio" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> ${renderComponent($$result2, "BackButton", $$BackButton, { "href": "/dashboard" })} <div class="card flex justify-between items-center bg-white p-8"> <div> <h2 class="text-xl font-black text-slate-900 tracking-tight">
Proyectos Activos
</h2> <p class="text-slate-500 font-medium">
Gestiona y descarga tus planes estratégicos
</p> </div> <a href="/plan/create" class="btn btn-primary btn-sm shadow-md"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> <span>Nuevo Plan</span> </a> </div> <div id="loading" class="text-center py-20 bg-white rounded-[20px] border border-slate-100 shadow-sm"> <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent shadow-lg shadow-indigo-500/10"></div> <p class="mt-4 text-slate-500 font-bold">Cargando planes...</p> </div> <div id="plans-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"></div> </div>  <dialog id="security_confirm_modal" class="modal"> <div class="modal-box bg-white p-0 rounded-[20px] max-w-md w-full overflow-hidden shadow-2xl border border-slate-100"> <div class="p-6 border-b flex justify-between items-center" class="p-6 border-b flex justify-between items-center bg-slate-50/50"> <h3 class="text-xl font-black text-slate-900">Confirmar Acción</h3> <button type="button" class="btn btn-ghost btn-sm btn-circle" id="btn-close-security-modal">✕</button> </div> <div class="p-8"> <div class="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> </div> <p class="text-slate-500 font-medium mb-6 leading-relaxed">
Para continuar, por favor ingresa tu contraseña de inicio de sesión.
          Esta acción no se puede deshacer.
</p> <form id="security-confirm-form" class="space-y-4"> <input type="hidden" id="security-action-type"> <input type="hidden" id="security-target-id"> <div> <label class="block text-sm font-bold text-slate-700 mb-2">Tu Contraseña</label> <input type="password" id="security-password" class="input w-full" placeholder="••••••••" required> <p id="security-error" class="mt-2 text-sm font-bold text-red-600 hidden flex items-center gap-1"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path> </svg>
Contraseña incorrecta
</p> </div> <div class="flex flex-col gap-3 pt-2"> <button type="submit" id="security-submit-btn" class="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 active:scale-95"> <span>Confirmar y Eliminar</span> </button> <button type="button" id="security-cancel-btn" class="w-full h-14 text-slate-500 font-bold hover:bg-[#FAFAFA] rounded-xl transition-all">
Cancelar
</button> </div> </form> </div> <form method="dialog" class="modal-backdrop"> <button>close</button> </form> </div> </dialog>  ` })}`;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/plan/index.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/plan/index.astro";
const $$url = "/plan";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
