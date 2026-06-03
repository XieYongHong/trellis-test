# page-ui 子模块骨架与注册

## Goal

创建 `modules/page-ui` 子模块骨架，让项目页面作为独立子模块被主应用发现、加载和注册。

## Requirements

* 创建 `modules/page-ui` 目录。
* 创建模块 `package.json`，确保 Vite 模块别名注册能识别模块名。
* 创建 `modules/page-ui/index.ts`，通过现有模块机制导出页面模块能力。
* 确认模块如何提供 `getAsyncRoutesMap` / `getExtraRoutesMap` / `register` 等入口，并只实现项目页面需要的最小入口。
* 创建模块级目录结构：`views/project`、`components`、`locales/lang`，但不实现具体页面内容。

## Acceptance Criteria

* [ ] `modules/page-ui/index.ts` 会被 `jetlinks-web-core/src/utils/modules.ts` 的 glob 发现。
* [ ] `modules/page-ui/package.json` 存在并提供稳定包名。
* [ ] 模块可提供项目页面路由映射入口，不需要修改 `jetlinks-web-core/src/router/basic.ts`。
* [ ] 模块可提供本模块中英文语言包，能被 `jetlinks-web-core/src/locales/index.ts` 的 modules glob 合并。
* [ ] 本任务不创建具体业务子页面。

## File Scope

* `modules/page-ui/package.json`
* `modules/page-ui/index.ts`
* `modules/page-ui/baseMenu.ts` 或等价菜单入口（如需要）
* `modules/page-ui/views/project/.gitkeep` 或基础目录
* `modules/page-ui/locales/lang/zh.json`
* `modules/page-ui/locales/lang/en.json`

## Out of Scope

* 工作区导航壳
* 六个业务子页面
* 共享业务组件
* 真实接口接入

## Definition of Done

* 只完成模块骨架与注册入口。
* 构建能发现 `modules/page-ui`，没有缺目录警告或模块解析错误。
* 如模块机制需要菜单或路由格式研究，在 PRD 或 research 中记录清楚。
