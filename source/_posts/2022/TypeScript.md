---
title: TypeScript初级
tags: [web,ts]
categories: [web,ts]
date: 2022-01-02 12:36:31
---
# 一、基础：

## 1. 安装配置

* 安装：
  `npm i typescript -g`

* 查看是否安装成功：
`tsc -v`

* vscode直接编译ts：直接使用命令（每修改ts文件就得重新编译一次，及其不方便）

  `tsc foldName.ts`

* vscode开发配置【法一】：

  * 在目录中使用`tsc --init`命令生成tsconfig.json配置文件
  * 在tsconfig.json文件中将outDir的属性值改成自定义目录，并将其解注释
  * 依次选择【终端】==>【运行任务】==>【typescript】==>【tsc：监视 - tsconfig.json】
  * 此后每新建一个ts文件只要保存了就会在outDir中生成相应的js文件

* vscode开发配置【法二】：

  * 在3中加上`-w`参数进行监听即可
  * `tsc foldName -w`

## 2. 声明变量类型

### 2.1前提

* 讲究先入为主，如果一开始**不指定数据类型**
  * 那么**初始值**的**数据类型**就是该变量的类型
  * 对象以及数组复杂数据类型也是如此
  * 数据一经赋值，后续对数据的操作都会提示此数据的类型

### 2.2 基本数据类型

* string：
  * `let a:string="xxx"`===>直接声明且赋值
  * `let b="xxx"`===>相当于是隐式声明类型且赋值
  * `let b:string`===>只声明类型，不进行赋值
* boolean：
  * `let isTrue:boolean=false`
  * `let isFalse=true`
  * `let a:boolean`
* number……

### 2.3 复杂数据类型

* 数组
  * `let a:string[]=[]`===>全为字符串类型的数组
  * `let aa:Array<string|boolean=[]`===>泛型表达：既有string类型又有布尔型的数组（不论先后）
* 对象
  * `let obj1:{name:string,age:number}={}`===>直接将对象限定为真正形式上的对象，并将对象属性值的数据类型确定（赋值时只能有这两个属性，且必须要有这两个属性）
  
    
  
  * `let obj2:object=[];  obj2={}`===>首先确定obj2为一个对象，先将一个数组赋值给它（数组也是对象），最后又将其改为对象{}，实际上数据类型没有改变
  
    
  
  * `let obj1:{name:string, age:number, sex?:number}={}`===>直接将对象限定为真正形式上的对象，并将对象属性值的数据类型确定，其中加上`?`表示是可选类型，即该属性可写可不写，写了的属性一定要包括

### 2.4 组合类型

* 基本数据类型
  * `let a:string|number|boolean=1`
* 复杂数据类型
  * `let obj:Array<number|boolean|string|object>`===>泛型表达
  * `let arr:(number|string|boolean)[]=[]`===>如果仅限于定义一个数组的类型可以多样的话，就必须使用`()`包起来
  * `let arr:string|number[]="hello world"`===>表示arr**既可以**是string类型的字符串，**也可以**是number类型的数组

### 2.4 any & unknow & as

* any可以是任何类型，unknown就任何类型都不是

* as：用于类型转换，具体用法见下例

```typescript
let a:string="666"
//这里肯定不行
let b:number=a
但是可以通过以下方式进行转换可以进行赋值
let b:number=a as unknow as number
```



### 2.5 void & never

* void一般用于函数，确定函数是否有返回值，类型只能是**null**和**undefined**

	```typescript
	//以下函数直接返回的是string类型，说明有具体返回类型，不符合类型void，故在编译时会报错
	function run():void{
	  return "hello"
  }
	
	//将函数改为以下的话就不会报错
	function run():void|string{
    return "hello"
	}
	```
	
* never一般用于函数没有进行完成的情景，例如抛出异常

	```typescript
	function run():never{
		throw new Error("类型错误")
	}
	```
	
* void和never的最大区别就是never一般用于没有执行到尽头的情景，而void则是用于没有返回值的完整函数中



### 2.6 undefined & null

默认情况下，undefined和null可以变成简单类型的值，如果不想出现这种情况，可以在tsconfig.json中将`"strictNullChecks": true`进行解注释

```typescript
let a:string="hello"
a=undefined
a=null
```

## 3. 函数类型

### 3.1 函数声明

```typescript
//自动推断（以下为字符型）
let run=()=>"hello"

//使用大写开头的Function进行声明
let run:Function=()=>{
	console.log("hello")
}
```

### 3.2 参数声明

* 直接进行限定参数

  ```typescript
  //直接进行限定
  functin(num1:string,isTrue:boolean){}
  
  //限定可选参数
  functin( isTrue:boolean, radio?:string ){
        可选参数：如果传入则取其值，否则为"hello"
        radio=radio||"hello" 
  }
  ```

### 3.3 返回值声明

* 普通函数【没有返回值的应该写上void，使得代码更规范】

	```typescript
	//没有返回值
	function run():void{
		console.log("hello")
	}
	
	//有返回值
	function run(num1,num2):number{
	    return num1+num2
	}
	```
	
* 箭头函数

  ```typescript
  //没有返回值
  let run =():void=>{
  	console.log("hello")
  }
  
  //有返回值
  let run =(num1,num2):number=>{
  	return num1+num2
  }
  ```
  

### 3.4 type声明函数参数

* 目的：**减少重复声明**函数**参数**

  ```typescript
  //第一次声明
  let addUser: (user: { name: string, age: number }) => boolean;
  
  //再次使用了相同的声明
  addUser = (u: { name: string, age: number }): boolean => {
      console.log('添加用户');
      return true;
  }
  ```

* 简化后：

  ```typescript
  //注意这里是赋值的形式
  type userType = { name: string, age: number }
  
  let addUser: (user: userType) => boolean;
  
  //直接使用type定义的参数类型
  addUser = (u: userType): boolean => {
      console.log('添加用户');
      return true;
  }
  
  addUser({ name: '张三', age: 12 })
  ```

* 使用type将**函数结构**进行约束

  ```typescript
  type userType = { name: string, age: number }
  
  type addUserFunc = (user: userType) => boolean;
  
  let addUser: addUserFunc = (u: userType): boolean => {
      console.log('添加用户');
  
      return true;
  }
  
  addUser({ name: '张三', age: 12 })
  ```

### 3.5 剩余参数

* 下面的求合函数接收多个参数

  ```typescript
  function sum(...args: any[]): number {
      return args.reduce((s, n) => s + n, 0);
  }
  
  console.log(sum(1, 2, 3, 4, 5));
  ```

* 下面通过第二个参数接收剩余参数，来实现数据追加的示例

  ```typescript
  function push(arr: any[], ...args: any[]): any[] {
      arr.push(...args)
      return arr;
  }
  
  const name: any[] = ['张三']
  
  console.log(push(name, '李四', '王五')); // [ '张三','李四', '王五' ]
  ```

### 3.6 元组

元组要为每个值进行类型声明（包括顺序问题），而数组则没有这么严格

* 数组定义

  ```typescript
  const arr: (number | string | boolean)[] = ['张三', 2030, true];
  
  arr[1] = '李四' //不会报错，可以将原来是数值的更改为字符串，这是数组允许的类型范围
  arr[10] = 10			//不会报错，类型也是允许的
  console.log(arr);
  ```

