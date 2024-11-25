# Geometry

Geometry：几何

## 引言

随着地理信息系统（GIS）技术的发展，空间数据已经成为许多应用领域中的重要数据类型。在数据库管理领域，MySQL 提供了对空间数据的支持，通过扩展的几何类型（Geometry）来实现。在本文中，我们将介绍 MySQL 中的 Geometry 类型，包括其基本概念、使用方法以及相关函数等内容。



## MySQL 中的 Geometry 类型

MySQL 支持 Open Geospatial Consortium（OGC，开放地理空间协会）定义的简单几何类型，包括点（Point）、线（LineString）和多边形（Polygon）。此外，MySQL 还支持由这些基本类型组合而成的复合类型，如多点（MultiPoint）、多线（MultiLineString）和多多边形（MultiPolygon）。

<img src="https://attach.blog.wen7.online/20230329215213.png" alt="image-20220829211910992" style="zoom:80%;" />

|     类     |     形状     | 示例                 |
| :--------: | :----------: | :------------------- |
|  geometry  |              |                      |
|   point    |      点      | 公交车站，火车站     |
| linestring |      线      | 河流，地铁路线，街道 |
|  polygon   | 多边形（面） | 行政区，火车站       |

|         类         |              形状               | 示例                             |
| :----------------: | :-----------------------------: | :------------------------------- |
| geometrycollection | 1个或多个几何对象构成的几何对象 |                                  |
|     multipoint     |             点集合              | 岛链，出口集合                   |
|  multilinestring   |             线集合              | 河流体系，地铁路线体系，街道体系 |
|    multipolygon    |      多边形集合（面集合）       | 行政区，湖泊                     |

- **在数据库创建表时，Point、Linestring、Polygon 都可以使用 Geometry 类型，但是如果可以确定具体的几何类型（如 Point），使用 Point 类型可以提高查询性能和类型安全性**。geometrycollection 同理



## Geometry数据格式

在 MySQL 中，空间数据类型以二进制格式存储，通过 WKB（Well-Known Binary）表示。这种表示方法与 WKT（Well-Known Text）相互转换，方便用户进行数据输入输出。

- WKT（文本格式：人可以阅读，在代码中的格式）
  - ![image-20230329221254194](https://attach.blog.wen7.online/202303292224989.png)

- WKB（二进制格式：不可读，高效存储在数据库中）
  - <img src="https://attach.blog.wen7.online/202303292225966.png" alt="image-20230329222512919" style="zoom:150%;" />

- Json（Json格式：一般在应用程序中的格式，前后端交互时场使用 Json）
  - ![image-20230330093515132](https://attach.blog.wen7.online/202303300935172.png)



> 经验总结：
>
> 前后端传输时使用 Json 或 WKT 格式，常使用 Geometry 类型进行处理。
>
> 在数据库使用 WKB 格式，因为高效。==不建议在数据库用字符串来保存 WKT 格式，虽然可以处理业务功能，但是性能很低，或者手动处理 WKT 格式容易出错==



## 相关函数







































