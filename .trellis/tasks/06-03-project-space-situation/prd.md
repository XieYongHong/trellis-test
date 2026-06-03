# 项目页面空间态势子页

## Goal

在 `modules/page-ui` 中建立项目工作区入口、基础导航壳和空间态势子页，让运维人员先看到项目区域状态、关键空间指标和异常聚焦。

## Requirements

* 通过 `modules/page-ui/index.ts` 提供项目工作区父路由和空间态势子路由。
* 父壳放在 `modules/page-ui/views/project/index.vue`，只负责项目身份展示、模块导航和 RouterView 承载。
* 页面挂载在 `page-ui` 的空间态势子路由，父路由默认重定向到空间态势。
* 导航在空间态势子路由刷新后仍能正确高亮当前模块。
* 移动端导航降级为横向可滚动导航。
* 首屏包含项目空间状态主锚点，不堆叠经营分析式 KPI 墙。
* 展示覆盖空间、在线设备、活跃异常等少量关键状态。
* 展示空间/区域状态分布，可用低保真空间图承载，不要求真实地图。
* 展示异常聚焦列表，行内提供查看动作。

## Acceptance Criteria

* [ ] 项目工作区父路由可访问，并默认进入空间态势。
* [ ] 空间态势子路由可访问。
* [ ] 父壳不渲染任何子页面业务数据。
* [ ] 空间态势刷新后导航项仍高亮。
* [ ] 首屏不超过 3 个一级区块。
* [ ] 异常列表中每条异常有优先级 chip、标题、影响范围和查看动作。
* [ ] 窄屏下空间图和异常区不重叠。
* [ ] 不出现开发态文案。

## File Scope

* `modules/page-ui/index.ts`
* `modules/page-ui/views/project/index.vue`
* `modules/page-ui/views/project/space-situation/index.vue`

## Out of Scope

* 真实地图 SDK 点位接入
* 异常处置流程
* 设备/视频详情页
* 其他业务子页面内容

## Definition of Done

* 只完成本任务范围内的实现或整理。
* 通过相关构建/类型检查，或明确记录未执行原因。
* 若发现范围需要扩大，先更新 PRD 或返回父任务拆解，不直接顺手实现。
