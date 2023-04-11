---
title: interview
tags: []
categories: []
date: 2022-10-31 09:58:45
---

# 一、JS 常见考点

## 1. 防抖/节流

- 防抖：多次触发，只执行一次--------->关注**结果**
- 节流：每个时间段，只执行一次---------->关注**过程**

防抖代码：

```html
<body>
  <input type="text" name="" id="input" />
  <script>
    let input = document.getElementById("input");
    console.log(input);
    let debounce = (fn, delay) => {
      let timer = 0;
      return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
          // 定时器记得清零
          timer = 0;
        }, delay);
      };
    };
    input.addEventListener(
      "keyup",
      debounce(() => {
        console.log(input.value);
      }, 1000)
    );
  </script>
</body>
```

节流代码：

```html
<body>
  <div
    draggable="true"
    style="width: 200px;height: 200px;background:red;"
  ></div>

  <script>
    const throttle = (fn, delay) => {
      let timer = 0;
      return (e) => {
        if (timer) return;
        timer = setTimeout(() => {
          fn(e);
          // 定时器记得清零
          timer = 0;
        }, delay);
      };
    };
    let div = document.querySelector("div");
    div.addEventListener(
      "drag",
      throttle((e) => {
        console.log(e.offsetX);
      }, 1000)
    );
  </script>
</body>
```

## 2. 订阅与发布

```html
<script>
  class EventEmitter {
    constructor() {
      this.cache = {};
    }
    // 暴露订阅功能，fn为发布时的行为回调
    on(name, fn) {
      if (this.cache[name]) {
        this.cache[name].push(fn);
      } else {
        this.cache[name] = [fn];
      }
    }
    // 解除订阅功能(判断fn函数是否与暴露订阅功能时一致，如果一致则移除，否则留下)
    off(name, fn) {
      let tasks = this.cache[name] || [];
      const index = tasks.findIndex((f) => f === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
    // 发布（真正发布）
    emit(name) {
      const subscribers = this.cache[name] || [];
      subscribers.forEach((el) => el());
    }
  }
  // 准备
  listen = () => {
    console.log("A subscribes to a book");
  };
  // 实例化：
  let instance = new EventEmitter();
  // 1、开始订阅书籍
  instance.on("book", listen);
  instance.on("book", () => {
    console.log("B subscribes to a book");
  });
  // 2、发布消息【发布后有订阅book的所有用户都会收到消息】
  instance.emit("book"); // 'A subscribes to a book','B subscribes to a book'
  // 3、某人取消订阅
  instance.off("book", listen);
  // 4、再次发布消息【有人取消订阅book后发布时只会通知其他订阅了book的用户】
  instance.emit("book"); // 'B subscribes to a book'
</script>
```

## 3. ajax 创建过程

关键点

1. new XMLHttpRequest()
2. 设置请求参数 open()
3. 发送请求 request.send()
4. 响应 request.onreadystatechange

标准回答

创建 ajax 过程：

1. 创建 XHR 对象：new XMLHttpRequest()

2. 设置请求参数：request.open(Method, 服务器接口地址)；

3. 发送请求: request.send()，如果是 get 请求不需要参数，post 请求需要参数 request.send(data)

4. 监听请求成功后的状态变化：根据状态码进行相应的处理。

   ```js
   XHR.onreadystatechange = function () {
     if (XHR.readyState == 4 && XHR.status == 200) {
       console.log(XHR.responseText); // 主动释放,JS本身也会回收的 XHR = null
     }
   };
   ```

   加分回答：

   POST 请求需要设置请求头

   readyState 值说明 0：初始化，XHR 对象已经创建，还未执行。

   open 方法说明

   1：载入,已经调用 open 方法,但是还没发送请求

   2：载入完成,请求已经发送完成

   3：交互，可以接收到部分数据

   4：数据全部返回， status 值说明 ：

   ​ 200：成功

   ​ 404：没有发现文件、查询或 URl

   ​ 500：服务器产生内部错误

### ajax 获取文本示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="div">点击获取文本内容</div>
    <div class="txt"></div>
    <script>
      let div = document.querySelector("#div");
      let txt = document.querySelector(".txt");
      div.addEventListener("click", function () {
        let xhr = new XMLHttpRequest();
        xhr.open("get", "test.txt", true);
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
            txt.innerHTML = xhr.responseText;
          }
        };
        xhr.send();
      });
    </script>
  </body>
</html>
```

### ajax 获取图片示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="div">点击获取动图</div>
    <img src="" alt="test" />
    <script>
      let div = document.querySelector("#div");
      let img = document.querySelector("img");
      let ajaxPromise = () => {
        let imgPromise = new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.open("get", "test.gif", true);
          xhr.onreadystatechange = () => {
            if ((xhr.readyState = 4)) {
              if (
                (xhr.status >= 200 && xhr.status < 300) ||
                xhr.status === 304
              ) {
                resolve(xhr.responseURL);
              } else {
                reject(new Error(xhr.statusText));
              }
            }
          };
          xhr.send();
        });
        return imgPromise;
      };
      div.addEventListener("click", function () {
        ajaxPromise()
          .then((el) => {
            img.src = el;
          })
          .catch((statusText) => {
            statusText;
          });
      });
    </script>
  </body>
</html>
```

## 4. 事件循环（event loop）

js 是单线程的，主线程在执行时会不断循环往复的从**同步队列**中读取任务，执行任务，当同步队列执行完毕后再从异步队列中依次执行。

宏任务与微任务都属于异步任务，在执行上**微任务的优先级高于宏任务**，因此每一次都会先执行完微任务再执行宏任务。

宏任务有：定时器，Dom 事件，ajax 事件

微任务有：promise 的**回调**、MutationObserver 的回调 ,process.nextTick。注意：new promise() 中的代码是同步的。

总而言之就是：**同步--->异步**，再细分就是**同步队列--->微任务队列--->宏任务队列**

### 定时器

![image-20220919085714933](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20220919085714933.png)

并不是要等同步代码执行完成后才开始定时器计时，而是有定时器模块一开始就进行了计时，等待**同步队列以及微任务**完成后就执行已经进行定时了的定时任务。

```js
setTimeout(() => {
  console.log(1);
}, 2000);
setTimeout(() => {
  console.log(2);
}, 1000);
console.log("同步");
for (let i = 0; i < 1000; i++) {
  console.log("");
}
```

![image-20220919093913446](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20220919093913446.png)

### 任务共享内存机制

宏任务不会同时执行，而是进行轮询，逐一执行。

![image-20220919105018891](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20220919105018891.png)

### 进度条轮询

![image-20220919110138192](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20220919110138192.png)

### 任务分解

如果同步代码执行时间比较长，就可以考虑将同步代码写成异步形式，不会造成同步代码堵塞。

```js
console.time("runtime");
function hd(num) {
  let count = 0;
  for (let i = 0; i <= num; i++) {
    count += i;
  }
  console.log(count);
  console.timeEnd("runtime");
}
let num = 987654321;
hd(num);
console.log("houdunren.com"); //需要等待上面执行完才会执行
```

分解为微任务形式则不会堵塞

```js
async function hd(num) {
  let res = await Promise.resolve().then((_) => {
    let count = 0;
    for (let i = 0; i < num; i++) {
      count += num--;
    }
    return count;
  });
  console.log(res);
}
hd(987654321);
console.log("后盾人");
```

## 5. cookie/session

浏览器的缓存机制提供了可以将用户数据**存储在客户端**上的方式，可以利用 cookie，session 等**跟服务端**进行**数据交互**。

cookie 和 session 都是用来**跟踪浏览器用户身份**的会话方式。

### 区别

#### 1、保持状态

cookie 保存在浏览器端，session 保存在服务器端

#### 2、使用方式：

cookie 机制：如果不在浏览器中设置过期时间，cookie 被保存在内存中，生命周期随浏览器的关闭而结束，这种 cookie 简称会话 cookie。如果在浏览器中设置了 cookie 的过期时间，cookie 被保存在硬盘中，关闭浏览器后，cookie 数据仍然存在，直到过期时间结束才消失。

Cookie 是服务器发给客户端的特殊信息，cookie 是以文本的方式保存在客户端，每次请求时都带上它

session 机制：当服务器收到请求需要创建 session 对象时，首先会检查客户端请求中是否包含 sessionid。如果有 sessionid，服务器将根据该 id 返回对应 session 对象。如果客户端请求中没有 sessionid，服务器会创建新的 session 对象，并把 sessionid 在本次响应中返回给客户端。通常使用 cookie 方式存储 sessionid 到客户端，在交互中浏览器按照规则将 sessionid 发送给服务器。如果用户禁用 cookie，则要使用 URL 重写，可以通过 response.encodeURL(url) 进行实现；API 对 encodeURL 的结束为，当浏览器支持 Cookie 时，url 不做任何处理；当浏览器不支持 Cookie 的时候，将会重写 URL 将 SessionID 拼接到访问地址后。

#### 3、存储内容：

cookie 只能保存字符串类型，以文本的方式；session 通过类似与 Hashtable 的数据结构来保存，能支持任何类型的对象(session 中可含有多个对象)

#### 4、存储的大小：

cookie：单个 cookie 保存的数据不能超过 4kb；session 大小没有限制。

#### 5、安全性：

cookie：针对 cookie 所存在的攻击：Cookie 欺骗，Cookie 截获；session 的安全性大于 cookie。

原因如下：

（1）sessionID 存储在 cookie 中，若要攻破 session 首先要攻破 cookie；

（2）sessionID 是要有人登录，或者启动 session_start 才会有，所以攻破 cookie 也不一定能得到 sessionID；

（3）第二次启动 session_start 后，前一次的 sessionID 就是失效了，session 过期后，sessionID 也随之失效。

（4）sessionID 是加密的

（5）综上所述，攻击者必须在短时间内攻破加密的 sessionID，这很难。

#### 6、应用场景：

cookie：

（1）判断用户是否登陆过网站，以便下次登录时能够实现自动登录（或者记住密码）。如果我们删除 cookie，则每次登录必须从新填写登录的相关信息。

（2）保存上次登录的时间等信息。

（3）保存上次查看的页面

（4）浏览计数

![](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202204021510199.png)

session：Session 用于保存每个用户的专用信息，变量的值保存在服务器端，通过 SessionID 来区分不同的客户。

