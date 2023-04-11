---
title: JS终极总结
tags: []
categories: []
date: 2022-04-01 23:08:07
---
# Object

## 常见API

### Object.entries

> `Object.entries()`方法**返回**一个给定对象自身可枚举属性的**键值对数组**，其排列与使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举**原型链中的属性**）。

```js
const object1 = {
  a: 'somestring',
  b: 42
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// expected output: "a: somestring" / "b: 42"
```

将Object转化为Map

[`new Map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 构造函数接受一个可迭代的`entries`。借助`Object.entries`方法可以很容易的将[`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)转换为[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map):

```js
var obj = {
    foo: "bar",
    baz: 42
};
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
```

## getter/setter



## Proxy

**Proxy** 对象用于创建一个**对象**的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。Proxy的特点如下：

* `setter/getter` 是对**单个对象属性**的控制，而代理是对整个**对象**的控制。

- 读写属性时代码更简洁
- 对象的多个属性控制统一交给代理完成
- 严格模式下 `set` 必须返回布尔值

### 使用方法

> `const p = new Proxy(target, handler)`
>
> target：要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生**数组**，**函数**，甚至**另一个代理**）。
>
> handler：一个通常以函数作为属性的**对象**，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

#### **1.`handler.get()`** 

用于拦截对象的**读取属性**操作，常用前两个参数，get方法可以**返回任何值**

```js
var p = new Proxy(target, {
    get: function (target, property, receiver) {}
});
```

#### 2.**`hander.set()`**

**设置属性值**操作的捕获器，**常用前两个参数**，**receiver**为Proxy或者继承Proxy的对象

```js
const p = new Proxy(target, {
    set: function (target, property, value, receiver) {}
});
```

特别注意：读取、设定值都必须**经过代理**才能使得get和set生效，如果直接**改变原对象**，那么get和set方法都不会生效，但是此时**代理对象的值**确实已经**改变了**

牛刀小试

```js
let obj = {
    name: 'zsh',
    age: 18
}
let handler = {
    get(obj, key) {
        // if (obj[key] == 'zsh')
        if (key == 'name') return 'crazyzsh'
    },
    set(obj, key, value) {
        if (key == 'age') {
            obj[key] = 118
        }
    }
}
let objProxy = new Proxy(obj, handler)

// 获取值【此时会触发get()方法，上述get方法中，只要一读取到name属性，它的返回值就是读取到的值】
console.log(objProxy.name);

// 修改值【此时会触发set()方法，上set方法中，只要通过代理设定age值，那么age值就是设定的age值】
objProxy.age = 17
console.log(objProxy);
```

#### **3.`handler.apply()`** 

用于拦截函数的调用，相关参数如下：

* target：目标对象（函数）
* thisArg：被调用时的上下文对象
* argumentsList：被调用时的参数数组
* 返回值：apply方法可以返回任何值

```js
var p = new Proxy(target, {
    apply: function (target, thisArg, argumentsList) {}
});
```

例子：

```js
function sum(a, b) {
    return a + b;
}

const handler = {
    apply: function (target, thisArg, argumentsList) {
        console.log(`Calculate sum: ${argumentsList}`); // expected output: "Calculate sum: 1,2"
        return target(argumentsList[0], argumentsList[1]) * 10;
    }
};

const proxy1 = new Proxy(sum, handler);

console.log(sum(1, 2)); // expected output: 3

console.log(proxy1(1, 2)); // expected output: 30
```

### 实用例子

#### 截取字符串

```js
const handler = {
    // 当代理的是数组时，此时的index就为索引
    get(target, key) {
        const title = target[key].title;
        // 指定截取长度
        const len = 5;
        return title.length > len ?
            title.substr(0, len) + ".".repeat(3) :
            title;
    }
};
const lessons = [{
        title: "媒体查询响应式布局",
        category: "css"
    },
    {
        title: "FLEX 弹性盒模型",
        category: "css"
    },
    {
        title: "MYSQL多表查询随意操作",
        category: "mysql"
    }
];
const stringDotProxy = new Proxy(lessons, handler);
console.log(stringDotProxy[2]); //MYSQL...
```

#### 双向绑定

```html
<body>
    <input type="text" v-model="title" />
    <input type="text" v-model="title" />
    <div v-bind="title"></div>
    <script>
        function View() {
            //设置代理拦截
            let proxy = new Proxy({}, {
                get(obj, property) {},
                set(obj, property, value) {
                    obj[property] = value;
                    document
                        .querySelectorAll(
                            `[v-model="${property}"],[v-bind="${property}"]`
                        )
                        .forEach(el => {
                            el.innerHTML = value;
                            el.value = value;
                        });
                }
            });
            //初始化绑定元素事件
            this.run = function () {
                const els = document.querySelectorAll("[v-model]");
                els.forEach(item => {
                    item.addEventListener("keyup", function () {
                        proxy[this.getAttribute("v-model")] = this.value;
                    });
                });
            };
        }
        let view = new View().run();
    </script>
</body>
```

#### 表单验证

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            padding: 50px;
            background: #34495e;
        }

        input {
            border: solid 10px #ddd;
            height: 30px;
        }

        .error {
            border: solid 10px red;
        }
    </style>
</head>

