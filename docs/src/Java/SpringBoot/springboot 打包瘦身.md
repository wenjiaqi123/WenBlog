```xml
<plugins>
            <!--SpringBoot 打包插件-->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <!--指定主类-->
                    <mainClass>com.example.dockertest.DockertestApplication</mainClass>

                    <!--指定命令行编码-->
                    <jvmArguments>-Dfile.encoding=UTF-8</jvmArguments>

                    <!--引入第三方jar包时,不添加则引入的第三方jar不会被打入jar包中-->
                    <includeSystemScope>true</includeSystemScope>

                    <layout>ZIP</layout>

                    <!--排除第三方jar文件-->
                    <includes>
                        <include>
                            <groupId>nothing</groupId>
                            <artifactId>nothing</artifactId>
                        </include>
                    </includes>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <!--打包-->
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>


            <!--Maven 打包依赖插件-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <!--<version>3.3.0</version>-->
                <executions>
                    <execution>
                        <id>copy-dependencies</id>
                        <phase>package</phase>
                        <goals>
                            <goal>copy-dependencies</goal>
                        </goals>
                        <configuration>
                            <!--指定输出目录-->
                            <outputDirectory>${project.build.directory}/lib</outputDirectory>
                            <!--是否排除传递性-->
                            <excludeTransitive>false</excludeTransitive>
                            <!--是否去掉 jar 包版本信息-->
                            <stripVersion>false</stripVersion>
                            <!--包含范围-->
                            <includeScope>runtime</includeScope>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

            <!--<plugin>-->
            <!--    <groupId>org.apache.maven.plugins</groupId>-->
            <!--    <artifactId>maven-jar-plugin</artifactId>-->
            <!--    <version>3.3.0</version>-->
            <!--    <configuration>-->
            <!--        <archive>-->
            <!--            <manifest>-->
            <!--                &lt;!&ndash; 是否要把第三方jar加入到类构建路径 &ndash;&gt;-->
            <!--                <addClasspath>true</addClasspath>-->
            <!--                &lt;!&ndash; 外部依赖jar包的最终位置 &ndash;&gt;-->
            <!--                <classpathPrefix>lib/</classpathPrefix>-->
            <!--                &lt;!&ndash; 项目启动类 &ndash;&gt;-->
            <!--                <mainClass>com.example.dockertest.DockertestApplication</mainClass>-->
            <!--            </manifest>-->
            <!--        </archive>-->
            <!--        &lt;!&ndash;资源文件不打进jar包中，做到配置跟项目分离的效果&ndash;&gt;-->
            <!--        <excludes>-->
            <!--            &lt;!&ndash; 业务jar中过滤application.properties/yml文件，在jar包外控制 &ndash;&gt;-->
            <!--            <exclude>*.properties</exclude>-->
            <!--            <exclude>*.xml</exclude>-->
            <!--            <exclude>*.yml</exclude>-->
            <!--        </excludes>-->
            <!--    </configuration>-->
            <!--</plugin>-->
        </plugins>
```



![image-20231025142039272](https://attach.blog.wen7.online/202310251420467.png)