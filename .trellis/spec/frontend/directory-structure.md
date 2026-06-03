# Directory Structure

> How frontend code is organized in this project.

---

## Overview

<!--
Document your project's frontend directory structure here.

Questions to answer:
- Where do components live?
- How are features/modules organized?
- Where are shared utilities?
- How are assets organized?
-->

(To be filled by the team)

---

## Directory Layout

```
<!-- Replace with your actual structure -->
src/
├── ...
└── ...
```

---

## Module Organization

Features that are delivered as workspace modules live under `modules/<module-name>/`.
The core app discovers these modules through repo-root-relative globs, so a module
must keep the following entry points stable:

- `modules/<module-name>/index.ts` is discovered by
  `jetlinks-web-core/src/utils/modules.ts` through
  `import.meta.glob('../../../modules/*/index.ts', { eager: true })`.
- `modules/<module-name>/package.json` must provide `name`; the Vite module
  alias plugin registers `@<name>` and `@<name>/*` from it.
- `modules/<module-name>/baseMenu.ts` is optional and is used by
  `getModulesMenu()` when a module contributes bootstrap menu data.
- `modules/<module-name>/locales/lang/*.json` is merged by the core locale
  loader, so module-owned user-visible copy should stay in the module instead
  of being added to `jetlinks-web-core/src/locales/lang/*.json`.

Route-bearing modules should expose only the route hooks they need from their
default export, such as `getAsyncRoutesMap`, `getExtraRoutesMap`, or `register`.
Do not register module pages by editing `jetlinks-web-core/src/router/basic.ts`
when the module discovery path can provide the route mapping.

---

## Naming Conventions

<!-- File and folder naming rules -->

(To be filled by the team)

---

## Examples

<!-- Link to well-organized modules as examples -->

(To be filled by the team)
