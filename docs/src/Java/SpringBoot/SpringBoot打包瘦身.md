# SpringBoot 打包瘦身



```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.hailoworld.SpringbootPackageApplication</mainClass>  <!-- 指定启动类 -->
                    <jvmArguments>-Dfile.encoding=UTF-8</jvmArguments>  <!-- 指定编码 -->
                    <layout>ZIP</layout> <!-- 打包成zip格式 -->
                    <includes>
                        <include>
                            <groupId>non-exists</groupId>
                            <artifactId>non-exists</artifactId>
                        </include>
                    </includes>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <version>3.1.1</version>
                <executions>
                    <execution>
                        <id>copy-dependencies</id>
                        <phase>package</phase>
                        <!--关联指定生命周期的目标-->
                        <goals>
                            <goal>copy-dependencies</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>${project.build.directory}/lib</outputDirectory> <!--将依赖拷贝到项目构建目录的lib下-->
                            <excludeTransitive>false</excludeTransitive> <!--是否排除传递性-->
                            <stripVersion>false</stripVersion> <!--是否去掉jar包版本信息-->
                            <includeScope>runtime</includeScope> <!--包含范围：拷贝运行时的依赖，例如测试的就不需要了-->
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

![image-20240430102056367](https://attach.blog.wen7.online/20240430102056.png)



```shell
Java -jar -Dloader.path=./lib  SpringBoot-package-0.0.1.SNAPSHOT.jar
```

![image-20240430102126322](https://attach.blog.wen7.online/20240430102126.png)
