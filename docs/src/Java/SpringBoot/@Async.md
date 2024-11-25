# @Async

## 源码

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Reflective
public @interface Async {
    String value() default "";
}
```

- ElementType.METHOD  可以加在方法上

  - ```java
        /**
         * 加在方法上,表示该方法为异步方法
         * i = 5,
         * 如果没有 @Async 注解,该方法需要执行 5 秒之后才能返回,然后才能执行下一步
         * 如果添加 @Async 注解,该方法立刻返回,主线程立刻可以执行下一步
         */
        @Async
        public void uploadFile(Long i) {
    
            for (int j = 0; j < i; j++) {
    
                try {
                    TimeUnit.SECONDS.sleep(1);
                    System.out.println("当前时间: " + DateUtils.yyyy_MM_dd_hh_mm_ss());
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
    
            }
    
        }
    ```

- ElementType.TYPE 可以加在类上

  - 加在类上，表示该类中所有方法都是异步方法



## 是否有返回值

### 无返回值

```java
/**
 * 使用示例:
 * System.out.println(" == start == ");
 * asyncDemoService.uploadFile(5);
 * System.out.println(" == end == ");
 *
 * 执行结果:
 *  == start == 
 *  == end == 
 * 当前时间: 2023_07_18_06_29_05
 * 当前时间: 2023_07_18_06_29_06
 * 当前时间: 2023_07_18_06_29_07
 * 当前时间: 2023_07_18_06_29_08
 * 当前时间: 2023_07_18_06_29_09
 */
@Async
public void uploadFile(Long i) {

    for (int j = 0; j < i; j++) {

        try {
            TimeUnit.SECONDS.sleep(1);
            System.out.println("当前时间: " + DateUtils.yyyy_MM_dd_hh_mm_ss());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

}
```

- 解析：如果不加 @Async，主线程先打印 == start ==，调用 uploadFile 方法，等待5秒钟方法执行结束





### 有返回值

```java
/**
 * 使用 CompletableFuture 作为返回值,可以在异步方法执行完成之后,获取到返回值
 * 使用示例:
 * CompletableFuture<String> future = asyncDemoService.sendEmail(5L);
 * String str = future.get();       //等待结束获取返回值
 * future.thenAccept(value->{});    //异步执行完成之后的回调
 */
@Async
public CompletableFuture<String> sendEmail(Long i) {

    for (int j = 0; j < i; j++) {

        try {
            TimeUnit.SECONDS.sleep(1);
            System.out.println("当前时间: " + DateUtils.yyyy_MM_dd_hh_mm_ss());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    CompletableFuture<String> futureResult = new CompletableFuture<>();
    futureResult.complete("发送邮件成功");
    return futureResult;
}
```

- 