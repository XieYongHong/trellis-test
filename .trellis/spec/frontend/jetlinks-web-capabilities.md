# `@jetlinks-web` 与 core 能力地图

> 目标：写前端代码前先知道能力从哪里找，避免重造当前 workspace 已经提供的组件、hooks、utils、请求和注册能力。

## 复用优先级

1. `@jetlinks-web/components`
2. `@jetlinks-web/hooks`
3. `@jetlinks-web/utils`
4. `@jetlinks-web/core`
5. `jetlinks-web-core/src/components`
6. `jetlinks-web-core/src/hooks`
7. `jetlinks-web-core/src/store`
8. `jetlinks-web-core/src/utils`
9. 当前模块已有 `components/`、`hooks/`、`utils/`、`api/`

实际使用时不机械照搬顺序：当前模块已有且只服务本模块的能力，优先留在模块内；多模块共享才评估 core。

## 关联领域能力复用

当前功能“使用”其他业务对象时，先去那个对象的归属领域找能力，不要在当前使用方里重新写一份查询、选项转换、选择组件或 hook。

常见关联对象包括：

- 用户、角色、组织、部门、职位、权限、菜单。
- 产品、设备、设备分组、协议、接入方式、证书。
- 项目、区域、客户、租户、应用。
- 字典、通知模板、资源模板、模型、规则、标签。

查找顺序：

1. 对象归属领域是否已有选择组件或表单项，例如 `form-item-role`、组织选择、资源选择器。
2. 对象归属领域是否已有 API，例如 `api/system/role.ts`、`api/system/user.ts`、产品或设备域 API。
3. 对象归属领域是否已有 hook、service、utils 或选项转换。
4. `jetlinks-web-core` 或 `@jetlinks-web/*` 是否已有通用组件、值编辑器、远程选项、资源选择能力。
5. 相邻页面是否已有稳定用法。

新增封装默认放在“对象归属领域”，不是当前使用方页面：

- 用户新增页选择角色：优先复用角色选择组件或角色域 API，不在用户页重复写 `/role/_query`。
- 设备页选择产品：优先查产品域组件/API，不在设备页重复封装产品查询。
- 通知规则选择用户、角色、组织：分别查用户、角色、组织归属能力，不在通知规则里复制三套查询。
- 表单选择字典项：优先查字典域或通用字典组件，不在当前页面硬编码枚举请求。

允许在当前功能内新增适配层的场景：

- 只是把归属领域 API 返回值映射成当前页面表单需要的 shape，且该转换只服务当前页面。
- 归属领域只有底层 API，没有适合当前交互的选择组件；可以先在当前功能内写薄适配，但要说明为何不上提。
- 两个以上功能需要同一适配时，应沉淀到对象归属领域或共享层。

PRD 中建议记录：

```md
## 关联领域能力复用

| 对象 | 用途 | 归属领域 | 已查能力 | 处理方式 |
| --- | --- | --- | --- | --- |
| 角色 | 新增用户时选择角色 | 角色管理 | form-item-role / role api | 复用，不新增 user 侧 role api |
| 组织 | 选择所属组织 | 组织管理 | 待检查 | 优先复用组织选择组件 |
| 字典 | 状态/类型枚举 | 字典管理 | 待检查 | 优先复用字典能力 |
```

未按归属领域复用时，最终说明必须写清：查过哪些对象归属能力、为什么不能复用、新增封装为什么放在当前位置。

## 包级能力

根 `package.json` 当前依赖包括：

- `@jetlinks-web/components`：基础组件、权限按钮、值编辑、配置提供等候选能力。
- `@jetlinks-web/hooks`：通用 composable，例如请求、权限、路由参数等候选能力。
- `@jetlinks-web/utils`：消息、token、本地存储、下载、工具函数等候选能力。
- `@jetlinks-web/core`：底层请求、WS、axios 创建等候选能力。
- `@jetlinks-web/vite`：模块联邦、构建插件、图片优化等 Vite 能力。
- `@jetlinks-web/constants`：token key、base api 等运行时常量。

