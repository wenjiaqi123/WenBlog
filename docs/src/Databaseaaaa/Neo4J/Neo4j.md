# Neo4j

## 快速入门

### 部署安装



### 基本概念

#### 节点 Node

##### 创建节点

```CQL
create(n)
return n;
```

- `create` 创建
- `(n)` 使用括号表示一个节点，`create (n)` 表示创建一个节点。
  - n 就是随便起的一个值，一般使用 node 的 n ，当然你也可以写成 p，`create (p) return p`
- `return n` 返回刚刚创建的节点

![image-20240409150407620](https://attach.blog.wen7.online/20240409150407.png)



```CQL
create(n:Person)
return n;
```

- `create(n:Person)` 表示这个节点的标签（label）
- 标签：类似 Java 中的类，类似 golang 中的结构体，类似 JavaScript 中的 Object。

![image-20240409150906428](https://attach.blog.wen7.online/20240409150906.png)



```cql
create(n:Person:User)
return n;
```

- 标签可以创建多个，使用冒号分割

![image-20240409151053737](https://attach.blog.wen7.online/20240409151053.png)



```cql
create(n:Person{name:"张三",age:18})
return n;
```

- `create(n:Person{name:"张三",age:18})` 创建节点 n，节点的标签是 Person，有2个属性，分别是 name=张三 和 age=18

![image-20240409151508596](https://attach.blog.wen7.online/20240409151508.png)



##### 查询节点

```CQL
match (n)
return n;
```

- `match(n)` 匹配所有的节点
- `return n` 返回所有的节点

![image-20240409151648141](https://attach.blog.wen7.online/20240409151648.png)



```CQL
match(n:Person)
return n;
```

- `match(n:Person)` 匹配所有标签是 Person 的节点，`match(n:User)` 匹配 label 是 User 的节点，
- `match(n:Person:User)` 匹配既是 Person 又是 User 的节点

![image-20240409151821051](https://attach.blog.wen7.online/20240409151821.png)



```CQL
match (n:Person{name:"张三"})
return n;
```

- `match (n:Person{name:"张三"})` 匹配 label=Person，name="张三" 的节点

![image-20240409152627972](https://attach.blog.wen7.online/20240409152628.png)

```CQL
match (n)
where id(n) = 5
return n;
```

- `where id(n) = 5` 查询 id = 5 的节点

```CQL
match (n)
where id(n) in [1,2,3,4,5]
return n;
```

- `where id(n) in [1,2,3,4,5]` 查询 id =1，id = 2，id = 3，id = 4，id = 5 的节点

```CQL
match (n)
where 'Person' in labels(n)
return n;
```

- `where 'Person' in labels(n)`  查询 标签=Person 的节点
- 上句 CQL 等同于 `match(n:Person) return n;`



##### 修改节点

```CQL
match(n)
where id(n)=5
set n.name="李四",n.age=20
return n;
```

- ```CQL
  match(n)					// match(n) 或者 match(n:Person)
  where id(n)=5				// 其实相当于查询条件,根据查询的条件进行删选
  
  set n.name="李四",n.age=20   //修改值，多个属性使用逗号分割
  
  return n;					//返回节点
  ```

![image-20240409155231401](https://attach.blog.wen7.online/20240409155231.png)



```CQL
match (n)
where id(n)=5
remove n:Person
set n:User
return n;
```

- ```CQL
  match (n)
  where id(n)=5		//上半截是匹配需要修改的节点
  
  remove n:旧标签		//移除旧标签,但是该子句可以省略,也就是不用移除旧标签
  set n:新标签			//设置新标签,如果不移除旧标签,节点将拥有2个标签
  
  return n;
  ```

  ![image-20240409160049326](https://attach.blog.wen7.online/20240409160049.png)



##### 删除节点

```CQL
match (n)
delete n;
```

- 删除所有节点，**谨慎操作**



```CQL
match (n:User)
detach delete n;
```

- 删除 labels=User 的节点，
- `detach` 如果节点有关联关系，无法直接删除，`detach delete` 会先移除节点上关系再删除



#### 关系 Relationship

为了展示关系，使用案例：

马文才 → 暗恋 → 祝英台，祝英台 ↔ 恋爱 ↔ 梁山伯

```CQL
create (p1:Person {name: '马文才', age: 20}),
       (p2:Person {name: '梁山伯', age: 19}),
       (p3:Person {name: '祝英台', age: 18})
```



##### 创建关系

```CQL
match (a:Person{name:"马文才"}),(b:Person{name:"祝英台"})
create (a) - [r:暗恋] -> (b)
return a,b,r;
```

- `match (a:Person{name:"马文才"}),(b:Person{name:"祝英台"})`  查找2个节点，第一个节点起名为 a，第二个节点起名为 b
- `create (a) - [r:暗恋] -> (b)` 创建关系 a 暗恋 b
  - 关系非常生动形象  a --> b 在箭头方向中插入关系 [r:暗恋]，关系是 "暗恋" 给这个关系起个名字叫 r，类似于 `create(n:Person)`里的 n
  - **关系不要使用双引号**，初学者易错点，`错误：create (a) - [r:"暗恋"] -> (b)`
- `return a,r,b` 该子句返回可视化界面。

![image-20240409161358428](https://attach.blog.wen7.online/20240409161358.png)




```CQL
match (a:Person {name: '梁山伯'}), (b:Person {name: '祝英台'})
create (a)-[:恋爱]->(b)
create (b)-[:恋爱]->(a)
```

```CQL
match (a:Person {name: '梁山伯'}), (b:Person {name: '祝英台'})
create (a)-[:恋爱]->(b),
	   (b)-[:恋爱]->(a)
```

- 双向关系是通过2个单向关系来实现的，以上两种写法都可以，博主比较推荐第二种。

- ```CQL
  match (a:Person {name: '梁山伯'}), (b:Person {name: '祝英台'})
  create (a)-[r1:恋爱]->(b)
  create (b)-[r2:恋爱]->(a)
  return a,b,r1,r2;
  ```

  ![image-20240409162510259](https://attach.blog.wen7.online/20240409162510.png)



###### 创建节点和关系

```CQL
create (swk:Hero{name:"孙悟空"}),(zbj:Hero{name:"猪八戒"})
create (swk)-[r:师兄弟]->(zbj)
return swk,r,zbj;
```

```CQL
create (swk:Hero{name:"孙悟空"})-[r:师兄弟]->(zbj:Hero{name:"猪八戒"})
return swk,r,zbj;
```

![image-20240409163629238](https://attach.blog.wen7.online/20240409163629.png)



###### 创建关系属性

```CQL
merge (zbj:Hero {name: '猪八戒'})
merge (yhdd:God {name: '玉皇大帝'})

create (zbj)-[r:恨 {degree: '非常'}]->(yhdd)
return zbj,r,yhdd
```

- `merge` 会先检查是否存在节点，如果不存在则创建
- **关系也可以添加属性**，关系属性常见场景：
  - 张三拥有别墅A 70%产权，李四拥有别墅A 30%产权。
  - 上海到北京有航线，时长 3 小时，北京到上海有高铁，时长 10 小时

![image-20240409165302039](https://attach.blog.wen7.online/20240409165302.png)



###### 自我关系

```CQL
merge (zbj:Hero {name: '猪八戒'})

create (zbj)-[r:爱]->(zbj)
return zbj,r;
```

![image-20240409170223584](https://attach.blog.wen7.online/20240409170223.png)



##### 查询关系

###### 查询所有关系

```CQL
match (n)-[r]->(m)
return n,r,m;
```

- `match (n)-[r]->(m)` 查询所有关系
- 尝试执行以下语句
  - `match (n)-[r]->(m) return r;`  查询所有关系，仅返回关系
  - `match (n)-[r]->(n) return r;` 查询自我关系，返回关系
  - 根据 return 返回的值，展示不同的可视化界面，后续案例都返回节点方便观察。

![image-20240409165800767](https://attach.blog.wen7.online/20240409165800.png)



###### 查询指定关系

```CQL
match (n)-[r:`师兄弟`]->(m)
return n,m,r;
```



###### 查询入边和出边

```CQL
//查询祝英台节点出去的关系
match (n:Person{name:"祝英台"}) -[r]->(m)
return n,r,m;

//查询猪八戒节点出去的关系
match (n:Hero{name:"猪八戒"}) -[r]->(m)
return n,r,m;
```

```CQL
//查询祝英台节点进入的关系
match (n:Person{name:"祝英台"}) <-[r]-(m)
return n,r,m;

//查询猪八戒节点进入的关系
match (n:Hero{name:"猪八戒"}) <-[r]-(m)
return n,r,m;
```

```CQL
//等同 match (n:Person{name:"祝英台"}) <-[r]-(m)
match (m) -[r]-> (n:Person{name:"祝英台"})
return n,r,m;

//等同 match (n:Hero{name:"猪八戒"}) <-[r]-(m)
match (m) -[r]-> (n:Hero{name:"猪八戒"})
return n,r,m;
```

![image-20240409171423789](https://attach.blog.wen7.online/20240409171423.png)

![image-20240409171541800](https://attach.blog.wen7.online/20240409171541.png)

![image-20240409171912933](https://attach.blog.wen7.online/20240409171912.png)

![image-20240409171955389](https://attach.blog.wen7.online/20240409171955.png)



##### 修改关系

```
match (zbj:Hero {name: '猪八戒'})-[r:爱]->(zbj)
set r.description="自爱是最真实的爱"
return zbj,r;
```

![image-20240409172626724](https://attach.blog.wen7.online/20240409172626.png)



###### 删除关系属性

```CQL
match (zbj:Hero {name: '猪八戒'})-[r:爱]->(zbj)
remove r.description
return zbj,r;
```



###### 替换关系

```CQL
match (zbj:Hero {name: '猪八戒'})-[r:爱]->(zbj)
delete r
create (zbj)-[rn:尊敬]->(zbj)
return zbj,rn;
```

- `match (zbj:Hero {name: '猪八戒'})-[r:爱]->(zbj)`  先找到该关系
- `delete r` 删除
- `create (zbj)-[rn:尊敬]->(zbj)` 再创建

![image-20240409172330893](https://attach.blog.wen7.online/20240409172330.png)



##### 删除关系

```CQL
match (a:Person{name:"马文才"})-[r]->(b:Person{name:"祝英台"})
delete r
return a,b;
```



#### 属性

如果有其他变成语言经验的同学就很容易理解了。相信学本门课程的同学绝对有编程语言经验。

![image-20240409172937507](https://attach.blog.wen7.online/20240409172937.png)







```CQL
match (n:`乔木`) -[r:需要]->(n:`乔木`)
delete r;

match(n)
where id(n)=68
detach delete n;

match(n:`修剪`)-[r:修剪]->(m)
delete r
create (n)-[rn:植被类型]->(m)
return n,rn,m;

match(n)  
return n;
```



```CQL
match(n:养护方案)<-[r]-(nany)
return n as n1,r as r1,nany as na1
union all
match(m:`乔木`)-[rr]->(many)
return m as n1,rr as r1,many as na1;
```

```CQL
//查看所有的养护方案
match(n:养护方案)<-[r]-(m)
return n,r,m
```

```CQL
//查看所有的植被类型,递归查看所有
match(n:植被类型)<-[r:属于*]-(m)
return n,r,m
```

























