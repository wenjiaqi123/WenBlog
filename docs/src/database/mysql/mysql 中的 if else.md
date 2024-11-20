MySQL 中的 if else
===

前言
---

在很多编程语言中，都有 switch 语句，类似 if else 进行判断

```java
/**
 * 根据 int 类型的性别,打印不同性别
 */
public static void test(int gender){
    switch(gender){
        case 0:
            System.out.println("女");
            break;
        case 1:
            System.out.println("男");
            break;
        default:
            System.out.println("未定义");
            break;
    }
}
```

那么在 mysql 中也有类似的语法来实现该种功能



测试表和数据
---

```mysql
DROP TABLE IF EXISTS t_user;

create table t_user
(
    id        int          not null comment '主键' primary key,
    user_name varchar(255) null comment '姓名',
    gender    int          null comment '性别 0表示女,1表示男'
);
```

```mysql
INSERT INTO t_user (id, user_name, gender) VALUES (1, '牛大', 0);
INSERT INTO t_user (id, user_name, gender) VALUES (2, '王二', 1);
INSERT INTO t_user (id, user_name, gender) VALUES (3, '张三', 0);
INSERT INTO t_user (id, user_name, gender) VALUES (4, '李四', 1);
INSERT INTO t_user (id, user_name, gender) VALUES (5, '赵五', 2);
```

![image-20220530133034401](https://attach.blog.wen7.online/image-20220530133034401.png)



case when then else end
---

### 基本语法

```mysql
-- 推荐该种写法,很多情况都是等值
case xxx
    when 值1 then 显示的值1
    when 值2 then 显示的值2
    else 默认值
end
```

- else 可以省略

```mysql
case 
    when xxx=值1 then 显示的值1
    when xxx=值2 then 显示的值2
    else 默认值
end
```

- 判断条件更加灵活

- 当判断条件不是一个固定的值，比如 age 在[14-18] 之间显示 少年

    - ```mysql
        case 
            when age between 14 and 18 then '少年'
            when age=15 then '及笄'
            when age >= 80 and age<= 90 then '耄耋'
            else '默认值'
        end
        ```

        

### 使用示例

```mysql
select t.id        as id,
       t.user_name as userName,
       (case t.gender
           when 0 then '女'
           when 1 then '男'
           else '未定义'
           end)     as '性别'
from t_user t
```

```mysql
select t.id        as id,
       t.user_name as userName,
       (case
           when t.gender = 0 then '女'
           when t.gender = 1 then '男'
           else '未定义'
           end)     as '性别'
from t_user t
```

![image-20220530133020436](https://attach.blog.wen7.online/image-20220530133020436.png)