（1）网上商城中的购物车

（2）保存用户登录信息

（3）将某些数据放入 session 中，供同一用户的不同页面使用

（4）防止用户非法登录

#### 7、缺点：

cookie：

（1）大小受限

（2）用户可以操作（禁用）cookie，使功能受限

（3）安全性较低

（4）有些状态不可能保存在客户端。

（5）每次访问都要传送 cookie 给服务器，浪费带宽。

（6）cookie 数据有路径（path）的概念，可以限制 cookie 只属于某个路径下。

session：

（1）Session 保存的东西越多，就越占用服务器内存，对于用户在线人数较多的网站，服务器的内存压力会比较大。

（2）依赖于 cookie（sessionID 保存在 cookie），如果禁用 cookie，则要使用 URL 重写，不安全

（3）创建 Session 变量有很大的随意性，可随时调用，不需要开发者做精确地处理，所以，过度使用 session 变量将会导致代码不可读而且不好维护。

### 设置 cookie

```js
document.cookie = "name=oeschger";
document.cookie = "favorite_food=tripe";
alert(document.cookie);
// 显示: name=oeschger;favorite_food=tripe
```

### 获取 cookie

```js
document.cookie = "test1=Hello";
document.cookie = "test2=World";

//使用正则表示进行获取
var myCookie = document.cookie.replace(
  /(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);

alert(myCookie); // 显示: World
```

## 6. WebStorage

### 本地存储

随着互联网的快速发展，基于网页的应用越来越普遍，同时也变得越来越复杂，为了满足各种各样的需求，会经常在本地存储大量的数据，HTML5 规范提出了相关的解决方案。

本地存储特性

- 数据存储在用户浏览器中
- 设置、读取方便，甚至页面刷新都不会丢失数据
- 容量较大，sessionStorage 大约 5M，localStorage 约 20M
- 只能存储字符串，可以将对象经过`JSON.stringify(obj)`编码后进行存储

### 使用背景

WebStorage 的目的是**克服由 cookie 所带来的一些限制**，当数据需要被严格控制在客户端时，不需要持续的将数据发回服务器。

WebStorage 两个主要目标：

（1）提供一种在 cookie 之外存储会话数据的路径。

（2）提供一种存储大量可以跨会话存在的数据的机制。

HTML5 的 WebStorage 提供了两种 API：localStorage（本地存储）和 sessionStorage（会话存储）。

#### 1、生命周期：

- localStorage:localStorage 的生命周期是永久的，关闭页面或浏览器之后 localStorage 中的数据也不会消失。localStorage 除非主动删除数据，否则数据永远不会消失。

- sessionStorage 的生命周期是在仅在当前会话下有效。sessionStorage 引入了一个“浏览器窗口”的概念，sessionStorage 是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。同时独立的打开同一个窗口同一个页面，sessionStorage 也是不一样的。

#### 2、存储大小：

localStorage 和 sessionStorage 的存储数据大小一般都是：5MB

#### 3、存储位置：

localStorage 和 sessionStorage 都保存在客户端，不与服务器进行交互通信。

#### 4、存储内容类型：

localStorage 和 sessionStorage 只能存储字符串类型，对于复杂的对象可以使用 ECMAScript 提供的 JSON 对象的 stringify 和 parse 来处理

#### 5、获取方式：

- localStorage：window.localStorage;

- sessionStorage：window.sessionStorage;

#### 6、应用场景：

- localStoragese：常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据；
- sessionStorage：敏感账号一次性登录；

#### 7、WebStorage 的优点：

（1）**存储**空间更大：cookie 为 4KB，而 WebStorage 是 5MB；

（2）节省网络**流量**：WebStorage**不会传送到服务器**，存储在本地的数据可以直接获取，也不会像**cookie**一样**每次请求都会传送到服务器**，所以减少了客户端和服务器端的交互，**节省**了网络**流量**；

（3）**针对性强**：对于那种只需要在用户浏览一组页面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage 会非常方便；

（4）**快速显示**：有的数据存储在 WebStorage 上，再加上浏览器本身的缓存。获取数据时可以从本地获取会比从服务器端获取快得多，所以**速度更快**；

（5）**安全**性：WebStorage 不会随着 HTTP header 发送到服务器端，所以安全性**相对于 cookie**来说比**较高**一些，不会担心截获，但是仍然存在伪造问题；

（6）WebStorage 提供了一些方法，数据操作比 cookie 方便；

- setItem (key, value) —— 保存数据，以键值对的方式储存信息。

- getItem (key) —— 获取数据，将键值传入，即可获取到对应的 value 值。

- removeItem (key) —— 删除单个数据，根据键值移除对应的信息。

- clear () —— 删除所有的数据

- key (index) —— 获取某个索引的 key

### localStorage 常见 API

- 声明周期永久有效，除非手动删除，否则关闭页面也会存在
- 可以多窗口（页面）共享（同一浏览器可以共享）
- 以键值对的形式进行存储

#### 存储数据

```js
localStorage.setItem(key, value);
```

#### 获取数据

```
localStorage.getItem(key)
```

#### 删除单条记录

```
localStorage.removeItem(key)
```

#### 删除所有数据

```
localStorage.clear()
```

#### 记住用户登入案例

```html
<body>
  <input type="text" id="username" />
  <input type="checkbox" name="" id="remember" />记住用户名
  <script>
    let username = document.querySelector("#username");
    let remember = document.querySelector("#remember");
    if (localStorage.getItem("username")) {
      username.value = localStorage.getItem("username");
      remember.checked = true;
    }
    remember.addEventListener("change", function () {
      if (this.checked) {
        localStorage.setItem("username", username.value);
      } else {
        localStorage.removeItem("username");
      }
    });
  </script>
</body>
```

### sessionStorage 常见 API

- 声明周期为关闭浏览器
- 在同一窗口（页面）下数据可以共享
- 以键值对的形式进行存储

#### 存储数据

```js
sessionStorage.setItem(key, value);
```

#### 获取数据

```
sessionStorage.getItem(key)
```

#### 删除单条记录

```
sessionStorage.removeItem(key)
```

#### 删除所有数据

```
sessionStorage.clear()
```

## 7. HTML 语义化

语义化的好处：

1. 代码可读高
2. 有利于 SEO
3. 利于页面内容结构化

常见的语义化标签：header、footer、aside、main、nav、article

- 对于开发者而言，语义化标签有着更好的页面结构，利于个人的代码编写。

- 对于用户而言，当网络卡顿时有良好的页面结构，有利于增加用户的体验。
- 对于爬虫来说，有利于搜索引擎的 SEO 优化，利于网站有更靠前的排名。
- 对于团队来讲，有利于代码的开发和后期的维护。

## 8. SSR/CSR

### SSR

SSR（Server Side Render）是指从服务端侧完成页面 DOM 结构和数据的拼接，然后再发送给浏览器，为其绑定事件和状态，能完成交互的过程。

`背景`：

- 需要更高 SEO（Search Engine Optimization），便于搜索引擎爬虫抓取网站内容的，如博客网站。
  - 截至目前，Google 和 Bing 可以很好地对**同步** JavaScript 应用进行索引。这里的“同步”是关键词。如果你的应用以一个 loading 动画开始，然后通过 Ajax 获取内容，这是**异步**过程，**爬虫并不会等到内容加载完成再抓取**。也就是说，如果 SEO 对你的页面至关重要，而你的内容又是异步获取的，那么 SSR 可能是必需的。

