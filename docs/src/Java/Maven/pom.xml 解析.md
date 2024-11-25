# pom.xml 解析

## 基本结构

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <!-- POM文件的模型版本-->
    <modelVersion>4.0.0</modelVersion>

    <!-- 父项目标识 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    
    <!-- 项目标识 -->
    <groupId>group-id</groupId>
    <artifactId>artifact-id</artifactId>
    <version>version</version>
    
    <!-- 打包方式 -->
    <packaging>jar</packaging>

    <!-- 项目名称和描述 -->
    <name>project-name</name>
    <description>project-description</description>

    <!-- 依赖 -->
    <dependencies>
        <!-- list of dependencies -->
    </dependencies>
    

    <!-- 构建 -->
    <build>
        <plugins>
            <!-- 插件列表 -->
        </plugins>
    </build>
</project>
```



### modelVersion

**pom.xml文件的必需元素之一，用于指定POM文件的模型版本。它的值是`4.0.0`，表示这是当前POM模型的版本。**

>什么是 POM 模型？
>
>POM模型是 Maven 中最基本的概念之一，定义了项目的基本元素，例如项目坐标、依赖关系、构建设置等。POM模型是 Maven 构建过程的核心，因此必须遵循正确的POM模型定义。
>
>简单来说，4.0.0 定义了项目坐标、依赖关系、构建设置的一些标签，内容等。



### parent

**用于指定当前模块的父模块，即继承自哪个模块的配置。父模块中定义的配置可以在当前模块中使用，避免重复定义相同的配置，提高了项目管理的效率**

```xml
<!-- 父项目坐标 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.0.5</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

这里的父模块是 Spring Boot 的起始依赖 `spring-boot-starter-parent`，版本号是 `3.0.5`。当前模块会继承父模块中定义的许多配置，如默认的依赖管理、插件管理、编译版本等等



#### 	relativePath

`relativePath` 是 `pom.xml` 文件相对于当前子模块的相对路径。当子模块的 `pom.xml` 文件与其父模块的 `pom.xml` 文件不在同一个目录下时，可以使用 `relativePath` 标签指定相对路径。如果当前的子模块的 `pom.xml` 文件和其父模块的 `pom.xml` 文件在同一个目录下，或者使用了默认的继承机制，则不需要指定 `relativePath`



### 项目坐标（项目标识符）

==项目都有一个唯一的标识符，由 groupId、artifactId 和 version 三个元素组成==

> 项目坐标？标识符？
>
> 如果在一个平面直角坐标系中定位一个点，只需要 x 轴和 y 轴，比如（10,20）
>
> 如果在一个空间直角坐标系中定位一个点，需要 x 轴 y 轴 z 轴，比如 （10,20,30）
>
> 如果对一个软件项目，想要定位一个项目，用什么定位呢？使用三个元素，groupId（公司标识符）artifactId（项目名称）version（版本号）

- groupId：表示项目所属的组织或公司的唯一标识符，通常是组织或公司的域名倒序排列。

  - > 如果是阿里巴巴的项目，<groupId>com.alibaba<groupId>
    >
    > 如果是腾讯的项目，<groupId>com.tencent<groupId>

- artifactId：表示项目的名称，也就是打包后的名称。

  - > 比如淘宝项目，<artifactId>taobao</artifactId>
    >
    > 比如天猫项目，<artifactId>tianmao</artifactId>

- version：项目的版本号。通常遵循 `major.minor.patch` 的形式，例如，`1.0.0`

  - > 比如淘宝第一版项目，<version>1.0.0</version>
    >
    > 比如淘宝第二版项目，<version>2.3.6</version>

    - > major.minor.patch 也被称为语义化版本号，是一种版本号的表示方式，通常用于软件开发中。
      >
      > - major 表示重大更新，通常会对现有功能进行较大的修改或添加新功能，且可能会导致向后不兼容。
      > - minor 表示次要更新，通常包含较小的功能更新和改进，但不会对现有功能进行大规模修改，向后兼容。
      > - patch 表示修补更新，通常只包含小的 bug 修复，不会添加新的功能或修改现有功能，向后兼容。
      >
      > 举个例子，假设某软件的版本号为 2.5.1，那么 2 表示 major，5 表示 minor，1 表示 patch，表示这个版本是一个次要更新，其中包含一些小的 bug 修复。
      >
      > 如果这个软件的下一个版本号是 3.0.0，那么这个版本是一个重大更新，可能包含一些重大的功能更新，也可能导致向后不兼容。



