# 项目页面开发任务集

## Goal

把 SaaS 项目页面作为 `modules/page-ui` 子模块拆成一组可独立实现、独立验收的小任务。父任务只负责总体边界、交互方案、任务依赖和验收地图，不再直接承载页面代码实现。

## Product Scope

项目页面是项目运行态工作区，用户进入某个项目后，可以在独立子路由中查看：

* 空间态势
* 物联：设备总览、设备分组、设备健康
* 视联：视频资源、画面与回放

用户已确认页面采用多子路由结构，每个模块拥有独立 URL，便于刷新保留当前模块、菜单/面包屑细分和后续权限扩展。

## Module Placement Decision

* 项目页面必须放在 `modules/page-ui` 下，作为子模块使用。
* 不在 `jetlinks-web-core/src/views/project` 下实现页面。
* 不直接修改 `jetlinks-web-core/src/router/basic.ts` 来注册项目页面。
* 子模块通过 `modules/page-ui/index.ts` 的模块导出能力提供路由映射、菜单扩展或注册资源。
* 模块文案优先放在 `modules/page-ui/locales/lang/*.json`，由现有 locale glob 自动合并。

## Solution Profile

* solutionName: `监控感知页 + 项目工作区导航 + 资源卡片台账`
* routeMode: 多子路由工作区
* moduleRoot: `modules/page-ui`
* primaryTask: 先看项目当前运行状态，再进入设备或视频资源定位问题
* contentSurface:
  * 空间态势：监控感知页
  * 设备总览 / 视频资源：资源卡片台账
  * 设备分组：分组台账
  * 设备健康：健康风险面板
  * 画面与回放：视频工作区 + 事件片段列表

## Task Breakdown

| Order | Task | Purpose | Depends On |
| --- | --- | --- | --- |
| 1 | `06-03-page-ui-module-scaffold` | 创建 `modules/page-ui` 子模块骨架、package、index 导出与本地路由/菜单注册入口 | none |
| 2 | `06-03-project-space-situation` | 建立项目工作区入口/导航壳并实现空间态势子页 | scaffold |
| 3 | `06-03-project-iot-overview` | 实现物联设备总览子页 | scaffold, space situation |
| 4 | `06-03-project-device-groups` | 实现设备分组子页 | scaffold, space situation |
| 5 | `06-03-project-device-health` | 实现设备健康子页 | scaffold, space situation |
| 6 | `06-03-project-video-resources` | 实现视频资源子页 | scaffold, space situation |
| 7 | `06-03-project-screen-playback` | 实现画面与回放子页 | scaffold, space situation, video resources |
| 8 | `06-03-project-i18n-menu-copy` | 收敛页面标题、菜单与中英文文案 | all page tasks |
| 9 | `06-03-project-responsive-qa` | 响应式、构建、浏览器冒烟和最终验收 | all implementation tasks |

## Cross-Task Constraints

* 每个子任务只实现自己的范围，不顺手实现其他页面。
* Vue 单文件超过 300 行必须拆分。
* 用户可见文案集中走 `modules/page-ui/locales/lang/*.json`。
* 状态先于字段，卡片/列表中使用 chip/badge，不用裸文字作为主要状态信号。
* 禁止默认堆叠 “4 KPI + 顶部搜索 + 大表格”。
* 不引入完整编辑弹窗；第一阶段以只读态势和资源查看为主。
* 静态/模拟数据必须集中管理，不散落在模板中；共享展示组件在业务页实现时按需抽取，不预设独立任务。
* 后续接真实接口时，再单独创建 API 接入任务。

## Acceptance Criteria

* [ ] 父任务下所有子任务都有独立 `prd.md`。
* [ ] 每个子任务都有明确文件范围、验收标准和 out-of-scope。
* [ ] 子任务依赖顺序清晰。
* [ ] 所有页面实现落点都指向 `modules/page-ui`。
* [ ] 实现工作按子任务逐个启动，不再把整页一次性塞进父任务。

## Current Implementation Caveat

在需求变更前，已经有一批实现文件被创建或修改在 `jetlinks-web-core` 下。后续处理应在确认具体子任务后决定：

* 迁移这些雏形到 `modules/page-ui` 并清理 core 改动
* 或回滚这批未按新模块落点执行的代码改动

不要在未确认前继续扩大代码改动。
