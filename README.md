#### 1.介绍
> mini-router 是一个在微信小程序中使用的路由模块，主要用于在小程序中的路由模块化和解耦，解决小程序中的路由地址的硬编码。

* 原生路由：
```js
// 用法：1
wx.navigateTo({
  url: "/pages/logs/logs"
})

// 用法：2
wx.navigateTo({
  url: "/pages/logs/logs",
  success(res) {
    console.log("success", res) 
  },
  fail(err) {
    console.log("fail", err)
  },
  complete() {
    console.log("complete")
  }
})

// 用法：3（传参）
wx.navigateTo({
  url: "/pages/logs/logs?key=value",
})
```
* **mini-router**
```js
// 用法：1
app.$router.push("logs")

// 用法：2
app.$router.push("mine")
  .success(res => {
    console.log("success: ", res)
  })
  .fail(err => {
    console.log("fail: ", res)
  })
  .complete(_ => {
    console.log("complete")
  })

// 用法：3 (传参)
app.$router.push("logs", { key: value })
```

#### 2.使用方法
```js
// 第一步：导入router模块，并且在app.js里 给app设置一个属性$router
// app.js
import MiniRouter from './route/router'
onLaunch: function () {
  this.$router = new MiniRouter()
},

// 第二步：配置route文件夹中的pages模块 （url 直接复制app.json里的pages）
export default [
  {
    url: 'pages/index/index',
    name: 'index'
  },
  {
    url: 'pages/article/article',
    name: 'article'
  },
  {
    url: 'pages/mine/mine',
    name: 'mine'
  },
  {
    url: 'pages/logs/logs',
    name: 'logs'
  },
  {
    url: 'pages/login/login',
    name: 'login'
  },
  {
    url: 'pages/next/next',
    name: 'next'
  }
]

// 第三步：在需要的文件里 使用
app.$router.push("logs")
```

#### 3.支持的方法
目前mini-router支持微信小程序里的路由的所有方法，函数名对比:

|    小程序    | mini-router |
| :----------: | :---------: |
|  switchTab   |  switchTab  |
|   reLaunch   |  reLaunch   |
|  redirectTo  |  redirect   |
|  navigateTo  |    push     |
| navigateBack |    back     |
|      -       |  backHome   |



#### 4.函数介绍

1. `push(name, params = null)`

   保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面

2. `reLaunch(name, params = null)`

    关闭所有页面，打开到应用内的某个页面 可传递参数 可跳转到Tabbar页面

3. `redirect(name, params = null)`

      关闭所有页面，打开到应用内的某个页面 可传递参数 不可重定向到Tabbar页面

4. `switchTab(name)`
    
    跳转到指定的Tab

5. `back(delta = 1, params = null)`

    关闭当前页面，返回上一页面或多级页面。 没有参数 代表返回上一页

6. `backHome(params = null)`

    关闭所有页面返回到首页

#### 5.错误处理
当你输入一个在pages模块中找不到的路由时(log)，mini-router会抛出错误，例如：
```js
app.$router.push("log", { log: "这是一个Log" })

// 打印
/*
!! Not found page ->：[log] !!; [Component] Event Handler Error @ pages/index/index#bound handlePushLogs
*/
```

#### 6.获取传递的参数
mini-router内置了一个属性`params`，它会根据你跳转的页面，动态的更换当前属性的值。
```js
// 当我传递了一个参数 { log: "这是一个Log" }
app.$router.push("logs", { log: "这是一个Log" })

// 然后我在下一个界面的onShow/onLoad里接收
const params = app.$router.params
params.log // 这是一个Log
```
参数存储在storage里，你可以通过小程序调试工具看到:

![mini-router params](https://upload-images.jianshu.io/upload_images/1786359-7504337586a2d6b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

获取参数时，你不必知道它存储在storage里的key是什么，你只要拿`app.$router.params`就可以了

#### 7.反向传值
mini-router 通过`back`或者`backHome`函数实现反向传值（反向携带参数）
```js
app.$router.back(1, { isLogin: false })

// 中间页传值给最后一页，最后一页携带值给首页
const { data } = app.$router.params
app.$router.backHome({ data })
```

当你选择不携带参数返回时，在首页你将拿不到`app.$router.params`,因为`mini-router`会把`params`软删除，如果你需要的话，你还是可以从storage里拿到它。

#### 8.状态处理
mini-router同小程序一样，提供三种状态`success`， `fail`， `complete`
不同于小程序，mini-router使用链式调用来处理这三种状态，
```js
app.$router.push("mine")
  .success(res => {
    console.log("success: ", res)
  })
  .fail(err => {
    console.log("fail: ", res)
  })
  .complete(_ => {
    console.log("complete")
  })
```

> 寄语：对于前端来说，可以说初窥门径，想要更深入一步，还是要坚持不断的学习和看源码。mini-router可以实现小程序里路由的跳转，也将成为我下一个小程序使用的路由模块，如果有不足的地方欢迎题issuse，如果有好的想法，欢迎pull request。



