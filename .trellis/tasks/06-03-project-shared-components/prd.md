# 项目页面共享数据与展示组件

## Goal

在 `modules/page-ui` 中建立项目页面共享类型、静态数据和通用展示组件，避免每个子页面重复手写卡片、状态、指标和列表结构。

## Requirements

* 定义项目页面共享类型和静态数据源。
* 提供项目页头、指标条、状态分布、异常列表、资源卡片网格、面板网格等小组件。
* 优先复用 `SectionCard`、`MetaChip`、`AppTag`、`ResponsiveGrid`、`EntityCard`。
* 所有共享 Vue 文件低于 300 行。
* 组件只做展示和事件承载，不直接发请求、不写全局状态。

## Acceptance Criteria

* [ ] 共享组件能被至少两个子页面复用。
* [ ] 状态展示使用 `MetaChip` 或同等级 chip/badge，不用裸文字作为主状态。
* [ ] 静态数据集中在一个数据文件或明确的数据模块中。
* [ ] 没有重复 2 次以上的卡片/列表结构散落在子页面。
* [ ] 所有新增 Vue 文件行数 < 300。

## File Scope

* `modules/page-ui/views/project/data.ts`
* `modules/page-ui/views/project/components/*.vue`

## Out of Scope

* 路由注册
* 具体页面业务布局完整实现
* 真实 API service

## Definition of Done

* 只完成本任务范围内的实现或整理。
* 通过相关构建/类型检查，或明确记录未执行原因。
* 若发现范围需要扩大，先更新 PRD 或返回父任务拆解，不直接顺手实现。