* 元组定义

    ```typescript
    const hd: [string, number] = ['张三', 2030]
    hd[0] = true //报错，第一个值必须是字符串
    ```

* 注意数组和元组的定义的区别，

  * 元组直接在`[]`中进行定义的
  * 数组需要`()`进行定义且加上空的`[]`

# 二、枚举与断言

## 1. enum枚举

- 不设置值时，值以0开始递增

  ```typescript
  enum SexType {
      BOY, GIRL
  }
  
  const hd = {
      name: '张三',
      sex: SexType.GIRL
  }
  
  console.log(hd); //{ name: '张三', sex: 1 }
  ```

* 当某个字段设置数值类型的值后，后面的在它基础上递增

  ```typescript
  enum SexType {
      BOY = 1, GIRL
  }
  
  const hd = {
      name: '张三',
      sex: SexType.GIRL
  }
  
  console.log(hd); //{ name: '张三', sex: 2 }
  ```

* 将值设置为其他类型

  ```text
  enum SexType {
      BOY = '男', GIRL = '女'
  }
  
  const hd = {
      name: '张三',
      sex: SexType.GIRL
  }
  
  console.log(hd); //{ name: '张三', sex: '女' }
  ```

## 2. as断言

as 断言的意思就是用户断定这是什么类型，不使用系统推断的类型，说白了就是『我说是什么，就是什么』

**基本用法**：

* 下例中TS 会根据函数推断变量 f 的类型是 string | number

  ```typescript
  function hd(arg: number) {
    return arg ? '张三' : 2030
  }
  
  let f = hd(1) //let f: string | number
  ```

* 断言方式一：

  ```typescript
  function hd(arg: number) {
    return arg ? '张三' : 2030
  }
  
  let f = hd(1) as string //let f: string
  ```

* 断言方式二：

  ```typescript
  function hd(arg: number) {
    return arg ? '张三' : 2030
  }
  
  let f = <string>hd(1) //let f: stri
  ```

## 3. const断言

### 3.1 基本类型断言

* 限定 user 类型为最窄类型`张三`

  ```typescript
  //let声明之后使用const断言之后就不可以再改了
  let user = '张三' as const
  user = '张三'
  ```


### 3.2 复杂数据类型

* 对象转换为只读属性

  ```
  let user = { name: '张三' } as const
  user.name = 'houdunren' //因为是只读属性，所以不允许设置值
  ```

* 数组赋值

  * 没有使用const断言

    ```typescript
    let a = '张三'
    let b = 2039
    
    let hd = [a, b] 	//let hd: (string | number)[]
    let f = hd[1] 	//let f: string | number
    f = '李四' 	//不报错，因为类型是 string | number
    ```

  * 使用了const断言【方式1】

    ```typescript
    let a = '张三'
    let b = 2039
    
    let hd = [a, b] as const //let hd: readonly [string, number]
    let f = hd[1] //let f: number
    f = 'hello' //报错，变量 b 的类型 number,不能赋值为 string
    ```

  * 使用了const【方式2】

    ```typescript
    let a = '张三'
    let b = 2039
    
    let hd = <const>[a, b] //let hd: readonly [string, number]
    let f = hd[1] //let f: number
    f = 199 
    ```

### 3.3 解构

* js缺陷

  ```typescript
  function hd() {
    let a = 'houdunren.com'
    let b = (x: number, y: number): number => x + y
    return [a, b]
  }
  let [n, m] = hd() //变量 m 的类型为 string | ((x: number, y: number)=> number)
  
  m(1, 6) //报错：因为类型可能是字符串，所以不允许调用
  ```

* 【方式一】断言m为函数后再调用

  ```typescript
  function hd() {
    let a = 'houdunren.com'
    let b = (x: number, y: number): number => x + y
    return [a, b]
  }
  let [n, m] = hd()
  console.log((m as Function)(1, 2))
  //使用以下类型声明都是可以的
  console.log((m as (x: number, y: number) => number)(1, 5)
  ```

* 【方式二】在调用时对返回值断言类型

  ```typescript
  function hd() {
    let a = 'houdunren.com'
    let b = (x: number, y: number): number => x + y
    return [a, b]
  }
  
  let [n, m] = hd() as [string, (x: number, y: number) => number]
  console.log(m(9, 19))
  ```

* 【方式三】在函数体内声明返回类型

  ```typescript
  function hd() {
    let a = 'houdunren.com'
    let b = (x: number, y: number): number => x + y
    return [a, b] as [typeof a, typeof b]
  }
  
  let [n, m] = hd()
  console.log(m(9, 19))
  ```

* 【方式四】在函数体内声明返回类型

  ```typescript
  function hd() {
    let a = '张三'
    let b = (): void => {}
    return [a, b] as const
  }
  
  const [x, y] = hd() //变量 y 的类型为 () => void
  ```

## 4. null/undefined

* 默认情况下 null 与undefined 可以赋值给其他类型

  ```typescript
  let hd: string = '张三'
  hd = null
  hd = undefined
  ```

* 修改 tsconfig.json 配置文件的`strictNullChecks` 解注释，则不能将 null、undefined 赋值给其他类型

* 以下才可以进行赋值为null/undefine

  ```typescript
  let hd: string |undefiend|null = 'houdunren.com'
  hd = null
  hd = undefined
  ```

  

## 5. 非空断言

开启 tsconfig.json 的配置项strictNullChecks 字段为 true进行测试：

* 下面的示例获取的值可能为HTMLDivElement或null，所以直接分配类型“HTMLDivElement”将报错误

  ```typescript
  const el: HTMLDivElement = document.querySelector('.hd') 
  console.log(el.id);
  ```

* 使用 as 断言类型

  ```typescript
  const el: HTMLDivElement = document.querySelector('.hd') as HTMLDivElement
  console.log(el.id);
  ```

* 在值后面使用 `!` 来声明值非null

  ```typescript
  const el: HTMLDivElement = document.querySelector('.hd')!
  console.log(el.id);
  ```

## 6. DOM

开启 tsconfig.json 的配置项strictNullChecks 字段为 true

创建html文件如下：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>test</title>
        <script src="1.js" defer></script>
    </head>
    <body>
        <div class="hd">houdunren.com</div>
        <button id="bt">插入元素</button>
    </body>