<body>
    <input type="text" validate rule="max:12,min:3" />
    <input type="text" validate rule="max:3,isNumber" />
    <script>
        "use strict";
        //验证处理类
        class Validate {
            max(value, len) {
                return value.length <= len;
            }
            min(value, len) {
                return value.length >= len;
            }
            isNumber(value) {
                return /^\d+$/.test(value);
            }
        }

        //代理工厂
        function makeProxy(target) {
            return new Proxy(target, {
                get(target, key) {
                    return target[key];
                },
                set(target, key, el) {
                    const rule = el.getAttribute("rule");
                    const validate = new Validate();
                    let state = rule.split(",").every(rule => {
                        const info = rule.split(":");
                        return validate[info[0]](el.value, info[1]);
                    });
                    el.classList[state ? "remove" : "add"]("error");
                    return true;
                }
            });
        }

        const nodes = makeProxy(document.querySelectorAll("[validate]"));
        nodes.forEach((item, i) => {
            item.addEventListener("keyup", function () {
                nodes[i] = this;
            });
        });
    </script>
</body>

</html>
```



# Array

## 常见API

### entries

常与`for...of`搭配进行**数组遍历**，重点是可以**同时直接获取**到**数组的索引**

```js
var arr = ["a", "b", "c"];
for (const item of arr.entries()) {
    console.log(item);
}
// [0, "a"]
// [1, "b"]
// [2, "c"]
```

### forEach

> 接收三个参数，分别为当前条目、当前条目所处索引、操作的数组

```js
a.forEach((item, index, arr) => {
    console.log(item, index, arr);
})
```

### reduce

如果没有指定`initialValue`值，则循环`arr.length-1`次，否则循环`arr.length`次

- `previousValue`：上一次调用 `callbackFn` 时的**返回值**，假如回调函数没有返回值，那么此时值为undefined，第一次除外。在第一次调用时，若指定了初始值 `initialValue`，其值则为 `initialValue`，否则为数组索引为 0 的元素 `array[0]`。
- `currentValue`：数组中正在处理的元素。在第一次调用时，若指定了初始值 `initialValue`，其值则为数组索引为 0 的元素 `array[0]`，否则为 `array[1]`。
- `currentIndex`：数组中正在处理的元素的索引。若指定了初始值 `initialValue`，则起始索引号为 0，否则从索引 1 起始。
- `array`：用于遍历的数组。

```js
let arr = [1, 3, 6, 1, 8, 3, 5, 1]

//求和
function _sum(arr) {
    return arr.reduce((pre, cur) => pre + cur, 0)
}
//求最大值
function _max(arr) {
    return arr.reduce((pre, cur) => pre > cur ? pre : cur)
}
//求某成员出现次数
function _count(arr, num) {
    return arr.reduce((pre, cur) => pre += cur === num ? 1 : 0, 0)
}

console.log(_sum(arr)); //28
console.log(_max(arr)); //8
console.log(_count(arr, 1)); //3
```



# Map

Map是一组键值对的结构，**用于解决**以往**不能用对象做为键**的问题

- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键或值

## 1. 声明定义

可以接受一个数组作为参数，该数组的**成员是**一个**表示键值对的数组**。

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 18]
])
map.get('name') //张三疯
```

使用`set` 方法添加元素，支持链式操作

```js
let map = new Map();
let obj = {
    name: "张三疯"
};

map.set(obj, "太极").set("address", "武当");

console.log(map); // Map(2) {{…} => '太极', 'address' => '武当'}
console.log(map.entries()); //MapIterator {{…} => "houdunren.com", "name" => "hdcms"}
```

使用构造函数`new Map`创建的原理如下

```js
const map = new Map();
const arr = [
    ["name", "张三疯"],
    ["age", "128"]
];

arr.forEach(([key, value]) => {
    map.set(key, value);
});
console.log(map);
```

对于键是对象的`Map`， 键保存的是内存地址，值相同但内存地址不同的视为两个键。

```js
let arr = ['张三疯'];
const map = new Map();
map.set(arr, 118);
console.log(map.get(arr)); //118
//这里get中的['张三疯'] 内存地址和arr不一样
console.log(map.get(["张三疯"])); //undefined
```

## 2. 获取数量

> map.size，size为属性

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])
map.set('address', '武当')
console.log(map.size); //3
```

## 3. 元素检测

>map.has(key)

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])
console.log(map.has('name'));
```

## 4. 获取元素

> map.get(key)

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])
console.log(map.has('name'));
```

## 5. 删除元素

根据键值删除元素

> map.delete(key)

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])
console.log(map.delete('name'));
```

删除所有元素

> map.clear()

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])
console.log(map.size) //2
map.clear()
console.log(map.size); //0

```

## 6. 遍历数据

> 使用keys()、values()、entries() 都可以返回可遍历的迭代对象

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])
console.log(map.keys()); //MapIterator {'name', 'age'}
console.log(map.values()); //MapIterator {'张三疯', 118}
console.log(map.entries()); //MapIterator {'name' => '张三疯', 'age' => 118}
```

可以使用keys()和values()函数分别遍历键与值

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])

for (const key of map.keys()) {
    console.log(key);
}

for (const value of map.values()) {
    console.log(value);
}

for (const value of map.entries()) {
    console.log(value);
} //['name', '张三疯']、['age', 118]
```

> 使用`for...of`进行遍历Map相当于使用entries()函数

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])
for (const [key, value] of map) {
    console.log(key, value);
}
for (const item of map) {
    console.log(item);
}//['name', '张三疯']、['age', 118]
```

