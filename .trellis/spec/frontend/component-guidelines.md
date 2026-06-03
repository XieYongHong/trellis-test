# 组件规范

> 目标：用当前 workspace 已有组件组合页面，新增组件时保持 Vue SFC、职责边界、props/emits、样式和空态一致。

## 基本结构

默认使用 Vue 3 SFC：

```vue
<template>
  ...
</template>

<script setup lang="ts">
...
</script>

<style scoped lang="less">
...
</style>
```

约定：

- Vue/JSX/TSX 页面或组件超过 300 行是阻塞质量问题。窄修已有大文件可例外，但必须说明。
- 页面组件主要负责布局组合、状态展示和事件分发。
- 请求、参数组装、业务编排和复杂计算优先放到 hook、service、api 或 util。
- 重复出现 2 次以上的结构先抽组件或配置，不在页面内复制。

## Props 与 Emits

- 跟随相邻模块的 props 声明方式；复杂对象使用显式类型或 `PropType<T>`。
- `defineEmits` 要表达事件契约，不用无边界 `(...args: any[])`。
- 不发明不存在的 props、slots、emits 或 hook 返回值；以真实导出和组件源码为准。
- 展示组件不要直接写 API 请求、全局 store 写入、环境判断或路由副作用。

## 全局组件事实源

`jetlinks-web-core/src/components/index.ts` 是当前 workspace 通用组件第一事实源。常用组件包括：

- 页面与结构：`FullPage`、`SectionCard`、`ResponsiveGrid`、`EqualHeightColumns`、`PageRouteSkeleton`、`PageRouteView`
- 搜索筛选：`ConditionFilter`、`QuickFilterSidebar`、`ProSearch`
- 列表与卡片：`j-pro-table`、`CardBox`、`EntityCard`、`VirtualScroll`
- 详情与字段：`KvGrid`、`TitleValue`、`MetaChip`、`AppTag`、`ChipGroup`
- 编辑：`InputEditable`、`Editable`、`FormItemEditable`、`EditDialog`、`JlDrawerShell`、`StickyActionBar`
- 空态与反馈：`CloudEmpty`、`JlConfirmDialog`、`ConfirmModal`
- 高级能力：`RegistryComponent`、`RemoteComponent`、`MonacoEditor`、`JEcharts`、`Player`、`ChatTextArea`

使用前必须核验组件真实 props/slots/emits 和相邻页面用法。文档里的组件名是候选，不等于当前需求可直接使用。

## 场景复用矩阵

| 场景 | 优先组件 | 规则 |
| --- | --- | --- |
| 页面容器 | `FullPage`、模块已有 shell | 不为页面章节套多层卡片 |
| 通用条件筛选 | `ConditionFilter`、`QuickFilterSidebar` | 主筛选、快捷筛选、路由回显共用条件模型 |
| 标准列表 | `j-pro-table` | 列表对比、分页、批量操作优先表格 |
| 卡片台账 | `EntityCard`、`CardBox`、`ResponsiveGrid` | 单卡核心字段不超过 5 个，状态先于字段 |
| 对象详情 | `SectionCard`、`KvGrid`、`TabsCard` | 分区展示和局部编辑，不默认全量编辑弹窗 |
| 轻量编辑 | `InputEditable`、`Editable`、`FormItemEditable` | 名称、标签、说明、备注、描述优先 inline |
| 完整编辑 | `EditDialog`、`JlDrawerShell`、独立配置页 | 字段多、跨字段校验或长流程才使用 |
| 空态 | `CloudEmpty` | 局部无数据用 `<CloudEmpty />`，页面级用 `<CloudEmpty type="page" />` |
| 运行时扩展 | `RegistryComponent`、`RemoteComponent` | 不直接跨模块深层 import 私有组件 |

## 轻量编辑规则

名称、标签、说明、备注、描述、单一状态切换、单一开关优先按最低成本编辑：

1. inline 单字段：`InputEditable` / `Editable` / `FormItemEditable`
2. 分区局部编辑：`SectionCard` + `KvGrid` + `StickyActionBar`
3. 局部抽屉：`JlDrawerShell`
4. 完整弹窗：`EditDialog`
5. 独立配置页：多阶段、长流程、需要独立 URL

不要为了修改一个名称或备注打开完整编辑表单。

## 空态与反馈

- 新增页面缺省态优先 `CloudEmpty`，不要直接引用 `empty.svg` 或 `big-empty.svg`。
- 表格、列表、弹窗、卡片、局部面板内无数据：`<CloudEmpty />`。
- 页面主内容为空或整块工作台无内容：`<CloudEmpty type="page" />`。
- 需要调整间距、宽高、图片尺寸时，通过 `style` 和 `imageStyle` props；不要重复封装缺省图片。
- 既有 `<j-empty>` 可保持不动，新增 JetLinks 业务页面优先 `CloudEmpty`。

## 组件拆分门禁

新增或编辑 Vue/JSX/TSX 文件前列出职责边界：

- 页面壳：布局、状态展示、事件分发。
- 子组件：一个清晰 UI 区块，不藏请求副作用。
- Hook：状态编排、watch、computed、异步生命周期。
- API/service：请求、参数组装、接口响应转换。
- Utils：无副作用数据转换。

如果 props 超过 3 个，评估是否应传入 typed state object、使用 slots、移动编排到 hook 或继续拆分。

## 反模式

- 业务页面重复手写 card、tag、drawer shell、详情字段栅格、底部操作条。
- 展示组件中直接请求接口或拼接复杂查询参数。
- 为已有 `jetlinks-web-core` 组件再包一层无能力增量的本地 wrapper。
- 为每个业务字段定制搜索组件，而不是先挂到 `ConditionFilter` 字段定义。
- 在页面里直接渲染原型备注、设计说明、开发提示。