### packaging

**Maven POM 文件中的一个元素，用于指定 Maven 项目打包的方式。**

Maven 中，一个项目经过编译后会被打包成一个可执行的 JAR、WAR 或者其他类型的文件，这个文件就是打包的产物。`packaging` 元素指定了产物的类型，Maven 根据不同的 `packaging` 类型使用不同的打包方式。

常见的打包类型：

- `jar`: 普通 Java 应用程序，生成的是一个 JAR 文件。
- `war`: Web 应用程序，生成的是一个 WAR 文件。
- `pom`: 没有实际产物，只是用于定义依赖关系和版本号等信息。
- `ear`: 企业级 Java 应用程序，生成的是一个 EAR 文件。
- `maven-plugin`: Maven 插件，生成的是一个 JAR 文件，并包含一个特殊的插件描述文件。



### name 和 description

**name 和 description 元素都是用于描述项目的信息。**

- name 元素是项目的名称，通常用于标识项目，显示在用户界面或其他文档中。
- description 元素是对项目的简要描述，通常用于提供更详细的项目信息，比如描述项目的目的、功能、用途等等。它可以帮助其他开发人员和用户更好地理解和使用项目

> 这两个元素都是可选的，但通常建议添加它们，以便更好地描述项目



### dependencies

**pom.xml 文件中的一个标签，用于声明项目的依赖项，包括所依赖的其他Maven项目、外部库以及其他项目提供的 jar 包等**

当构建Maven项目时，Maven会自动下载这些依赖项并将其添加到项目的 classpath 中，以确保项目在编译和运行时都可以正确地使用这些依赖项。这样可以大大简化开发过程中的依赖项管理，避免手动下载和管理依赖项带来的繁琐。

```xml
<dependencies>    
    <!-- MySQL 驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.32</version>
    </dependency>
    
    <!-- 二维码 -->
    <dependency>
        <groupId>com.google.zxing</groupId>
        <artifactId>core</artifactId>
        <version>3.4.1</version>
    </dependency>
    
    
    <!-- ...... 其他依赖 -->
</dependencies>
```

> 上面的案例，说明这个项目就依赖了2个其他包，mysql驱动和二维码，别人有关二维码的开发已经很好了，我们只要调用这个包里的一些方法，稍微组装配置一下，就可以直接生成二维码了，简化项目开发。
>
> ==调包侠==：通常是指擅长在编程中使用现成的代码库和框架，而不是自己编写复杂的算法或功能实现的程序员。他们在开发中能够快速地解决问题，提高工作效率，但有时也会被批评缺乏深入的技术理解和实践经验。



### properties

**properties标签 允许指定一组属性，并且在整个 POM 文件中可以重用这些属性。这样做的好处是可以避免在整个 POM 文件中反复硬编码相同的值，同时也可以方便地统一管理一些常用的配置项**

```xml
<project>

    <properties>
        <!--    定义统一参数    -->
        <java.version>17</java.version>
        <dashabi>UTF-8</dashabi>
    </properties>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.8.1</version>
        <configuration>
          <source>${java.version}</source>
          <target>${java.version}</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

上述例子，定义了2个变量，java.version 和 dashabi，在其他地方引用的时候，使用 `${java.version}`  和 `${dashabi}`方式引用，这样以后要是修改 java.version 就只要修改 properties 标签里的版本就可以了。

**properties 里面的标签名随便定义，你甚至可以定义名为 dashabi 的标签，当然实际项目我们定义正规一点，比如 java.version**





### build

**该标签包含了一些用来构建项目的配置，比如编译器的版本，编译参数，以及一些插件的配置等**

#### 示例

```xml
<build>
  <finalName>myproject</finalName>
  <sourceDirectory>src/main/java</sourceDirectory>
  <testSourceDirectory>src/test/java</testSourceDirectory>
    
  <resources>
    <resource>
      <directory>src/main/resources</directory>
      <filtering>true</filtering>
    </resource>
  </resources>
    
  <testResources>
    <testResource>
      <directory>src/test/resources</directory>
    </testResource>
  </testResources>
    
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-compiler-plugin</artifactId>
      <version>3.8.1</version>
      <configuration>
        <source>1.8</source>
        <target>1.8</target>
      </configuration>
    </plugin>
  </plugins>
    