> 使用`forEach`遍历操作【此时的第一个参数为value，第二个参数为key】

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])
map.forEach((value, key) => {
    console.log(key, value);
})//name,张三疯、 age,118
```

## 7. 数组转换

> 可以使用`展开语法` 将Map类型转为数组

```js
let map = new Map([
    ["name", "张三疯"],
    ['age', 118]
])
console.log([...map.values()]); //['张三疯',118]
console.log([...map.keys()]); //['name','age']
console.log(...map); // ["name", "张三疯"], ['age', 118]
console.log(...map.keys()); //name age
```

检索值长度大于2组成新的Map

```js
let map = new Map([
    ["name", "张三"],
    ['age', 9],
    ["alias", "刘三姐"]
])
let newArr = [...map].filter(item => item[1].length > 2)
map=new Map(newArr)
console.log(newArr);
```

## 8. 节点集合

map的key可以为任意类型，下面使用DOM节点做为键来记录数据。

```html
<body>
    <div desc="NB">zsh</div>
    <div desc="强">crazyzsh</div>
    <script>
        const divs = document.querySelectorAll("div");
        const divMap = new Map();
        // 将desc属性值压入新创建的divMap中
        divs.forEach(div => {
            divMap.set(div, {
                content: div.getAttribute("desc")
            });
        });
        divMap.forEach((value, key) => {
            key.addEventListener("click", function () {
                alert(divMap.get(this).content);
            });
        });
    </script>
</body>

```

## 9. 实例操作

当不接受协议时无法提交表单，并根据自定义信息提示用户。

```js
<form action="" onsubmit=" post()">
    接受协议:
    <input type="checkbox" name="agreement" message="请接受接受协议" />
    我是学生:
    <input type="checkbox" name="student" message="网站只对学生开放" />
    <input type="submit" />
</form>
<script>
    function post() {
        let map = new Map();

        let inputs = document.querySelectorAll("[message]");
        //使用set设置数据
        inputs.forEach(item =>
            map.set(item, {
                message: item.getAttribute("message"),
                status: item.checked
            })
        );

        //遍历Map数据
        return [...map].every(([item, config]) => {
            config.status || alert(config.message);
            return config.status;
        });
    }
</script>

```

# WeakMap

## 1. 定义

**WeakMap** 对象是一组键/值对的集

- **键名**必须是**对象**
- WeaMap对键名是弱引用的，键值是正常引用

- 垃圾回收不考虑WeaMap的键名，不会改变引用计数器，键在其他地方不被引用时即删除
- 因为WeakMap 是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行`forEach( )`遍历等操作
- 也是因为弱引用，WeaMap 结构没有keys( )，values( )，entries( )等方法和 size 属性

## 2. 使用场景

* 当键的外部引用删除时，希望自动删除数据时使用 `WeakMap`

## 3. 声明定义

将DOM节点保存到`WeakSet`

```html
<body>
    <div>zsh</div>
    <div>crazyzsh</div>
    <script>
        const weak = new WeakMap();
        document
            .querySelectorAll("div")
            .forEach(item => weak.set(item, item.innerHTML));
        console.log(weak); //WeakMap {div => "zsh", div => "crazyzsh"}
    </script>
</body>
```

## 4. 基本操作

除了不能使用keys( )，values( )，entries( )等方法和 size 属性，其余与Map一致

```html
<body>
    <div>zsh</div>
    <div>crazyzsh</div>
    <script>
        const weak = new WeakMap();
        const arr = ["zsh", "crazyzsh"];
        //添加操作
        weak.set(arr, "NB");
        console.log(weak.has(arr)); //true

        //删除操作
        weak.delete(arr);

        //检索判断
        console.log(weak.has(arr)); //false
    </script>
</body>
```

## 5. 垃圾回收

WakeMap的键名对象**不会增加引用**计数器，如果一个对象不被引用了会自动删除。

- 下例当`zsh`删除时内存即清除，因为WeakMap是弱引用不会产生引用计数，此时虽然可以打印值，但是**键已经为空**了
- 当**垃圾回收**时因为对象被删除，这时WakeMap也就**没有记录**了

```html
<script>
    let weak = new WeakMap();
    let zsh = {};
    weak.set(zsh, "crazyzsh");
    zsh = null;
    console.log(weak);//WeakMap {{…} => 'crazyzsh'}

    setTimeout(() => {
        console.log(weak);//WeakMap {}
    }, 1000);
</script>
```

## 6. 选课案例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        body {
            padding: 20px;
            width: 100vw;
            display: flex;
            box-sizing: border-box;
        }

        div {
            border: solid 2px #ddd;
            padding: 10px;
            flex: 1;
        }

        div:last-of-type {
            margin-left: -2px;
        }

        ul {
            list-style: none;
            display: flex;
            width: 200px;
            flex-direction: column;
        }

        li {
            height: 30px;
            border: solid 2px #e67e22;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 10px;
            color: #333;
            transition: 1s;
        }

        a {
            border-radius: 3px;
            width: 20px;
            height: 20px;
            text-decoration: none;
            text-align: center;
            background: #16a085;
            color: white;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
        }

        .remove {
            border: solid 2px #eee;
            opacity: 0.8;
            color: #eee;
        }

        .remove a {
            background: #eee;
        }

        p {
            margin-top: 20px;
        }

        p span {
            display: inline-block;
            background: #16a085;
            padding: 5px;
            color: white;
            margin-right: 10px;
            border-radius: 5px;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <div>
        <ul>
            <li><span>php</span> <a href="javascript:;">+</a></li>
            <li><span>js</span> <a href="javascript:;">+</a></li>
            <li><span>python</span><a href="javascript:;">+</a></li>
        </ul>
    </div>
    <div>
        <strong id="count">共选了2门课</strong>
        <p id="lists"></p>
    </div>
    <script>
        class Lesson {
            constructor() {
                this.lis = document.querySelectorAll("ul>li");
                this.countELem = document.getElementById("count");
                this.listElem = document.getElementById("lists");
                this.map = new WeakMap();
            }
            run() {
                this.lis.forEach(item => {
                    item.querySelector("a").addEventListener("click", event => {
                        const elem = event.target;
                        const state = elem.getAttribute("select");
                        if (state) {
                            elem.removeAttribute("select");
                            this.map.delete(elem.parentElement);
                            elem.innerHTML = "+";
                            elem.style.backgroundColor = "green";
                        } else {
                            elem.setAttribute("select", true);
                            this.map.set(elem.parentElement, true);
                            elem.innerHTML = "-";
                            elem.style.backgroundColor = "red";
                        }
                        this.render();
                    });
                });
            }
            count() {
                return [...this.lis].reduce((count, item) => {
                    return (count += this.map.has(item) ? 1 : 0);
                }, 0);
            }
            lists() {
                return [...this.lis]
                    .filter(item => {
                        return this.map.has(item);
                    })
                    .map(item => {
                        return `<span>${item.querySelector("span").innerHTML}</span>`;
                    });
            }
            render() {
                this.countELem.innerHTML = `共选了${this.count()}课`;
                this.listElem.innerHTML = this.lists().join("");
            }
        }
        new Lesson().run();
    </script>
</body>
</html>
```

