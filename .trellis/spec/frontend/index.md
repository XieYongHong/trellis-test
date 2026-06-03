# JetLinks UI 前端开发规范

> 本目录是当前 `ui/` 工作区的长期前端工程规范。后续实现 Vue 页面、模块接入、共享能力、样式文案和质量验证前，先读本入口，再按任务类型读取对应专题。

## 适用范围

- 根工作区：`package.json`、`pnpm-workspace.yaml`
- 主应用与共享能力：`jetlinks-web-core/`
- 业务模块：`modules/*`
- 目标技术栈：Vue 3、Vite、Pinia、Vue Router、Vue I18n、Ant Design Vue、`@jetlinks-web/*`、`@jetlinks-web-core/*`

不要把本规范用于 `runtime-ui/`、后端 `modules/`、`runtime/` 或 `control/`。如果用户明确切换边界，先重新读取对应目录规则。

## Spec 应该写什么

Spec 写“后续开发必须照做、检查时能对照”的项目契约：

- 文件落点、模块入口、注册方式和边界。
- 组件、hooks、utils、store、路由、i18n、样式 token 的复用顺序。
- 页面分型、交互方案、搜索筛选、状态流、类型边界和质量门禁。
- 适用条件、例外条件、反模式、真实路径依据和验证命令。

Spec 不写临时任务说明、原型备注、泛泛最佳实践、未验证 API、模板占位文本或只适合某个 AI 客户端的操作。

## 技术事实快照

- `pnpm-workspace.yaml` 声明 workspace：`jetlinks-web-core` 与 `modules/*`。
- 根脚本通过 `pnpm -F jetlinks-web-core ...` 委托主应用执行，真实脚本见 `package.json` 与 `jetlinks-web-core/package.json`。
- 主应用别名在 `jetlinks-web-core/vite.config.ts` 中定义：`@jetlinks-web-core`、`@` 指向 `jetlinks-web-core/src`，模块别名由 `registerModulesAlias()` 注入。
- `jetlinks-web-core/src/components/index.ts` 全局注册核心组件，包括 `ConditionFilter`、`QuickFilterSidebar`、`CloudEmpty`、`SectionCard`、`JlDrawerShell`、`StickyActionBar`、`InputEditable`、`Editable`、`FormItemEditable` 等。
- `jetlinks-web-core/src/hooks/index.ts` 是核心 hook 导出入口；其他 hooks 即使存在，也要先核验导出或相邻 import 方式。
- `jetlinks-web-core/src/utils/index.ts` 是核心 utils 聚合入口；查询编码、模块装配、上传、主题、项目运行态等能力以真实导出为准。
- i18n 在 `jetlinks-web-core/src/locales/index.ts` 中通过 glob 合并主应用和 `modules/*/locales/lang/*.json`。

## 开发前检查清单

每次准备写前端代码前按顺序执行：

1. 确认任务类型：页面实现 / 页面改造 / 弹窗 / 模块接入 / 共享能力 / 状态治理 / 样式文案 / 质量交付。
2. 确认目标模块，优先读目标模块的 `index.ts`、`register.ts`、`baseMenu.ts` 或 `baseMenu.json`、`config.json`、`README.md`。
3. 先查相邻页面、相邻组件、相邻 API，再查 `jetlinks-web-core`，最后才参考其他业务模块。
4. 回答页面业务五问：目标用户、进入后的第一任务、成功标准、操作单对象还是对象集合、指标/图表数据来源与决策用途。
5. 判断是否命中局部调整白名单。若不是局部调整，先读 [页面方案选择](./page-solution-guidelines.md) 并形成 solution profile。
6. 识别当前功能依赖的其他业务对象，例如角色、用户、组织、产品、设备、项目、区域、字典、模板，并按 [关联领域能力复用](./jetlinks-web-capabilities.md) 先查对象归属领域能力。
7. 做复用门禁：同功能目录、同模块、同业务域兄弟模块、共享包、公共导出和注册扩展点都查过后，再新增组件、hook、service 或 util。
8. 列出预计创建或修改的 Vue/JSX/TSX 文件和职责边界；预计超过 300 行、重复结构出现 2 次以上、请求/业务编排准备进入展示组件时，先拆分。
9. 用户可见文案先确认 i18n 落点；涉及命名、文案、导入或 i18n 时结合 `jetlinks-conventions`。

## 专题索引

| 文档 | 何时阅读 |
| --- | --- |
| [目录结构与模块接入](./directory-structure.md) | 判断改 `modules/*` 还是 `jetlinks-web-core`，新增页面、路由、菜单、注册能力 |
| [组件规范](./component-guidelines.md) | 编写 Vue SFC、组合页面、选择通用组件、拆分展示组件 |
| [页面方案选择](./page-solution-guidelines.md) | 新增页面、重构壳层、调整主筛选/主列表/主详情、非标准 CRUD |
| [搜索与路由状态](./search-and-route-guidelines.md) | 实现搜索、筛选、快捷筛选、保存搜索、URL 回显 |
| [Hook 规范](./hook-guidelines.md) | 封装组合式逻辑、Tab 回传、平台上下文、注册点合并 |
| [Utils 工具规范](./utils-guidelines.md) | 查询编码、下载、上传 header、模块装配、主题、项目运行态工具 |
| [`@jetlinks-web` 与 core 能力地图](./jetlinks-web-capabilities.md) | 选择 `@jetlinks-web/*`、`@jetlinks-web-core/*` 和全局组件复用入口 |
| [状态管理](./state-management.md) | 区分本地状态、路由状态、Pinia、服务端状态和运行时注册状态 |
| [类型安全](./type-safety.md) | 定义 props/emits/API/表单/路由/条件筛选类型，控制 `any` |
| [样式与文案](./style-and-copy-guidelines.md) | 写 CSS/Less/Tailwind、空态/错态/加载态、按钮/标题/提示文案 |
| [质量规范](./quality-guidelines.md) | 提交前自检、验证命令、行数门禁、复用/i18n/类型检查 |

## 质量检查清单

完成前端改动后至少检查：

- 目录落点、模块注册、路由、菜单、i18n 是否符合目标模块模式。
- 页面结构是否匹配业务第一任务，没有默认套“筛选 + 表格 + 弹窗”。
- 是否优先复用了 `ConditionFilter`、`CloudEmpty`、`SectionCard`、`InputEditable`、`JlDrawerShell` 等当前 workspace 已有能力。
- 当前功能引用其他业务对象时，是否先查了对象归属领域的组件、API、hook、service 或公共注册能力。
- 搜索条件、路由 query、接口参数、保存搜索、快捷筛选是否同源。
- 本地状态、路由状态、Pinia、服务端状态边界是否清晰。
- 用户可见文案是否走当前模块 i18n，且没有开发态/原型态文字。
- Vue/JSX/TSX 文件是否超过 300 行；超过时是否属于已说明的窄修例外。
- 是否运行或记录真实可执行验证命令。

## 常用验证命令

优先使用真实脚本：

```bash
pnpm dev
pnpm dev:proxy localhost:8844
pnpm build
pnpm test
pnpm -F jetlinks-web-core build -- --module-name <module-name>
```

验证文档本身时：

```bash
rg "[T]o be filled|[T]ODO: fill|p[l]aceholder|[R]eplace with your actual" .trellis/spec
```

## 相关思考指南

跨主题思考清单放在 `.trellis/spec/guides/`。写代码前如果要新增抽象、修改共享配置、处理跨层数据流，先读：

- [代码复用思考指南](../guides/code-reuse-thinking-guide.md)
- [跨层数据流思考指南](../guides/cross-layer-thinking-guide.md)