</build>
```

#### finalName

**指定项目构建输出的文件名，默认值为`${artifactId}-${version}`**

这里的 `${artifactId}` 和 `${version}` 是通过 ${} 找到 <artifactId> 和 <version> 两个标签，并且引用该标签值



#### sourceDirectory

**指定项目源代码所在目录的路径，默认值为`src/main/java`**



#### testSourceDirectory

**指定测试代码所在目录的路径，默认值为`src/test/java`**



#### resources

**指定项目资源文件所在目录，默认值为`src/main/resources`。可以使用`<resource>`标签来进一步配置资源文件**

```xml
    <!--构建资源-->
    <resources>
        <!--编译 src/main/Java 下的 xml 文件-->
        <!--可以将UserMapper.xml等文件写在 src/main/Java/dao 目录,与接口放一起,可以通过此步骤编译,如果根据约定放在 resources 下是不需要的-->
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.xml</include>
                <include>**/*.properties</include>
                <include>**/*.yml</include>
                <include>**/*.html</include>
            </includes>
        </resource>
    </resources>
```



#### testResources

**测试资源文件所在目录，默认值为`src/test/resources`。可以使用`<testResource>`标签来进一步配置测试资源文件**



#### plugins



### repositories

**该标签用于定义 Maven 项目从哪些远程仓库中获取依赖。当 Maven 需要下载某个依赖时，会按照顺序在 `repositories` 标签中定义的仓库中搜索，直到找到该依赖或者搜索到最后一个仓库为止。**

在一个项目里我们可能会用到 mysql 依赖，二维码依赖，A依赖，B依赖，这些依赖不一定在一个仓库源中，所以需要配置仓库源

#### 基本结构

```xml
<repositories>
    
  <!-- 仓库源 -->  
  <repository>
    <id>repo-id</id>
    <url>repo-url</url>
    <snapshots>
      <enabled>true|false</enabled>
    </snapshots>
    <releases>
      <enabled>true|false</enabled>
    </releases>
  </repository>
    
  <!-- 其他仓库 -->
  <repository>
	
  </repository>
</repositories>
```



#### 默认中央仓库

Maven 默认的中央仓库地址为 https://repo.maven.apache.org/maven2/ ，可以在 Maven 的 settings.xml 文件中进行配置。若未配置，则默认从中央仓库获取依赖。



#### repository

一个 repositories 里可以配置多个 repository，即配置多个仓库源。

> id 用于在 pom.xml 中标识该仓库，这个 id 你可以随意指定，甚至可以叫 <id>dashabi</id>  ，但是一个 pom文件里这个id 只能有一个，通常建议起一个具有辨识度的名称，比如中央仓库 central

> url 表示仓库地址

> snapshots 配置仓库中快照版本的行为

> releases 用于配置发布版本的仓库

- snapshots 和 releases

  - 在 Maven 的仓库中，通常有两个类型的依赖包：稳定版（release）和快照版（snapshot）。
    - 快照版则是指处于开发阶段的版本，可能会有一些新功能或者修复了一些 bug，但是可能还未经过完整的测试
    - 稳定版是指经过测试、已经发布并且稳定可用的版本，通常不会再进行更改

  - `<snapshots>` 标签中包含以下元素：
    - `<enabled>`：指定是否启用快照版本，**默认值为 true，启用快照版本，并且每天检查更新**。
    - `<updatePolicy>`：指定在构建过程中检查更新的频率。可选值包括 `always`（总是检查更新）、`daily`（每天检查更新）和`never`（永远不检查更新）。
    - `<checksumPolicy>`：指定在下载快照版本时校验文件校验和的方式。可选值包括 `fail`（校验失败时停止构建）和`warn`（校验失败时继续构建，但输出警告信息）。
  - `<releases>`标签中包含以下元素：
    - `<enabled>`：指定是否启用稳定版本，**默认值为 true**。

  





















