# 项目页面响应式与质量验收

## Goal

对 `modules/page-ui` 项目页面任务集做最终质量验收，覆盖构建、行数、响应式、路由和浏览器冒烟。

## Requirements

* 运行项目可用质量命令，至少覆盖 build。
* 检查 `modules/page-ui` 新增/修改 Vue 文件行数，超过 300 行即阻塞。
* 用浏览器查看桌面和移动端核心路由。
* 检查导航切换、刷新后高亮、文本不溢出、内容不重叠。
* 记录无法执行的检查项和原因。

## Acceptance Criteria

* [ ] `pnpm build` 通过。
* [ ] 所有新增 Vue 文件 < 300 行。
* [ ] 至少检查空间态势、设备总览、视频资源、画面与回放 4 个路由。
* [ ] 桌面与移动端无明显布局错乱。
* [ ] 形成验收记录或在最终回复中报告验证证据。

## File Scope

* `modules/page-ui/**`
* `jetlinks-web-core` integration points only if module loading requires verification

## Out of Scope

* 新功能开发
* 接口接入
* 视觉大改

## Definition of Done

* 只完成本任务范围内的实现或整理。
* 通过相关构建/类型检查，或明确记录未执行原因。
* 若发现范围需要扩大，先更新 PRD 或返回父任务拆解，不直接顺手实现。
