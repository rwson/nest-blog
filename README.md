## nest-blog

### 安装依赖

```bash
yarn install
```

### 开发

```bash
yarn start:dev   # 启动服务端

# new terminal window
yarn dev:web     # 启动next.js(仅开发需要)
```

### 目录说明

| 路径                    | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `pages/*`               | `next.js`页面(引入`src/client/admin`或者`src/client/blog`里面的具体页面文件) |
| `src/server/auth/*`     | `jwt`加解密模块                                              |
| `src/server/config/*`   | 服务端配置中心                                               |
| `src/server/filter/*`   | `nest.js`全局拦截器，目前已封装错误拦截器                    |
| `src/server/models/*`   | `mongodb`表结构设计                                          |
| `src/server/modules/*`  | 功能模块, 按照请求的第一级`contextPath`拆分                  |
| `src/server/mongoose/*` | `mongoose`自定义插件, `provider`等                           |
| `src/server/pipe/*`     | `nest.js`全局拦管道，目前已封装参数校验管道                  |
| `src/server/role/*`     | `nest.js`接口权限装饰器                                      |
| `src/server/utils/*`    | 服务端一些常用的方法，目前已封装日志模块                     |
| `src/dto`               | 请求`DTO`约定                                                |
| `src/error-code`        | 全局错误码设定(分模块)                                       |
| `src/client/api`        | 前端请求`url`配置                                            |
| `src/client/admin`      | `admin`后台                                                  |
| `src/client/blog`       | `blog`前台                                                   |

