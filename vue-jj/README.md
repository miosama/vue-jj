# Vue 仿掘金android APP

## 介绍

开发这个项目是为了让自己熟悉使用Vue全家桶，了解前端模块化开发，提高开发技术。
“一个帮助开发者成长的社区”这是掘金对自己的介绍，在这个app中能够看到各位开发者分享的文章，内容涉及前端，后台，Android，iOS等等，用户能够分享自己的文章，沸点，也能够对自己喜欢的内容进行点赞评论收藏。

注意：本项目的数据仅起演示作用，文章详细内容请到掘金搜索查看


## 技术栈

vue2 + vuex + vue-router + webpack + ES6 + less + flex


## 项目运行

```
git clone https://github.com/bailicangdu/vue2-elm.git  

cd vue-jj

npm install

npm run dev

```
项目并没有后台数据库，数据是node服务器从data.json读取，用户的数据是用localStorage存储，可在mock目录开启服务器，端口默认是3000
```
cd mock

node server.js

```


## 说明
* 欢迎"Star","follow"
* 开发环境 win10, vscode, chrome, node8.10.0
* 感谢[@bailicangdu](https://github.com/bailicangdu/vue2-elm)开源的vue2-elm项目，从中学到不少东西
* 未完成的功能和说明
 * 不能对评论进行点赞评论
 * 不能社交媒体分享
 * 不能定制热门
 * 搜索页的轮播图以及下面四个按钮点击无反应
 * "我"页面的"意见反馈"和"设置"点击无反应



## 效果演示

[查看demo请戳这里](http://39.104.177.130:3000)（请用chrome手机模式预览）



## TODO
* 优化页面加载
* 尝试优化移动端的界面
* 尝试使用SSR重构
* 尝试完成未完成功能



## 部分截图


### 首页

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/msite.png" width="365" height="619"/>