</html>
```

### 6.1 类型推断

* body等具体标签可以准确标签类型或 null

  ```typescript
  const body = document.querySelector('body') //const body: HTMLBodyElement|null
  ```

* 根据class 等获取不能准确获取标签类型，推断的类型为 Element|null

  ```typescript
  const el = document.querySelector('.hd') //const el: Element | null
  ```

### 6.2 null处理

* 针对于其他标签元素，返回值可能为null，所以使用 `as` 断言或`!`处理

  ```typescript
  let div = document.querySelector('div') as HTMLDivElement//const div: HTMLDivElement
  //或使用
  div = document.querySelector('div')! //非空断言
  console.log(div.id);
  ```

### 6.3 断言处理

* 使用`as` 将类型声明为 `HTMLAnchorElement` 则 TS 会将其按 a 链接类型处理

  ```typescript
  //现在所有的提示将是 a 链接属性或方法
  const el = document.querySelector('.hd') as HTMLAnchorElement //const el: HTMLAnchorElement
  console.log(el.href);
  ```

* 下例中的 DOM 类型会报错，因为.hd 是Element 类型，而构建函数参数el 的类型是 `HTMLDivElement`

  ```typescript
  class Hd {
      constructor(el: HTMLDivElement) {
      }
  }
  const el = document.querySelector('.hd'); //el: Element
  new Hd(el)
  ```

* 这时可以使用 as 断言处理，明确告之获取的值类型是 `HTMLDivElement`

  ```typescript
  class Hd {
      constructor(el: HTMLDivElement) {
      }
  }
  const el = document.querySelector('.hd') as HTMLDivElement;
  new Hd(el)
  ```

### 6.4 事件处理

* 下面提取按钮元素并添加事件，实现插入元素的功能

  ```typescript
  const body = document.querySelector('body')
  const bt = document.querySelector('#bt') as HTMLButtonElement
  
  bt.addEventListener('click', (e: Event) => {
      e.preventDefault(); //因为设置了 e 的类型，所以会有完善的提示
      body.insertAdjacentHTML('beforeend', "<div>Hello World</div>")
  })
  ```

# 三、类与接口

## 1. 类的定义

* 以往js中类的定义是这样的：

  ```javascript
  class Test {
      //初始化
      constructor(name, age) {
          this.name = name
          this.age = age
      }
  }
  ```

* TS中就要对类进行约束

  ```typescript
  class User {
      
      //先进行约束
      name:string
      age:number
      
      //初始化(对传入的参数也要进行约束)
      constructor(name: string, age: number) {
          this.name = name
          this.age = age
      }
      
      //定义函数
      info():string{
          return`${this.name}的年龄是${this.age}`
      }
  }
  
  //实例化
  const zs=new User("张三",21)
  const ls=new User("李四",14)
  ```

* 定义复杂类型（对象或数组）的类型为类

  ```typescript
  const users:User[]=[]
  users.push(zs,li)
  console.log(users)//[User,User]
  ```

## 2. 修饰符

### 2.1 public

- 默认情况下属性是 public （公开的），即可以在类的内部与外部修改和访问
- 不明确设置修饰符即为public

```typescript
class User {
    public name: string
    public age: number
    constructor(n: string, a: number) {
        this.name = n
        this.age = a;
    }

    public info(): string {
        return `${this.name}的年龄是 ${this.age}`
    }
}

//对象的属性能在外部进行修改
const hd = new User('张三', 12);
const xj = new User('李四', 18)

hd.name = "王五"

for (const key in hd) {
    //属性是实例对象独有的，方法在对象的原型上（所以遍历的时候能将其属性遍历出来）
    if (hd.hasOwnProperty(key)) {
        console.log(key);
    }
}
```

### 2.2 protected

* protected 修饰符指**受保护**的，只允许在**父类与子类**使用，**不允许**在类的外部使用

  ```typescript
  class Hd {
      protected name: string
      constructor(name: string) {
          this.name = name
      }
  }
  class User extends Hd {
      constructor(name: string) {
          super(name)
      }
  
      public info(): string {
          return `你好 ${this.name}`
      }
  }
  
  const hd = new User('张三');
  
  console.log(hd.info());
  console.log(hd.name); //属性是 protected 不允许访问
  ```

  

### 2.3 private

* protected修饰符指**私有**的，不允许在子类与类的外部使用

* 父类声明 private 属性或方法子类不允许覆盖

* 子类不能访问父类的 private 属性或方法

```typescript
class Hd {
    private name: string
    constructor(name: string) {
        this.name = name
    }
}
class User extends Hd {
    constructor(name: string) {
        super(name)
    }

    public info(): string {
        return `你好 ${this.name}` //属性是 private 不允许子类访问
    }
}
```

* 子类更改父类方法或属性的访问修饰符有些限制的【**不能**将父类的**方法或属性**私有化程度**更高**===>**只能**是**相同**等级或**更低**等级】
  * 父类的 private 不允许子类修改
  * 父类的 protected 子类可以修改为 protected 或 public
  * 父类的 public 子类只能设置为 public

    ```typescript
    class Hd {
        private name: string
        constructor(name: string) {
            this.name = name
        }
        public info(): void { }
    }
    class User extends Hd {
        constructor(name: string) {
            super(name)
        }
        protected info(): string {
            return 'houdunren.com'
        }
    }
    ```

### 2.4 readonly

readonly 将属性定义为只读，不允许在类的内部与外部进行修改

```typescript
class Axios {
    readonly site: string = 'https://houdunren.com/api'
    constructor(site?: string) {
        this.site = site || this.site
    }
    public get(url: string): any[] {
        console.log(`你正在请求 ${this.site + '/' + url}`)
        return []
    }
}

const instance = new Axios('https://www.axios.com')
instance.get('users')
```

## 3. constructor

* 构造函数是初始化实例参数使用的，在 TS 中有些细节与其他程序不同

* 可以在构造函数 constructor 中定义属性，这样就不用在类中声明属性了，可以简化代码量
* 必须要在属性前加上 public、private、readonly等修饰符才有效【在constructor里面或者外面】

```typescript
class User {
    constructor(
    	//只需要在里面加上public关键字就可进行声明了，不用在constructor外面进行声明
        public name: string,
        public age: number
    ) {}

    public info(): string {
        return `${this.name}的年龄是 ${this.age}`
    }
}

const hd = new User('张三', 12);
```

## 4. static

* 很多时候会将公共的、不需要分配给**对象**的属性或方法使用关键字static存入类中，作为静态属性或方法
* 由于静态属性只能由类本身来进行调用，不需要通过对象来调用，这样类似于**缓存**

```typescript
class Site {
    static url: string = 'houdunren.com'

    static getSiteInfo() {
        return '我们不断更新视频教程在' + Site.url
    }
}
console.log(Site.getSiteInfo());
```

## 5. 单例模式

* 有时候，比如连接数据库，我们只想连接一次之后就不在进行连接了，此时只连接一次数据库就可将数据供他处使用，优化了性能。

* 前提：constructor只有定义为public（即默认时）才能进行初始化

* 如果将constructor设置为非public（protected） 修饰符后，就不能通过这个类实例化对象了。

```typescript
class User {
    protected constructor() {
    }
}

const hd = new User();//报错
```

* 可以利用这个特性再结合 static 即可实现单例模式，即只实例化一个对象

```typescript
class User {
    static instance: User | null = null;
    protected constructor() { }
    
	//定义为static，使得可以直接通过类来进行调用
    public static make(): User {
        //此时constructor设置为了proteced，在类里面是可以进行实例化的
        //一定要先进行过滤才能保证只实例化一次
        if (User.instance == null) User.instance = new User;
        return User.instance;
    }
}

const hd = User.make();//获得了唯一实例化的对象【如果想再次实例化就行不通了】
console.log(hd);
```

## 6. get/set

* 使用get 与 set 访问器可以动态设置和获取属性，类似于 vue 中的计算属性

```typescript
class User {
    private _name
   	//初始化
    constructor(name: string) {
        this._name = name
    }
     //1、先设置（实际开发中顺序无关紧要，只要明白其中逻辑即可）
    public set name(value) {
        this._name = value
    }
     //2、才能拿到
    public get name() {
        return this._name;
    }
}

