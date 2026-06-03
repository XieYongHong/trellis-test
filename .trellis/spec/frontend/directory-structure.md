# 目录结构与模块接入

> 目标：快速判断前端代码应该落在业务模块还是 `jetlinks-web-core`，并按当前 workspace 的模块发现、路由、菜单和注册机制接入。

## 工作区结构

```text
cloud.jetlinks.ui/
├── package.json
├── pnpm-workspace.yaml
├── jetlinks-web-core/
│   ├── package.json
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── layout/
│       ├── locales/
│       ├── router/
│       ├── store/
│       ├── style.css
│       ├── utils/
│       └── views/
└── modules/
    └── <module-name>-ui/
        ├── api/
        ├── assets/
        ├── components/
        ├── hooks/ 或 hook/
        ├── locales/
        ├── store/ 或 stores/
        ├── utils/
        ├── views/
        ├── baseMenu.ts 或 baseMenu.json
        ├── config.json
        ├── index.ts
        └── register.ts
```

不是每个模块都有完整目录。新增目录前先确认目标模块相邻文件是否已有 `hook/`、`hooks/`、`store/`、`stores/` 等本地命名差异。

## 默认落点

默认先改 `modules/*`：

- 某个菜单对应的业务页面。
- 某个业务域自己的 API、状态、组件、样式。
- 只被单个模块使用的 hook、utils、service、局部组件。

只有共享能力才改 `jetlinks-web-core`：

- 登录、账号、初始化、布局、公共路由、全局请求行为、平台上下文。
- 多个模块稳定共享的组件、hooks、store、utils。
- 模块聚合、菜单装配、路由覆盖、运行时注册扩展点。

“将来可能复用”不是上提理由。当前只有一个模块需要时，先留在该模块内。

## 模块入口契约

常见模块入口模式：

- 页面组件映射：`const routerModules = import.meta.glob('./views/**/index.vue')`
- 路由映射：`getModuleRoutesMap(routerModules)`，或目标模块自定义 key 映射。
- 隐藏/详情页：`getExtraRoutesMap()`
- 壳层级覆盖：`getCoreRouteOverrides()`，仅在确实需要覆盖登录、公共路由、项目端路由、隐藏路由时使用。
- 模块注册：`moduleRegistry.register(name, registerSetting)`
- 注册配置：`register.ts` 暴露模块自己的 `apis`、`stores`、`components` 等能力。

参考文件：

- `jetlinks-web-core/src/router/globModules.ts`
- `jetlinks-web-core/src/router/extraMenu.ts`
- `jetlinks-web-core/src/utils/modules.ts`
- `modules/vision-ui/index.ts`
- `modules/saas-manager-ui/index.ts`
- `modules/device-manager-ui/index.ts`

## 页面与路由落点

- 菜单页默认放在 `modules/<module>-ui/views/**/index.vue`。
- 额外详情、新增、编辑、隐藏页优先仍放在业务语义目录下，并通过 `getExtraRoutesMap()` 挂到父菜单路由。
- 项目端或运行态路由先查目标模块是否已有 `getProjectRoutesMap()`、`getProjectDynamicMenuData()` 或 `project/*` 映射。
- 不要硬编码菜单权限、按钮权限、API base、token 或上传 header；优先复用 store、utils、注册点和菜单配置。

## 业务功能目录分层

新增一个完整业务功能时，不要把列表、保存、详情、弹窗和局部组件平铺在同一目录。默认以业务功能目录作为聚合根，让入口、保存页、详情页和局部组件有稳定位置。

以“用户管理”为例：