# Set

用于存储任何类型的**唯一值**，无论是基本类型还是对象引用。

- **只能保存值**没有键名
- 严格类型检测如**字符串**数字不等于**数值型**数字
- 值是**唯一**的
- 遍历顺序是添加的顺序，方便保存回调函数

## 1. 背景 

对象的**键**最终都会转为**字符串**

```js
let obj = {
    1: "zsh",
    "1": "crazy"
};
console.table(obj); //{1:"zsh"}
```

使用对象做为键名时，会将对象转为字符串后使用

```js
let obj = {
    1: "zsh",
    "1": "crazy"
};

let crazyzsh = {
    [obj]: "NB"
};
console.log(crazyzsh);
//将对象转换成字符串后 当键名 来使用
console.log(crazyzsh[obj.toString()]);
console.log(crazyzsh["[object Object]"]);
```

## 2. 添加元素

使用数组做初始数据

```js
let set = new Set(['crazy', 'zsh'])
console.log(set); //Set(2) {'crazy', 'zsh'}
```

Set 中是严格类型约束的，下面的数值`1`与字符串`"1"`属于两个不同的值

```js
let set = new Set()
set.add(1);
set.add("1");
console.log(set); //Set(2) {1, "1"}
```

使用 `add` 添加元素，重复添加相同值是无效的

## 3. 获取数量

```js
let set = new Set(['crazy', 'zsh'])
console.log(set.size); //2
```

## 4. 元素检测

```js
let set = new Set(['crazy', 'zsh'])
console.log(set.has('zsh')); //true
```

## 5. 删除元素

使用 `delete` 删除单个元素，删除成功返回真，否则为假

```js
let set = new Set(['crazy', 'zsh'])
console.log(set.delete('zsh')); //true
```

使用 `clear` 删除所有元素，没有返回值

```js
let set = new Set(['crazy', 'zsh'])
set.clear()
console.log(set); //Set(0) {size: 0}
```

## 6. 数组转换

可以使用`点语法` 或 `Array.form` 静态方法将Set类型转为数组，这样就可以使用数组处理函数了

```js
let set = new Set(['crazy', 'zsh'])
console.log([...set]); //['crazy', 'zsh']
console.log(Array.from(set)); //['crazy', 'zsh']
```

移除set中大于5的值

```js
//一般是传数组的，当传入 单个字符串 的话就会将其转换成Set
let set = new Set("123456789");
console.log(set); //Set(9) {'1', '2', '3', '4', '5', …}

set = new Set([...set].filter(item => item < 5));
console.log(set); //Set(4) {'1', '2', '3', '4'}
```

## 7. 去重

去除字符串重复

```js
let set = new Set("hello"); //此刻已经进行了去重
console.log([...set].join('')); //helo
```

去除数组重复

```js
let arr = [1, 2, 3, 5, 2, 3];
arr = [...new Set(arr)]
console.log(arr); // 1,2,4,5
```

## 8. 遍历数据

使用 `keys()/values()/entries()` 都可以返回迭代对象，因为`set`类型只有值所以 `keys与values` 方法结果一致。

```js
const set = new Set(["zsh", "crazyzsh"]);
console.log(hd.values()); //SetIterator {"zsh", "crazyzsh"}
console.log(hd.keys()); //SetIterator {"zsh", "crazyzsh"}
console.log(hd.entries()); //SetIterator {"zsh" => "zsh", "crazyzsh" => "crazyzsh"}
```

可以使用 `forEach` 遍历Set数据，默认使用 `values` 方法创建迭代器。

为了保持和遍历数组参数统一，函数中的value与key是一样的。

```js
let arr = [7, 6, 2, 8, 2, 6];
let set = new Set(arr);
//使用forEach遍历【item、key值一致】
set.forEach((item,key) => console.log(item,key));
```

也可以使用 `for...of` 遍历Set数据，默认使用 `values` 方法创建迭代器

```js
//使用for...of遍历
let set = new Set([7, 6, 2, 8, 2, 6]);

for (const iterator of set) {
	console.log(iterator);//7 6 2 8 
}
```

## 9. 搜索实例

利用Set特性将搜索关键字进行保存并显示在历史记录中