const hd = new User('张三')
hd.name = '李四'
console.log(hd.name);
```

## 7. abstract

使用abstract 关键字定义抽象类，抽象类除了具有普通类的功能外，还可以定义抽象方法以及抽象属性

- 抽象类可以不包含抽象方法，但抽象方法必须存在于抽象类中
- 抽象方法是对方法的定义，子类必须实现这个方法
- 抽象类不可以直接使用，只能被继承
- 抽象类类似于**类的模板**，实现规范的代码定义

```typescript
class Animation {
    protected getPos() {
        return { x: 100, y: 300 }
    }
}

class Tank extends Animation {
    public move(): void {
        
    }
}

class Player extends Animation {
    public move: void{
        
    }
}
```

上例中的子类都有 move 方法，我们可以在抽象方法中对其进行**规范定义**

- 抽象方法只能定义，不能实现，即没有函数体
- 子类必须实现抽象方法

```typescript
abstract class Animation {
    abstract move(): void
    protected getPos() {
        return { x: 100, y: 300 }
    }
}

class Tank extends Animation {
    public move(): void {

    }
}

class Player extends Animation {
    public move(): void {

    }
}
```

子类必须实现抽象类定义的抽象属性

```typescript
abstract class Animation {
    abstract move(): void
    abstract name: string
    protected getPos() {
        return { x: 100, y: 300 }
    }
}
class Tank extends Animation {
    name: string = '坦克'
    public move(): void {

    }
}

class Player extends Animation {
    name: string = '玩家'

    public move(): void {

    }
}
```

抽象类不能被直接使用，只能被继承

```typescript
abstract class Animation {
    abstract move(): void
    protected getPos() {
        return { x: 100, y: 300 }
    }
}
const hd = new Animation(); //报错，不能通过抽象方法创建实例
```

## 8. interface

接口用于描述**类**和**对象**的结构

- 使项目中不同文件使用的对象保持统一的规范
- 使用接口能有更好的代码提示

### 8.1 抽象类

抽象类与接口的结合使用

```typescript
interface AnimationInterface {
    name: string
    move(): void
}
abstract class Animation {
    protected getPos(): { x: number; y: number } {
        return { x: 100, y: 300 }
    }
}

class Tank extends Animation implements AnimationInterface {
    name: string = '敌方坦克'
    public move(): void {
        console.log(`${this.name}移动`)
    }
}

class Player extends Animation {
    name: string = '玩家'
    public move(): void {
        console.log(`${this.name}坦克移动`)
    }
}
const hd = new Tank()
const play = new Player()
hd.move()
play.move()
```

### 8.2 对象

使用接口来约束对象

```typescript
interface UserInterface {
    name: string;
    age: number;
    isLock: boolean;
    info(other:string): string,
}

const hd: UserInterface = {
    name: '张三',
    age: 18,
    isLock: false,
    info(o:string) {
        return `${this.name}已经${this.age}岁了,${o}`
    },
}

console.log(hd.info());
```

如果尝试**添加**一个接口中不存在的函数将报错，**移除**一个接口中不存在的属性也将报错。

```typescript
const hd: UserInterface = {
		...
   say() { }  //“say”不在类型“UserInterface”中
}
```

如果有额外的属性，使用以下方式声明，这样就可以添加任意属性了

```typescript
interface UserInterface {
    name: string;
    age: number;
    isLock: boolean;
    [key:string]:any
}
```

### 8.3 接口继承

**下面定义游戏结束的接口 `PlayEndInterface` ，`AnimationInterface`接口可以使用 `extends` 来继承该接口**

```typescript
interface PlayEndInterface {
    end(): void
}

//继承接口PlayEndInterface，这样的话使得AnimationInterface接口也具有end方法
interface AnimationInterface extends PlayEndInterface {
    name: string
    move(): void
}

class Animation {
    protected getPos(): { x: number; y: number } {
        return { x: 100, y: 300 }
    }
}

class Tank extends Animation implements AnimationInterface {
    name: string = '敌方坦克'
    public move(): void {
        console.log(`${this.name}移动`)
    }
    //必须要有end方法
    end() {
        console.log('游戏结束');
    }
}

class Player extends Animation implements AnimationInterface {
    name: string = '玩家'
    public move(): void {
        console.log(`${this.name}坦克移动`)
    }
    end() {
        console.log('游戏结束');
    }
}
const hd = new Tank()
const play = new Player()
hd.move()
play.move()
```

**对象可以使用实现多个接口，多个接口用逗号连接**

```typescript
interface PlayEndInterface {
    end(): void
}
interface AnimationInterface {
    name: string
    move(): void
}

class Animation {
    protected getPos(): { x: number; y: number } {
        return { x: 100, y: 300 }
    }
}

class Tank extends Animation implements AnimationInterface, PlayEndInterface {
    name: string = '敌方坦克'
    public move(): void {
        console.log(`${this.name}移动`)
    }
    end() {
        console.log('游戏结束');
    }
}

class Player extends Animation implements AnimationInterface, PlayEndInterface {
    name: string = '玩家'
    public move(): void {
        console.log(`${this.name}坦克移动`)
    }
    end() {
        console.log('游戏结束');
    }
}
const hd = new Tank()
const play = new Player()
hd.move()
play.move()
```

### 8.4 函数

使用接口**约束**函数的**参数**与**返回值**

- 会根据接口规范进行代码提示
- 严格约束参数类型，维护代码安全

**函数参数与返回值**

```typescript
interface UserInterface {
    name: string;
    age: number;
    isLock: boolean;
}

function lockUser(user: UserInterface, state: boolean): UserInterface {
    user.isLock = state;
    return user;
}

let user: UserInterface = {
    name: '张三', age: 18, isLock: false
}

lockUser(user, true);
console.log(user);
```

**函数声明**

使用接口可以约束函数的定义

```typescript
interface Pay {
    (price: number): boolean
}
const getUserInfo: Pay = (price: number)=>true
```

### 8.5 类内部使用接口

下面的代码我们发现需要在多个地方使用对 user 类型的定义

```typescript
class User {
    info: { name: string, age: number }
    constructor(user: { name: string, age: number }) {
        this.info = user
    }
}
const hd = new User({ name: '张三', age: 18 })
console.log(hd);
```

使用 interface 可以优化代码，同时也具有良好的代码提示

```typescript
interface UserInterface {
    name: string,
    age: number
}
class User {
    info: UserInterface
    constructor(user: UserInterface) {
        this.info = user
    }
}
const hd = new User({ name: '张三', age: 18 })
console.log(hd);
```

### 8.6 数组

对数组类型使用接口进行约束

```typescript
const zs: UserInterface = {
    name: '张三',
    age: 18,
    isLock: false
}

const ls: UserInterface = {
    name: '',
    age: 16,
    isLock: false
}

const users: UserInterface[] = [];
users.push(zs, ls)
console.log(users);
```

### 8.7 枚举

下面使用枚举设置性别

```typescript
enum SexType {
    BOY, GIRL
}

interface UserInterface {
    name: string,
    sex: SexType
}

const hd: UserInterface = {
    name: '张三',
    sex: SexType.GIRL
}
console.log(hd); //{ name: '张三', sex: 1 }
```

### 8.8 支付类型案例

下面是index.ts 文件的内容，通过 interface 接口来限制支付宝与微信支付的规范

```typescript
//创建接口（针对类中方法的接口）
interface PayInterace {
    handle(price: number): void
}

