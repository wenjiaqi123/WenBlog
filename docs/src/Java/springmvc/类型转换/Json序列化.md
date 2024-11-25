自定义序列化规则
===

```java
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class LocalDateTimeJsonSerializer extends JsonSerializer<LocalDateTime> {
    public static final LocalDateTimeJsonSerializer instance = new LocalDateTimeJsonSerializer();

    @Override
    public void serialize(LocalDateTime value, JsonGenerator jsonGenerator, SerializerProvider sp) throws IOException {
        ZoneId zone = ZoneId.systemDefault();
        Instant instant = value.atZone(zone).toInstant();
        Date date = Date.from(instant);

        jsonGenerator.writeNumber(date.getTime());
    }

}
```

```java
import com.example.interceptor.GlobalInterceptor;
import com.example.json.serializer.LocalDateTimeJsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@EnableWebMvc //默认使用
@Configuration
@Component
public class WebConfig implements WebMvcConfigurer {
    @Resource
    private GlobalInterceptor globalInterceptor;

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();

        ObjectMapper om = new ObjectMapper();

        //处理数值类
        SimpleModule numberModule = new SimpleModule();
        numberModule.addSerializer(Long.class, ToStringSerializer.instance); //解决后端Long传给前端精度丢失问题
        numberModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        om.registerModule(numberModule);


        //处理日期类
        SimpleModule dateModule = new SimpleModule();
        numberModule.addSerializer(LocalDateTime.class, LocalDateTimeJsonSerializer.instance);
        om.registerModule(dateModule);


        converter.setObjectMapper(om);
        converters.add(converter);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //添加拦截器
        InterceptorRegistration ir = registry.addInterceptor(globalInterceptor);
        /**
         * 配置拦截规则
         */
        ir.addPathPatterns("/**");
    }
}
```

