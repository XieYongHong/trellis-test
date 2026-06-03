# Hook 规范

> 目标：把状态编排、生命周期、路由上下文、注册点合并和复杂计算收敛到 composable，不让页面组件膨胀。

## 事实入口

核心 hook 聚合入口是 `jetlinks-web-core/src/hooks/index.ts`，当前导出包括：

- `useWebSocket`
- `useEcharts`
- `useTabSaveSuccess`
- `usePlatform`
- `useRegistryComponentsMerge`
- `useHeaderTheme`
- `useProjectRouter`
- `useResponsiveLayoutDimensions`
- `useResponsiveAntdToken`

其他 hook 即使存在于 `jetlinks-web-core/src/hooks/` 或模块目录中，也要先核验导出方式和相邻 import 方式，不要凭旧文档假设可从 `@jetlinks-web-core/hooks` 直接导入。

## 何时抽 hook

满足任一条件时优先抽 hook：

- 页面存在多个相关 `ref`、`computed`、`watch` 和异步加载流程。
- 搜索条件、路由 query、接口参数、保存搜索需要同源维护。
- Tab 回传、项目运行态、平台上下文、注册点合并等上下文逻辑进入页面。
- 同一页面中两个子组件共享状态编排。
- Vue 文件预计超过 300 行，或请求/业务编排准备进入展示组件。

## 命名与返回

- 命名以 `use*` 开头，工具函数除外。
- 返回结构优先分组为 `state`、`computed state`、`actions`，或沿用相邻模块风格。
- 参数和返回值必须有显式类型；不要把 API 响应、route query、表单模型都写成 `any`。
- hook 内部可以处理生命周期和清理逻辑；展示组件只消费状态和事件。

## 常用 hook 场景

### Tab 保存回传

- 打开新页后保存回传当前页：`useTabSaveSuccess`
- 被打开页保存后回传并关闭/返回：`useTabSaveSuccessBack`（按当前导出核验使用路径）

使用前先查相邻页面，确认 `code`、回传值结构、关闭行为和刷新逻辑。

### 平台与项目运行态

- 平台上下文优先使用 `usePlatform` 相关能力。
- 项目端路由和运行态跳转优先查 `useProjectRouter` 与 `@jetlinks-web-core/utils/project-runtime`。
- 不在组件内直接拼接项目端 hash 或硬编码 legacy 跳转。

### 注册点合并

- 运行时扩展 tabs、组件插槽、菜单项、详情区块时，优先使用 `useRegistryOptions` / `useRegistryVNodeMerge` 一类注册合并能力（以当前导出为准）。
- 组件层通过 `RegistryComponent` 或合并后的配置渲染，不直接 import 其他模块私有组件。

### 响应式布局

- 对需要读取 Ant Design token、布局尺寸、header theme 的页面，先查 `useResponsiveLayoutDimensions`、`useResponsiveAntdToken`、`useHeaderTheme`。
- 不在业务页面散落 magic number 来对齐布局。

## 模块内 hook

模块内 hook 放置规则：

- 页面专用：放页面同级 `hooks/`、`hook/` 或 `composables/`，跟随相邻模块命名。
- 模块内多页面复用：放 `modules/<module>-ui/hooks` 或 `utils`，不要上提到 core。
- 跨模块复用且至少两个模块稳定使用：再评估上提 `jetlinks-web-core/src/hooks`。

## 请求与 hook

- 请求函数放 `api/*.ts` 或 service，hook 调用它们并组织 loading、data、error、reload。
- hook 不要直接硬编码 API base、token、上传 header 或权限码。
- `@jetlinks-web/hooks` 的 `useRequest` 可作为候选，但要以当前依赖和相邻 import 为准。

## 反模式

- 页面组件里堆多组 watch、请求、路由同步和数据转换。
- hook 返回无边界大对象，消费者不知道哪些字段可改。
- 为单个简单按钮点击抽空壳 hook。
- hook 内直接操作 DOM 或绑定具体展示组件结构。
- 同一状态同时在 hook、本地组件、route query、store 中维护多份真值。
