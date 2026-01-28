import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DN4dquFu.mjs';
import { manifest } from './manifest_EjgC9rO8.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/dashboard.astro.mjs');
const _page2 = () => import('./pages/entrepreneurship/create.astro.mjs');
const _page3 = () => import('./pages/entrepreneurship/edit/_id_.astro.mjs');
const _page4 = () => import('./pages/entrepreneurship.astro.mjs');
const _page5 = () => import('./pages/login.astro.mjs');
const _page6 = () => import('./pages/plan/create.astro.mjs');
const _page7 = () => import('./pages/plan/_id_.astro.mjs');
const _page8 = () => import('./pages/plan.astro.mjs');
const _page9 = () => import('./pages/profile.astro.mjs');
const _page10 = () => import('./pages/register.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/dashboard.astro", _page1],
    ["src/pages/entrepreneurship/create.astro", _page2],
    ["src/pages/entrepreneurship/edit/[id].astro", _page3],
    ["src/pages/entrepreneurship/index.astro", _page4],
    ["src/pages/login.astro", _page5],
    ["src/pages/plan/create.astro", _page6],
    ["src/pages/plan/[id].astro", _page7],
    ["src/pages/plan/index.astro", _page8],
    ["src/pages/profile.astro", _page9],
    ["src/pages/register.astro", _page10],
    ["src/pages/index.astro", _page11]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/dist/client/",
    "server": "file:///C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
{
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