```html
<body>
    <input type="text">
    <ul></ul>
    <script>
    let obj = {
        words: new Set(),
        set keyword(word) {
            this.words.add(word);
        },
        show() {
            let ul = document.querySelector('ul');
            ul.innerHTML = '';
            this.words.forEach((item) => {
                ul.innerHTML += ('<li>' + item + '</li>');
            })
        }
    }

    document.querySelector('input').addEventListener('keyup', function (event) {
        // 按下enter键进行确定
        if (event.keyCode == 13) {
            obj.keyword = this.value;
            obj.show();
        }

    });
</script>
</body>

```

## 10. 交集

获取两个集合中共同存在的元素

```js
let set1 = new Set(['zsh', 'crazy', 'crazyzsh']);
let set2 = new Set(['crazy', 'NB']);
let newSet = new Set(
    [...set1].filter(item => set2.has(item))
);
console.log(newSet); //{"crazy"}
```

## 11. 差集

在集合a中出现但不在集合b中出现元素集合

```js
let a = new Set(['zsh', 'crazy', 'crazyzsh']);
let b = new Set(['crazy', 'NB']);
let newSet = new Set(
    [...a].filter(item => !b.has(item))
);
console.log(newSet); //{"zsh","crazyzsh"}
```

## 12. 并集

```js
let a = new Set(['zsh', 'crazy', 'crazyzsh']);
let b = new Set(['crazy', 'NB']);
let newSet = new Set([...a, ...b]);
console.log(newSet); //Set(4) {'zsh', 'crazy', 'crazyzsh', 'NB'}
```

# WeakSet

WeakSet结构同样不会存储重复的值，它的成员必须**只能**是**对象类型**的值。

- 垃圾回收不考虑WeakSet，即被WeakSet引用时引用计数器不加一，所以对象不被引用时不管WeakSet是否在使用都将删除
- 因为WeakSet 是弱引用，由于其他地方操作成员可能会不存在，所以**不可以**进行`forEach( )`遍历等操作
- 也是因为弱引用，WeakSet 结构**没有**keys( )，values( )，entries( )等方法和size属性

## 1. 使用场景

- 因为是弱引用所以当外部引用删除时，希望自动删除数据时使用 `WeakMap`

## 2. 添加元素

以下操作由于数据不是对象类型将产生错误

```js
new WeakSet(["zsh", "crazy"]); //Invalid value used in weak set

new WeakSet("crazyzsh"); //Invalid value used in weak set
```

WeakSet的值必须为对象类型

```js
let weak = new WeakSet([
    ['zsh'],
    ['crazyzsh'],
    {
        description: "NB"
    }
])

console.log(weak);
```

将DOM节点保存到`WeakSet`

```html
<body>
    <button name="button1">按钮1</button>
    <button name="button1">按钮2</button>
    <script>
        let buttons = document.querySelectorAll('button')
        let targetButtons = new WeakSet()
        buttons.forEach(item => {
            targetButtons.add(item)
        })
        console.log(targetButtons);
    </script>
</body>
```

## 3. 基本操作

除了size()、keys()、values()、entries()不能用之外，其余与Set一致，下面是WeakSet的常用指令

```js
const weak = new WeakSet();
const arr = ["zsh"];
//添加操作
weak.add(arr);
console.log(weak.has(arr));

//删除操作
weak.delete(arr);

//检索判断
console.log(weak.has(arr));
```

## 4. 垃圾回收

WeaSet保存的对象**不会增加**引用计数器，如果一个对象不被引用了会自动删除。

- 下例中的数组被 `arr` 引用了，引用计数器+1
- 数据又添加到了 weak 中，引用计数还是1
- 当 `arr` 设置为null时，引用计数-1 此时对象引用为0
- 当垃圾回收时对象被删除，这时weak也就没有记录了

```js
const weak = new WeakSet();
let arr = ["crazyzsh"];
weak.add(arr);
console.log(weak.has(arr)); //true

arr = null;
console.log(weak); //WeakSet {Array(1)}

setTimeout(() => {
    console.log(weak); //WeakSet {}
}, 1000);
```

## 5. 案例操作

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        body {
            padding: 200px;
        }

        ul {
            list-style: none;
            display: flex;
            width: 200px;
            flex-direction: column;
        }

        li {
            height: 30px;
            border: solid 2px #e67e22;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 10px;
            color: #333;
            transition: 1s;
        }

        a {
            border-radius: 3px;
            width: 20px;
            height: 20px;
            text-decoration: none;
            text-align: center;
            background: #16a085;
            color: white;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
        }

        .remove {
            border: solid 2px #eee;
            opacity: 0.8;
            color: #eee;
        }

        .remove a {
            background: #eee;
        }
    </style>
</head>


<body>
    <ul>
        <li>crazy<a href="javascript:;">x</a></li>
        <li>zsh <a href="javascript:;">x</a></li>
        <li>crazyzsh<a href="javascript:;">x</a></li>
    </ul>
</body>

<script>
    class Todos {
        constructor() {}
        run() {
            this.items = document.querySelectorAll("ul>li");
            this.lists = new WeakSet();
            this.record();
            this.addEvent();
        }
        addEvent() {
            this.items.forEach(item => {
                item.querySelector("a").addEventListener("click", event => {
                    //检测WakeSet中是否存在Li元素【event.target.parentElement为点击的a元素的父元素li】
                    const parentElement = event.target.parentElement;
                    if (!this.lists.has(parentElement)) {
                        alert("已经删除此TODO");
                    } else {
                        //删除后从记录的WakeSet中移除
                        parentElement.classList.add("remove");
                        this.lists.delete(parentElement);
                    }
                });
            });
        }
        record() {
            this.items.forEach(item => this.lists.add(item));
        }
    }
    new Todos().run();
