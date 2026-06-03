# 项目页面任务拆解与导航壳

## Goal

在 `modules/page-ui` 子模块中建立项目工作区的父路由、子路由结构和项目内导航壳，让后续子页面可以独立挂载和验收。

## Requirements

* 通过 `modules/page-ui/index.ts` 提供项目工作区路由映射，路由前缀不得与已有项目运行态兼容逻辑冲突。
* 建立 6 个子路由入口：空间态势、设备总览、设备分组、设备健康、视频资源、画面与回放。
* 父壳放在 `modules/page-ui/views/project/index.vue`，只负责项目身份展示、模块导航和 RouterView 承载，不包含具体业务面板。
* 导航在叶子子路由刷新后仍能正确高亮当前模块。
* 移动端导航降级为横向可滚动导航。

## Acceptance Criteria

* [ ] 访问父路由会重定向到空间态势子路由。
* [ ] 6 个子路由都能被路由系统识别。
* [ ] 父壳不渲染任何子页面业务数据。
* [ ] 任一子路由刷新后当前导航项仍高亮。
* [ ] 不使用会触发旧项目运行态重定向的 hash 路由前缀；推荐使用 `/project-workspace` 或模块约定前缀。

## File Scope

* `modules/page-ui/index.ts`
* `modules/page-ui/views/project/index.vue`
* `modules/page-ui/views/project/*/index.vue` route placeholders if needed

## Out of Scope

* 任何具体子页面内容
* 业务数据 mock
* i18n 全量文案之外的临时硬编码扩散
* 真实接口接入
* 修改 `jetlinks-web-core/src/router/basic.ts` 注册项目页面

## Definition of Done

* 只完成本任务范围内的实现或整理。
* 通过相关构建/类型检查，或明确记录未执行原因。
* 若发现范围需要扩大，先更新 PRD 或返回父任务拆解，不直接顺手实现。
