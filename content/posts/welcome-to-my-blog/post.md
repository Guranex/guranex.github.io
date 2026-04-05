---
title: Sa-Token 跨域配置
category: Blog
date: 2026-04-06
tags:
  - tutorial
  - Java
  - Sa-Token
summary: A short launch post about Configuration of Sa-Token
---

## Sa-Token 配置全局跨域CORS
```java
@Configuration
public class CosConfig {
    /**
     * CORS 跨域处理策略
     */
    @Bean
    public SaCorsHandleFunction corsHandle() {
        return (req, res, sto) -> {
            res.
                    // 允许指定域访问跨域资源
                     setHeader("Access-Control-Allow-Origin", "*")
                    // 允许所有请求方式
                    .setHeader("Access-Control-Allow-Methods", "POST, GET,PUT, OPTIONS, DELETE")
                    // 有效时间
                    .setHeader("Access-Control-Max-Age", "3600")
                    // 允许的header参数
                    .setHeader("Access-Control-Allow-Headers", "*");

            // 如果是预检请求，则立即返回到前端
            SaRouter.match(SaHttpMethod.OPTIONS)
                    .free(r -> System.out.println("--------OPTIONS预检请求，不做处理"))
                    .back();
        };
    }
}
```

跨域问题不是后端拒绝，而是返回内容，浏览器主动限制前端访问数据。
**需要配置响应头告诉能允许访问资源**。



