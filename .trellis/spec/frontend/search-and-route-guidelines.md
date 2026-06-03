# 搜索与路由状态

> 目标：新增搜索或筛选时，优先复用统一条件模型、字段驱动值编辑器、路由编码和回显工具，避免同一条件多份真值。

## 默认优先级

如果页面存在通用搜索或筛选层：

1. 先确认当前 workspace 是否已有 `ConditionFilter` 与编码/回显工具。
2. 若可用，默认优先使用 `ConditionFilter`。
3. 对选项、用户、项目、区域、字典、树节点、时间范围、数值区间、嵌套路径、空值判断等字段，先走字段驱动通用值编辑器和字段级转换。
4. 只有在相邻页面稳定沿用旧模式、搜索极轻量固定表单，或通用筛选被证明不适合当前页面时，才回退到 `ProSearch` 或固定搜索表单。

## ConditionFilter 事实源

入口：

- `jetlinks-web-core/src/components/ConditionFilter`
- `jetlinks-web-core/src/components/ConditionFilter/index.ts`

常用类型和工具以真实导出为准，例如：

- `ConditionFilterField`
- `ConditionFilterTerm`
- `ConditionFilterCommonField`
- `ConditionFilterChangePayload`
- `encodeConditionFilterQuery`
- `decodeConditionFilterQuery`
- `decodeLegacySearchQuery`

参考当前使用：

- `modules/saas-manager-ui/views/operation/assets/DeviceAsset/hooks/useDeviceAssetPage.ts`
- `modules/saas-manager-ui/views/operation/assets/DeviceAsset/components/DeviceAssetPageHeader.vue`
- `modules/system-setting-ui/views/User/index.vue`
- `modules/alarm-ui/views/ruleAssistant/components/RuleWorkspace.vue`
- `modules/vision-model-ui/views/visionModel/components/ui/VisionModelBoardToolbar.vue`

## 字段定义驱动

每个筛选字段先分型：

- 文本
- 数值
- 数值范围
- 日期/时间
- 日期时间范围
- 布尔
- 枚举/选项
- 远程引用
- 树节点
- 嵌套路径
- 数组项
- 无值条件

优先通过字段定义表达：

- `type`
- `options`
- `loadOptions`
- `loadSelectedOptions`
- `routeAlias`
- `rename`
- `handleParamsItem`
- 条件类型集合
- 组件 props 或值编辑器插槽

不要因为业务字段叫“用户”“项目”“区域”“设备分类”就各写一套搜索组件。

## 路由回显

URL、筛选框展示和接口请求必须同源：

- 编码 `q` 时使用字段元数据。
- 解码 `q` 时用同一字段元数据恢复条件。
- 远程选项必须能通过 `loadSelectedOptions` 按值反查显示名称。
- 请求参数通过同一转换函数生成，避免 UI 展示和接口提交分叉。

不要把完整 `terms` JSON 裸拼到 URL。优先使用压缩编码和 `routeAlias`。

## 快捷筛选和保存搜索

- 快捷筛选、左侧筛选面板、状态分段、保存搜索、主筛选共用同一 `terms` 模型。
- 快捷项只生成或替换标准条件，不直接拼接表格请求参数。
- 保存搜索优先保存标准化后的 `q` 或统一条件模型，而不是业务私有对象。

## ProSearch 使用边界

可以使用或保留 `ProSearch`：

- 相邻页面稳定使用，当前只是窄修或新增一个轻量字段。
- 搜索字段很少，且没有 token 化条件、URL 回显、保存搜索、远程选项反显、快捷筛选联动需求。
- 老页面兼容，不适合在当前任务中重构搜索协议。

不应使用 `ProSearch`：

- 新增复杂查询页。
- 需要多字段动态条件、嵌套路径、无值条件、远程选项、保存搜索或路由回显。
- 只是因为“管理页看起来常规”。

## 反模式

- 一边维护 `terms`，一边维护 `formState`，再额外维护 route query 和 table params。
- 条件变更、URL 变更、请求刷新各自 watch，导致重复请求。
- 远程选项只保存 id，不支持回显名称。
- 为时间范围、数值范围、空值判断再造页面私有协议。
- 值编辑面板里重复渲染条件选择，职责混乱。
- 切换字段或条件时粗暴丢失用户已输入值。

## 自检清单

- 是否复用了统一条件模型。
- 字段、条件、值编辑职责是否分层。
- 是否先完成字段分型再决定定制。
- URL 回显后是否能恢复用户可见名称。
- 快捷筛选、保存搜索、主筛选是否同源。
- 接口参数是否由统一转换生成。
