/* empty css                                     */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import { $ as $$DashboardLayout } from '../chunks/DashboardLayout_CSXYABb9.mjs';
import { E as EntrepreneurshipModalManager } from '../chunks/EntrepreneurshipModalManager_C63vTjSD.mjs';
import { $ as $$BackButton } from '../chunks/BackButton_qXsGqafz.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Profile;
  Astro2.cookies.get("token")?.value;
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Mi Perfil" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "EntrepreneurshipModalManager", EntrepreneurshipModalManager, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/EntrepreneurshipModalManager", "client:component-export": "EntrepreneurshipModalManager" })} ${maybeRenderHead()}<div class="container mx-auto px-4 py-8 max-w-7xl"> ${renderComponent($$result2, "BackButton", $$BackButton, { "href": "/dashboard" })} <!-- Profile Header (Cover & Avatar) --> <div class="relative mb-20"> <!-- Cover Image --> <div class="h-48 md:h-64 bg-slate-200 rounded-2xl overflow-hidden relative group cursor-pointer" id="cover-container"> <img id="cover-img" src="" class="w-full h-full object-cover hidden" alt="Cover"> <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"> <span class="text-white text-sm font-medium flex items-center bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
Cambiar Portada
</span> </div> <input type="file" id="cover-input" class="hidden" accept="image/*"> </div> <!-- Profile Image --> <div class="absolute -bottom-16 left-8"> <div class="relative group cursor-pointer" id="avatar-container"> <div class="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-lg"> <img id="avatar-img" src="https://ui-avatars.com/api/?name=User&background=random" class="w-full h-full object-cover" alt="Avatar"> </div> <div class="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"> <span class="text-white bg-black/40 p-2 rounded-full backdrop-blur-sm"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> </span> </div> <input type="file" id="avatar-input" class="hidden" accept="image/*"> </div> </div> <div class="absolute -bottom-12 left-44 md:left-56"> <h1 id="header-name" class="text-2xl font-bold text-slate-900 leading-none">
Cargando...
</h1> <p id="header-email" class="text-slate-500 text-sm mt-1"></p> </div> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- User Info Section --> <div class="lg:col-span-1"> <div class="card"> <h2 class="text-xl font-bold mb-6">Información Personal</h2> <form id="profile-form" class="space-y-4"> <div> <label class="label" for="name">Nombre Completo</label> <input type="text" id="name" name="name" class="input" required> </div> <div> <label class="label" for="email">Correo Electrónico</label> <input type="email" id="email" name="email" class="input bg-slate-100 text-slate-500" disabled> <p class="text-xs text-slate-400 mt-1">
El correo no se puede cambiar.
</p> </div> <button type="submit" class="btn btn-primary w-full mt-4">
Guardar Cambios
</button> </form> </div> <!-- Password Change Section --> <div class="card mt-8"> <h2 class="text-xl font-bold mb-6">Cambiar Contraseña</h2> <form id="password-form" class="space-y-4"> <div> <label class="label" for="currentPassword">Contraseña Actual</label> <input type="password" id="currentPassword" name="currentPassword" class="input" required> </div> <div> <label class="label" for="newPassword">Nueva Contraseña</label> <input type="password" id="newPassword" name="newPassword" class="input" required> </div> <div> <label class="label" for="confirmPassword">Confirmar Nueva Contraseña</label> <input type="password" id="confirmPassword" name="confirmPassword" class="input" required> </div> <button type="submit" class="btn btn-secondary w-full mt-4">
Actualizar Contraseña
</button> </form> </div> </div> <!-- Entrepreneurships Section --> <div class="lg:col-span-2"> <div class="card"> <div class="flex justify-between items-center mb-6"> <h2 class="text-xl font-bold">Mis Emprendimientos</h2> <button id="btn-new-entrepreneurship" class="btn btn-secondary text-sm px-4 py-2">
+ Nuevo
</button> </div> <div id="entrepreneurships-list" class="space-y-4"> <!-- Loaded dynamically --> <div class="animate-pulse space-y-4"> <div class="h-24 bg-slate-100 rounded-lg"></div> <div class="h-24 bg-slate-100 rounded-lg"></div> </div> </div> </div> </div> </div> </div>  <dialog id="security_confirm_modal" class="modal"> <div class="modal-box bg-white p-0 rounded-2xl max-w-md w-full overflow-hidden"> <div class="p-6 border-b border-slate-100 flex justify-between items-center"> <h3 class="text-xl font-black text-slate-900">
Confirmar Acción
</h3> <button type="button" class="btn btn-ghost btn-sm btn-circle" id="btn-close-security-modal">✕</button> </div> <div class="p-8"> <div class="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> </div> <p class="text-slate-500 font-medium mb-6 leading-relaxed">
Para continuar, por favor ingresa tu contraseña de inicio de
                    sesión. Esta acción no se puede deshacer.
</p> <form id="security-confirm-form" class="space-y-4"> <input type="hidden" id="security-action-type"> <input type="hidden" id="security-target-id"> <div> <label class="block text-sm font-bold text-slate-700 mb-2">Tu Contraseña</label> <input type="password" id="security-password" class="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:border-indigo-600 focus:outline-none transition-all" placeholder="••••••••" required> <p id="security-error" class="mt-2 text-sm font-bold text-red-600 hidden flex items-center gap-1"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path> </svg>
Contraseña incorrecta
</p> </div> <div class="flex flex-col gap-3 pt-2"> <button type="submit" id="security-submit-btn" class="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 active:scale-95"> <span>Confirmar y Eliminar</span> </button> <button type="button" id="security-cancel-btn" class="w-full h-14 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all">
Cancelar
</button> </div> </form> </div> <form method="dialog" class="modal-backdrop"> <button>close</button> </form> </div> </dialog>  ` })}`;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/profile.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/profile.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Profile,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
