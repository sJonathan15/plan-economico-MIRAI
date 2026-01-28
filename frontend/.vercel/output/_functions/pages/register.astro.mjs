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
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Registro" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<div class="flex items-center justify-center min-h-[calc(100vh-80px)] pt-20 pb-12"> <div class="w-full max-w-lg bg-white p-10 rounded-[24px] shadow-2xl relative overflow-hidden"> ${renderComponent($$result2, "BackButton", $$BackButton, {})} <h2 class="text-3xl font-black text-slate-900 text-center mb-2 tracking-tight">
Crear Cuenta
</h2> <p class="text-center text-slate-500 font-medium mb-10 leading-relaxed">
Crea tu cuenta hoy y empieza a generar tus planes de negocios
                facil y rapido.
</p> <form id="register-form" class="space-y-5"> ${renderComponent($$result2, "InputField", InputField, { "label": "Nombre Completo", "type": "text", "id": "name", "name": "name", "required": true, "placeholder": "Juan P\xE9rez" })} ${renderComponent($$result2, "InputField", InputField, { "label": "Correo Electr\xF3nico", "type": "email", "id": "email", "name": "email", "required": true, "placeholder": "correo@institucion.edu" })} <div class="grid grid-cols-1 md:grid-cols-2 gap-5"> ${renderComponent($$result2, "InputField", InputField, { "client:load": true, "label": "Contrase\xF1a", "type": "password", "id": "password", "name": "password", "required": true, "placeholder": "M\xEDnimo 6 caracteres", "minLength": 6, "client:component-hydration": "load", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/InputField", "client:component-export": "InputField" })} ${renderComponent($$result2, "InputField", InputField, { "client:load": true, "label": "Confirmar Clave", "type": "password", "id": "confirmPassword", "name": "confirmPassword", "required": true, "placeholder": "Repite tu clave", "client:component-hydration": "load", "client:component-path": "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/InputField", "client:component-export": "InputField" })} </div> ${renderComponent($$result2, "InputField", InputField, { "label": "Tipo de Usuario", "select": true, "id": "role", "name": "role", "options": [
    { value: "STUDENT", label: "Estudiante" },
    { value: "TEACHER", label: "Empresario" }
  ] })} <button type="submit" class="btn btn-primary w-full py-4 text-lg shadow-xl shadow-indigo-500/10 hover:-translate-y-1 transition-all active:scale-95">
Registrarse
</button> </form> <div class="mt-8 pt-8 border-t border-slate-100 text-center"> <p class="text-sm text-slate-600 font-medium">
¿Ya tienes cuenta? <a href="/login" class="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Inicia Sesión</a> </p> </div> </div> </div> ${renderComponent($$result2, "StatusModal", $$StatusModal, { "id": "register-status-modal" })} ` })} `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/register.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Register,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
