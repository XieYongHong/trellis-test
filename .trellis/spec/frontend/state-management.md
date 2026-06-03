# 状态管理

> 目标：清晰区分本地状态、路由状态、Pinia 全局状态、服务端状态和运行时注册状态，避免重复真值和回显错乱。

## Store 入口

当前项目使用 Pinia，入口是 `jetlinks-web-core/src/store/index.ts`：

- 默认导出 `createPinia()` 实例。
- 聚合导出 `auth`、`user`、`menu`、`system`、`application`、`ai`、`route-loading`。

业务中统一从 `@jetlinks-web-core/store` 导入核心 store。模块自己的 store 放目标模块内，并通过 `register.ts` 或模块入口按现有机制接入。

## 状态分层

| 状态类型 | 放置位置 | 适用场景 |
| --- | --- | --- |
| 本地状态 | 组件或页面 hook | 弹窗开关、输入中间态、局部 loading、选中行 |
| 路由状态 | route query/params | 可分享筛选条件、详情 id、回跳上下文、项目端 path |
| 全局状态 | Pinia store | 用户、权限、菜单、系统配置、应用列表、AI 抽屉、路由 loading |
| 服务端状态 | API/service + hook/store | 列表、详情、远程选项、保存搜索、异步任务状态 |
| 注册状态 | module registry / components registry | 运行时扩展组件、tabs、动态菜单、远程组件 |

默认不要把短生命周期状态写进全局 store。

## 全局 store 使用

适合进入 Pinia：

- 多页面共享，或布局/路由守卫依赖。
- 登录态、用户信息、权限、菜单、系统配置。
- 应用列表、全局能力开关、AI 全局入口。
- 路由 loading 这类全局反馈。

不适合进入 Pinia：

- 某个弹窗的 visible。
- 当前表格的临时选中项。
- 单个页面的未提交表单。
- 只为一个组件服务的筛选草稿。

使用 Pinia state 时，响应式 state 用 `storeToRefs`，action 可直接解构。不要直接解构 state 导致响应式丢失。

## 路由状态

- 详情 id、父级上下文、项目 id、可分享筛选条件优先进入 route。
- 复杂筛选条件不要裸拼完整 JSON，优先使用统一编码工具和字段短别名，见 [搜索与路由状态](./search-and-route-guidelines.md)。
- route query、筛选框展示、接口参数必须来自同一转换链路。
- 不要 watch route 和 watch filter 双向互相触发导致重复请求。

## 服务端状态

- API 请求函数放 `api/` 或 service，hook/store 负责触发和状态维护。
- 列表页优先让列表组件或 hook 管理分页、loading、reload，不在多个地方重复刷新。
- 远程选项必须支持按关键字查询和按已选值反查，避免路由回显只有 id 没有名称。
- 保存、删除、启停等动作成功后，明确刷新范围：当前行、当前详情、当前列表、关联统计或全局 store。

## 运行时注册状态

- 动态组件、tabs、菜单、远程模块扩展通过注册中心读取。
- 使用 `RegistryComponent` 或 registry merge hook 渲染，不直接跨模块 import 私有实现。
- 注册点需要稳定 code、props 契约和替换/插入策略；不要在页面局部临时拼接一套扩展协议。

## 搜索状态

搜索相关状态必须明确唯一真值：

- 主筛选、快捷筛选、保存搜索、URL 回显共用 `terms` 或统一条件模型。
- `ConditionFilter` 的 `modelValue`、`change` payload、接口参数构造和 query 编解码不能各维护一套格式。
- ProSearch 旧页可保留旧协议，但新增复杂筛选默认先评估 `ConditionFilter`。

## 反模式

- 同一个筛选条件同时存在 `formState`、`terms`、`route.query`、`tableParams` 四份真值。
- 弹窗开关或表格选中写入全局 store。
- 页面组件直接调用多个 store action 形成隐式初始化链，却没有 hook 或注释说明。
- 路由回显只恢复查询值，不恢复用户可见标签。
- 保存成功后盲目刷新整个页面或所有 store。