//创建支付宝支付类【遵循接口】
class AliPay implements PayInterace {
    handle(price: number): void {
        console.log('支付宝付款');
    }
}

//创建微信支付类【遵循接口】
class WePay implements PayInterace {
    handle(price: number): void {
        console.log('微信付款');
    }
}

//支付调用
function payType(type: string, price: number): void {
    
    //此时pay被定义为一个对象(由类实例化出来的对象)，它的键成员是遵循接口的
    let pay: PayInterace
    
    //根据传入的参数进行支付类型的过滤【动态的创建对象】
    if (type == 'alipay') {
        pay = new AliPay()
    } else {
        pay = new WePay()
    }
    
    //执行支付调用函数
    pay.handle(price)
}
```

然后执行编译

`tsc index.ts -w `

界面处理 index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../pay.js"></script>
</head>

<body>
    <button onclick="payType('alipay',100)">支付1</button>
    <button onclick="payType('wepay',200)">支付2</button>
</body>

</html>
```

将index.ts编译好的js文件记录如下：

```javascript
//创建支付宝支付类【遵循接口】
var AliPay = /** @class */ (function () {
    function AliPay() {
    }
    AliPay.prototype.handle = function (price) {
        console.log("\u652F\u4ED8\u5B9D\u4ED8\u6B3E".concat(price));
    };
    return AliPay;
}());

//创建微信支付类【遵循接口】
var WePay = /** @class */ (function () {
    function WePay() {
    }
    WePay.prototype.handle = function (price) {
        console.log("\u5FAE\u4FE1\u4ED8\u6B3E".concat(price));
    };
    return WePay;
}());

//支付调用
function payType(type, price) {
    //此时pay被定义为一个对象(由类实例化出来的对象)，它的键成员是遵循接口的
    var pay;
    //根据传入的参数进行支付类型的过滤【动态的创建对象】
    if (type == 'alipay') {
        pay = new AliPay();
    }
    else {
        pay = new WePay();
    }
    //执行支付调用函数
    pay.handle(price);
}

```

## 9. type

type 与 interface 非常相似，都可以描述一个对象或者函数，使用 type 用于定义类型的别名，是非常灵活的类型定义方式。

* 使用type时使用了`=`进行赋值
* 使用interface直接进行定义

### 9.1 基本使用

下面是使用 type 声明**对象**类型

```typescript
//使用type时使用了“=”进行赋值【使用接口interface没有使用”=“赋值，】
type User = {
    name: string,
    age: number
}
const hd: User = { name: '张三', age: 18 }
```

使用interface和type**定义函数**类型的区别

```typescript
//使用type定义函数类型
type Pay = (price: number) => boolean
const wepay: Pay = (price: number) => {
    console.log(`微信支付${price}`);
    return true;
}

wepay(100)

//使用interface定义函数类型
interface PayInterace {
    handle(price: number): void
}
```

### 9.2 类型别名

type 可以为 number、string、boolean、object 等基本类型定义别名，比如下例的 IsAdmin。

```typescript
//基本类型别名
type IsAdmin = boolean

//定义联合类型
type Sex = 'boy' | 'girl'

type User = {
    isAdmin: IsAdmin,
    sex: Sex
}
const hd: User = {
    isAdmin: true,
    sex: "boy"
}

//声明元组
const users: [User] = [hd]
```

### 9.3 索引类型

type 与 interface 在索引类型上的声明是相同的

```typescript
interface User {
    [key: string]: any
}

type UserTYpe = {
    [key: string]: any
}
```

### 9.4 声明继承

**interface**：**同名**声明将进行**合并**

```typescript
interface User {
    name: string
}
interface User {
    age: number
}
const hd: User = {
    name: '张三',
    age: 18
}
```

**interface**：使用 extends进行继承**interface**

```typescript
interface Admin {
    role: string
}
interface User extends Admin {
    name: string
}
const hd: User = {
    role: 'admin',
    name: '张三',
}
```

**interface**：使用extends 继承 **type**

```typescript
type Admin = {
    role: string
}
interface User extends Admin {
    name: string
}
const hd: User = {
    role: 'admin',
    name: '张三',
}
```

**type**：不允许同名

```typescript
type User {
    name: string
}
type User {
    age: number
}
```

**type**：使用`& ` 合并interface 

```typescript
interface Name {
    name: string
}
interface Age {
    age: number
}
type User = Name & Age
```

 **type**：使用`& ` 合并type

```typescript
type Admin = {
    role: string,
    isSuperAdmin: boolean
}
type Member = {
    name: string
}

type User = Admin & Member;

const hd: User = {
    isSuperAdmin: true,
    role: 'admin',
    name: '张三'
}
```

**type**：使用`|`满足任何一个 type 声明即可

```typescript
type Admin = {
    role: string,
    isSuperAdmin: boolean
}
type Member = {
    name: string
}

type User = Admin | Member;

const hd: User = {
    role: 'admin',
    name: '张三'
}
```

### 9.5 implements

class 可以使用 implements 来实现 type 或 interface

```typescript
type Member = {
    name: string
}

class User implements Member {
    name: string = '张三'
}
```

# 四、泛型

## 1. 定义

泛型指**使用时才定义类型**，即<u>类型可以像参数一样定义</u>，主要解决类、接口、函数的复用性，让它们可以处理多种类型。

简而言之，泛型的作用就是将类型进行参数化，减少了重复定义类型的工作

```typescript
function run<T>(args:T):T{
	return args
}

//传入boolean就相当于是将T进行了替换，所有包含T的位置都将定义为布尔类型
let test=run<boolean>(true)
```

## 2. 基本使用

下面示例返回值类型是 any，这不是我们想要的，因为我们想要具体返回类型

```typescript
function dump(arg: any) {
    return arg;
}

let hd = dump('张三') //类型为 any
let xj = dump(true) //类型为 any
```

使用了泛型定义后，返回值即为明确的类型

```typescript
function dump<T>(arg: T): T {
    return arg;
}
let hd = dump<string>('张三')
```

如果**调用时**不指定类型系统也会自动推断类型

```typescript
function dump<T>(arg: T): T {
    return arg;
}

let hd = dump('张三') //hd 类型为 string
```

## 3. 类型继承

下面的代码是不严谨的，我们不需要处理数字，因为数字没有 length 属性，同时我们希望返回类型不是 any

```typescript
function getLength(arg: any) {
    return arg.length;
}
console.log(getLength('houdunren.com')); //13
console.log(getLength(['张三'])); //1
console.log(getLength(18)); //undefined
```

泛型是不确定的类型，所以下面读取 length 属性将报错

```typescript
function getLength<T>(arg: T): number {
    return arg.length; //类型“T”上不存在属性“length”
}
```

我们可以通过继承来解决这个问题

```typescript
function getLength<T extends string>(arg: T): number {
    return arg.length; 
}
```

上例只能处理字符串，不能处理数组等包含 length 的数据，我们可以通过继承 extends 继承，让泛型定义包含 length 属性

```typescript
function getLength<T extends { length: number }>(arg: T): number {
    return arg.length;
}

//或使用 interface 或 type

type LengthType = { length: number }
function getLengthAttribute<T extends lengthType>(arg: T): number {
    return arg.length;
}
```

如果你的类型只是字符串或数组，也可以使用联合类型