</script>


</html>
```

# Function

## this

### 普通函数

* 构造函数（类）：this指向实例出来的对象
* 以函数的形式调用时，this永远都是window
* 以方法的形式进行调用，this就是调用方法的那个对象

### 箭头函数

箭头函数没有`this`, 也可以理解为箭头函数中的`this` 会继承定义函数时的上下文，可以理解为**和外层函数（作用域）**指向**同一个this**。

- 如果想使用函数定义时的上下文中的this，那就使用箭头函数
- 本着新特性的原则，尽量使用箭头函数（还是得视情况而定）
- 事件函数可理解为对象`onclick`设置值，所以函数声明时`this`为当前对象

### 例题分析

#### 例1【混合】

由于直接返回的是一个函数，此时不应该将其当成方法来进行分析；返回的是一个箭头函数，得知其this应当指向定义时的上下文，此时箭头函数中的this指向的是方法sayName中的this，由于此时为对象中的方法为普通函数，就必须考虑是谁来调用的，此时的调用者为obj，所以打印出来的为对象中的name

```js
let name = '张三疯'
let obj = {
    name: 'zsh',
    sayName: function () {
        return () => {
            console.log(this.name);
        }
    }
}
obj.sayName()() //'zsh'
```

#### 例2【混合】

返回的是一个箭头函数，得知其this应当指向定义时的上下文，此时箭头函数中的this指向的是方法sayName中的this，由于此时为对象中的方法为普通函数，就必须考虑是谁来调用的，此时的调用者为window，所以打印出来的为window中的name

```js
let name = '张三疯'
let obj = {
    name: 'zsh',
    sayName: function () {
        return () => {
            console.log(this.name);
        }
    }
}
let temp = obj.sayName
temp()() //'张三疯'
```

例1例2结论： 只要对象中的**方法**为**普通函数**，此时就必须关注是谁进行调用的

#### 例3【混合】

返回出来的为函数，this指向的就是window

```js
let name = '张三疯'
let obj = {
    name: 'zsh',
    sayName: () => {
        return function () {
            console.log(this.name);
        }
    }
}
obj.sayName()() //'张三疯'
```

#### 例4【普通】

由于直接返回的是一个函数，此时不应该将其当成方法来进行分析，返回的是普通函数，所以其this指向的就是window

````js
let name = '张三疯'
let obj = {
    name: 'zsh',
    sayName: function () {
        return function(){
            console.log(this.name);
        }
    }
}
obj.sayName()() //'张三疯'
````

#### 例5【普通】

当方法的**调用者**为**对象本身**

```js
let name = '张三疯'
let obj = {
    name: 'zsh',
    sayName: function () {
        console.log(this.name);
    }
}
obj.sayName() //'zsh'
```

#### 例6【普通】

当方法的**调用者**为**window**

```js
let name = '张三疯'
let obj = {
    name: 'zsh',
    sayName: function () {
        console.log(this.name);
    }
}
obj.sayName() //'zsh'
let temp = obj.sayName
temp() //'张三疯'
```

#### 例7【箭头】

由于箭头函数没有this指向，所以此时的this指向的是上一级作用域中的this【常见的话只有函数才能构成作用域，所以此时上一级作用域指的是定义该函数时的作用域】，又由于对象中的`{}`大括号不构成作用域，所以此时在箭头函数中的this指向的是window

```js
let name = '张三疯'
let obj = {
    name: 'zsh',
    sayName: () => {
        console.log(this.name);
    }
}
obj.sayName() //'张三疯'
```

#### 例8【箭头】

当使用的是箭头函数时，就不用考虑到底是谁进行调用的，只需考虑其上一级作用域即可。只有在**普通函数中**才要**注意**函数的**调用者**是哪一个。

```js
let name = '张三疯'
let obj = {
    name: 'zsh',
    sayName: () => {
        console.log(this.name);
    }
}
let temp = obj.sayName
temp() //'张三疯'
```

#### 例9【箭头】

从最里面的箭头函数分析，由于其是函数而并不是方法，其this指向定义时的上下文，即方法sayName，又由于sayName为箭头函数，其this指向的是window，所以此时的this指向的就是window

```js
let name = '张三疯'
let obj = {
    name: 'zsh',
    sayName: () => {
        return () => {
            console.log(this.name);
        }
    }
}
obj.sayName()() //'张三疯'
```

#### 例10

```js
let lesson = {
    study: "i love",
    lists: ["js", "css", "mysql"],
    show() {
        return this.lists.map(title => {
            return `${this.study}:${title}`;
        });
    }
};
console.log(lesson.show()); // ['i love:js', 'i love:css', 'i love:mysql']
```

#### 例11

此时this位于普通函数中，所以指向的为window

```js
let Lesson = {
    study: "i love",
    lists: ["js", "css", "mysql"],
    show() {
        return this.lists.map(function (title) {
            return `${this.study}:${title}`;
        });
    }
};
console.log(Lesson.show());// ['undefined:js', 'undefined:css', 'undefined:mysql']
```



#### 例12

数组中的map函数可以指定第二个参数，用于指定this的指向，此时传入的就是方法中的this，即对象

```js
let lesson = {
    study: "i love",
    lists: ["js", "css", "mysql"],
    show() {
        return this.lists.map(function (title) {
            return `${this.study}:${title}`;
        }, this);
    }
};
console.log(lesson.show());// ['i love:js', 'i love:css', 'i love:mysql']
```

#### 例13

在父作用域中定义引用`this`的变量

```js
let Lesson = {
    study: "i love",
    lists: ["js", "css", "mysql"],
    show() {
        // 使用变量将this进行保存
        let that = this
        return this.lists.map(function (title) {
            return `${that.study}:${title}`;
        });
    }
};
console.log(Lesson.show()); //['i love:js', 'i love:css', 'i love:mysql']
```

#### 例14

使用普通函数时`this`为当前DOM对象

```html
<body>
    <button desc="this is a test">button</button>
    <script>
        let Dom = {
            name: "crazyzsh",
            bind() {
                const button = document.querySelector("button");
                button.addEventListener("click", function () {
                    alert(this.getAttribute("desc"));
                });
            }
        };
        Dom.bind();
    </script>