* 提高首屏渲染速度 FMP（First Meaningful Paint），减少白屏时间，提升用户体验。
  - 这一点在**慢网速**或者**运行缓慢的设备**上尤为重要。服务端渲染的 HTML 无需等到所有的 JavaScript **都下载并执行**完成之后**才显示**，所以你的用户将会更快地看到完整渲染的页面。除此之外，数据获取过程在首次访问时在服务端完成，相比于从客户端获取，可能有更快的数据库连接。这通常可以带来更高的[Core Web Vitals](https://link.juejin.cn?target=https%3A%2F%2Fweb.dev%2Fvitals%2F)评分、更好的用户体验，而对于那些“首屏加载速度与转化率直接相关”的应用来说，这点可能至关重要。
* 提升低网络和低配置设备上的性能
  - 有些设备不支持 JavaScript 或 JavaScript 执行得很差，导致用户体验不可接受。对于这些情况，你可能会需要该应用的服务端渲染的、无 JavaScript 的版本。虽然有一些限制，不过这个版本可能是那些完全没办法使用该应用的人的唯一选择。

`优点`：

- 搜索引擎爬虫**能爬取完整 HTML**，有利于做**搜索引擎优化**(**SEO**)，提高网站流量和曝光率 ；
- 首屏渲染在服务端就完成，所以有更快的**首屏加载速度**。只是首屏快，其他页面不像 SPA 一样是无感刷新，切换页面通过超链接进行页面跳转，体验稍差(传统 PHP/JSP)

`缺点`：

- 由于是在服务端进行渲染，需要**占用**更多**服务器端资源**(更多的 CPU 和内存)；
- 由于在服务端渲染，所以有些**浏览器 API 无法使用**，同样地客户端一些生命周期在 SSR 也是不存在的；
- 部署和开发**要求稍高**，前后端**耦合**。

`使用场景`：

一般不会用在公司项目内（涉及前后端分离开发问题），一般用于博客网站、官网、营销类网站等比较**注重加载速度**、**渲染效率**、**SEO 要求高**的场景。

### CSR

自从**ajax**技术兴起，可以在浏览器上加载服务端数据，并且可以在不刷新页面的情况下更新视图。这时，彻底拉开了前后端分离的帷幕，前端和后端可以分开开发，解除耦合。

## 9. 前端优化

前端性能优化分为两类：一类是文件加载更快、另一类是文件渲染更快。

**加载**更快的方法：

1. 让**传输的数据包更小**（压缩文件/图片）：图片压缩和文件压缩
2. **减少网络请求的次数**：雪碧图/精灵图、节流防抖
3. **减少渲染的次数**：缓存（HTTP 缓存、本地缓存、Vue 的 keep-alive 缓存等）

**渲染**更快的方法：

1. 提前渲染：**SSR**服务器端渲染
2. 避免渲染阻塞：**CSS**放在 HTML 的**head**中， **JS**放在 HTML 的**body 底部**
3. 避免无用渲染：懒加载
4. 减少渲染次数：对 dom 查询进行缓存、将 dom 操作合并、使用减少重排的标签

## 10. 前后端通讯

前后端一般通过 HTTP 协议进行交互，但 HTTP 协议是基于“问答模式”的，即客户端发起询问，服务端才会响应。但对于一些实时的场景，比如股票趋势图、直播...等，<u>服务端更新数据的速度很快，如果每次都要客户端询问</u><u>，这样传输数据的效率十分低下，所以得通过其它交互模式支持实时通信</u>。

实现实时通信有以下几种方式：

### 1. 短轮询：

客户端设置定时器，每隔几秒就向服务端发送请求，通过频繁地请求到达实时的效果。这种方式要求服务器的响应速度很快。

优缺点如下：

- 优点就是**实现简单**，无需做过多的更改。
- 每次发送请求都会有 Http 的 Header，会很**耗流量**，也会**消耗 CPU**的利用率。
- 缺点是轮询的间隔**过长**，会导致用户不能及时接收到更新的数据；
- 轮询的间隔**过短**，会导致查询请求过多，增加服务器端的负担

### 2. 长轮询：

长轮询是对轮询的改进版，客户端和服务端保持一条长连接，一旦服务端有新的数据，不等客户端请求就会主动发送给客户端。这种方式要求服务器有高并发能力。

优缺点如下：

- 较短轮询在某种程度上**减小了网络带宽**和**CPU 利用率**等问题；
- 做了优化，有较好的**时效性**；
- 缺点是保持连接会**消耗资源**。

### 3. WebSocket

WebSocket 是类似 Socket 的 TCP 长连接的通讯模式，一旦 WebSocket 连接建立后，后续数据都以帧序列的形式传输。在客户端断开 WebSocket 连接或 Server 端断掉连接前，不需要客户端和服务端重新发起连接请求；

WebSocket 是一种**全双工通信协议**，客户端和服务端处于**相同的地位**。通过客户端与服务端建立的 HTTP 连接进行切换，客户端会发送一个带 update:websocket 字段的 HTTP 请求请求协议切换，服务端会回复带 101 状态码的响应表示协议切换成功。接着它们使用 websocket 进行通信，一旦有新的数据服务端可以直接发送给客户端。

优缺点如下：

- 在海量并发和客户端与服务器交互负载流量大的情况下，极大的**节省了网络带宽**资源的消耗，有明显的性能优势；
- 客户端发送和接受消息是在同一个持久连接上发起，**实时性**优势明显。
- 缺点是浏览器支持程度不一致，**不支持断开重连**。

### 4. iframe

iframe 流方式是在页面中插入一个隐藏的 iframe，利用其 src 属性在服务器和客户端之间创建一条长连接，服务器向 iframe 传输数据（通常是 HTML，内有负责插入信息的 javascript），来实时更新页面。

优缺点如下：

- 消息能够**实时到达**；
- 浏览器**兼容好**；
- 移动端**兼容差**
- 服务器维护一个长连接会**增加开销**；
- **代码复杂**，搜索引擎爬虫还不能很好的处理 iframe 中的内容，使用 iframe 会**不利于搜索引擎优化**（SEO）。
- IE、chrome、Firefox 会显示加载没有完成，图标会不停旋转。

### 5. SSE(Server-Sent Event)：

SSE(Server-Sent Event)是建立在浏览器与服务器之间的**单向通信渠道**，只能由服务端传输特定形式的数据给客户端，这里并不是建立一个长连接。

优点如下：

- **兼容性好**，SSE 使用 HTTP 协议，现有的服务器软件都支持；
- SSE 属于**轻量级**，**使用简单**；
- SSE 默认**支持断线重连**。

### 6. 适用范围

- 轮询适用于：小型应用，实时性不高；

- 长轮询适用于：一些早期的对及时性有一些要求的应用：web IM 聊天；

- iframe 适用于：客服通信等；
- WebSocket 适用于：微信、网络互动游戏等
- SSE 适用于：金融股票数据、看板等

## 11. null/undefined

### null

null 代表对象的值未设置，相当于一个对象**没有设置指针地址**就是 null

- null 为一个空对象，可以隐式转化为数值 0，既定义了，也赋值了。

- 坑：`Number(null) == 0`

- `typeof null == object`

### undefined

undefind 是**全局对象的一个属性**。

当出现以下情况都为 undefined。

- 一个变量没有被赋值
- 一个函数没有返回值
- 某个对象不存在
- 访问某个对象不存在的属性
- 函数定义了形参但没有传递实参

速记：

- 表示定义了一个变量，但未赋值。

- `Number(undefined) == NaN`

- `typeof undefined == undefined`

溯源如下：

1. 作者在设计 js 的都是先设计的 null（为什么设计了 null：最初设计 js 的时候借鉴了 java 的语言）

2. null 会被隐式转换成 0，很不容易发现错误。

3. 先有 null 后有 undefined，出来 undefined 是为了填补之前的坑。

一些论断：

1. `Boolean(undefined) == 0`

2. `Boolean(null) == 0`

3. 由 1 和 2 得：`undefined == null`

4. 严格判断则不转化，所以不等：`undefined !== null`

## 12. 浏览器输入 URL

1. url 解析：判断是搜索内容还是请求 URL
2. 查找本地缓存：如果有缓存直接返回给页面，没有缓存则进入网络请求阶段
3. DNS 解析
4. 通过三次握手建立 TCP 连接
5. 合成请求头信息，发送 http 请求
6. 处理响应信息
7. 通过四次挥手断开 TCP 连接
8. 如果响应状态码 301，则重定向
9. 浏览器进行页面渲染：
   1. 解析 html，生成 DOM 树
   2. 根据 css 计算节点样式，生成 stylesheet
   3. 生成布局树
   4. 为特定的元素生成独立图层

## 13. http

HTTP 是一个在计算机世界里专门在两点之间**传输**<u>文字、图片、音频、视频</u>等**超文本数据**的**约定和规范**

### OSI 模型

因特网的协议栈由五个部分组成：物理层、链路层、网络层、运输层和应用层。采用自上而下的方法研究其原理如下：

#### 应用层

决定了向用户提供应用服务时通信活动，即**提供应用程序间的通信**

应用层是**网络应用程序**和**网络协议**存放的分层，因特网的应用层包括许多协议，例如我们学 web 离不开的 **HTTP 协议**，电子邮件传送协议 `SMTP`、端系统文件上传**协议 FTP**、还有为我们进行域名解析的 **DNS 协议**。应用层协议分布在多个端系统上，一个**端系统应用程序**与另外一个**端系统应用程序**交换信息分组，我们把位于应用层的信息分组称为 `报文(message)`。

#### 传输层

传输层对上层应用层，**提供处于网络连接中的两台计算机之间的网络传输**

因特网的运输层在应用程序断点之间**传送应用程序报文**，在这一层主要有两种传输协议 **TCP 协议**和**UDP 协议**，利用这两者中的任何一个都能够传输报文，不过这两种协议有巨大的不同。

TCP 向它的应用程序提供了**面向连接的服务**，<u>它能够控制并确认报文是否到达，并提供了拥塞机制来控制网络传输，因此当网络拥塞时，会抑制其传输速率。</u>

UDP 协议向它的应用程序提供了**无连接服务**。<u>它不具备可靠性的特征，没有流量控制，也没有拥塞控制</u>。我们把运输层的分组称为 `报文段(segment)`

#### 网络层

网络层用来**处理在网络上流动的数据包**。**数据包**是网络传输的**最小数据单位**。

因特网的网络层负责将称为 `数据报(datagram)` 的网络分层从一台主机移动到另一台主机。网络层一个非常重要的协议是 **IP 协议**，所有具有网络层的因特网组件都必须运行 IP 协议，IP 协议是一种网际协议，除了 IP 协议外，网络层还包括一些其他网际协议和路由选择协议，一般把网络层就称为 IP 层，由此可知 IP 协议的重要性。

#### 数据链路层

数据链路层用来**处理连接网络的硬件部分**

现在我们有应用程序通信的协议，有了给应用程序提供运输的协议，还有了用于约定发送位置的 IP 协议，那么如何才能真正的发送数据呢？为了将分组从一个节点（主机或路由器）运输到另一个节点，**网络层必须依靠链路层提供服务**。链路层的例子包括以太网、WiFi 和电缆接入的 **DOCSIS** 协议，因为数据从源目的地传送通常需要经过几条链路，一个数据包可能被沿途不同的链路层协议处理，我们把<u>链路层的分组</u>称为**帧(frame)**

#### 物理层

虽然链路层的作用是将帧从一个端系统运输到另一个端系统，而物理层的作用是将帧中的一个个 `比特` 从一个节点运输到另一个节点，物理层的协议**仍然使用链路层**协议，这些协议与实际的**物理传输介质**有关，例如，以太网有很多物理层协议：关于双绞铜线、关于同轴电缆、关于光纤等等。

ISO 给出的 OSI（Open System Interconnection Reference Model）即**开放式系统互联通信参考模型**增加了<u>表示层和会话层</u>。计算机网络体系结构](https://baike.baidu.com/item/计算机网络体系结构?fromModule=lemma_inlink)(architecture）划分为七层：

**表示层**主要包括<u>数据压缩和数据加密以及数据描述</u>，数据描述使得应用程序不必担心计算机内部存储格式的问题，而**会话层**提供了<u>数据交换的定界和同步功能</u>，包括<u>建立检查点和恢复方案</u>。

#### 速记

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20220920092537430.png" alt="image-20220920092537430" style="zoom:80%;" />

- 物理层: **将数据转换为**可通过物理介质传送的**电子信号**，相当于邮局中的搬运工人。
- 数据链路层: **确定访问网络介质的方式**。在此层将数据分帧，并处理流控制。本层指定**拓扑结构**并提供硬件寻址，相当于邮局中的装拆箱工人。
- 网络层: 使用权数据路由经过大型网络 ，提供**路由选择和寻址功能**，相当于邮局中的排序工人。
- 传输层: 提供**终端到终端的可靠连接** ，相当于公司中跑邮局的送信职员。
- 会话层: 允许用户使用简单易记的名称建立连接，具有**建立、管理、维护会话功能**。相当于公司中收寄信、写信封与拆信封的秘书。
- 表示层: 协商数据交换格式，具有**数据格式处理**和**数据加密**功能。 相当公司中简报老板、替老板写信的助理。
- 应用层: 用户的应用程序和网络之间的接口。提供**应用程序之间通信**。

![image-20221003102507895](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221003102507895.png)

![image-20221003103430310](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221003103430310.png)

![image-20221003103453963](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221003103453963.png)

[优秀博客](https://juejin.cn/post/6844904045572800525)

### 常见缩写

#### HTTPS

HTTP 一般是明文传输，很容易被攻击者窃取重要信息，鉴于此，HTTPS 应运而生。HTTPS 的全称为 （Hyper Text Transfer Protocol over SecureSocket Layer），全称有点长，HTTPS 和 HTTP 有很大的不同在于 HTTPS 是以安全为目标的 HTTP 通道，在 HTTP 的基础上通过**传输加密**和**身份认证**保证了传输过程的安全性。HTTPS 在 HTTP 的基础上增加了 `SSL` 层，也就是说 **HTTPS = HTTP + SSL**。

下图：非对称加密

![image-20221003104818246](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221003104818246.png)

先使用非对称加密，建立安全连接后，为了减少消耗采用对称加密

![image-20221003110557257](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221003110557257.png)

#### SSL

SSL（Secure Socket Layer）安全套接层是网景公司（Netscape）率先采用的网络安全协议。它是在传输通信协议（TCP/IP）上实现的一种安全协议，采用公开密钥技术。SSL 广泛支持各种类型的网络，同时提供三种基本的安全服务，它们都使用公开密钥技术。

#### DNS

DNS（Domain Name System）即域名系统，

### HTTP 请求特征

- 支持客户-服务器模式

- 简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有 GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。由于 HTTP 协议简单，使得 HTTP 服务器的程序规模小，因而通信速度很快。

- 灵活：HTTP 允许传输任意类型的数据对象。正在传输的类型由 Content-Type 加以标记。

- **无连接**：无连接的含义是限制**每次连接只处理一个请求**。<u>服务器处理完客户的请求，并收到客户的应答后，即断开连接</u>。采用这种方式可以**节省传输时间**。

- **无状态**：HTTP 协议是无状态协议。无状态是指**协议对于事务处理没有记忆能力**。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样<u>可能导致每次连接传送的数据量增大，每次都得问一遍身份信息，不仅麻烦，而且还增加了不必要的数据传输量。由此出现了 `Cookie` 技术</u>。另一方面，<u>服务器不需要先前信息时</u>它的**应答就较快**。

- HTTP 协议里还有一把优缺点一体的双刃剑，就是**明文传输**。明文意思就是协议里的报文（准确地说是 header 部分）不使用二进制数据，而是用简单可阅读的文本形式。
  对比 TCP、UDP 这样的二进制协议，它的优点显而易见，不需要借助任何外部工具，用浏览器、Wireshark 或者 tcpdump 抓包后，直接用肉眼就可以很容易地查看或者修改，为我们的开发调试工作带来极大的便利。
  当然缺点也是显而易见的，就是不安全，可以被监听和被窥探。因为无法判断通信双方的身份，不能判断报文是否被更改过。

tcp 连接

![image-20221003094458957](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221003094458957.png)

![image-20221003100751092](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221003100751092.png)

## 14. 交换变量方法

常规法

```js
let a = 3,
  b = 5;
let c = a;
a = b;
b = c;
```

木桶法

```js
let a = 3,
  b = 5;
a = a + b;
b = a - b;
a = a - b;
```

结构赋值法

```js
let a = 3,
  b = 5;
[a, b] = [5, 3];
```

数组法

```js
let a = 3,
  b = 5;
a = [a, b];
b = a[0];
a = a[1];
```

对象法

```js
let a = 3,
  b = 5;
a = {
  a: b,
  b: a,
};
b = a.b;
a = a.a;
console.log(a, b);
```

按位异或法

换算成二进制来进行亦或取值，相同为 0，异同为 1

```js
let a = 3,
  b = 5;
a = a ^ b;
b = b ^ a;
a = a ^ b;
console.log(a, b);
```

烧脑写法

```js
let a = 3,
  b = 5;
a = [b, (b = a)][0];
console.log(a, b);
```

## 15. 倒计时

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div>倒计时</div>
    <span class="day"></span>
    <span class="hour"></span>
    <span class="min"></span>
    <span class="second"></span>
    <script>
      let daySpan = document.querySelector(".day");
      let hourSpan = document.querySelector(".hour");
      let minSpan = document.querySelector(".min");
      let secondSpan = document.querySelector(".second");
      aim = new Date("2022-11-11 00:00");

      function countdown() {
        let now = new Date();
        // 得到的是相差毫秒数
        let defers = aim - now;
        console.log(defers);
        let day, hour, min, second;
        if (defers == 0) {
          return 0;
        }
        second = Math.floor((defers / 1000) % 60);
        min = Math.floor((defers / 1000 / 60) % 60);
        hour = Math.floor((defers / 1000 / 60 / 60) % 24);
        day = Math.floor(defers / 1000 / 60 / 60 / 24);

        daySpan.innerHTML = day + "天";
        hourSpan.innerHTML = hour + "时";
        minSpan.innerHTML = min + "分";
        secondSpan.innerHTML = second + "秒";
        setTimeout(countdown, 1000);
      }
      countdown();
    </script>
  </body>
</html>
```

## 16. typeof/instanceof

typeof 可以检测基本类型数据，instance 可以判断原型。

[instance](https://www.cnblogs.com/wangfupeng1988/p/3979533.html)

## 17. 原型/原型链

[原型链/继承——超级简单](https://www.cnblogs.com/wangfupeng1988/p/3979985.html)

自己没有，可以使用父祖辈的方法。

```js
let a = "23";
console.log(Object.getPrototypeOf(a)); //String
let b = new String("1");
console.log(Object.getPrototypeOf(b)); //String
console.log(Object.getPrototypeOf(a) == Object.getPrototypeOf(b)); //True
```

创建没有原型的对象

```js
let a = Object.create(null, {
  name: {
    value: "zsh",
  },
});
console.log(a);
console.log(a.hasOwnProperty("name")); //a没有hasOwnProperty方法
```

自我总结：

凡是创建的对象，都先考虑其对应的数据类型。涉及到的数据类型考虑 property，其余的统统考虑使用`__proto__`进行寻找。

![面试](D:\00_importantData\面试.png)

## 18. apply/bind/call

apply、call 会立即执行，bind 不会立即执行

要传参时：apply 传数组，bind 和 call 都是分别传

bind 相当于是复制了一个函数

```js
function hd(a, b) {
  return this.f + a + b;
}

//使用bind会生成新函数（这里只传了一个参数，使用bind时传的参数的权重是最大的，依次进行参数赋值）
let newFunc = hd.bind({ f: 1 }, 3);

// 这里将第2个参数传过去了（如果上述传过值了，那么这里的传值就无效了，依次进行赋值）
console.log(newFunc(2));
```

这里 bind 适用于不立即执行的函数，如回调函数，同时改变 this 指向，应用如下：

```html
<body>
  <button>后盾人</button>
</body>
<script>
  document.querySelector("button").addEventListener(
    "click",
    function (event) {
      console.log(event.target.innerHTML + this.url);
    }.bind({ url: "houdunren.com" })
  );
</script>
```

## 19. this

### 普通函数中

- 构造函数（类）：this 指向实例出来的对象
- 以函数的形式调用时，this 永远都是 window
- 以方法的形式进行调用，this 就是调用方法的那个对象

值的注意的是，在以方法的形式进行调用时：

- 所谓的**this 指的是**在该方法中的**第一层**，如果嵌套，此时 this 的指向还是 window（嵌套函数还是普通函数时），此时可以为函数进行 this 绑定

  ```js
  let Lesson = {
    study: "i love",
    lists: ["js", "css", "mysql"],
    show() {
      return this.lists.map(function (title) {
        return `${this.study}:${title}`;
      });
    },
  };
  console.log(Lesson.show()); // ['undefined:js', 'undefined:css', 'undefined:mysql']
  ```

  ```js
  let lesson = {
    study: "i love",
    lists: ["js", "css", "mysql"],
    show() {
      return this.lists.map(function (title) {
        return `${this.study}:${title}`;
      }, this); //绑定this
    },
  };
  console.log(lesson.show()); // ['i love:js', 'i love:css', 'i love:mysql']
  ```

### 箭头函数中

箭头函数没有`this`, 也可以理解为箭头函数中的`this` 会继承定义函数时的上下文，可以理解为**和外层函数（作用域）**指向**同一个 this**，此时和普通函数不能一概而论，需单独分析。

值的注意的是，当箭头函数作为回调函数时，此时 this 的指向就是**回调函数宿主函数**所在的作用域。

```html
<body>
  <button desc="test">无敌是多么寂寞</button>
  <script>
    let Dom = {
      name: "crazyzsh",
      bind() {
        const button = document.querySelector("button");
        button.addEventListener("click", (event) => {
          alert(this.name + event.target.innerHTML);
        });
      },
    };
    Dom.bind(); //crazyzsh无敌是多么寂寞
  </script>
</body>
```

使用场景：

- 如果想使用函数定义时的上下文中的 this，那就使用箭头函数
- 本着新特性的原则，尽量使用箭头函数（还是得视情况而定）
- 事件函数可理解为对象`onclick`设置值，所以函数声明时`this`为当前对象

### 实际应用

```js
let Lesson = {
  study: "i love",
  lists: ["js", "css", "mysql"],
  show() {
    // 使用变量将this进行保存
    let that = this;
    return this.lists.map(function (title) {
      return `${that.study}:${title}`;
    });
  },
};
console.log(Lesson.show()); //['i love:js', 'i love:css', 'i love:mysql']
```

## 20. 作用域

**全局作用域**只有一个，每个函数又都有作用域（环境）。

- 编译器运行时会将**变量定义**在所在**作用域**
- **使用变量**时会<u>从当前作用域开始向上查找变量</u>
- 作用域就像攀亲亲一样，晚辈总是可以向上辈要些东西

作用域链**只向上查找**，找到全局 window 即终止，应该尽量不要在全局作用域中添加变量。

函数被执行后其环境变量将从**内存中删除**。下面函数在每次执行后将删除函数内部的 total 变量。

```js
function count() {
  let total = 0;
}
count();
```

如果**子函数被使用**时**父级环境将被保留**，即此时内存并没有释放。

```js
function hd() {
  let n = 1;
  return function () {
    let b = 1;
    return function () {
      console.log(++n);
      console.log(++b);
    };
  };
}
let a = hd()();
a(); //2,2
a(); //3,3
```

构造函数也是很好的环境例子，子函数被外部使用**父级环境将被保留**

```js
function User() {
  let a = 1;
  this.show = function () {
    console.log(a++);
  };
}
let a = new User();
a.show(); //1
a.show(); //2
let b = new User();
b.show(); //1
```

## 21. var/let/const

使用 `let/const` 可以将变量声明在块作用域中（放在新的环境中，而不是全局中）

```js
{
  let a = 9;
}
console.log(a); //ReferenceError: a is not defined
if (true) {
  var i = 1;
}
console.log(i); //1
```

### 定时器体验

在满足循环条件下，因为这里使用的是 let，每次循环都会创建一个块级作用域，相应的 i 的值也一同保存在了该块级作用域中。setTimeout 函数是属于宏任务，等待主线来执行。

```js
// 在1s后同时输出0,1,2
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// 在1s、2s、3s后依次输出0,1,2
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
```

使用 var，由于在执行 setTimeout 函数时，是要等同步代码执行完后再执行定时器，此时循环已经遍历完了， i 的值为 4，所以此时输出的都为 4。

```js
// 在1s后同时输出4
for (var i = 1; i < 4; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// 在1s、2s、3s后依次输出4,4,4
for (var i = 1; i < 4; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000 * i);
}
```

总结：

- 每次循环 setTimeout 函数（第二个参数如果用到了 i 值的话）都会记住 i 的值，这是不论使用 let 还是 var 都是一样的；
- 执行 setTimeout 函数时，是要等同步代码执行完后再进行执行，即要等循环完后再执行；
- 使用 let 具有块级作用域，每次循环出来的 setTimeout 函数都处于其中，变量 i 的值也储存在该块级作用域中，所以打印出来为 1、2、3；
- 使用 var 是全局声明的，等循环完后 i 最后变成了 4，再执行定时器时 i 的值为 4，所以此时输出的都为 4；

## 22. 闭包

闭包指子函数可以访问外部作用域变量的函数特性，即使在子函数作用域外也可以访问。如果没有闭包那么在处理事件绑定，异步请求时都会变得困难。

- JS 中的所有函数都是闭包
- 闭包一般在子函数本身作用域以外执行，即延伸作用域

使用闭包获取**指定区间数组元素**

```js
let a = [1, 8, 4, 5, 6, 9];
function between(left, right) {
  return (el) => el >= left && el <= right;
}
let fun = a.filter(between(3, 6));
console.log(fun); // [4,5,6]
```

在**回调函数**中使用**闭包**，当点击按钮时显示当前**点击的是第几个按钮**。使用了立即执行函数进行参数传递。

```html
<body>
  <button message="后盾人">button</button>
  <button message="hdcms">button</button>
</body>
<script>
  var btns = document.querySelectorAll("button");
  for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = (function (i) {
      return function () {
        alert(`点击了第${i + 1}个按钮`);
      };
    })(i);
  }
</script>
```

或者使用

```html
<body>
  <button message="后盾人">button1</button>
  <button message="hdcms">button2</button>
  <script>
    btns.forEach((el) =>
      el.addEventListener("click", (e) => alert(e.target.innerHTML))
    );
  </script>
</body>
```

使用闭包实现**根据字段实现排序**

```js
let lessons = [
  {
    title: "媒体查询响应式布局",
    click: 89,
    price: 12,
  },
  {
    title: "FLEX 弹性盒模型",
    click: 45,
    price: 120,
  },
  {
    title: "GRID 栅格系统",
    click: 19,
    price: 67,
  },
  {
    title: "盒子模型详解",
    click: 29,
    price: 300,
  },
];
function order(field) {
  return (a, b) => a[field] - b[field];
}
console.table(lessons.sort(order("price")));
```

内存泄漏

```html
<body>
  <div desc="houdunren">在线学习</div>
  <div desc="hdcms">开源产品</div>
</body>
<script>
  let divs = document.querySelectorAll("div");
  divs.forEach(function (item) {
    item.addEventListener("click", function () {
      console.log(item.getAttribute("desc"));
    });
  });
</script>
```

解决内存泄漏

```js
let divs = document.querySelectorAll("div");
divs.forEach(function (item) {
  let desc = item.getAttribute("desc");
  item.addEventListener("click", function () {
    console.log(desc);
  });
  item = null;
});
```

## 23. 常见坑

### 改变原数组

#### sort

sort 会改变原始数组的操作

**要升序就返回 a-b，降序就返回 b-a**

```js
const arr2 = [
  { id: 10, flag: true },
  { id: 5, flag: false },
  { id: 6, flag: true },
  { id: 9, flag: false },
];
const r = arr2.sort((a, b) => b.flag - a.flag);
console.log(r);
```

#### splice

```js
let arr = [1, 3, 4, 6];
arr.splice(0, 1);
console.log(arr); // [3,4,6]
```

#### reverse

```js
let arr = [1, 3, 4, 6];
arr.reverse();
console.log(arr); //[6,4,3,1]
```

#### push

在数组末尾追加一个元素，返回数组**长度**。

#### pop

在数组末尾删除一个元素，返回被**去掉的元素**。

#### unshift

在数组头部添加一个元素，返回数组**长度**。

#### shift

在数组头删除一个元素，返回**被删除的元素**。

### 数组常用方法

slice

**`slice()`** 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

```js
slice();
slice(start);
slice(start, end);
```

```js
const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// expected output: Array ["camel", "duck"]

console.log(animals.slice());
// expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

splice

splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组。

```js
splice(start);
splice(start, deleteCount);
splice(start, deleteCount, item1);
splice(start, deleteCount, item1, item2, itemN);
```

```js
const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb");
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, "May");
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

findIndex

**`findIndex()`\*\*方法返回数组中满足提供的测试函数的第一个元素的\*\*索引**。若没有找到对应元素则返回-1。

```js
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```

reduce

第一次执行回调函数时，不存在“上一次的计算结果”。**如果**需要回调函数**从数组索引为 0 的元素开始执行**，则需要传递初始值。**否则**，数组索引为 0 的元素将被作为初始值 _initialValue_，迭代器将**从第二个元素开始执行**（索引为 1 而不是 0）。

```js
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10
```

## 24. V8 引擎

[v8 引擎介绍 1](https://blog.fundebug.com/2019/07/16/how-does-v8-work/)

[v8 引擎介绍 2](https://juejin.cn/post/6844904137792962567)

![image-20220921235225871](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20220921235225871.png)

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20220922091053574.png" alt="image-20220922091053574" style="zoom:67%;" />

执行过程如下：

1. parser 解析器 生成 AST 抽象语法树
2. interpreter 解释器 Ignition 生成 byteCode 字节码 并**直接执行**
3. 清除 AST 释放内存空间
4. 得到 25% - 50%的等效机器代码大小
5. compiler 运行过程中，解释器收集优化信息发送给编译器 TurboFan
6. 重新生成机器码
7. 有些热点函数变更会由优化后的机器码还原成字节码 也就是 deoptimization 回退字节码**操作执行**

优化点：

1. 值声明未调用，不会被解析生成 AST
2. 函数只被调用一次，bytcode 直接被解释执行，不会进入到编译优化阶段
3. 函数被调用多次，Igniton 会收集函数类型信息，可能会被标记为热点函数，可能被编译成优化后的机器代码

好处：

1. 由于一开始不需要直接编译成机器码，生成了中间层的字节码，从而节约了时间
2. 优化编译阶段，不需要从源码重新解析,直接通过字节码进行优化，也可以 deoptimization 回退操作

```javascript
function sum(x, y) {
  return x + y;
}
sum(1, 2);
sum(3, 4);
sum(5, 6);
sum("7", "8"); //会回退字节码操作执行
```

## 25. 跨域问题

### JSONP

当**协议号**和**域名**和**端口**都相同时，才符合同源策略。

当发生跨域时，**后端能收到**前端发送的请求，但是**前端不能收到**后端的响应。这是因为跨域原因，前端接收后端返回的数据时被<u>浏览器的跨域机制</u>**拦截了**。

JSONP 是一种**思想**，并不是一个方法， 有些请求是不会受到浏览器的同源策略的影响的。

例如：src、href

1. `<script src=""></script>`
2. `<img src="">`
3. `<link rel="stylesheet" href="">`

**JSONP**就是利用<u>script 的 src 属性加载资源时</u>**不受同源策略的影响**的这一特性，并且 script 会将引用的<u>外部文件</u>的<u>文本内容</u>**当做 js 代码**来进行解析。

即可以将原本跨域拿不到的数据使用`script`标签进行获取到，并将其当成 js 代码来进行解析，相当于解决了跨域问题，后续可以直接使用解析后的变量或函数等。

### CORS

### 反向代理

## 26. Promise

### 同步

`new Promise((resolve,reject)=>{//这里如果写的是同步代码，那么此时执行的就是同步代码})`，只有在`new Promise`中才**可能有同步情况**，在`then`中的都是**异步代码**。

### race

- 返回一个新的 Promise

- 传入 Promise 组成的数组，返回**最先执行**完成的 Promise，**状态**和**值**皆为此 Promise。

### all

- 返回一个新的 promise

- **只有**所有的 promise 的状态为**fulfilled**，其状态才为**fulfilled**，**否则**状态为**rejected**；
- 当所有的 Promise**都为成功时**，Promise 的**值**为数组中的**Promise 的值**组成的数组（三个 Promise 的值）；
- 当其中含有失败的 Promise 的话，返回的 Promise 的**值**为数组中**最靠前的**失败的 Promise 的值（单个，返回的是什么就是什么）。

### catch

只要**没有处理失败**，那么最后一定会被 catch 捕获

### finally

无论状态是`resolve` 或 `reject` 都会执行此动作，`finally` 与状态无关。

```js
const promise = new Promise((resolve, reject) => {
  reject("hdcms");
})
  .then((msg) => {
    console.log("resolve");
  })
  .catch((msg) => {
    console.log("reject");
  })
  .finally(() => {
    console.log("resolve/reject状态都会执行");
  });
```

### 状态修改

1.  resolve()：pending ===> resolved

2.  reject()： pending ===> rejected

3.  **抛出异常**: pending ===> **rejected**

### 中断传递

在回调函数中返回一个 `pendding` 状态的`promise 对象`，即不作 resolve/reject 处理，此时 finally 也不会执行，属于**完全中断**。

```js
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK");
  }, 1000);
});

p.then((value) => {
  console.log(111); //111
})
  .then((value) => {
    console.log(222); //222
    return new Promise((resolve, reject) => {});
  })
  .then((value) => {
    console.log(333); //上面的Promise状态没有发生改变，所以这里不执行
  })
  .finally(() => {
    console.log("finally也不执行");
  });
```

## 27. http 缓存

由于请求资源时**网速**很关键，请求资源比较**消耗带宽**，影响用户体验，通常缓存一般是缓存一些**不常变更**的 JS，CSS，Image 等

当浏览器**第一次**向某服务器请求资源，浏览器会检测本地缓存中是否存在缓存，此时由于是第一次发送请求所以没有缓存，当服务器接收到请求后，认为此次请求需要被缓存起来，于是在返回资源的同时在**响应头**中使用`Cache-Control:max-age=31536000`，如果认为不需要缓存的话则设置`Cache-Control:no-cache`

**后续请求**：浏览器会根据本次请求是否拥有本地缓存，如果有，则检查本地缓存是否过期，如果没有过期，则直接使用本地缓存而不重新发送与缓存相关的网络请求。

上述缓存机制又称为**强制缓存**，第一次请求或者在使用本地缓存时（缓存没有过期时）成功响应都是 200

**协商缓存**是一种**服务端缓存机制**，当第一次发送请求时，服务端返回资源和资源标识。

后续请求，浏览器携带资源标识，如果资源**没有变更**，则服务端返回**304**，即浏览器使用本**地缓存资源**，服务器不用发送过多资源。

如果资源**进行了变更**，则服务器重新发送资源给浏览器，同时状态码为**200**，即发送了**全新资源**

**资源标识**类型：

Last-Modify：只精确到秒级，精度不够。

ETag：使用字符串进行标识，比较精确，常用方法。

Cache-Control 值

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017164159749.png" alt="image-20221017164159749" style="zoom:50%;" />

协商缓存

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017165000106.png" alt="image-20221017165000106" style="zoom:50%;" />

由于 Last-Modified 是秒级，不准确

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017165316977.png" alt="image-20221017165316977" style="zoom:50%;" />

## 28. typeof/instanceof

## 29. 深拷贝

```js
function clone(target) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

## 30. 数组扁平化

### 实现

方法 1

```js
function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(flatten(arr));
```

方法 2

```js
const arr = [1, [[2, 3], 4], 5];
const flatten = (arr, deep = 1) => {
  if (deep <= 0) return arr;
  return arr.reduce(
    (res, curr) =>
      res.concat(Array.isArray(curr) ? flatten(curr, deep - 1) : curr),
    []
  );
};
// function flatten (arr,deep=1) {
// return   arr.reduce((acc,val) => acc.concat(Array.isArray(val)? flatten(val,deep-1):val),[])
// }
console.log(arr, Infinity);
```

### Array.prototype.reduce()

第一次执行回调函数时，不存在“上一次的计算结果”。**如果**需要回调函数**从数组索引为 0 的元素开始执行**，则需要传递初始值。**否则**，数组索引为 0 的元素将被作为初始值 _initialValue_，迭代器将**从第二个元素开始执行**（索引为 1 而不是 0）。

```js
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10
```

### Array.prototype.flat()

使用：flat()、flat(depth)，指定要提取嵌套数组的结构深度，默认值为 1。

```js
var arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
```

手写数组扁平化

针对**纯数字**或者**字符串数字**：

```js
const arr = ["1", [2, [3, [4, 5]]], 6];
// 针对数组元素为字符串或者纯数字
function flatten(arr) {
  return arr
    .toString()
    .split(",")
    .map((el) => parseInt(el));
}

console.log(flatten(arr)); // [1,2,3,4,5,6]
```

### String.prototype.split()

指定的分隔符字符串将一个[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)对象分割成子字符串**数组**，以一个指定的分割字串来决定每个拆分的位置。

```js
const str = "The quick brown fox jumps over the lazy dog.";

const words = str.split(" ");
console.log(words[3]);
// expected output: "fox"

const chars = str.split("");
console.log(chars[8]);
// expected output: "k"

const strCopy = str.split();
console.log(strCopy);
// expected output: Array ["The quick brown fox jumps over the lazy dog."]
```

### Array.prototype.toString()

将数组元素使用`,`进行分割组装成字符串，该字符串是一个整体。

### String.prototype.toString()

```js
const stringObj = new String("foo");

console.log(stringObj);
// expected output: String { "foo" }

console.log(stringObj.toString());
// expected output: "foo"
```

## 31. 正则

与普通函数操作字符串来比较，正则表达式可以写出更简洁、功能强大的代码。

下面使用**获取字符串中的所有数字**来比较函数与正则的差异。

```js
let hd = "houdunren2200hdcms9988";
let nums = [...hd].filter((a) => !Number.isNaN(parseInt(a)));
console.log(nums.join(""));
```

使用正则表达式将简单得多

```js
let hd = "houdunren2200hdcms9988";
console.log(hd.match(/\d/g).join(""));
```

正则表达式是用于**匹配字符串**中**字符组合**的模式

| \d  | 匹配任意一个数字                                     | [0-9]         |
| --- | ---------------------------------------------------- | ------------- |
| \D  | 与除了数字以外的任何一个字符匹配                     | [^0-9]        |
| \w  | 与任意一个英文字母,数字或下划线匹配                  | [a-zA-Z_]     |
| \W  | 除了字母,数字或下划线外与任何字符匹配                | [^a-za-z_]    |
| \s  | 任意一个空白字符匹配，如空格，制表符`\t`，换行符`\n` | [\n\f\r\t\v]  |
| \S  | 除了空白符外任意一个字符匹配                         | [^\n\f\r\t\v] |
| .   | 匹配除换行符外的任意字符                             |               |

### 创建

构造函数创建

```
/ab+c/i; //字面量形式
new RegExp('ab+c', 'i'); // 首个参数为字符串模式的构造函数
new RegExp(/ab+c/, 'i'); // 首个参数为常规字面量的构造函数
```

使用`//`进行包裹，使用 test 方法进行测试，返回布尔值。

```js
// 【正则表达式中不需要加引号（不管是字符型还是数字型）】

let regExjp = /12/; //只要包含了12都是true
console.log(regExjp.test("123")); //true

// ^表示开始，$表示结束【如果^和$同时出现，表示必须是精确匹配】
let regExp1 = /^1$/;
console.log(regExp1.test("1")); //true
console.log(regExp1.test("11")); //false

// []表示可选
let regExp2 = /[1234]/; //包含1234中任一数字都为真
console.log(regExp2.test("2")); //true

let regExp3 = /[a-zA-Z]/; //从a到z,从A到Z
console.log(regExp3.test("d")); //true

let regExp4 = /[a-zA-Z0-9]/; //从a到z,从A到Z,从0到9
console.log(regExp4.test("8")); //true
console.log("*".repeat(10));
console.log(regExp4.test("B")); //true

// 如果[]中包含了^，则表示取反，即不包含
let regExp5 = /[^1-8]/;
console.log(regExp5.test("8")); //false
console.log(regExp5.test("9")); //true
```

### 量词

```js
// 表示重复具体次数
let regExp1 = /^[0-5]{3}$/;
console.log(regExp1.test("123")); //true
console.log(regExp1.test("127")); //false
console.log(regExp1.test("12")); //false

//表示重复区间【加一个逗号，表示没有上限】
let regExp2 = /^[1-6]{2,}$/;
console.log("2*".repeat(10));
console.log(regExp2.test("124")); //true
console.log(regExp2.test("21")); //true
console.log(regExp2.test("45616")); //true
console.log(regExp2.test("2")); //false

//表示重复区间
let regExp3 = /^[a-g]{2,4}$/;
console.log("3*".repeat(10));
console.log(regExp3.test("bea")); //true
console.log(regExp3.test("hjalh")); //false

//*表示重复[0,+∞]次数
let regExp4 = /^[0-6]*$/;
console.log("4*".repeat(10));
console.log(regExp4.test("")); //true
console.log(regExp4.test("5")); //true
console.log(regExp4.test("21342144")); //true

//+表示重复[1，+∞]次数
let regExp5 = /^[0-8]+$/;
console.log("5*".repeat(10));
console.log(regExp5.test("")); //false
console.log(regExp5.test("324")); //true

//？表示出现0次或者1次
let regExp6 = /^[0-3]?$/;
console.log("6*".repeat(10));
console.log(regExp6.test("")); //true
console.log(regExp6.test("2")); //true
console.log(regExp6.test("222")); //false
```

### 预定义类使用

```js
// 一般的话，除了简单的设定数字字母等，还可以直接使用预定义类，这样会更简洁方便

//1   \d表示数字，\D表示除了数字之外的字符
let reg1 = /\d/;
console.log(reg1.test("h"));

//2   \w表示任意的字母数字下划线相当于[0-9a-zA-Z_] 、 \W表示取反

//3   \s匹配空格（换行符、制表符、空格等）相当于[\t\r\n\v\f]   \S表示取反
```

### 使用

匹配任意数字

```js
let hd = "houdunren 2010";
console.log(hd.match(/\d/g)); //["2", "0", "1", "0"]
```

匹配所有电话号码

```js
let hd = `
	张三:010-99999999,李四:020-88888888
`;

let res = hd.match(/\d{3}-\d{7,8}/g);
console.log(res);
```

获取所有用户名

```js
let hd = `
张三:010-99999999,李四:020-88888888`;
let res = hd.match(/[^:\d-,]+/g); //非（: 数字 -）
console.log(res);
```

匹配任意非数字

```js
console.log(/\D/.test(2029)); //false
```

匹配字母数字下划线

```js
let hd = "hdcms@";
console.log(hd.match(/\w/g)); //["h", "d", "c", "m", "s"]
```

匹配除了字母,数字或下划线外与任何字符匹配

```js
console.log(/\W/.test("@")); //true
```

匹配与任意一个空白字符匹配

```js
console.log(/\s/.test(" ")); //true
console.log(/\s/.test("\n")); //true
```

匹配除了空白符外任意一个字符匹配

```js
let hd = "hdcms@";
console.log(hd.match(/\S/g)); //["2", "0", "1", "0","@"]
```

如果要匹配点则需要转义

```js
let hd = `houdunren@com`;
console.log(/houdunren.com/i.test(hd)); //true
console.log(/houdunren\.com/i.test(hd)); //false
```

使用`.`匹配除换行符外任意字符，下面匹配不到`hdcms.com` 因为有换行符

```js
const url = `
  https://www.houdunren.com
  hdcms.com
`;
console.log(url.match(/.+/)[0]);
```

### RegExp.prototype.test()

**`test()`** 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 `true` 或 `false`。

```js
const str = "table football";

const regex = new RegExp("foo*");
const globalRegex = new RegExp("foo*", "g");

console.log(regex.test(str));
// expected output: true

console.log(globalRegex.lastIndex);
// expected output: 0

console.log(globalRegex.test(str));
// expected output: true

console.log(globalRegex.lastIndex);
// expected output: 9

console.log(globalRegex.test(str));
// expected output: false
```

### String.prototype.match()

match() 方法检索返回一个**字符串**匹配正则表达式的结果，**返回**的是符合正则要求的元素组成的**数组**。

用法：`str.match(regexp)`

- 使用 `g` 修饰符可以全局操作内容

- 使用`i`表示不区分大小写字母的匹配
- 上述 g 和 i 都是在正则表达式`//`外边书写

```js
const paragraph = "The quick brown fox jumps over the lazy dog. It barked.";
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]
```

### String.prototype.replace()

`str.replace(regexp|substr, newSubStr|function)`

```js
// 正则表达式参数为:【/表达式/[switch]】
// switch称为修饰符，可以设定按照什么样的模式来进行匹配
//g:全局匹配  i:忽略大小写  gi:全局匹配和忽略大小写
let a = "hello poLl";

// 使用replace只能替换一个
b = a.replace("l", "");
console.log(b); //helo poLl

// 使用g可以全局匹配相应的字符
let c = a.replace(/l/g, "9"); //he99o poL9
console.log(c);

//使用gi可以忽略大小写进行匹配
let d = a.replace(/l/gi, "9"); //he99o po99
console.log(d);

// 综合使用
let aa = "我买了一把玩具枪";
let aaa = aa.replace(/买|枪/g, "**"); //如果没有g的话也会识别不了两个
```

## 32. 函数柯里化

意义：**统一先收集**所有函数的**参数**，最后**统一进行处理**，提高了函数调用的灵活性。同时也可提高参数的复用性。

核心：使用函数递归（不知道具体函数个数）

以求和函数为例：下面的求和函数调用形式为：`add(x,y)`

```js
function add(x, y) {
  return x + y;
}
console.log(add(2, 1));
```

这里求和函数调用形式为`adds(x)(y)`

```js
function adds(x) {
  return function (y) {
    return x + y;
  };
}
console.log(adds(3)(1));
```

简单实现柯里化加法函数

核心：首次调用返回的是`add_`函数，但是如果在调用`add`函数时在其前面使用一个`+`则会触发函数的**隐式调用**机制，

```js
function add() {
  let arr = [...arguments];
  function add_() {
    arr.push(...arguments);
    return add_;
  }
  // 首次调用返回的是add_函数，但是如果在调用add_函数
  add_.toString = () => arr.reduce((pre, cur) => pre + cur);
  return add_;
}
console.log(+add(12, 2, 1)(3));
```

## 33. toString

### Number.prototype.toString(2)

将十进制转化为二进制

```js
let a = 7;
console.log(a.toString(2));
```

### 类型判断

`Obeject.prototype.toString.call()`

返回字符串类型的类型

```js
const test = Object.prototype.toString;

test.call(new Date()); // [object Date]
test.call(new String()); // [object String]
test.call(Math); // [object Math]

test.call(undefined); // [object Undefined]
test.call(null); // [object Null]

console.log(test.call(new Date()) === "[object Date]"); //true
```

### 进制转换

十进制转二进制

- Number.prototype.toString(2)

二进制转十进制

- parseInt(string/number,2)

## 34. 搜索框实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style></style>
  </head>

  <body>
    <div class="content">
      <div class="search">
        <input id="val" type="text" placeholder="请输入课程名称" />
        <input id="submit" type="submit" />
      </div>
      <div class="show"></div>
    </div>
    <script>
      let className = [
        "css",
        "html",
        "css面试",
        "JavaScript",
        "JavaScript核心",
        "css核心",
        "html核心",
      ];
      const val = document.querySelector("#val");
      const show = document.querySelector(".show");
      console.log(val, submit);
      val.addEventListener("keyup", () => {
        show.style.display = "block";
        let str = "";
        className.forEach((item) => {
          let re = item.indexOf(val.value);
          if (re != -1) {
            str += "<p>" + item + "</p>";
          }
        });
        if (!val.value || !str) {
          // console.log(show);
          show.innerHTML = "<p>暂无结果</p>";
        } else {
          show.innerHTML = str;
        }
      });
      val.addEventListener("blur", () => {
        show.style.display = "none";
        val.value = "";
      });
    </script>
  </body>
</html>
```

## 35. 函数重载

javascript 中没有真正意义上的函数重载，因为 javascript 中同一作用域下的同名函数，前者会被后者覆盖，但是可通过其他方法间接实现重载同样的效果，javascript 中的函数没有签名，它的参数是由包含零的多个数组来表示的。无函数签名的话重载是不可能做到的

但是我们可以简介方法实现重载效果，使用 arguments 对象，是函数内部的一个类数组对象，它里面保存着调用函数时，传递给函数的所有参数。 简单的讲就是使用逻辑判断，根据参数所在数组的长度来执行不同的代码

```js
function foo() {
  if (arguments.length === "条件1") {
    ("函数1");
  }
  if (arguments.length === "条件2") {
    ("函数2");
  }
}
```

重载的本质就是将多个功能相近的函数合并为同一个函数

## 36. ??使用

如果`??`左边为 undefined 或者 null，此时值取`??`右边的，反之则取`??`左边的

```js
let person = { name: "zsh" };
console.log(person?.age); //undefined
let re = person?.age ?? [];
console.log(re); //[]
let res = null ?? [];
console.log(res); //[]
```

## 37. 弱引用

下面的为强引用

```js
let a = [1, 2];
let b = a;
a = [];
console.log(b); //[1,2]
```

弱引用 WeakSet 的作用：“弱弱的引用，不会组织垃圾回收”，可以忽略其引用。即当 WeakSet 中的某个元素被赋值为 null，便会立即被垃圾回收。相反，如果在 Set 中的话，借鉴强类型，即便在外部将其设置为 null，此时由于在 Set 中的引用还在，便不会主动被垃圾回收。

WeakSet 常用语 DOM 操作中。

## 38. Proxy

- 如果没有 set 函数，那么所有关于赋值操作都无法生效
- 即使有 set 函数，如果没有书写`obj[key]=value`，那么赋值操作也不会生效

下面是一些应用示例：

使用 Proxy 对数组进行操作，截取超过十个字符以后的文字，并用`...`进行代替

```js
let a = [
  {
    name: "张三",
    des: "我来自江西，喜欢打乒乓球，我爱学习",
  },
  {
    name: "李四",
    des: "我来自福建，我喜欢打游戏，我也热爱学习",
  },
];

let proxy = new Proxy(a, {
  get(arr, key) {
    const desc = arr[key].des;
    arr[key].des =
      desc.length > 10 ? desc.substr(0, 10) + ".".repeat(3) : arr[key];
    return arr[key];
  },
});

console.log(proxy[0]); //{des: "我来自江西，喜欢打乒..." , name: "张三"}
console.log(a[0]); //{des: "我来自江西，喜欢打乒..." , name: "张三"}------------->转发成功
```

使用 Proxy 进行验证 1

```js
let validator = {
  set: function (obj, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer");
      }
      if (value > 200) {
        throw new RangeError("The age seems invalid");
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // 表示成功
    return true;
  },
};

let person = new Proxy({}, validator);

person.age = 100;

console.log(person.age);
// 100

person.age = "young";
// 抛出异常：Uncaught TypeError: The age is not an integer

person.age = 300;
// 抛出异常：Uncaught RangeError: The age seems invalid
```

使用 Proxy 进行验证 2

```js
let a = [1, 22, 999];
let proxy = new Proxy(a, {
  get(arr, key) {
    return arr[key];
  },
  set(obj, key, value) {
    // 这里的value才是真正传进来的值
    if (value > 120) {
      obj[key] = 100 + "岁以上";
    } else {
      obj[key] = value + "岁";
    }
    return true;
  },
});
proxy[0] = 130;
console.log(proxy[0]); //100岁以上
console.log(a[0]); //100岁以上
```

## 39. Vue 双向数据绑定

关于 document 根据属性取值

```html
<input type="text" v-model="title" />
<input type="text" v-model="title" />
<div v-bind="title"></div>
<script>
  title = "title";
  // let test = document.querySelectorAll(`[v-model=${title}]`)
  // let test = document.querySelectorAll('[v-model="title"]')
  let test = document.querySelectorAll("[v-model='title'],[v-bind='title']");
  console.log(test); //[input,input,div]
</script>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <input type="text" v-model="title" />
    <input type="text" v-model="title" />
    <div v-bind="title"></div>
    <script>
      class View {
        //设置代理拦截
        constructor() {
          this.proxy = new Proxy(
            {},
            {
              get(obj, property) {},
              set(obj, property, value) {
                obj[property] = value;
                // 收集所有v-model和v-bind属性的标签
                document
                  .querySelectorAll(
                    `[v-model="${property}"],[v-bind="${property}"]`
                  )
                  .forEach((el) => {
                    // 如果是v-model即为input标签，则将值赋给inpu.value
                    if (el instanceof HTMLInputElement) {
                      el.value = value;
                    } else {
                      // 如果是v-bind即为本例中的div标签，则将值赋给div的innerHTML
                      el.innerHTML = value;
                    }
                  });
                return true;
              },
            }
          );
        }
        //初始化绑定元素事件
        run() {
          let that = this;
          const els = document.querySelectorAll("[v-model]");
          els.forEach((item) => {
            item.addEventListener("keyup", function () {
              that.proxy[this.getAttribute("v-model")] = this.value;
            });
          });
        }
      }
      new View().run();
    </script>
  </body>
</html>
```

## 40. Symbol 使用

Symbol 用于防止属性名冲突而产生的，比如向第三方对象中添加属性时。

Symbol 的值是唯一的，独一无二的不会重复的

```js
let hd = Symbol();
let edu = Symbol();
console.log(hd); //symbol
console.log(hd == edu); //false
```

### Symbol.for

根据描述获取 Symbol，如果不存在则新建一个 Symbol

- 使用 Symbol.for 会在系统中将 Symbol 登记
- 使用 Symbol 则不会登记

### 缓存操作

核心：源数据要有 symbol，缓存数据时使用 symbol 当做**键值**来进行存储

```js
class Cache {
  static data = {};
  static set(key, value) {
    this.data[key] = value;
  }
  static get(key) {
    return this.data[key];
  }
}

let user = {
  name: "张三",
  key: Symbol("我是个男的"),
};

let cart = {
  name: "张三",
  key: Symbol("我是个女的"),
};

Cache.set(user.key, user);
Cache.set(cart.key, cart);
console.log(Cache.get(user.key));
```

## 41. class

### 属性

[ES2022](https://github.com/tc39/proposal-class-fields) 为类的实例属性，又规定了一种新写法。实例属性现在除了可以定义在`constructor()`方法里面的`this`上，也可以定义在类内部的最顶层。

```javascript
// 原来的写法
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log("Getting the current value!");
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

上面示例中，实例属性`_count`定义在`constructor()`方法里面的`this`上面。

现在的新写法是，这个属性也可以定义在类的最顶层，其他都不变。

```javascript
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log("Getting the current value!");
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

上面代码中，实例属性`_count`与取值函数`value()`和`increment()`方法，处于同一个层级。这时，不需要在实例属性前面加上`this`。

注意，新写法定义的属性是实例对象自身的属性，而不是定义在实例对象的原型上面。

这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

```javascript
class foo {
  bar = "hello";
  baz = "world";

  constructor() {
    // ...
  }
}
```

上面的代码，一眼就能看出，`foo`类有两个实例属性，一目了然。另外，写起来也比较简洁。

### 静态方法：

[原文链接](https://es6.ruanyifeng.com/#docs/class)

如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。

```js
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log("hello");
  }
  baz() {
    console.log("world");
  }
}

Foo.bar(); // hello
```

父类的静态方法，可以被子类继承。

```js
class Foo {
  static classMethod() {
    return "hello";
  }
}

class Bar extends Foo {}

Bar.classMethod(); // 'hello'
```

上面代码中，父类`Foo`有一个静态方法，子类`Bar`可以调用这个方法。

静态方法也是可以从`super`对象上调用的。------------------------>以下例子足以说明 oob 的**多态**性质

```js
class Foo {
  static classMethod() {
    return "hello";
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ", too";
  }
}

Bar.classMethod(); // "hello, too"
```

[ES2022](https://github.com/tc39/proposal-class-fields)正式为`class`添加了私有属性，方法是在属性名之前使用`#`表示。

### 静态属性

```javascript
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
```

### 私有方法

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装。

但早期的 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。

```javascript
class Widget {
  // 公有方法
  foo(baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return (this.snaf = baz);
  }

  // ...
}
```

上面代码中，`_bar()`方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是**不保险**的，在类的外部，还是可以调用到这个方法。

**正式用法：**

[ES2022](https://github.com/tc39/proposal-class-fields)正式为`class`添加了私有属性，方法是在属性名之前使用`#`表示。

```javascript
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log("Getting the current value!");
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
```

### in 运算符

[ES2022](https://github.com/tc39/proposal-private-fields-in-in) 改进了`in`运算符，使它也可以用来判断私有属性。

```javascript
class C {
  #brand;

  static isC(obj) {
    if (#brand in obj) {
      // 私有属性 #brand 存在
      return true;
    } else {
      // 私有属性 #foo 不存在
      return false;
    }
  }
}
```

上面示例中，`in`运算符判断某个对象是否有私有属性`#foo`。它不会报错，而是返回一个布尔值。

这种用法的`in`，也可以跟`this`一起配合使用。

```javascript
class A {
  #foo = 0;
  m() {
    console.log(#foo in this); // true
    console.log(#bar in this); // false
  }
}
```

注意，判断私有属性时，`in`只能用在类的内部。

子类从父类继承的私有属性，也可以使用`in`运算符来判断。

```javascript
class A {
  #foo = 0;
  static test(obj) {
    console.log(#foo in obj);
  }
}

class SubA extends A {}

A.test(new SubA()); // true
```

上面示例中，`SubA`从父类继承了私有属性`#foo`，`in`运算符也有效。

## 42. 前端模块化

### commonjs

- 使用**赋值表达式**进行导出

- 使用 exports、module.exports 作为关键字进行导出，使用 require 关键字进行导入
- 使用**exports.xxx=......**进行导出时总会**包裹一层对象**，接收时可以进行解构。-------------->**分别暴露**
- 使用**module.exports=......**进行导出，**导出什么就是什么**，即当做一个完整模块进行导出--------->“**相当于 es6 的默认暴露**”
- 同一个文件中**不能同时出现**exports、module.exports 进行导出，会覆盖。

#### exports

分别暴露

**例 1：**

a.js

```js
exports.a = 1;
```

b.js

```js
const aa = require("./a.js");
console.log(aa); //{a:1}
```

**例 2：**

a.js

```js
exports.Test = class {
  constructor() {}
  test() {
    console.log("haha");
  }
};
```

b.js

```js
const re = require("./a");
console.log(re); //{ Classs: [class (anonymous)] }
const a = new re.Test();
a.test(); //'haha'
```

#### module.exports

**例 3：**

使用 module 关键字，表示整体导出，**导出的是什么就是什么**，使用 require 来接收即可

a.js

```js
module.exports = function () {
  console.log("haha");
};
```

b.js

```js
const re = require("./a");
console.log(re); //[Function (anonymous)]
re(); //'haha'
```

**例 4：**

a.js

```js
module.exports = {
  name: "zsh",
  test: function () {
    console.log("haha");
  },
};
```

b.js

```js
const re = require("./a");
console.log(re); //{ name: 'zsh', test: [Function: test] }
```

### ES6

使用 export，import 关键字进行导出导入

#### export

**具名导出**如果想获取具体某个变量则**必须使用**<u>解构赋值</u>的形式来进行取值，**或者**使用**`*`**来进行代替

b.js

```js
export const a = "haha";
export const b = {
  name: "zsh",
};
```

a.html【导入**法 1**】

```js
import { a, b } from "./b.js";
console.log(a); // 'haha'
```

a.html【导入**法 2**】

```js
import * as aa from "./b.js";
console.log(aa); // Module {Symbol(Symbol.toStringTag): 'Module'}
console.log(aa.a); // 'haha'
```

#### export default

使用**任意变量**进行接收，**导出什么就是什么**

b.js

```js
export default {
  str: "haha",
};
```

a.html

```js
import test from "./b.js";
console.log(test); //{str: 'haha'}
```

## 43. 数组考法

#### map 和 forEach 区别

- map 会**返回一个新数组**，但是如果回调函数中没有 return 关键字则 return 回来一个全为 undefined 的数组。正常操作**不会改变原数组**，**但是**可以通过 callBack**更改原数组**。
- forEach**不会**<u>返回数组</u>。可以通过 callBack**更改原数组**，一般用于 DOM 操作。
- **都可以**通过 callBack 来**更改原数组**

```js
let arr = [1, 2, 3, 4, 5, 6];
let a = arr.forEach((item, index, arr) => console.log(item, index));
console.log(a);
let b = arr.map((item, index, arr) => item + 1);
console.log(b);
console.log(arr);
```

forEach 通过 callBack**更改原数组**，不返回新数组

```js
let arr = [1, 2, 3, 4, 5, 6];
let a = arr.forEach((item, index, arr) => (arr[index] = arr[index] + 2));
console.log(arr); //[3, 4, 5, 6, 7, 8]
```

map 通过 callBack**更改原数组**，返回新数组

```js
let arr = [1, 2, 3, 4, 5, 6];
let b = arr.map((item, index, arrs) => {
  arrs[index] = arrs[index] + 2;
  return item * 2;
});
console.log(b); // [2, 4, 6, 8, 10, 12]
console.log(arr); //[3, 4, 5, 6, 7, 8]
```

## DNS 解析过程

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017162131284.png" alt="image-20221017162131284" style="zoom: 67%;" />

首先进行本地解析

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017162043366.png" alt="image-20221017162043366" style="zoom:50%;" />

总体流程

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017162711039.png" alt="image-20221017162711039" style="zoom: 50%;" />

# 二、Vue3 源码

## 0. 遗漏知识点

vscode 中【转到】可以快速定位到指定文件，快捷键为`Ctrl+P`，可以搜索指定文件。

## 1. 环境搭建流程

1. 下载源码

2. 使用 pnpm 安装依赖

3. package.json 文件中的 dev 脚本后加上` --sourcemap`，之后直接`pnpm run dev`运行起来

   ![image-20221003164355634](C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221003164355634.png)

## 2. 源码关键

### 虚拟 DOM

[原文链接](https://www.bilibili.com/video/BV1JR4y1R7Ln/?spm_id_from=333.999.0.0)

`renderer.ts`的 patchKey 关键字处

虚拟 DOM 是表示真实 DOM 的 js 对象，DIFF 算法的核心目的就是**最小化的更新 DOM 结构**，本质就是找出两个 js 对象的差异。

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017171128292.png" alt="image-20221017171128292" style="zoom:67%;" />

对比流程

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017172227126.png" alt="image-20221017172227126" style="zoom:67%;" />

同级比对

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017172342985.png" alt="image-20221017172342985" style="zoom:67%;" />

对比细节

<img src="C:\Users\90484\AppData\Roaming\Typora\typora-user-images\image-20221017172938196.png" alt="image-20221017172938196" style="zoom:67%;" />
