# BOM-DOM

## 初识

![image-20210805005802368](https://attach.blog.wen7.online/20210805005802.png)

JavaScript = ECMAScript + BOM + DOM

- ECMAScript： 描述 JS 的语法和基本对象
- [BOM](https://baike.baidu.com/item/BOM/1801?fr=aladdin)：**B**rower **O**bject **M**odel 浏览器对象模型
- [DOM](https://baike.baidu.com/item/%E6%96%87%E6%A1%A3%E5%AF%B9%E8%B1%A1%E6%A8%A1%E5%9E%8B/1033822?fr=aladdin&fromtitle=DOM&fromid=50288)：**D**ocument **O**bject **M**odel 文档对象模型



BOM 是不同浏览器都有各自的实现，这里吐槽一下 IE，在 IE9之前，微软仗着PC端市场占有量高，IE 在很多地方都不遵守规范，导致开发困难，前端页面需要做很多兼容性测试，虽然在 IE9 以后改正，但是还是要吐槽一下。

DOM 是 [W3C](https://baike.baidu.com/item/%E4%B8%87%E7%BB%B4%E7%BD%91%E8%81%94%E7%9B%9F/1458269?fromtitle=w3c&fromid=216888&fr=aladdin) 标准，所有浏览器公共遵守的标准



打开 IE 浏览器，打开 Chrome 浏览器，打开 QQ 浏览器，发现都有最上面的 Tab 标签页，都有可以输入网址的地址栏，都有右侧的滚动条，在页面右击都有弹框，F5刷新，在左下角都有加载的状态栏，还有主要的页面文档 document

我们使用 BOM 浏览器对象来描述浏览器，所以 BOM 包含【窗口】【浏览器】【浏览器屏幕】【访问历史】【访问地址】【文档】

其实前端开发日常最主要的还是开发【文档】这一块，就是我们写的 HTML + CSS + JavaScript，所以独立一个 DOM 

BOM: A区 + B区 + C区 + D区 + E区

DOM: E区