这些包的 API 必须以当前安装版本和真实 import 为准。不要把旧项目或 skill 文档里的 API 当成必然存在。

## Core 入口

优先核验这些入口：

- `jetlinks-web-core/src/components/index.ts`
- `jetlinks-web-core/src/hooks/index.ts`
- `jetlinks-web-core/src/utils/index.ts`
- `jetlinks-web-core/src/store/index.ts`
- `jetlinks-web-core/src/router/`
- `jetlinks-web-core/src/layout/`
- `jetlinks-web-core/src/locales/index.ts`

如果某能力没有从 index 导出，但相邻页面按深路径 import，先沿用相邻模式；不要擅自新增导出，除非确实是共享能力建设。

## 当前 core 组件候选

`jetlinks-web-core/src/components/index.ts` 已全局注册大量组件。高频候选：

- 搜索：`ConditionFilter`、`QuickFilterSidebar`、`ProSearch`
- 表格/列表/卡片：`j-pro-table`、`CardBox`、`EntityCard`、`ResponsiveGrid`、`VirtualScroll`
- 详情：`SectionCard`、`KvGrid`、`TitleValue`、`TabsCard`
- 编辑：`InputEditable`、`Editable`、`FormItemEditable`、`EditDialog`、`JlDrawerShell`、`StickyActionBar`
- 空态/确认：`CloudEmpty`、`JlConfirmDialog`、`ConfirmModal`
- 标签/状态：`MetaChip`、`ChipGroup`、`AppTag`、`j-badge-status`
- 动态扩展：`RegistryComponent`、`RemoteComponent`
- 媒体/编辑器/图表：`Player`、`ChatTextArea`、`MonacoEditor`、`JEcharts`

使用前查组件源码和相邻页面，确认是否全局注册可直接用，还是需要显式 import 类型或子组件。

## `@jetlinks-web-core/utils`

`jetlinks-web-core/src/utils/index.ts` 聚合：

- `menu`
- `comm`
- `validate`
- `regular`
- `document`
- `encodeQuery`
- `utils`
- `modules`
- `upload-file-chunk`
- `concurrency-control`
- `theme-color`
- `theme-style`
- `project-runtime`
- `project-storage`

常见优先能力：

- 查询参数：`paramsEncodeQuery`、`encodeQuery`
- 模块装配：`getModuleRoutesMap`、模块扫描与菜单合并相关工具
- 上传：`getUploadHeaders` 等上传 header 能力
- 路由回退：`routerFallback`
- 项目端运行态：`createProjectRuntimeHref`、`isProjectRuntime` 等
- 主题：theme color/style 相关工具

不要在页面里硬编码 token、base api、上传 header、项目端 URL 或复杂 query 编码。

## `@jetlinks-web-core/store`

全局 store 包括：

- `useAuthStore`
- `useUserStore`
- `useMenuStore`
- `useSystemStore`
- `useApplication`
- `useAIStore`
- `useRouteLoadingStore`

只把跨页面、布局、权限、路由守卫依赖状态放入全局 store。页面临时状态保持本地或 hook 内。

## 运行时注册能力

当前 workspace 支持模块和组件运行时注册：

- 模块注册：`moduleRegistry.register(name, registerSetting)`
- 动态组件：`RegistryComponent`
- 远程组件：`RemoteComponent`
- 组件 registry merge hook：按当前导出核验

新增扩展点要有稳定 code、props 契约和插入策略；不要在业务页面里临时 deep import 其他模块私有实现。

## 未复用时必须说明

如果新增了本地组件、hook、service 或 util，任务说明或最终回复要说明：

- 查过哪些范围：同功能、同模块、兄弟模块、共享包、public exports。
- 如果当前功能依赖其他业务对象，查过哪些对象归属领域能力。
- 哪个现有能力最接近。
- 不复用的具体缺口：props 不支持、交互不匹配、数据契约不同、无法扩展、会造成反向依赖等。
- 为什么新增能力仍留在模块内或需要上提 core。