```typescript
function getLength<T extends string | any[]>(arg: T): number {
    return arg.length
}

console.log(getLength('houdunren.com'))
console.log(getLength(['张三', '李四']))
```

TS也会自动推断，比如下面参数是 T[]，TS 会推断为数组类型，所以这时候是存在 length 的，不会报错

```typescript
function getLength<T>(arg: T[]): number {
    return arg.length;
} 
```

将泛型理解为**动态类型**，泛型最终也会是一个类型，所以使用方式与我们其他类型一样的。

比如下面的返回值类型，我们就返回了一个元组，包括泛型与数值类型

```typescript
function getLength<T extends string>(arg: T): [T, number] {
    return [arg, arg.length];
}

let hd = getLength<string>('houdunren.com')
```

## 4. 类使用泛型

下面是对数值与字符串类型的集合进行管理，因为业务是一样的，所以下面的实现是重复的

```typescript
//定义管理数值型类
class CollectionNumber {
    data: number[] = []
    public push(...items: number[]) {
        this.data.push(...items)
    }
    public shift() {
        return this.data.shift()
    }
}

//定义管理字符型类
class CollectionString {
    data: string[] = []
    public push(...items: string[]) {
        this.data.push(...items)
    }
    public shift() {
        return this.data.shift()
    }
}

const numberCollection = new CollectionNumber()
numberCollection.push(1)

const stringCollection = new CollectionString()
stringCollection.push('张三', '李四')

console.log(stringCollection.shift());
```

上例使用泛型来控制就好多了

```typescript
class Collection<T> {
    data: T[] = []
    public push(...items: T[]) {
        this.data.push(...items)
    }
    public shift() {
        return this.data.shift()
    }
}

const collections = new Collection<number>()
collections.push(1)

type User = { name: string, age: number }
const hd: User = { name: "张三", age: 18 }
const userCollection = new Collection<User>()

userCollection.push(hd)
console.log(userCollection.shift());
```

## 5. 接口结合泛型

下面的代码是不稳定的，我们的意图是传递用户数据，但没有类型约束情况下，可以传递任何类型

```typescript
class User {
    constructor(protected _user) { }
    public get() {
        return this._user
    }
}

const instance = new User({ name: '张三' })
console.log(instance.get());
```

对类使用泛型处理后，可以保证传递与返回值的类型，并具有良好的代码提示

```typescript
class User<T>{
    constructor(protected _user: T) { }
    public get(): T {
        return this._user
    }
}

interface UserInterface {
    name: string, age: number
}
const instance = new User<UserInterface>({ name: '张三', age: 18 })
console.log(instance.get().age);
```

## 6. 接口

下面对接口的类型使用泛型定义，比如 isLock 可以为 `number` 或`boolean`，并对文章的评论内容进行定义。

这样处理代码会有严格类型约束，并有良好的代码提示

```typescript
//文章接口
interface articleInterface<T, B> {
    title: string,
    isLock: B,
    comments: T[],
}

//评论类型
type CommentType = {
    comment: string
}

//定义文章数据包含评论内容
const hd: articleInterface<CommentType, boolean> = {
    title: 'TypeScript入门',
    isLock: true,
    comments: [
        { comment: '这是一个评论' }
    ]
}

console.log(hd);
```

## 7. 值类型

下面解构得到的变量类型不是具体类型，面是数组类型，比如变量 y 的类型是 *string* | (() => *void*)

这在写项目时是不安全的，因为可以将 y 随时修改为字符串，同时也不会有友好的代码提示

```typescript
function hd() {
    let a = '张三'
    let b = (x: number, y: number): number => x + y
    return [a, b]
}

const [x, y] = hd() //变量 y 的类型为 string | (() => void)
```

使用 `as const` 就可以很高效的解决上面的问题，可以得到具体的类型，来得到更安全的代码，同时会有更好的代码提示

```typescript
function hd() {
  let a = '张三'
  let b = (): void => {}
  return [a, b] as const
}

const [x, y] = hd() //变量 y 的类型为 () => void
```

也可以使用**泛型**来得到具体的值类型

```typescript
//定义函数逻辑：传入参数（单参数/多参数）返回其组成的数组
function f<T extends any[]>(...args: T): T {
    return args;
}

function hd() {
    const a: string = '张三'
    const b: number = 2090
    //返回组成的数组
    return f(a, b)
}

//【r,e有相应的代码提示】
const [r, e] = hd()
```

上述编译完之后的js代码以下：

```typescript
function f() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
}

function hd() {
    var a = '张三';
    var b = 2090;
    return f(a, b);
}
var _a = hd(),
    r = _a[0],
    e = _a[1];
console.log(r, e);
```

# 五、装饰器

装饰器（Decorators）为我们在类的声明及成员上通过编程语法扩展其功能，装饰器以**函数**的形式声明。

## 1. 环境配置

首先创建配置文件 tsconfig.js

```
tsc --init
```

解注释以下两条配置

```
"experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
"emitDecoratorMetadata": true,      			/* Emit design-type metadata for decorated declarations in source files. */
```

运行文件

```
tsc -w
```

## 2. 类装饰器

### 2.1 原型对象

因为可以装饰器上得到构造函数，所以可以通过原型对象来添加方法或属性，供实例对象使用

```typescript
//通过ClassDecorator关键字来声明类装饰器类型，其中类装饰器参数必须是构造函数， 向构造函数的原型追加属性或方法
const MoveDecorator: ClassDecorator = (constructor: Function) => {
    constructor.prototype.hd = '张三'
    constructor.prototype.getPosition = (): { x: number, y: number } => {
        return { x: 100, y: 100 }
    }
}

//使用@符号直接使用类装饰器
@MoveDecorator
class Tank {
    constructor() {
        console.log('tank 构造函数');
    }
}
const tank = new Tank()

//通过类装饰器装饰后且实例化后即可使用构造函数原型上的属性或方法
console.log(tank.getPosition());
```

不过在编译阶段会提示错误，但这不影响编译生成 js 文件

```text
Property 'getPosition' does not exist on type 'Tank'
```

通过为类添加默认属性来解决这个错误

```typescript
class Tank {
    public hd: string | undefined
    public getPosition() { }
    constructor() {
        console.log('tank 构造函数');
    }
}
```

或者在调用时使用断言处理

```typescript
const tank = new Tank()
console.log((tank as any).getPosition());
//或使用以下方式断言
console.log((<any>tank).getPosition());
```

### 2.2 语法糖

不需要把装饰器想的很复杂，下面是同样实现了装饰器的功能。只不过是我们人为调用函数，所以可以把装饰器理解为这种调用的语法糖，这样理解就简单些。

```typescript
const MoveDecorator: ClassDecorator = (constructor: Function) => {
    constructor.prototype.hd = '后盾人'
    constructor.prototype.getPosition = (): { x: number, y: number } => {
        return { x: 100, y: 100 }
    }
}
//原本这里是使用@符号来使用装饰器的（可以在后面直接人为进行使用装饰器）
class Tank {
    constructor() {
        console.log('tank 构造函数');
    }
}

MoveDecorator(Tank);
const tank = new Tank()
console.log(tank.getPosition());
```

### 2.3 装饰器叠加

装饰器可以叠加使用，下面是定义了位置管理与音乐播放装饰器

