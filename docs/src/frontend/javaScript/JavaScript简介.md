# JavaScript简介

[百度百科-JavaScript](https://baike.baidu.com/item/JavaScript/321142?fr=aladdin)

[菜鸟教程-JavaScript](https://www.runoob.com/js/js-tutorial.html)

[W3Cschool-JavaScript](https://www.w3school.com.cn/js/index.asp)



## 历史沿革

[网景公司](https://baike.baidu.com/item/%E7%BD%91%E6%99%AF/70176?fromtitle=netscape&fromid=2778944)的一名程序员 [布兰登·艾奇](https://baike.baidu.com/item/%E5%B8%83%E5%85%B0%E7%99%BB%C2%B7%E8%89%BE%E5%A5%87/58101949?fromtitle=Brendan%20Eich&fromid=561441&fr=aladdin) 开发， 原名 LiveScript

后来网景公司和 Sun 合作，就将其改名为 JavaScript，和 Java 毫无关系，如果非要说有关系的话，就是当时 Java 很火，想借助 Java 的名气，而且很多内容也参考并吸取了 Java 的特点

而当时市面上，还有很多其他类似于 JS 的语言，微软 IE 的 JScript，CEnui的 ScriptEase，这时候市面上没有统一的规则，于是在 ECMA（欧洲计算机制造商协会）协调下，网景，Sun，微软等一起制定了一系列标准。

该标准指出，完整的 JavaScript 包含三个部分：ECMAScript，浏览器对象模型（BOM），文档对象模型（DOM）

==JavaScript = ECMAScript + BOM + DOM==



## 简介

- 单线程

- 脚本语言：解释型或者即时编译的
	- 不需要像 Java 一样先编译成 .class 文件，再执行
- 2001年微软发布 IE6，首次对 JS 引擎优化和分离，2008年 Google 发布浏览器 Chrome，采用优化后的 JavaScript 引擎，V8引擎，将 JS 代码直接转化为机械码执行，速度快

```markdown
# 浏览器组成
内核，Shell，JS引擎，渲染引擎，....
五大主流浏览器与四大内核
Chrome  	Webkit
Firefox		Gecko
IE			Trident
Opera		Presto
Safari		Webkit
国内的什么 QQ浏览器，360浏览器，搜狗浏览器，百度浏览器，UC浏览器，都是这些内核套壳，
```

