# EasyCode

工作中使用 mybatis 重复写 crud 很枯燥无聊，使用 EasyCode 一键生成所需格式

[官方文档](https://gitee.com/makejava/EasyCode/wikis/pages)



## 插件下载安装



## 语法说明

先准备一张表 

```sql
user{
	id,
	user_name,
	age,
	status,
	show_order,
	create_time
}
```

### 注释

使用 2 个 # 号，开始注释

```markdown
## 我是注释
```



### 变量

- 变量的设置

    - ```
        #set($变量名 = 变量值)
        ```

- 变量的使用

    - ```
        $!{变量名}
        ```

如果设置一个变量 tableName，示例：#set($tableName =  这里是需要填写的变量的值 )



### 属性

```markdown
$author 		设置中的作者 java.lang.String
$encode 		设置的编码 java.lang.String
$modulePath 	选中的module路径 java.lang.String
$projectPath 	项目绝对路径 java.lang.String
```



### 表对象

```markdown
$tableInfo 表对象
        obj		表原始对象 				  com.intellij.database.model.DasTable
        name 	表名（转换后的首字母大写）	 java.lang.String
        comment 表注释 				 	java.lang.String
        fullColumn 所有列 				  	java.util.List<ColumnInfo>
        pkColumn 主键列 				    java.util.List<ColumnInfo>
        otherColumn 其他列 				java.util.List<ColumnInfo>,除主键以外的列
        savePackageName 保存的包名 		   java.lang.String
    ****savePath 保存路径 				    java.lang.String【就是我们面板选择的路径 com.example】
        saveModelName 保存的model名称 	   java.lang.String
	columnInfo 列对象
        obj 列原始对象 					   com.intellij.database.model.DasColumn
        name 列名（首字母小写） 				java.lang.String
        comment 列注释 					java.lang.String
        type 列类型（类型全名） 				java.lang.String
        shortType 列类型（短类型）		 	java.lang.String
        custom 是否附加列 				  java.lang.Boolean
        ext 附加字段（Map类型） 			java.lang.Map<java.lang.String, java.lang.Object>
        
$tableInfoList 	所有选中的表			 java.util.List<TableInfo>
$importList 所有需要导入的包集合 		  java.util.Set<java.lang.String>
```

如果想获得表名 **$tableInfo.name** 即可获得字符串 SysMenu，（假设数据库表名为 SYS_MENU 或 sys_menu）

如果想对表名拼接成  BaseSysMenuDao，可结合工具 $tool ，使用 **$tool.append("Base",$tableInfo.name,"Dao")** 即可获得字符串 BaseSysMenuDao

```markdown
假设数据有表名为 SYS_MENU ,主键字段 SYS_MENU_ID
我们在代码中可能比较常用的 SysMenu sysMenu = new SysMenu();  或者命名方法名 selectSysMenuBySysMenuId
根据上述代码可得
$!{PojoName}	SysMenu
$!{pojoName}	sysMenu
$!{Id}			SysMenuId
$!{id}			sysMenuId
$!{idType}		主键类型 Integer或者Long等
```



### 工具

```markdown
$tool
        firstUpperCase(String name) 			首字母大写方法
        firstLowerCase(String name) 			首字母小写方法
        getClsNameByFullName(String fullName) 	通过包全名获取类名
        getJavaName(String name) 				将下划线分割字符串转驼峰命名(属性名)
        getClassName(String name) 				将下划线分割字符串转驼峰命名(类名)
        hump2Underline(String str) 				将驼峰字符串转下划线字符串
        append(Object... objs) 					多个数据进行拼接
        newHashSet(Object... objs) 				创建一个HashSet对象
        newArrayList(Object... objs) 			创建一个ArrayList对象
        newLinkedHashMap() 						创建一个LinkedHashMap()对象
        newHashMap() 							创建一个HashMap()对象
        getField(Object obj, String fieldName) 	获取对象的属性值,可以访问任意修饰符修饰的属性.配合debug方法使用.
        call(Object... objs) 					空白执行方法,用于调用某些方法时消除返回值
        debug(Object obj) 						调式方法,用于查询对象结构.可查看对象所有属性与public方法
        serial() 								随机获取序列化的UID
        service(String serviceName, Object... param)	远程服务调用
        parseJson(String) 						将字符串转Map对象
        toJson(Object, Boolean) 				将对象转json对象，Boolean：是否格式化json，不填时为不格式化。
        toUnicode(String, Boolean) 				将String转换为unicode形式，Boolean：是否转换所有符号，不填时只转换中文及中文符号。    
$time
        currTime(String format) 获取当前时间，指定时间格式（默认：yyyy-MM-dd HH:mm:ss）     
$generateService
        run(String, Map<String,Object>) 代码生成服务，参数1：模板名称，参数2：附加参数。
```



### 回调函数

```markdown
&callback  
		setFileName(String) 设置文件储存名字
        setSavePath(String) 设置文件储存路径，默认使用选中路径
```



## 相关链接

暂无



## 相关文件

### 常用自定义字段

假设有数据局表名为 SYS_MENU，主键字段为 SYS_MENU_ID，字段类型为 bigint，转成 java 字段类型为 Long

```shell
## 设置PojoName=【SysMenu】,设置pojoName=【sysMenu】
#set($PojoName = $tableInfo.name)
#set($pojoName = $tool.firstLowerCase($tableInfo.name))
## 设置Table_Name=【SYS_MENU】
#set($Table_Name = $!{tableInfo.obj.name})

## 设置类名ClassName=【SysMenuPo】
#set($ClassName = $tool.append($PojoName, "Po"))

## 获得主键,比较固定的写法,pk是为了下面获取主键类型和主键字段名
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end
## 设置主键Id=【SysMenuId】,设置主键id=【sysMenuId】
#set($Id = $tool.firstUpperCase($pk.name))
#set($id = $pk.name)
## 数据库主键字段 pkName=【SYS_MENU_ID】
#set($pkName = $!pk.obj.name)
## 获取主键类型idType=【Long】
#set($idType = $!pk.shortType)

## 设置回调,设置文件保存名称 【SysMenuPo.Java】
$!callback.setFileName($tool.append($ClassName, ".java"))
## 设置回调,设置文件保存位置 【com.example.po】, 其中$tableInfo.savePath是我们面板选择的路径 com.example
$!callback.setSavePath($tool.append($tableInfo.savePath, "/po"))

## 设置包名, 【package com.example.po】
#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}po;

## 设置文件里需要导入的包
import org.springframework.beans.factory.annotation.Autowired;
import Java.util.List;
```

我们在代码中可能比较常用的 SysMenu sysMenu = new SysMenu();  或者命名方法名 selectSysMenuBySysMenuId 可以根据以上定义的变量自行拼接

```markdown
## 在类中可以引用变量直接拼接
$!{PojoName}	SysMenu
$!{pojoName}	sysMenu
$!{Table_Name}	SYS_MENU/sys_menu	(mysql中不区分大小写)
$!{ClassName}	SysMenuPo
$!{Id}			SysMenuId
$!{id}			sysMenuId
$!{pkName}		sys_menu_id/SYS_MENU_ID	  (mysql中不区分大小写)
$!{idType}		Long

## 自定义拼接
$!{PojoName} $!{pojoName} = new $!{PojoName};	== 	SysMenu sysMenu = new SysMenu(); 
select$!{PojoName}By$!{Id}($!{idType} $!{id});	==	selectSysMenuBySysMenuId(Long sysMenuId);

select #allSqlColumn()				==	select 所有字段
from $!{Table_Name}					==	from SYS_MENU
where $!{pkName} = #{$!{id}}		==	where SYS_MENU_ID = #{sysMenuId}
```

### entity

注意修改 回调函数保存文件位置和设置包名

`$!callback.setSavePath($tool.append($tableInfo.savePath, "/==entity=="))`

`#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}==entity==;`

```markdown
## 引入宏定义
$!define

#set($PojoName = $tableInfo.name)
#set($pojoName = $tool.firstLowerCase($tableInfo.name))
#set($ClassName = $tool.append($PojoName, ""))				←←←←←注意修改

#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end
#set($Id = $tool.firstUpperCase($pk.name))
#set($id = $pk.name)
#set($idType = $!pk.shortType)


## 设置回调,设置文件保存名称,设置文件保存位置
$!callback.setFileName($tool.append($ClassName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/entity"))					←←←←←注意修改

## 设置包名, 【package com.example.po】
#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}entity;     	←←←←←注意修改

## 设置文件里需要导入的包
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

## 使用全局变量实现默认包导入
$!autoImport
import java.io.Serializable;

##使用宏定义实现类注释信息
#tableComment("实体类")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class $!{ClassName} implements Serializable {
    private static final long serialVersionUID = $!tool.serial();
#foreach($column in $tableInfo.fullColumn)
    #if(${column.comment})/**
    * ${column.comment}
    */#end

    private $!{tool.getClsNameByFullName($column.type)} $!{column.name};
#end

##foreach($column in $tableInfo.fullColumn)
##使用宏定义实现get,set方法
##getSetMethod($column)
##end
}
```

### vo

```markdown
## 引入宏定义
$!define

#set($PojoName = $tableInfo.name)
#set($pojoName = $tool.firstLowerCase($tableInfo.name))
#set($ClassName = $tool.append($PojoName, "Vo"))				←←←←←注意修改

#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end
#set($Id = $tool.firstUpperCase($pk.name))
#set($id = $pk.name)
#set($idType = $!pk.shortType)


## 设置回调,设置文件保存名称,设置文件保存位置
$!callback.setFileName($tool.append($ClassName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/vo"))					←←←←←注意修改

## 设置包名, 【package com.example.po】
#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}vo;		←←←←←注意修改

## 设置文件里需要导入的包
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

## 使用全局变量实现默认包导入
$!autoImport
import java.io.Serializable;

## 使用宏定义实现类注释信息
#tableComment("实体类")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class $ClassName implements Serializable {
    private static final long serialVersionUID = $!tool.serial();
#foreach($column in $tableInfo.fullColumn)
    #if(${column.comment})/**
    * ${column.comment}
    */#end

    private $!{tool.getClsNameByFullName($column.type)} $!{column.name};
#end
## set get 方法,因为使用了 lombok,所以这里注释掉
##foreach($column in $tableInfo.fullColumn)
##使用宏定义实现get,set方法
##getSetMethod($column)
##end
}
```



### controller

```markdown
#set($PojoName = $tableInfo.name)
#set($pojoName = $tool.firstLowerCase($tableInfo.name))
#set($ClassName = $tool.append($PojoName, "Controller"))				←←←←←注意修改


#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end
#set($Id = $tool.firstUpperCase($pk.name))
#set($id = $pk.name)
#set($idType = $!pk.shortType)

## 设置回调,设置文件保存名称
$!callback.setFileName($tool.append($ClassName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/controller"))					←←←←←注意修改	

## 设置包名
#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}controller;		←←←←←注意修改

## 导入需要的 pojo
import $!{tableInfo.savePackageName}.entity.$!{PojoName};				←←←←←注意修改
import $!{tableInfo.savePackageName}.vo.$!{PojoName}Vo;					←←←←←注意修改
## 导入需要的 service
import $!{tableInfo.savePackageName}.service.$!{PojoName}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * $!{tableInfo.comment}($!{tableInfo.name})表控制层
 *
 * @author $!author
 * @since $!time.currTime()
 */
@RestController
@RequestMapping("$!{pojoName}")
public class $!{ClassName} {
    @Autowired
    private $!{PojoName}Service $!{pojoName}Service;
    
    /**
     * 新增单条
     */
    @PostMapping("$!{pojoName}")
    public Integer insert$!{PojoName}(@RequestBody $!{PojoName} $!{pojoName}){
        Integer i = $!{pojoName}Service.insert$!{PojoName}($!{pojoName});
        return i;
    }
    
    /**
     * 删除单条,根据主键删除
     */
    @DeleteMapping("$!{pojoName}/{$!{id}}")
    public Integer delete$!{PojoName}By$!{Id}(@PathVariable("$!{id}") $!{idType} $!{id}){
        Integer i = $!{pojoName}Service.delete$!{PojoName}By$!{Id}($!{id});
        return i;
    }
    
    /**
     * 修改单条,根据主键修改
     */
    @PutMapping("$!{pojoName}/{$!{id}}")
    public Integer update$!{PojoName}By$!{Id}(@PathVariable("$!{id}") $!{idType} $!{id},@RequestBody $!{PojoName} $!{pojoName}){
        $!{pojoName}.set${Id}($!{id});
        Integer i = $!{pojoName}Service.update$!{PojoName}By$!{Id}($!{pojoName});
        return i;
    }
    
    /**
     * 根据主键id排序
     */
    @PutMapping("order")
    public Integer update$!{PojoName}ShowOrder(@RequestBody List<$!{idType}> $!{id}List){
        Integer i = $!{pojoName}Service.update$!{PojoName}ShowOrder($!{id}List);
        return i;
    }
    
    /**
     * 查询单条,根据主键查询
     */
    @GetMapping("$!{pojoName}/{$!{id}}")
    public $!{PojoName} select$!{PojoName}By$!{Id}(@PathVariable("$!{id}") $!{idType} $!{id}){
        $!{PojoName} $!{pojoName} = $!{pojoName}Service.select$!{PojoName}By$!{Id}($!{id});
        return $!{pojoName};
    }
    
    /**
     * 批量查询
     */
    @GetMapping("$!{pojoName}")
    public List<$!{PojoName}> select$!{PojoName}($!{PojoName} $!{pojoName}){
        List<$!{PojoName}> list = $!{pojoName}Service.select$!{PojoName}($!{pojoName});
        return list;
    }

    /**
     * 批量查询,根据指定条件
     */
    @GetMapping("$!{pojoName}/param")
    public List<$!{PojoName}> select$!{PojoName}ByParam($!{PojoName}Vo $!{pojoName}Vo){
        List<$!{PojoName}> list = $!{pojoName}Service.select$!{PojoName}ByParam($!{pojoName}Vo);
        return list;
    }
}
```



### service

```markdown
#set($PojoName = $tableInfo.name)
#set($pojoName = $tool.firstLowerCase($tableInfo.name))
#set($ClassName = $tool.append($PojoName, "Service"))			←←←←←注意修改


#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end
#set($Id = $tool.firstUpperCase($pk.name))
#set($id = $pk.name)
#set($idType = $!pk.shortType)

## 设置回调,设置文件保存名称
$!callback.setFileName($tool.append($ClassName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/service"))					←←←←←注意修改

## 设置包名
#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}service;		←←←←←注意修改

## 导入需要的 pojo
import $!{tableInfo.savePackageName}.entity.$!{PojoName};		←←←←←注意修改
import $!{tableInfo.savePackageName}.vo.$!{PojoName}Vo;			←←←←←注意修改
## 导入需要的包
import java.util.List;

/**
 * $!{tableInfo.comment}($!{tableInfo.name})表服务接口
 *
 * @author $!author
 * @since $!time.currTime()
 */
public interface $!{ClassName} {

    /**
     * 新增单条
     */
    Integer insert$!{PojoName}($!{PojoName} $!{pojoName});
    
    /**
     * 删除单条,根据主键删除
     */
    Integer delete$!{PojoName}By$!{Id}($!{idType} $!{id});
    
    /**
     * 修改单条,根据主键修改
     */
     Integer update$!{PojoName}By$!{Id}($!{PojoName} $!{pojoName});
    
    /**
     * 根据主键id排序
     */
     Integer update$!{PojoName}ShowOrder(List<$!{idType}> $!{id}List);
    
    /**
     * 查询单条,根据主键查询
     */
    $!{PojoName} select$!{PojoName}By$!{Id}($!{idType} $!{id});
    
    /**
     * 批量查询
     */
    List<$!{PojoName}> select$!{PojoName}($!{PojoName} $!{pojoName});

    /**
     * 批量查询,根据指定条件
     */
    List<$!{PojoName}> select$!{PojoName}ByParam($!{PojoName}Vo $!{pojoName}Vo);
}
```



### serviceimpl

```markdown
#set($PojoName = $tableInfo.name)
#set($pojoName = $tool.firstLowerCase($tableInfo.name))
#set($ClassName = $tool.append($PojoName, "ServiceImpl"))			←←←←←注意修改


#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end
#set($Id = $tool.firstUpperCase($pk.name))
#set($id = $pk.name)
#set($idType = $!pk.shortType)

## 设置回调,设置文件保存名称
$!callback.setFileName($tool.append($ClassName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/service/impl"))					←←←←←注意修改

## 设置包名
#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}service.impl;	←←←←←注意修改

## 导入需要的 pojo
import $!{tableInfo.savePackageName}.entity.$!{PojoName};			←←←←←注意修改
import $!{tableInfo.savePackageName}.vo.$!{PojoName}Vo;				←←←←←注意修改
## 导入需要的 service,dao
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import $!{tableInfo.savePackageName}.service.$!{PojoName}Service;	←←←←←注意修改
import $!{tableInfo.savePackageName}.dao.$!{PojoName}Dao;			←←←←←注意修改
## 导入需要的包
import java.util.List;

## 设置 dao 的统一命名
#set($dao = $tool.append($!{pojoName},"Dao"));						←←←←←注意修改

/**
 * $!{tableInfo.comment}($!{PojoName})表服务实现类
 *
 * @author $!author
 * @since $!time.currTime()
 */
@Service("$!{pojoName}Service")
public class $!{ClassName} implements $!{PojoName}Service {
    @Autowired
    private $!{PojoName}Dao $!{dao};								←←←←←注意修改
    
    /**
     * 新增单条
     */
    @Override
    public Integer insert$!{PojoName}($!{PojoName} $!{pojoName}){
        $!{PojoName} build = $!{PojoName}.builder()
            .build();
        Integer i = $!{dao}.insert$!{PojoName}(build);
        return i;
    }
    
    /**
     * 删除单条,根据主键删除
     */
    @Override     
    public Integer delete$!{PojoName}By$!{Id}($!{idType} $!{id}){
        Integer i = $!{dao}.delete$!{PojoName}By$!{Id}($!{id});
        return i;
    }
    
    /**
     * 修改单条,根据主键修改
     */
     @Override
     public Integer update$!{PojoName}By$!{Id}($!{PojoName} $!{pojoName}){
        /*$!{PojoName} build = $!{PojoName}.builder()
            .build();
        Integer i = $!{dao}.update$!{PojoName}By$!{Id}(build);*/
        Integer i = $!{dao}.update$!{PojoName}By$!{Id}($!{pojoName});
        return i;
     }
    
    /**
     * 根据主键id排序
     */
     @Override
     public Integer update$!{PojoName}ShowOrder(List<$!{idType}> $!{id}List){
        return null;
     }
    
    /**
     * 查询单条,根据主键查询
     */
     @Override
     public $!{PojoName} select$!{PojoName}By$!{Id}($!{idType} $!{id}){
        $!{PojoName} $!{pojoName} = $!{dao}.select$!{PojoName}By$!{Id}($!{id});
        return $!{pojoName};
     }
    
    /**
     * 批量查询
     */
     @Override
    public List<$!{PojoName}> select$!{PojoName}($!{PojoName} $!{pojoName}){
        List<$!{PojoName}> $!{pojoName}List = $!{dao}.select$!{PojoName}ListBy$!{PojoName}($!{pojoName});
        return $!{pojoName}List;
    }

    /**
     * 批量查询,根据指定条件
     */
     @Override
    public List<$!{PojoName}> select$!{PojoName}ByParam($!{PojoName}Vo $!{pojoName}Vo){
        $!{PojoName} build = $!{PojoName}.builder()
                .build();
        List<$!{PojoName}> $!{pojoName}List = $!{dao}.select$!{PojoName}ListBy$!{PojoName}(build);
        return $!{pojoName}List;
    }
}
```



### dao

```markdown
#set($PojoName = $tableInfo.name)
#set($pojoName = $tool.firstLowerCase($tableInfo.name))
#set($ClassName = $tool.append($PojoName, "Dao"))									←←←←←注意修改


#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end
#set($Id = $tool.firstUpperCase($pk.name))
#set($id = $pk.name)
#set($idType = $!pk.shortType)

## 设置回调,设置文件保存名称
$!callback.setFileName($tool.append($ClassName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/dao"))					←←←←←注意修改

## 设置包名
#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}dao;		←←←←←注意修改

## 导入实体类
import $!{tableInfo.savePackageName}.entity.$!{PojoName};		←←←←←注意修改
##import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * $!{tableInfo.comment}($!{PojoName})表数据库访问层
 *
 * @author $!author
 * @since $!time.currTime()
 */
public interface $!{ClassName} {
    /**
     * 【插入单条】
     *
     * @param $!{pojoName} 实例对象
     * @return 影响行数
     */
    int insert$!{PojoName}($!{PojoName} $!{pojoName});
    
    /**
     * 【删除单条】根据主键 id
     *
     * @param $!{id} 主键id
     * @return 影响行数
     */
    int delete$!{PojoName}By$!{Id}($!{idType} $!{id});

    /**
     * 【逻辑删除单条】根据主键 id 更新对象状态
     *
     * @param $!{id} 主键id
     * @return 影响行数
     */
    int deleteByUpdateStatus$!{PojoName}By$!{Id}($!{idType} $!{id});
    
    /**
     * 【更新单条】根据主键 id
     *
     * @param $!{pojoName} 主键id
     * @param $!{pojoName} 更新数据
     * @return 影响行数
     */
    int update$!{PojoName}By$!{Id}($!{PojoName} $!{pojoName});

   /**
     * 【更新单条】根据指定更新条件
     *
     * @param $!{pojoName}     更新条件
     * @param $!{pojoName}Data 更新数据
     * @return 影响行数
     */
    int update$!{PojoName}By$!{PojoName}($!{PojoName} $!{pojoName},$!{PojoName} $!{pojoName}Data);

    /**
     * 【查询单条】根据主键id,查询所有字段
     *
     * @param $!{id}  主键id
     * @return $!{PojoName} 对象信息
     */
    $!{PojoName} select$!{PojoName}By$!{Id}($!{idType} $!{id});
    
    
    //****************************** 批量操作 ******************************
    
    /**
     * 【批量插入】根据对象列表
     *
     * @param list 新增对象列表
     * @return 影响行数
     */
    int insert$!{PojoName}By$!{PojoName}List(List<$!{PojoName}> list);
    
    /**
     * 【批量删除】根据主键 id 列表
     *
     * @param list 主键id列表
     * @return 影响行数
     */
    int delete$!{PojoName}By$!{Id}List(List<$!{idType}> list);

    /**
     * 【批量逻辑删除】根据主键 id 列表,更新对象状态,逻辑删除
     *
     * @param list 主键id列表
     * @return 影响行数
     */
    int deleteByUpdateStatus$!{PojoName}By$!{Id}List(List<$!{idType}> list);
    
    /**
     * 【批量或单条删除】根据对象指定条件
     *
     * @param $!{pojoName} 对象
     * @return 影响行数
     */
    int delete$!{PojoName}By$!{PojoName}($!{PojoName} $!{pojoName});
    
    /**
     * 【批量或单条逻辑删除】根据对象指定条件更新对象状态
     *
     * @param $!{pojoName} 对象
     * @return 影响行数
     */
    int deleteByUpdateStatus$!{PojoName}By$!{PojoName}($!{PojoName} $!{pojoName});
    
    //批量数据的删除（根据对象删除）
    //批量数据的逻辑删除（根据对象删除，状态置1）

    /**
     * 【批量更新】根据对象列表,
     *
     * @param list 对象列表
     * @return 影响行数
     */
    int update$!{PojoName}By$!{PojoName}List(List<$!{PojoName}> list);
    
    //批量数据的更新（查询对象，对象列表）
    //批量数据的更新（查询对象列表，对象列表）
    
    /**
     * 【批量查询】根据主键列表,查询所有字段
     *
     * @param list 主键id列表
     * @return List<$!{PojoName}> 对象列表
     */
    List<$!{PojoName}> select$!{PojoName}ListBy$!{Id}List(List<$!{idType}> list);
    
    /**
     * 【批量查询】根据指定条件,查询所有字段
     *
     * @param $!{pojoName} 指定条件
     * @return List<$!{PojoName}> 对象列表
     */
    List<$!{PojoName}> select$!{PojoName}ListBy$!{PojoName}($!{PojoName} $!{pojoName});
}
```



### mapper

```markdown
## 引入mybatis支持
$!mybatisSupport					

## 设置常用变量
#set($PojoName = $tableInfo.name)
#set($pojoName = $tool.firstLowerCase($tableInfo.name))
#set($Table_Name = $!{tableInfo.obj.name})

#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end
#set($Id = $tool.firstUpperCase($pk.name))
#set($id = $pk.name)
#set($pkName = $!pk.obj.name)
#set($idType = $!pk.shortType)

## 设置回调,设置文件保存名称,设置文件保存位置
$!callback.setFileName($tool.append($PojoName, "Dao.xml"))								←←←←←注意修改
$!callback.setSavePath($tool.append($modulePath, "/src/main/resources/mapper"))			←←←←←注意修改,这里使用了mybatis宏

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="$!{tableInfo.savePackageName}.dao.$!{PojoName}Dao">					←←←←←注意修改
    #*<insert id="insert$!{TableName}" parameterType="$!{PojoName}">
        insert into $!{tableInfo.obj.name}
        (#foreach($column in $tableInfo.fullColumn)$!column.obj.name#if($velocityHasNext), 
        #end#end)
        values 
        (#foreach($column in $tableInfo.fullColumn)#{$!{column.name}}#if($velocityHasNext), 
        #end#end)
    </insert>*#
    <!--插入单条-->
    <insert id="insert$!{PojoName}" parameterType="$!{PojoName}">
        insert into $!{Table_Name}
        (#foreach($column in $tableInfo.fullColumn)$!column.obj.name#if($velocityHasNext), 
        #end#end)
        values 
        (#foreach($column in $tableInfo.fullColumn)#if($column.name == "showOrder")(select ifnull(max(t.show_order), 0) + 1 from $!{Table_Name} as t)#else#{$!{column.name}}#end#if($velocityHasNext), 
         #end#end)
    </insert>

    <!--删除单条,根据主键id-->
    <delete id="delete$!{PojoName}By$!{Id}" parameterType="$!{idType}">
        delete from $!{Table_Name} 
        where $!{pkName} = #{$!{id}}
    </delete>
    
    <!--逻辑删除单条,根据主键 id 更新对象状态-->
    <update id="deleteByUpdateStatus$!{PojoName}By$!{Id}" parameterType="$!{idType}">
        update $!{Table_Name} 
        set status = 0
        where $!{pkName} = #{$!{id}}
    </update>
    
    <!--更新单条,根据主键 id-->
    <update id="update$!{PojoName}By$!{Id}">
        update $!{Table_Name}
        <set>
#foreach($column in $tableInfo.otherColumn)
            <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
                $!column.obj.name = #{$!column.name},
            </if>
#end
        </set>
        where $!{pkName} = #{$!{id}}
    </update>
    
    <!--更新单条,根据指定更新条件-->
    <update id="update$!{PojoName}By$!{PojoName}">
        update $!{Table_Name}
        <set>
#foreach($column in $tableInfo.otherColumn)
            <if test="$!{pojoName}Data.$!column.name != null#if($column.type.equals("java.lang.String")) and $!{pojoName}Data.$!column.name != ''#end">
                $!column.obj.name = #{$!{pojoName}Data.$!column.name},
            </if>
#end
        </set>
        <where>
    #foreach($column in $tableInfo.fullColumn)
        <if test="$!{pojoName}.$!column.name != null#if($column.type.equals("java.lang.String")) and $!{pojoName}.$!column.name != ''#end">
                and $!column.obj.name = #{$!{pojoName}.$!column.name}
            </if>
    #end
    </where>
    </update>

    <!--查询单条,根据主键id,查询所有字段-->
    <select id="select$!{PojoName}By$!{Id}" parameterType="$!{idType}" resultType="$!{PojoName}">
        select
          #allSqlColumn()
          
        from $!{Table_Name}
        where $!{pkName} = #{$!{id}}
    </select>

   
    <!--****************************** 批量操作 ******************************-->
   
    <!--批量插入,根据对象列表-->
    <insert id="insert$!{PojoName}By$!{PojoName}List" parameterType="$!{PojoName}">
        insert into $!{Table_Name}
        (#foreach($column in $tableInfo.fullColumn)$!column.obj.name#if($velocityHasNext), 
        #end#end)
        values 
        <foreach collection="list" item="i" index="index" separator=",">
            (#foreach($column in $tableInfo.fullColumn)#{i.$!{column.name}}#if($velocityHasNext),
            #end#end)
        </foreach>
    </insert>

    <!--批量删除,根据主键 id 列表-->
    <delete id="delete$!{PojoName}By$!{Id}List" parameterType="$!{idType}">
        delete from $!{Table_Name}
        where $!{pkName} in
        <foreach collection="list" item="i" index="index" open="(" separator="," close=")">
            #{i}
        </foreach>
    </delete>
    
    <!--批量逻辑删除,根据主键 id 列表,更新对象状态,逻辑删除-->
    <update id="deleteByUpdateStatus$!{PojoName}By$!{Id}List" parameterType="$!{idType}">
        update $!{Table_Name}
        set status = 0
        where $!{pkName} in
        <foreach collection="list" item="i" index="index" open="(" separator="," close=")">
            #{i}
        </foreach>
    </update>

    <!--批量或单条删除,根据对象指定条件-->
    <delete id="delete$!{PojoName}By$!{PojoName}" parameterType="$!{PojoName}">
        delete from $!{Table_Name}
        <where>
#foreach($column in $tableInfo.fullColumn)
            <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
                and $!column.obj.name = #{$!{pojoName}.$!column.name}
            </if>
#end
        </where>
    </delete>
    
    <!--批量或单条逻辑删除,根据对象指定条件更新对象状态-->
    <update id="deleteByUpdateStatus$!{PojoName}By$!{PojoName}" parameterType="$!{PojoName}">
        update $!{Table_Name}
        set status = 0
        <where>
#foreach($column in $tableInfo.fullColumn)
            <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
                and $!column.obj.name = #{$!{pojoName}.$!column.name}
            </if>
#end
        </where>
    </update>
    
    <!--批量更新,根据对象列表-->
    <update id="update$!{PojoName}By$!{PojoName}List" parameterType="$!{PojoName}">
        <foreach collection="list" item="i" index="index">
            update $!{Table_Name}
            <set>
#foreach($column in $tableInfo.otherColumn)
                <if test="i.$!column.name != null#if($column.type.equals("java.lang.String")) and i.$!column.name != ''#end">
                    $!column.obj.name = #{i.$!column.name},
                </if>
#end
            </set>
            where $!{pkName} = #{i.$!{id}};
        </foreach>
    </update>
    
    <!--批量查询,根据主键列表,查询所有字段-->
    <select id="select$!{PojoName}ListBy$!{Id}List" parameterType="$!{idType}" resultType="$!{PojoName}">
        select
          #allSqlColumn()
          
        from $!{Table_Name}
        where $!{pkName} in
        <foreach collection="list" item="i" index="index" open="(" separator="," close=")">
            #{i}
        </foreach>
        order by show_order asc
    </select>
    
    <!--批量查询,根据指定条件,查询所有字段-->
    <select id="select$!{PojoName}ListBy$!{PojoName}" parameterType="$!{PojoName}" resultType="$!{PojoName}">
        select
          #allSqlColumn()
          
        from $!{Table_Name}
        <where>
#foreach($column in $tableInfo.fullColumn)
            <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
                and $!column.obj.name = #{$!column.name}
            </if>
#end
        </where>
        order by show_order asc
    </select>
</mapper>

```

