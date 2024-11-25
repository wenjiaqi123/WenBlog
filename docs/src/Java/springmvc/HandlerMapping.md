HandlerMapping
===

- 处理器映射器
    - Handler 处理器
    - Mapping 映射器
- 主要功能是将 Http 请求，映射到具体的某个类中的某个方法



接口
---

```java
public interface HandlerMapping {
	String BEST_MATCHING_HANDLER_ATTRIBUTE = HandlerMapping.class.getName() + ".bestMatchingHandler";
	@Deprecated
	String LOOKUP_PATH = HandlerMapping.class.getName() + ".lookupPath";
	String PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE = HandlerMapping.class.getName() + ".pathWithinHandlerMapping";
	String BEST_MATCHING_PATTERN_ATTRIBUTE = HandlerMapping.class.getName() + ".bestMatchingPattern";
	String INTROSPECT_TYPE_LEVEL_MAPPING = HandlerMapping.class.getName() + ".introspectTypeLevelMapping";
	String URI_TEMPLATE_VARIABLES_ATTRIBUTE = HandlerMapping.class.getName() + ".uriTemplateVariables";
	String MATRIX_VARIABLES_ATTRIBUTE = HandlerMapping.class.getName() + ".matrixVariables";
	String PRODUCIBLE_MEDIA_TYPES_ATTRIBUTE = HandlerMapping.class.getName() + ".producibleMediaTypes";

	default boolean usesPathPatterns() {
		return false;
	}
    
	/**
	* 根据 HttpServletRequest 获取 处理器执行链
	* 何为处理器执行链? 包括请求的处理器和拦截器等
	*/
	@Nullable
	HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception;
}
```



实现类
---

![image-20220520101306246](https://attach.blog.wen7.online/image-20220520101306246.png)



DispatcherServlet 初始化
---

```java
private void initHandlerMappings(ApplicationContext context) {
    //设置 处理器映射器 为空
    this.handlerMappings = null;
	//如果已经发现有 处理器映射器
    if (this.detectAllHandlerMappings) {
        // Find all HandlerMappings in the ApplicationContext, including ancestor contexts.
        Map<String, HandlerMapping> matchingBeans =
            BeanFactoryUtils.beansOfTypeIncludingAncestors(context, HandlerMapping.class, true, false);
        if (!matchingBeans.isEmpty()) {
            this.handlerMappings = new ArrayList<>(matchingBeans.values());
            // We keep HandlerMappings in sorted order.
            AnnotationAwareOrderComparator.sort(this.handlerMappings);
        }
    }
 	//如果还没发现 处理器映射器
    else {
        try {
            HandlerMapping hm = context.getBean(HANDLER_MAPPING_BEAN_NAME, HandlerMapping.class);
            this.handlerMappings = Collections.singletonList(hm);
        }
        catch (NoSuchBeanDefinitionException ex) {
            // Ignore, we'll add a default HandlerMapping later.
        }
    }

    // Ensure we have at least one HandlerMapping, by registering 通过注册，确保至少有一个HandlerMapping
    // a default HandlerMapping if no other mappings are found.如果找不到其他映射，则为默认HandlerMapping。
    if (this.handlerMappings == null) {
        //如果 处理器映射器为空, 则使用默认策略
        this.handlerMappings = getDefaultStrategies(context, HandlerMapping.class);
        if (logger.isTraceEnabled()) {
            logger.trace("No HandlerMappings declared for servlet '" + getServletName() +
                         "': using default strategies from DispatcherServlet.properties");
        }
    }

    for (HandlerMapping mapping : this.handlerMappings) {
        if (mapping.usesPathPatterns()) {
            this.parseRequestPath = true;
            break;
        }
    }
}
```

