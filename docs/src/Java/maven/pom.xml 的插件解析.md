

## 常用插件

```xml
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
```

`spring-boot-maven-plugin` 是一个 Maven 插件，专为简化 Spring Boot 应用程序的构建和打包流程而设计。这个插件提供了一些关键功能，帮助开发者轻松将应用程序打包成可直接运行的 JARs 或 WARs，这些打包好的文件内嵌了 Tomcat, Jetty 或 Undertow 等 Servlet 容器，不需要外部的 Servlet 容器就可以运行。

以下是 `spring-boot-maven-plugin` 的一些主要功能：

1. **打包可执行 JAR/WAR 文件**：
   插件的 `repackage` 目标会自动创建一个包含所有依赖项的“über-JAR”，常被称为“fat JAR”。这意味着你可以通过一个命令（`java -jar yourapp.jar`）来运行你的应用程序，无需额外配置类路径。

2. **启动和停止应用程序**：
   插件允许你从 Maven 命令行或 IDE 中启动和停止你的 Spring Boot 应用程序，使得开发和测试更加方便。

3. **简化依赖管理**：
   插件能自动管理 Spring Boot 应用的依赖版本，确保不会发生冲突，以及所有的 Spring 组件都是相互兼容的版本。

4. **支持 Spring Boot 特性**：
   提供对 Spring Boot 特有功能的支持，例如产生可操作的信息指标、健康检查和外部化配置。

5. **集成 Spring Boot DevTools**：
   支持与 Spring Boot DevTools 集成，提供快速重载等开发时特性。

6. **定制构建**：
   允许开发者通过配置添加或排除特定资源，调整最终构建的 JAR 或 WAR 文件。

7. **支持不同打包布局**：
   可根据不同的部署需求，支持多种打包布局选项，如传统布局、ZIP 布局（适用于某些类型的云平台服务）等。

如果你正在使用 Spring Boot 开发项目，那么 `spring-boot-maven-plugin` 几乎是必备的，它提供了一个高度自动化且符合 Spring Boot 最佳实践的构建过程。它大幅减少了项目构建复杂性，并提供了一致的开发体验。



```xml
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
            </plugin>
```

`maven-dependency-plugin` 是一个 Maven 插件，它提供了一系列功能来操作和管理项目的依赖项。这个插件可以帮助你在构建过程中执行多种与依赖相关的任务，例如：

1. **分析依赖关系**：检查项目依赖树以发现潜在的问题或不一致性。
2. **复制依赖**：将项目的依赖项复制到特定目录中，这对于创建需要隔离依赖的应用程序包非常有用。
3. **解压依赖**：将依赖项的 JAR 文件解压到指定目录，方便访问和检查其中的内容。
4. **获取未解决的依赖**：列出项目的所有未解决的依赖项。
5. **构建类路径**：创建并输出项目依赖的完整类路径字符串。

其中一个常用的目标是 `copy-dependencies`，它会将项目所依赖的所有 JAR 文件复制到指定目录下。这在创建库文件集或者需要将依赖分开打包时非常有用。

例子 — 将所有依赖复制到 `target/dependency` 目录下：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-dependency-plugin</artifactId>
            <version>3.1.2</version> <!-- Use the appropriate version -->
            <executions>
                <execution>
                    <id>copy-dependencies</id>
                    <phase>prepare-package</phase>
                    <goals>
                        <goal>copy-dependencies</goal>
                    </goals>
                    <configuration>
                        <outputDirectory>${project.build.directory}/dependency</outputDirectory>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

运行 `mvn package` 或相应命令后，你会在 `target/dependency` 目录中找到所有的依赖 JAR 文件。

须注意，`maven-dependency-plugin` 并不能直接生成 Spring Boot 风格的可执行 JAR，它更多用于各类依赖项管理和操作，而最终的打包仍旧依赖于 `maven-jar-plugin`、`maven-war-plugin` 或 `spring-boot-maven-plugin` 等插件。