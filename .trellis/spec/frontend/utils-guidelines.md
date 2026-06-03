# Utils 工具规范

> 目标：工具函数优先复用 `@jetlinks-web/utils` 与 `@jetlinks-web-core/utils`，新增 util 必须有明确边界和复用价值。

## 事实入口

核心入口：

- `jetlinks-web-core/src/utils/index.ts`
- `@jetlinks-web/utils`
- `@jetlinks-web/core`
- `@jetlinks-web/constants`

`jetlinks-web-core/src/utils/index.ts` 当前聚合 `menu`、`comm`、`validate`、`regular`、`document`、`encodeQuery`、`utils`、`modules`、`upload-file-chunk`、`concurrency-control`、`theme-color`、`theme-style`、`project-runtime`、`project-storage`。

## 优先复用场景

| 场景 | 优先查找 |
| --- | --- |
| 查询参数编码 | `@jetlinks-web-core/utils` 的 `paramsEncodeQuery`、`encodeQuery` |
| 菜单/路由装配 | `menu`、`modules`、`getModuleRoutesMap`、`handleMenus` 相关能力 |
| 消息反馈 | `onlyMessage` |
| token / base api / 上传 header | `@jetlinks-web/utils`、`@jetlinks-web-core/utils`、`@jetlinks-web/constants` |
| 文件下载 | download 相关工具 |
| 表单校验 | `validate`、`regular` |
| 项目端运行态 | `project-runtime`、`project-storage` |
| 主题 | `theme-color`、`theme-style` |
| 并发与分片上传 | `concurrency-control`、`upload-file-chunk` |

不要在页面里手写 localStorage key、token header、base api、上传 header、URL 编码、菜单路由装配。

## 新增 util 规则

新增 util 前先搜索：

- 当前页面同目录。
- 当前模块 `utils/`、`services/`、`api/`。
- 同业务域兄弟模块。
- `@jetlinks-web/utils`。
- `jetlinks-web-core/src/utils`。

只有满足以下条件才新增：

- 逻辑无 UI 副作用。
- 复用价值明确，或能隔离复杂业务转换。
- 输入输出类型清晰。
- 不依赖组件实例、DOM、route、store，除非文件职责就是该上下文工具。

## 放置位置

- 单页面使用：页面同级 `utils.ts` 或 hook 内私有函数。
- 模块内多处使用：`modules/<module>-ui/utils/`。
- 多模块稳定共享：评估 `jetlinks-web-core/src/utils/`。
- 请求参数组装若强依赖接口契约，优先放 `api/` 或 service，不放通用 utils。

## 查询转换

- 后端分页接口参数优先复用已有 query 编码工具。
- `ConditionFilter` 的字段转换优先写在字段定义或同源转换函数里。
- 不要在多个按钮、watch、table request 中分别拼接 `terms`。

## 反模式

- 为一次性一行表达式抽 util。
- util 内偷偷读写全局 store、route、localStorage，调用者看不出副作用。
- 复制 `onlyMessage`、下载、token、上传 header、query 编码等已有能力。
- 把展示文案拼接放进通用 util，导致 i18n 难以维护。
- 跨模块 deep import 别的业务模块 util。
