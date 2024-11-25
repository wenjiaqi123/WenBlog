DispatcherServlet 前端控制器
===

- 前端控制器
    - Dispatcher 调度器，分发器
    - Servlet = Server + Applet 服务端小程序
- 

```xml
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-parent</artifactId>
<version>3.0.5</version>

<!-- org.springframework:spring-webmvc:6.0.7 -->
```



```java
public class DispatcherServlet extends FrameworkServlet {
    //常量字段
    //对象属性
    
    //构造器
    
    //方法
}
```

属性
---

### 常量字段

```java
// 9个常量属性
public static final String MULTIPART_RESOLVER_BEAN_NAME = "multipartResolver";
public static final String LOCALE_RESOLVER_BEAN_NAME = "localeResolver";
public static final String THEME_RESOLVER_BEAN_NAME = "themeResolver";
public static final String HANDLER_MAPPING_BEAN_NAME = "handlerMapping";
public static final String HANDLER_ADAPTER_BEAN_NAME = "handlerAdapter";
public static final String HANDLER_EXCEPTION_RESOLVER_BEAN_NAME = "handlerExceptionResolver";
public static final String REQUEST_TO_VIEW_NAME_TRANSLATOR_BEAN_NAME = "viewNameTranslator";
public static final String VIEW_RESOLVER_BEAN_NAME = "viewResolver";
public static final String FLASH_MAP_MANAGER_BEAN_NAME = "flashMapManager";

//
public static final String WEB_APPLICATION_CONTEXT_ATTRIBUTE = DispatcherServlet.class.getName() + ".CONTEXT";
public static final String LOCALE_RESOLVER_ATTRIBUTE = DispatcherServlet.class.getName() + ".LOCALE_RESOLVER";
public static final String THEME_RESOLVER_ATTRIBUTE = DispatcherServlet.class.getName() + ".THEME_RESOLVER";
public static final String THEME_SOURCE_ATTRIBUTE = DispatcherServlet.class.getName() + ".THEME_SOURCE";
public static final String INPUT_FLASH_MAP_ATTRIBUTE = DispatcherServlet.class.getName() + ".INPUT_FLASH_MAP";
public static final String OUTPUT_FLASH_MAP_ATTRIBUTE = DispatcherServlet.class.getName() + ".OUTPUT_FLASH_MAP";
public static final String FLASH_MAP_MANAGER_ATTRIBUTE = DispatcherServlet.class.getName() + ".FLASH_MAP_MANAGER";
public static final String EXCEPTION_ATTRIBUTE = DispatcherServlet.class.getName() + ".EXCEPTION";

public static final String PAGE_NOT_FOUND_LOG_CATEGORY = "org.springframework.web.servlet.PageNotFound";
private static final String DEFAULT_STRATEGIES_PATH = "DispatcherServlet.properties";
private static final String DEFAULT_STRATEGIES_PREFIX = "org.springframework.web.servlet";

//日志
protected static final Log pageNotFoundLogger = LogFactory.getLog(PAGE_NOT_FOUND_LOG_CATEGORY);
```

### 对象字段

```java
private static Properties defaultStrategies;

//九大组件
private MultipartResolver multipartResolver;
private LocaleResolver localeResolver;
private ThemeResolver themeResolver;
private List<HandlerMapping> handlerMappings;
private List<HandlerAdapter> handlerAdapters;
private List<HandlerExceptionResolver> handlerExceptionResolvers;
private RequestToViewNameTranslator viewNameTranslator;
private FlashMapManager flashMapManager;
private List<ViewResolver> viewResolvers;
```

### 布尔字段

```java
private boolean detectAllHandlerMappings = true;
private boolean detectAllHandlerAdapters = true;
private boolean detectAllHandlerExceptionResolvers = true;
private boolean detectAllViewResolvers = true;

private boolean throwExceptionIfNoHandlerFound = false;
private boolean cleanupAfterInclude = true;

private boolean parseRequestPath;
```



构造器
---

### 空构造

```java
public DispatcherServlet() {
    super();
    setDispatchOptionsRequest(true);
}
```

### 有参构造

```java
public DispatcherServlet(WebApplicationContext webApplicationContext) {
    super(webApplicationContext);
    setDispatchOptionsRequest(true);
}
```



方法
---

```java
    /**
     * 初始化策略
     * @param context
     */
    protected void initStrategies(ApplicationContext context) {
        this.initMultipartResolver(context);            //初始化上传文件解析器
        this.initLocaleResolver(context);               //初始化本地化解析器
        this.initThemeResolver(context);                //初始化主题解析器
        this.initHandlerMappings(context);              //初始化处理器映射器
        this.initHandlerAdapters(context);              //初始化处理器适配器
        this.initHandlerExceptionResolvers(context);    //初始化处理器异常解析器
        this.initRequestToViewNameTranslator(context);  //初始化请求到视图名称解析器     【前后端分离,该解析器使用场景很少】
        this.initViewResolvers(context);                //初始化视图解析器             【前后端分离,该解析器使用场景很少】
        this.initFlashMapManager(context);              //初始化 flash 映射管理器      【flash映射管理器使用也较少】
    }
```

- 该方法在 WebApplicationContext 初始化后执行，自动扫描上下文的 Bean，根据名称或者类型 查找组件
  - 如果没有找到会去 `DispatcherServlet` 同级目录下查找 `DispatcherServlet.properties` 配置文件中的组件
  - 如果 MVC 发现上下文中有用户自定义组件，则使用 自定义组件
- 九大组件：
  - 本地化解析器：只允许1个实例
  - 主题解析器：只允许1个实例
  - 视图名称解析器：只允许1个实例
  - 文件上传解析器：只允许1个实例
  - FlashMap 映射管理器：只允许1个实例
  - 
  - 处理器映射器：允许多个实例
  - 处理器适配器：允许多个实例
  - 处理器异常解析器：允许多个实例
  - 视图解析器：允许多个实例
  - 
  - **同一组件有多个实例，这些组件都实现了 org.springframework.core.Ordered 接口，优先级顺序 根据 Order 属性决定**



 

























