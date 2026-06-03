# page-ui Module Discovery

## Findings

- `jetlinks-web-core/src/utils/modules.ts` discovers module entries through `import.meta.glob('../../../modules/*/index.ts', { eager: true })`.
- `modules/*/package.json` is read by `jetlinks-web-core/configs/plugin/modules.ts` to register Vite aliases such as `@<package-name>`.
- `modules/*/baseMenu.ts` is discovered by `getModulesMenu()` and may return an array, an object, or a function returning menu items.
- Module i18n resources are merged by `jetlinks-web-core/src/locales/index.ts` through `import.meta.glob('../../../modules/*/locales/lang/*.json', { eager: true })`.
- Module route maps are collected by `jetlinks-web-core/src/router/globModules.ts` through `module.default.getAsyncRoutesMap?.()`.
- Module extra routes are collected by `jetlinks-web-core/src/router/extraMenu.ts` through `module.default.getExtraRoutesMap?.()`.
- Module lifecycle hooks are executed by `registerModule()` when `module.default.register?.()` exists.

## Scaffold Decision

The initial `modules/page-ui` scaffold exposes empty `getAsyncRoutesMap`, `getExtraRoutesMap`, `register`, `baseMenu`, and locale entries. Concrete project workspace routes and business pages are intentionally left for the follow-up workspace-shell and child-page tasks.
