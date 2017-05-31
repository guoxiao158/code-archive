## 简介

Node.js+MongoDB建站攻略（第一期）参考源码

## 开发环境

- Node.js: `6.10.1`
- MongoDB: `3.4.4`
- Express: `4.15.3`

**1. 后端搭建：**
* NodeJS的Express框架完成后端搭建；
  * MongoDB实现数据存储，使用mongoose模块进行数据构建；
  * Pug模板引擎完成页面渲染

**2. 前端搭建：**
* Bootstrap，jQuery完成脚步和样式的处理

**3. 依赖模块：**
1. `moment`: 时间格式化
2. `underscore`: 使用其中的extend方法
3. `express`: web 框架
4. `mongoose`: mongodb 驱动
5. `pug`: 模板引擎
6. `serve-static`:  express中间件函数
7. `body-parser`: express中间件函数


##  配置和使用

##### 1、 **安装`Node.js`**

##### 2、 **安装`MongoDB`**

* 2.1、 把`MongoDB`安装路径下的`bin`文件目录，例如：`"C:\Develop\MongoDB\Server\3.4\bin"`添加到系统环境变量，便可在命令窗口直接执行bin文件里面的命令；
* 2.2、 设置MongoDB数据库的数据存储路径，在C盘下手动创建`C:/data/db`目录文件夹，这是默认的数据存储路径，必须手动创建。
##### 3、 启动`MongoDB`服务：`mongod`
* 3.1、 在命令窗口[cmd]执行命令：`mongod`，开启`MongoDB`服务，启动后**请勿关闭窗口**;
* 3.2、 再新开一个命令窗口[cmd]执行命令：`mongo`，就可以用命令来管理数据库，
##### 4、 安装`bower`依赖：`bower install`
* 在项目文件夹下，按住`shift`键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：`bower install`；
##### 5、 安装`npm`依赖：`npm install`

* 在项目文件夹下，按住`shift`键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：`npm install`；
##### 7、 启动项目入口文件：`node app.js`
* 在项目文件夹下，按住`shift`键的同时按下鼠标右键，选择在此处打开命令窗口，执行命令：`node app`；

## 页面导航

- 首页：http://localhost:3000
- 电影详情页：http://localhost:3000/movie/电影id值
- 后台录入页面：http://localhost:3000/admin/movie
- 后台列表页：http://localhost:3000/admin/list

## 项目结构:

```
├── models            模型目录
├── schemas            模式目录
├── node_modules      
├── public            静态文件目录
│   └── js        上传图片存储目录
├── views             视图文件目录
│   ├── includes             
│   └── pages
├── app.js            项目入口文件
├── package.json
└── README.md
```
