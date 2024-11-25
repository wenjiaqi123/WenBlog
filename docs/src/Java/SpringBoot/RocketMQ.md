# SpringBoot 整合 RocketMQ

```xml
        <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-spring-boot-starter</artifactId>
            <version>2.3.1</version>
        </dependency>
```

使用这个而不是 rocket-client, 上面的依赖 springboot 整合度较高



```yaml
rocketmq:
#  name-server: ubuntu.server.wen7.online:9876
  name-server: 192.168.106.25:9876
  producer:
    group: test-topic
    send-message-timeout: 3000
    max-message-size: 4096
    retry-times-when-send-async-failed: 2
  consumer:
    group: test-topic
```

```java
package com.hailoworld.controller;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.remoting.exception.RemotingException;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

/**
 * @Author: wen7
 */
@RestController
@RequestMapping(value = "/hello", name = "")
@Slf4j
public class HelloController {

    @Autowired
    private RocketMQTemplate rocketMQTemplate;


    @GetMapping("/test1")
    public String test(String message) {
        Message<String> msg = MessageBuilder.withPayload(message).build();
        rocketMQTemplate.send("test-topic", msg);
        log.info("消息发送成功");
        return "消息发送成功";
    }

}
```



```java
import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.springframework.stereotype.Service;

/**
 * @Author: wen7
 */
@Service
@RocketMQMessageListener(topic = "test-topic", consumerGroup = "${rocketmq.consumer.group}")
public class TestTopic implements RocketMQListener<String>{

    @Override
    public void onMessage(String s) {
        System.out.println("接收到消息：" + s);
    }

}
```

