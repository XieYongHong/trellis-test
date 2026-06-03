# 项目页面国际化与菜单文案

## Goal

集中补齐 `modules/page-ui` 项目页面所有用户可见文案，确保中文/英文语言包同步，菜单与页面标题一致。

## Requirements

* 新增页面标题、导航、按钮、状态、字段、空态/说明等 i18n key。
* 同步维护 `modules/page-ui/locales/lang/zh.json` 和 `modules/page-ui/locales/lang/en.json`。
* `modules/page-ui` 页面代码不散落用户可见硬编码文案。
* 文案面向项目运维、设备管理员和安保用户。
* 不出现开发态、原型态或需求文档口吻文案。

## Acceptance Criteria

* [ ] 新增 key 在 `modules/page-ui/locales/lang/zh.json` 和 `modules/page-ui/locales/lang/en.json` 中成对存在。
* [ ] 页面模板中的固定标题/按钮/状态文案均通过 `$t` 获取。
* [ ] 中文文案不直接复制用户原始需求。
* [ ] 英文文案不缺 key。
* [ ] 构建时不出现明显 i18n 缺失错误。

## File Scope

* `modules/page-ui/locales/lang/zh.json`
* `modules/page-ui/locales/lang/en.json`
* `modules/page-ui/views/project/**/*.vue`
* `modules/page-ui/baseMenu.ts` or route/menu config if needed

## Out of Scope

* 后端枚举国际化
* 权限动作国际化
* 修改 `jetlinks-web-core/src/locales/lang/*.json` 承载 page-ui 文案

## Definition of Done

* 只完成本任务范围内的实现或整理。
* 通过相关构建/类型检查，或明确记录未执行原因。
* 若发现范围需要扩大，先更新 PRD 或返回父任务拆解，不直接顺手实现。