```typescript
//位置控制
const MoveDecorator: ClassDecorator = (constructor: Function): void => {
    constructor.prototype.hd = '后盾人'
    constructor.prototype.getPosition = (): void => {
        console.log('获取坐标');
    }
}
//音乐播放
const MusicDecorator: ClassDecorator = (constructor: Function): void => {
    constructor.prototype.playMusic = (): void => {
        console.log('播放音乐');
    }
}

@MoveDecorator
@MusicDecorator
class Tank {
    constructor() {
    }
}
const tank = new Tank();
(<any>tank).playMusic();
(<any>tank).getPosition();
```

### 2.4 多类复用

定义好装饰器后，可以为多个类复用，比如下面的玩家与坦克

```typescript
//位置控制
const MoveDecorator: ClassDecorator = (constructor: Function): void => {
    constructor.prototype.hd = '后盾人'
    constructor.prototype.getPosition = (): void => {
        console.log('获取坐标');
    }
}
//音乐播放
const MusicDecorator: ClassDecorator = (constructor: Function): void => {
    constructor.prototype.playMusic = (): void => {
        console.log('播放音乐');
    }
}

@MoveDecorator
@MusicDecorator
class Tank {
    constructor() {
    }
}
const tank = new Tank();
(<any>tank).playMusic();
(<any>tank).getPosition();

@MoveDecorator
class Player {
}

const xj: Player = new Player();
(xj as any).getPosition()
```

### 2.5 响应消息

下面是将网站中的响应消息工作，使用装饰器进行复用。

```typescript
//消息响应
const MessageDecorator: ClassDecorator = (constructor: Function): void => {
    constructor.prototype.message = (message: string): void => {
        document.body.insertAdjacentHTML('afterbegin', `<h2>${message}</h2>`)
    }

}

@MessageDecorator
class LoginController {
    login() {
        console.log('登录逻辑');
        this.message('登录成功')
    }
}
const controller = new LoginController();

controller.login()
```

## 3. 装饰器工厂

有时有需要根据条件返回不同的装饰器，这时可以使用装饰器工厂来解决。可以在类、属性、参数等装饰器中使用装饰器工厂。

下例根据 MusicDecorator 工厂函数传递的不同参数，返回不同装饰器函数。

```typescript
//定义一个工厂函数，返回一个装饰器
const MusicDecorator = (type: string): ClassDecorator => {
    switch (type) {
        case 'player':
            return (constructor: Function) => {
                constructor.prototype.playMusic = (): void => {
                    console.log(`播放【海阔天空】音乐`);
                }
            }
            break;
        default:
            return (constructor: Function) => {
                constructor.prototype.playMusic = (): void => {
                    console.log(`播放【喜洋洋】音乐`);
                }
            }

    }
}

@MusicDecorator('tank')
class Tank {
    constructor() {
    }
}
const tank = new Tank();
(<any>tank).playMusic();

@MusicDecorator('player')
class Player {
}

const xj: Player = new Player();
(xj as any).playMusic()
```

## 4. 方法装饰器

装饰器也可以修改方法，**方法装饰器函数**参数说明如下：

| 参数   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| 参数一 | 【普通方法】===>构造函数的原型对象 Prototype，【静态方法】===>构造函数 |
| 参数二 | 方法名称                                                     |
| 参数三 | 属性描述                                                     |