</body>
```

#### 例15

使用箭头函数时this指向上下文对象

```html
<body>
    <button desc="test">无敌是多么寂寞</button>
    <script>
        let Dom = {
            name: "crazyzsh",
            bind() {
                const button = document.querySelector("button");
                button.addEventListener("click", event => {
                    alert(this.name + event.target.innerHTML);
                });
            }
        };
        Dom.bind();
    </script>
</body>
```

#### 例16

使用`handleEvent`绑定事件处理器时，`this`指向当前对象而不是DOM元素。

```html
<body>
    <button desc="this is a test">button</button>
    <script>
        let Dom = {
            name: "crazyzsh",
            handleEvent: function (event) {
                console.log(this); //{name: 'crazyzsh', handleEvent: ƒ, bind: ƒ}
            },
            bind() {
                const button = document.querySelector("button");
                button.addEventListener("click", this);
            }
        };
        Dom.bind();
    </script>
</body>
```



## 回调函数

在某个时刻被其他函数调用的函数称为回调函数

1. 下面是一个常规的通过传入函数的形式来形成的一个回调函数的例子

```js
function sayName(name) {
    console.log(`我叫${name}啊`)
}

//调用回调函数，同时将参数传入回调函数中
function introduction(name, age, callback) {
    //此时进行调用，callback称为回调函数
    callback(name)
    console.log(`我今年${age}岁了`);
}

introduction('zsh', 18, sayName)//我叫zsh  我今年18岁了
```

2. 处理键盘、鼠标事件的函数

    ```html
    <button id='button'>button</button>
    <script>
         document.getElementById('button').addEventListener('click', () => alert('通过回调函数调用'));
    </script>
    ```

3. 使用回调函数递增计算

```js
let arr = [1, 2, 3].map(item => item + 10);
console.log(arr)
```



## closure



# DOM常用API

## className

设定类名

## classList

### add

```js
const div = document.createElement('div');
div.className = 'foo';

// 初始状态：<div class="foo"></div>
console.log(div.outerHTML);

// 使用 classList API 添加类值
div.classList.add("anotherclass");
// 添加多个类值
div.classList.add("bar", "baz");
// 使用展开语法添加多个类值
const cls = ["foo", "bar"];
div.classList.add(...cls);
```

### remove

```js
const div = document.createElement('div');
div.className = 'foo';

// 初始状态：<div class="foo"></div>
console.log(div.outerHTML);

// 使用 classList API 添加类值
div.classList.remove("foo");
// 移除多个类值
div.classList.remove("foo", "bar", "baz");
// 使用展开语法移除多个类值
const cls = ["foo", "bar"];
div.classList.remove(...cls);
```

### replace

```js
const div = document.createElement('div');
div.className = 'foo';
// 如果 visible 类值已存在，则移除它，否则添加它
div.classList.toggle("visible");
```

### toggle

```js
const div = document.createElement('div');
div.className = 'foo';
// 将类值 "foo" 替换成 "bar"
div.classList.replace("foo", "bar");
```

## cookie/session

浏览器的缓存机制提供了可以将用户数据**存储在客户端**上的方式，可以利用cookie，session等**跟服务端**进行**数据交互**。

cookie和session都是用来跟踪浏览器用户身份的会话方式。

### 区别

#### 1、保持状态

cookie保存在浏览器端，session保存在服务器端

#### 2、使用方式：

cookie机制：如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，这种cookie简称会话cookie。如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失。

Cookie是服务器发给客户端的特殊信息，cookie是以文本的方式保存在客户端，每次请求时都带上它

session机制：当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否包含sessionid。如果有sessionid，服务器将根据该id返回对应session对象。如果客户端请求中没有sessionid，服务器会创建新的session对象，并把sessionid在本次响应中返回给客户端。通常使用cookie方式存储sessionid到客户端，在交互中浏览器按照规则将sessionid发送给服务器。如果用户禁用cookie，则要使用URL重写，可以通过response.encodeURL(url) 进行实现；API对encodeURL的结束为，当浏览器支持Cookie时，url不做任何处理；当浏览器不支持Cookie的时候，将会重写URL将SessionID拼接到访问地址后。

#### 3、存储内容：

cookie只能保存字符串类型，以文本的方式；session通过类似与Hashtable的数据结构来保存，能支持任何类型的对象(session中可含有多个对象)

#### 4、存储的大小：

cookie：单个cookie保存的数据不能超过4kb；session大小没有限制。

#### 5、安全性：

cookie：针对cookie所存在的攻击：Cookie欺骗，Cookie截获；session的安全性大于cookie。

原因如下：

（1）sessionID存储在cookie中，若要攻破session首先要攻破cookie；

（2）sessionID是要有人登录，或者启动session_start才会有，所以攻破cookie也不一定能得到sessionID；

（3）第二次启动session_start后，前一次的sessionID就是失效了，session过期后，sessionID也随之失效。

（4）sessionID是加密的

（5）综上所述，攻击者必须在短时间内攻破加密的sessionID，这很难。



#### 6、应用场景：

cookie：

（1）判断用户是否登陆过网站，以便下次登录时能够实现自动登录（或者记住密码）。如果我们删除cookie，则每次登录必须从新填写登录的相关信息。

（2）保存上次登录的时间等信息。

（3）保存上次查看的页面

（4）浏览计数

![](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/202204021510199.png)

session：Session用于保存每个用户的专用信息，变量的值保存在服务器端，通过SessionID来区分不同的客户。

（1）网上商城中的购物车

（2）保存用户登录信息

（3）将某些数据放入session中，供同一用户的不同页面使用

（4）防止用户非法登录

#### 7、缺点：

cookie：

（1）大小受限

（2）用户可以操作（禁用）cookie，使功能受限

（3）安全性较低

（4）有些状态不可能保存在客户端。

（5）每次访问都要传送cookie给服务器，浪费带宽。

（6）cookie数据有路径（path）的概念，可以限制cookie只属于某个路径下。

 session：

（1）Session保存的东西越多，就越占用服务器内存，对于用户在线人数较多的网站，服务器的内存压力会比较大。

（2）依赖于cookie（sessionID保存在cookie），如果禁用cookie，则要使用URL重写，不安全

（3）创建Session变量有很大的随意性，可随时调用，不需要开发者做精确地处理，所以，过度使用session变量将会导致代码不可读而且不好维护。

### 设置cookie

```js
document.cookie = "name=oeschger";
document.cookie = "favorite_food=tripe";
alert(document.cookie);
// 显示: name=oeschger;favorite_food=tripe
```

### 获取cookie

```js
document.cookie = "test1=Hello";
document.cookie = "test2=World";

