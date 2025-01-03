# RESTful 风格

[百度百科-RESTful](https://baike.baidu.com/item/RESTful/4406165?fr=aladdin)

只是一种风格，不是硬性的，但是现在面试的时候大多数都要掌握 RESTful



POST

DELETE

PUT

GET



## 安全和幂等

### 安全

对服务器的资源是否安全

- GET 请求，你请求多少次，对于服务器的内容是没有变化的，没有其他操作的。所以是安全的
- POST/PUT/DELETE 请求，新增一条数据，修改一条数据，删除一条数据，对于服务器数据库而言，都有数据的变化，所以是不安全的
    - 要是你对银行的数据进行了 post，给你创建一个黑卡用户，很明显是不安全的
    - 要是你对银行的余额进行了 put，给你 500 块的余额改成 5000000，显然是不安全的
    - 要是你对银行的账户删掉了某个账户 delete，显然也是不安全的

### 幂等

多次操作结果是否相同

- GET 请求，你请求多少次，数据没有变化，所以是幂等的。每一次的结果都一样
- POST 请求，你新增一个用户张三，再新增一遍，那么数据库就会有2个用户张三，只不过是同名而已。多次操作，每一次都会新增一个，所以不幂等
- PUT 请求，你把用户id = 10086 的账户名称改成 中国联通，多次操作，每次都是将用户id = 10086 的账户名称改成 中国联通，多次操作结果相同。幂等
- DELETE 请求，你将用户id = 10086 的账户删除，多次操作，每一次都是删除，多次操作结果相同，幂等

| 请求方式 | 资源操作 |     安全     |     幂等     |      |
| :------: | :------: | :----------: | :----------: | ---- |
|   GET    |   查询   | **==安全==** | ==**幂等**== |      |
|   POST   |   新增   |      一      |      一      |      |
|   PUT    |   修改   |      一      | **==幂等==** |      |
|  DELETE  |   删除   |      一      | **==幂等==** |      |

==如果修改是更新累加的操作的话，更新是非幂等的==



## 如何保证幂等

幂等主要针对 POST ，可以使用乐观锁。