![image-20220105205011082](https://raw.githubusercontent.com/crazyzsh/myImage/main/imageTest/%E6%96%B9%E6%B3%95%E8%A3%85%E9%A5%B0%E5%99%A8%E5%8F%82%E6%95%B0.png)

### 4.1 基本使用

下面使用 `ShowDecorator` 装饰来修改 show 方法

```typescript
//使用MethodDecorator进行声明方法装饰器，其中第三个参数使用PropertyDescriptor进行声明
const ShowDecorator: MethodDecorator = (target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor): void => {
    //第一个参数可以使用原型追加属性（例如这里target.name="张三"），那么此时凡是使用了该方法装饰器的类实例化出来的对象都将拥有此属性
    //第三个参数的value值就是要定义的方法【如果重新赋值为一个函数的话就会将原来的方法取代，如果用一个变量来接收的话则可直调用】
    descriptor.value = () => {
        console.log('Hello World');
    }
}

class Hd {
    @ShowDecorator
    show() {
        console.log('show method');
    }
}

const instance = new Hd;
instance.show()//Hello World
```

下面是修改方法的属性描述writable为 false，这时将不允许修改方法。

```typescript
const ShowDecorator: MethodDecorator = (target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor): void => {
    descriptor.writable = false
}

class Hd {
    @ShowDecorator
    show() {
        console.log(33);
    }
}

const instance = new Hd;
instance.show()

//装饰器修改了 writable 描述，所以不能重写函数
instance.show = () => { }
```

### 4.2 静态方法

静态方法使用装饰器与原型方法相似，在处理静态方法时装饰器的第一个参数是**构造函数**。

```typescript
const ShowDecorator: MethodDecorator = (target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor): void => {
    descriptor.value = () => {
        console.log('houdunren.com');
    }
}

class Hd {
    @ShowDecorator
    static show() {
        console.log('show method');
    }
}

Hd.show()
```

### 4.3 代码高亮

下面使用装饰器模拟代码高亮

```typescript
const highlightDecorator: MethodDecorator = (target: object, propertyKey: any, descriptor: PropertyDescriptor): any => {
	//保存原来的方法
    const method = descriptor.value;

	//重新定义原型方法
    descriptor.value = () => {
        return `<div style="color:red">${method()}</div>`
    }
}

class User {
    @highlightDecorator
    response() {
        return 'Hello World';
    }
}

console.log(new User().response());
```

### 4.4 延迟执行

下面是延迟执行方法的装饰器，装饰器参数是延迟的时间，达到时间后才执行方法。

```typescript
const SleepDecorator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
  const method = descriptor.value
  descriptor.value = () => {
    setTimeout(() => {
      method()
    }, 2000)
  }
}
class User {
  @SleepDecorator
  public response() {
    console.log('houdunren.com')
  }
}

new User().response()
```

下面使用装饰器工厂定义延迟时间

```typescript
//返回一个装饰器函数
const SleepDecorator =
  (times: number): MethodDecorator =>
  (...args: any[]) => {
    const [, , descriptor] = args
    const method = descriptor.value
    descriptor.value = () => {
      setTimeout(() => {
        method()
      }, times)
    }
  }
class User {
  @SleepDecorator(0)
  public response() {
    console.log('houdunren.com')
  }
}

new User().response()
```

### 4.5 自定义错误

下面是使用方法装饰器实现自定义错误

- 任何方法使用 @ErrorDecorator 装饰器都可以实现自定义错误输出

```typescript
const ErrorDecorator: MethodDecorator = (target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor): void => {
    const method = descriptor.value;
    descriptor.value = () => {
        try {
            method()
        } catch (error: any) {
            //console.log()函数第一个参数%c后面跟文字， 第二个参数表示 css 样式
            console.log(`%c这是一次尝试`, "color:green; font-size:20px;");
            console.log(`%c${error.message}`, "color:red;font-size:16px;");
            console.log(`%c${error.stack}`, `color:blue;font-size:12px;`);

        }
    }
}

class Hd {
    @ErrorDecorator
    show() {
        throw new Error('运行失败')
    }
}

const instance = new Hd;
instance.show()
```

对上面的例子使用装饰器工厂来自定义消息内容

```typescript
const ErrorDecorator = (message: string, title: string = 'Hi') => <MethodDecorator>(target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor): void => {
    const method = descriptor.value;
    descriptor.value = () => {
        try {
            method()
        } catch (error: any) {
            console.log(`%c，${title || `Hello World`}`, "color:green; font-size:20px;");
            console.log(`%c${message || error.message}`, "color:red;font-size:16px;");
        }
    }
}

class Hd {
    @ErrorDecorator('Oh! 出错了', 'Hello')
    show() {
        throw new Error('运行失败')
    }
}

const instance = new Hd;
instance.show()
```

### 4.6 登入验证

本例体验装饰器模拟用户登录判断，如果用户的 isLogin 为 false，则跳转到登录页面 `1.login.html`

```typescript
//用户资料与登录状态
const user = {
    name: '向军',
    isLogin: true
}

const AccessDecorator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    const method = descriptor.value;
    descriptor.value = () => {
        //登录的用户执行方法
        if (user.isLogin === true) {
            //书写return直接退出函数
            return method()
        }
        //未登录用户跳转到登录页面
        alert('你没有访问权限')
        return location.href = '1.login.html'
    }

}

class Article {
    @AccessDecorator
    show() {
        console.log('播放视频');
    }

    @AccessDecorator
    store() {
        console.log('保存视频');
    }
}

new Article().store();
```

### 4.7 权限验证

下面是使用装饰器对用户访问权限的验证

```typescript
//用户类型
type userType = { name: string, isLogin: boolean, permissions: string[] }
//用户数据 
const user: userType = {
    name: '张三',
    isLogin: true,
    permissions: ['store', 'manage']
}
//权限验证装饰器工厂
const AccessDecorator = (keys: string[]): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        //先保存一下原来的方法
        const method = descriptor.value
        //定义校验是否有效函数，返回值为布尔值
        const validate = () => keys.every(k => {
            return user.permissions.includes(k)
        })
        descriptor.value = () => {
            if (user.isLogin === true && validate()) {
                alert('验证通过')
                return method()
            }
            alert('验证失败')
            // location.href = 'login.html'
        }
    }
}

class Article {
    show() {
        console.log('显示文章')
    }
    @AccessDecorator(['store', 'manage'])
    store() {
        console.log('保存文章')
    }
}
new Article().store()
```

### 4.8 网络异步请求

下面是模拟异步请求的示例

```typescript
const RequestDecorator = (url: string): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const method = descriptor.value
    // axios.get(url).then()
    new Promise<any[]>(resolve => {
      setTimeout(() => {
        resolve([{ name: '张三' }, { name: '李四' }])
      }, 2000)
    }).then(users => {
      method(users)
    })
  }
}
class User {
  @RequestDecorator('https://www.houdunren.com/api/user')
  public all(users: any[]) {
    console.log(users)
  }
}
```

## 5. 属性装饰器

装饰器函数参数说明

| 参数   | 说明                                                       |
| ------ | ---------------------------------------------------------- |
| 参数一 | 普通方法是构造函数的原型对象 Prototype，静态方法是构造函数 |
| 参数二 | 属性名称                                                   |

### 5.1  基本使用

属性装饰器的定义方式

```typescript
//使用PropertyDecorator关键字进行声明属性装饰器【只接收两个参数】
const PropDecorator: PropertyDecorator = (target: Object, propertyKey: string | symbol): void => {
    console.log(target, propertyKey);
}

class Hd {
    @PropDecorator
    public name: string | undefined = '张三'
}
```

### 5.2 访问器

下面是定义将属性name 的值转为小写的装饰器

```typescript
const PropDecorator: PropertyDecorator = (target: Object, propertyKey: string | symbol): void => {
    //存储
    let value: string;

    Object.defineProperty(target, propertyKey, {
        set: (v: string) => {
        		value = v
    		},
        get: () => {
        		return value.toLowerCase()
    		}
    })
}

class Hd {
    @PropDecorator
    public name: string | undefined
    show() {
        console.log(33);
    }
}

const instance = new Hd;
instance.name = 'HouDunRen'
console.log(instance.name);
```

### 5.3 随机色块

使用属性访问器定义随机颜色，并绘制色块，下面是 hd.ts 的内容

```typescript
const RandomColorDecorator: PropertyDecorator = (target: Object, propertyKey: string | symbol): void => {
    const colors: string[] = ['red', 'green', 'blue', '#333333'];
    Object.defineProperty(target, propertyKey, {
        get: () => {
            return colors[Math.floor(Math.random() * colors.length)]
        }
    })
}

class Hd {
    @RandomColorDecorator
    public color: string | undefined

    public draw() {
        document.body.insertAdjacentHTML('beforeend', `<div style="width:200px;height:200px;background-color:${this.color}">houdunren.com 向军</div>`)
    }
}

new Hd().draw()
```

下面是 hd.html 的模板内容

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
        <script src="1.js"></script>
    </body>
</html>
```

## 6. 参数装饰器

可以对方法的参数设置装饰器，参数装饰器的返回值被忽略。

**装饰器函数参数说明**

| 参数   | 说明                                                       |
| ------ | ---------------------------------------------------------- |
| 参数一 | 普通方法是构造函数的原型对象 Prototype，静态方法是构造函数 |
| 参数二 | 方法名称                                                   |
| 参数三 | 参数所在索引位置                                           |

### 6.1 基本使用

下面是定义参数装饰器

```typescript
const ParameterDecorator: ParameterDecorator = (target: any, propertyKey: string | Symbol, parameterIndex: number): void => {
    console.log(target, propertyKey, parameterIndex);
}

class Hd {
    show(name: string, @ParameterDecorator url: string) {
    }
}
```

### 6.2 元数据

元数据指对数据的描述，首先需要安装扩展包

```text
yarn add reflect-metadata
```

下面是使用元数据的示例

```typescript
//引入支持元数据的扩展名
import "reflect-metadata";

const hd = { name: '张三', city: '南京' }
//在对象 hd 的属性 name 上定义元数据 (元数据指对数据的描述)
Reflect.defineMetadata('xj', 'houdunren.com', hd, 'name')

let value = Reflect.getMetadata('xj', hd, 'name')

console.log(value);
```

### 6.3 参数验证

下面是对方法参数的验证，当参数不存在或为 Undefined时抛出异常。

```typescript
//引入支持元数据的扩展名
import "reflect-metadata";
const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    //哪些参数需要验证
    let requiredParameters: number[] = []
    //将需要验证的参数索引存入
    requiredParameters.push(parameterIndex);
    //在 target 对象的 propertyKey属性上定义元素数据 
    Reflect.defineMetadata(requiredMetadataKey, requiredParameters, target, propertyKey);
}

const validate: MethodDecorator = (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function () {
        //读取 @required 装饰器定义的元数据 
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey);

        //如果有值，表示有需要验证的参数 
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                //如果参数不存在或参数值为 undefined 报出错误
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("参数不能为空.");
                }
            }
        }
        //验证通过后执行类方法
        return method.apply(this, arguments);
    }
}


class Hd {
    @validate
    show(name: string, @required id: number) {
        console.log('show method');
    }
}

const f = new Hd()
f.show('a', undefined)
```