//使用正则表示进行获取
var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");

alert(myCookie);// 显示: World
```





## WebStorage

### 本地存储

随着互联网的快速发展，基于网页的应用越来越普遍，同时也变得越来越复杂，为了满足各种各样的需求，会经常在本地存储大量的数据，HTML5规范提出了相关的解决方案。

本地存储特性

* 数据存储在用户浏览器中
* 设置、读取方便，甚至页面刷新都不会丢失数据
* 容量较大，sessionStorage大约5M，localStorage约20M
* 只能存储字符串，可以将对象经过`JSON.stringify(obj)`编码后进行存储

### 使用背景

WebStorage的目的是**克服由cookie所带来的一些限制**，当数据需要被严格控制在客户端时，不需要持续的将数据发回服务器。

WebStorage两个主要目标：

（1）提供一种在cookie之外存储会话数据的路径。

（2）提供一种存储大量可以跨会话存在的数据的机制。

HTML5的WebStorage提供了两种API：localStorage（本地存储）和sessionStorage（会话存储）。

#### 1、生命周期：

* localStorage:localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。

* sessionStorage的生命周期是在仅在当前会话下有效。sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。

#### 2、存储大小：

localStorage和sessionStorage的存储数据大小一般都是：5MB

#### 3、存储位置：

localStorage和sessionStorage都保存在客户端，不与服务器进行交互通信。

#### 4、存储内容类型：

localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理

#### 5、获取方式：

* localStorage：window.localStorage;

* sessionStorage：window.sessionStorage;

#### 6、应用场景：

* localStoragese：常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据；
* sessionStorage：敏感账号一次性登录；

#### 7、WebStorage的优点：

（1）存储空间更大：cookie为4KB，而WebStorage是5MB；

（2）节省网络流量：WebStorage**不会传送到服务器**，存储在本地的数据可以直接获取，也不会像**cookie**一样**每次请求都会传送到服务器**，所以减少了客户端和服务器端的交互，**节省**了网络**流量**；

（3）对于那种只需要在用户浏览一组页面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage会非常方便；

（4）快速显示：有的数据存储在WebStorage上，再加上浏览器本身的缓存。获取数据时可以从本地获取会比从服务器端获取快得多，所以**速度更快**；

（5）安全性：WebStorage不会随着HTTP header发送到服务器端，所以安全性**相对于cookie**来说比**较高**一些，不会担心截获，但是仍然存在伪造问题；

（6）WebStorage提供了一些方法，数据操作比cookie方便；

*  setItem (key, value) ——  保存数据，以键值对的方式储存信息。

* getItem (key) ——  获取数据，将键值传入，即可获取到对应的value值。

* removeItem (key) ——  删除单个数据，根据键值移除对应的信息。

* clear () ——  删除所有的数据

* key (index) —— 获取某个索引的key

### localStorage常见API

* 声明周期永久有效，除非手动删除，否则关闭页面也会存在
* 可以多窗口（页面）共享（同一浏览器可以共享）
* 以键值对的形式进行存储

#### 存储数据

```js
localStorage.setItem(key, value)
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
    <input type="text" id='username'>
    <input type="checkbox" name="" id="remember">记住用户名
    <script>
        let username = document.querySelector('#username')
        let remember = document.querySelector('#remember')
        if (localStorage.getItem('username')) {
            username.value = localStorage.getItem('username')
            remember.checked = true
        }
        remember.addEventListener('change', function () {
            if (this.checked) {
                localStorage.setItem('username', username.value)
            } else {
                localStorage.removeItem('username')
            }
        })
    </script>
</body>
```



### sessionStorage常见API

* 声明周期为关闭浏览器
* 在同一窗口（页面）下数据可以共享
* 以键值对的形式进行存储

#### 存储数据

```js
sessionStorage.setItem(key, value)
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



