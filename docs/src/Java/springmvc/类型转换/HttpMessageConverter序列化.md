HttpMessageConverter序列化
===

为什么框架能够将前端的传过来的 json 数据转成后端的 java 对象，又如何将后端的 java 对象转成 json 数据返回给前端的呢？

我们是没有做 Json 转换处理的工作的，其实是 SpringMVC 框架中的==消息转换器 HttpMessageConverter== 在起作用！



接口 HttpMessageConverter
---

```java
public interface HttpMessageConverter<T> {
    // 判断前端传过来的 媒体类型 数据能否转成后端的 java 对象，可以点进 MediaType 查看有哪些媒体类型，现在一般都使用 application/json
    boolean canRead(Class<?> var1, @Nullable MediaType var2);
	// 判断后端返回的对象，能否转成 媒体类型 数据
    boolean canWrite(Class<?> var1, @Nullable MediaType var2);

    // 如果判断是真，就进行转换
    T read(Class<? extends T> var1, HttpInputMessage var2) throws IOException, HttpMessageNotReadableException;
  	// 如果判断是真，就进行转换
    void write(T var1, @Nullable MediaType var2, HttpOutputMessage var3) throws IOException, HttpMessageNotWritableException;
}
```

该接口定义了消息转换器的几个方法：

- 接收到请求时判断是否能读（canRead），能读则读（read）
- 返回请求时判断是否能写（canWrite），能写则写（write）
- 获取支持的媒体类型 MediaType，所谓媒体类型就是（application/json 子类的）



缺省配置
---

在我们直接创建框架的时候，就直接可以序列化了，是因为已经配置了一些默认的 Converter 转换器。

查看 HttpMessageConverter 的实现类，这是框架帮我们默认搞了一些实现类

![image-20220510150905513](https://attach.blog.wen7.online/image-20220510150905513.png)



在 WebMvcConfigurationSupport 类中 addDefaultHttpMessageConverters 方法，帮我们注入了一些默认的转换器

![image-20220510151400788](https://attach.blog.wen7.online/image-20220510151400788.png)



加强默认转换器
---





替换掉默认转换器
---