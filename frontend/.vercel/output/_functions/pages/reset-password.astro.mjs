/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../chunks/MainLayout_CjpnEzV1.mjs';
import { I as InputField } from '../chunks/InputField_D6T3iZ-K.mjs';
import { $ as $$Navbar } from '../chunks/Navbar_myPdgnen.mjs';
/* empty css                                          */
export { renderers } from '../renderers.mjs';

const $$ResetPassword = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Restablecer Contrase\xF1a", "data-astro-cid-oiuorpsm": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-oiuorpsm": true })} ${maybeRenderHead()}<div class="min-h-[calc(100vh-80px)] flex items-center justify-center p-4" data-astro-cid-oiuorpsm> <div class="card max-w-md w-full animate-reveal" id="reset-card" data-astro-cid-oiuorpsm> <div id="loading-state" class="text-center py-8" data-astro-cid-oiuorpsm> <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4" data-astro-cid-oiuorpsm></div> <p class="text-slate-500 font-medium" data-astro-cid-oiuorpsm>Validando token...</p> </div> <div id="error-state" class="hidden text-center" data-astro-cid-oiuorpsm> <div class="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6" data-astro-cid-oiuorpsm> <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-oiuorpsm> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-astro-cid-oiuorpsm></path> </svg> </div> <h2 class="text-2xl font-black text-slate-900 mb-2" data-astro-cid-oiuorpsm>
Enlace no válido
</h2> <p class="text-slate-500 mb-8" id="error-message" data-astro-cid-oiuorpsm>
El enlace de recuperación ha expirado o no es válido.
</p> <a href="/login" class="btn btn-primary w-full" data-astro-cid-oiuorpsm>Volver al inicio</a> </div> <div id="form-state" class="hidden" data-astro-cid-oiuorpsm> <div class="text-center mb-10" data-astro-cid-oiuorpsm> <h2 class="text-3xl font-black text-slate-900 tracking-tight mb-3" data-astro-cid-oiuorpsm>
Nueva contraseña
</h2> <p class="text-slate-500 font-medium" data-astro-cid-oiuorpsm>
Define tu nueva clave de acceso para MIRAI.
</p> </div> <form id="reset-form" class="space-y-6" data-astro-cid-oiuorpsm> ${renderComponent($$result2, "InputField", InputField, { "client:load": true, "label": "Nueva Contrase\xF1a", "type": "password", "id": "password", "name": "password", "placeholder": "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required": true, "client:component-hydration": "load", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/InputField", "client:component-export": "InputField", "data-astro-cid-oiuorpsm": true })} ${renderComponent($$result2, "InputField", InputField, { "client:load": true, "label": "Confirmar Contrase\xF1a", "type": "password", "id": "confirmPassword", "name": "confirmPassword", "placeholder": "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required": true, "client:component-hydration": "load", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/InputField", "client:component-export": "InputField", "data-astro-cid-oiuorpsm": true })} <button type="submit" class="btn btn-primary w-full h-14 text-lg shadow-xl shadow-indigo-500/10 hover:-translate-y-1 transition-all" data-astro-cid-oiuorpsm>
Restablecer Contraseña
</button> <p id="form-error" class="text-sm font-bold text-red-600 hidden text-center" data-astro-cid-oiuorpsm></p> </form> </div> <div id="success-state" class="hidden text-center" data-astro-cid-oiuorpsm> <div class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6" data-astro-cid-oiuorpsm> <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-oiuorpsm> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" data-astro-cid-oiuorpsm></path> </svg> </div> <h2 class="text-2xl font-black text-slate-900 mb-2" data-astro-cid-oiuorpsm>
¡Todo listo!
</h2> <p class="text-slate-500 mb-8" data-astro-cid-oiuorpsm>
Tu contraseña ha sido actualizada correctamente. Ya puedes
                    iniciar sesión.
</p> <a href="/login" class="btn btn-primary w-full h-14 text-lg" data-astro-cid-oiuorpsm>Ir al Login</a> </div> </div> </div> ` })}  `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/reset-password.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/reset-password.astro";
const $$url = "/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ResetPassword,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