```text
modules/<module-name>-ui/views/system/User/
├── index.vue              # 列表页 / 主入口 / 查询和批量操作
├── Save/
│   └── index.vue          # 新增、编辑或保存页；字段多或需要独立 URL 时使用
├── Detail/
│   └── index.vue          # 详情页；对象摘要、分区详情、关联记录
├── components/
│   ├── UserTable.vue      # 当前功能专属展示组件
│   ├── UserForm.vue       # 当前功能专属表单片段
│   └── UserStatusTag.vue  # 当前功能专属小组件
├── hooks/                 # 当前功能状态编排、筛选、详情加载等，可按相邻模块命名为 hook/
└── types.ts               # 当前功能局部类型；也可跟随相邻模块使用 typing.ts / *.d.ts
```

职责边界：

- `index.vue` 承载功能入口，不继续塞完整保存表单和详情实现。
- `Save/index.vue` 承载新增/编辑/保存流程；如果只是编辑一个名称、备注、标签或状态，优先用 inline / sectional 编辑，不必创建保存页。
- `Detail/index.vue` 承载单对象详情、分区信息、关联记录和局部编辑。
- `components/` 只放当前功能专属组件；能被模块多个功能复用的组件再放模块级 `components/`。
- `hooks/` 或 `hook/` 放状态编排、路由回显、请求组合和复杂 computed，避免 `index.vue` 膨胀。

允许例外：

- 历史页面窄修可保持原结构，不为一个小改动强制搬迁。
- 单字段、单弹窗、单筛选条件等局部调整不需要新建完整目录层级。
- 相邻模块已有稳定命名（例如 `View/`、`Setting/`、`Api/`）时，优先保持同业务域一致，但仍避免把多类职责平铺到根目录。

禁止事项：

- 新写完整功能时，把 `Save.vue`、`Detail.vue`、`EditModal.vue`、`Table.vue`、`Form.vue` 全部平铺在功能根目录。
- 把详情页或保存页塞进 `components/`，导致路由页和局部组件边界混乱；历史结构可窄修保留，新增功能不要继续这样做。
- 为了少建目录，把 300 行以上的列表、表单、详情和请求编排都堆进一个 `index.vue`。

## API、组件、hooks、utils

- API 请求放目标模块 `api/`，按业务域拆分。
- 页面局部组件放目标模块 `components/` 或页面同级 `components/`。
- 页面状态编排和复杂计算放 `hooks/`、`composables/` 或页面同级 hook 文件，跟随相邻模块命名。
- 多模块共享且事实稳定后，再上提到 `jetlinks-web-core/src/components`、`src/hooks` 或 `src/utils`。
- 不要跨业务模块深层引用私有实现。确需复用时，优先找公共导出、注册点、core 能力或抽到共享层。

## 国际化落点

`jetlinks-web-core/src/locales/index.ts` 会 glob 合并：

- `jetlinks-web-core/src/locales/lang/*.json`
- `modules/*/locales/lang/*.json`

新增用户可见文案时，优先放目标模块的 `locales/lang/zh.json` 和 `en.json`。如果相邻模块尚未国际化，先沿用目标模块事实，并在最终说明风险；不要在新页面散落硬编码文案。

## 禁止事项

- 不要同时修改 `ui/` 和 `runtime-ui/`。
- 不要修改 `dist/`、`node_modules/`、构建产物或无关子模块。
- 不要复制 `ui/` 改动到 `runtime-ui/`，除非用户明确要求。
- 不要在未确认真实引用关系前删除共享组件、菜单装配或公共路由。
- 不要把模块私有能力因为“看起来通用”直接上提到 core。

## 检查清单

- 已读目标模块 `index.ts`、`register.ts`、菜单文件、`config.json` 和 README。
- 已确认页面是否应进入 `views/**/index.vue` 或 `getExtraRoutesMap()`。
- 新增完整业务功能时，已按功能根目录组织 `index.vue`、`Save/index.vue`、`Detail/index.vue`、`components/` 等职责，而不是平铺文件。
- 已确认 API、组件、hook、utils 是否留在模块内。
- 已确认是否真的需要改 `jetlinks-web-core`。
- 已确认 i18n、路由、菜单、权限、注册点都沿用目标模块模式。
