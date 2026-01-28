/* empty css                                     */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../chunks/MainLayout_CjpnEzV1.mjs';
import { $ as $$Navbar } from '../chunks/Navbar_myPdgnen.mjs';
import { $ as $$BackButton } from '../chunks/BackButton_Bqzdv9o6.mjs';
import { I as InputField } from '../chunks/InputField_D6T3iZ-K.mjs';
import { $ as $$StatusModal } from '../chunks/StatusModal_Br5dRmfU.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Iniciar Sesi\xF3n" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<div class="flex items-center justify-center min-h-[calc(100vh-80px)] pt-20"> <div class="w-full max-w-md bg-white p-10 rounded-[24px] shadow-2xl relative overflow-hidden"> ${renderComponent($$result2, "BackButton", $$BackButton, {})} <h2 class="text-3xl font-black text-slate-900 text-center mb-2 tracking-tight">
Bienvenido de nuevo
</h2> <p class="text-center text-slate-500 font-medium mb-10 leading-relaxed">
Ingresa a tu cuenta para continuar con tus planes.
</p> <form id="login-form" class="space-y-5"> ${renderComponent($$result2, "InputField", InputField, { "label": "Correo Electr\xF3nico", "type": "email", "id": "email", "name": "email", "required": true, "placeholder": "correo@institucion.edu" })} ${renderComponent($$result2, "InputField", InputField, { "client:load": true, "label": "Contrase\xF1a", "type": "password", "id": "password", "name": "password", "required": true, "placeholder": "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "client:component-hydration": "load", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/InputField", "client:component-export": "InputField" })} <div class="flex items-center justify-between mt-2 mb-6"> <label class="flex items-center gap-2 cursor-pointer group"> <input type="checkbox" id="remember" class="checkbox-mirai" name="remember"> <span class="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">Recordarme</span> </label> <button type="button" id="btn-forgot-password" class="text-sm font-bold text-indigo-600 hover:text-indigo-700 underline-offset-4 hover:underline transition-all">
¿Olvidaste tu contraseña?
</button> </div> <button type="submit" class="btn btn-primary w-full py-4 text-lg shadow-xl shadow-indigo-500/10 hover:-translate-y-1 transition-all active:scale-95">
Iniciar Sesión
</button> </form> <div class="mt-8 pt-8 border-t border-slate-100 text-center"> <p class="text-sm text-slate-600 font-medium">
¿No tienes cuenta? <a href="/register" class="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Regístrate ahora</a> </p> </div> </div> </div>  <dialog id="recovery-modal" class="modal-mirai"> <div class="p-8"> <div id="recovery-step-1"> <div class="flex justify-between items-center mb-6"> <h3 class="text-2xl font-black text-slate-900 tracking-tight">
Recuperar contraseña
</h3> <button type="button" class="btn-close-modal text-slate-400 hover:text-slate-600 transition-colors"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <p class="text-slate-500 font-medium mb-8 leading-relaxed">
Ingresa tu correo electrónico y te enviaremos las
                    instrucciones para restablecer tu contraseña.
</p> <form id="recovery-form" class="space-y-6"> ${renderComponent($$result2, "InputField", InputField, { "client:load": true, "label": "Correo Electr\xF3nico", "type": "email", "id": "recovery-email", "required": true, "placeholder": "tu-correo@ejemplo.com", "client:component-hydration": "load", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/InputField", "client:component-export": "InputField" })} <div class="flex flex-col gap-3 pt-2"> <button type="submit" class="btn btn-primary w-full py-4 shadow-xl shadow-indigo-500/10">
Enviar instrucciones
</button> <button type="button" class="btn-close-modal btn btn-secondary w-full py-4 text-slate-500">
Cancelar
</button> </div> </form> </div> <div id="recovery-step-2" class="hidden text-center"> <div class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6"> <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> </div> <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">
Revisa tu correo
</h3> <p class="text-slate-500 font-medium mb-10 leading-relaxed" id="recovery-success-message">
Si el correo está registrado, recibirás un enlace para
                    restablecer tu contraseña.
</p> <button type="button" class="btn-close-modal btn btn-primary w-full py-4 shadow-xl shadow-indigo-500/10">
Entendido
</button> </div> <div id="recovery-step-error" class="hidden text-center"> <div class="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6"> <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path> </svg> </div> <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">
Error al enviar
</h3> <p class="text-slate-500 font-medium mb-10 leading-relaxed" id="recovery-error-message">
No fue posible enviar el correo. Intenta nuevamente.
</p> <button type="button" id="btn-retry-recovery" class="btn btn-primary w-full py-4 shadow-xl shadow-indigo-200/50">
Intentar de nuevo
</button> </div> </div> </dialog> ${renderComponent($$result2, "StatusModal", $$StatusModal, { "id": "auth-status-modal" })} ` })} `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/login.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
