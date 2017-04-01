# xnode
一个基于Nodejs的快速开发框架

集成了：

* nodejs
* express(4)
* mongodb(mongoskin)
* passport
* node-yaml-config
* log(tracer)

## 使用指南
1. 下载本项目，进入主目录
```
npm install
```

2. 配置数据源（mongodb）
```
所有配置均在config/default.yml里
```

3. 启动服务
```
node server.js
```

## 约定
1. 接口

 应用代码应写在`app/api`里，每一个文件即代表一个模块，将提供以文件名作为path的接口，例如:example.js里的如下代码

 ```
router.get(‘/ping’,function(req,res){
	res.send('pong')
})
//将提供接口：http://yourdomain:port/example/ping，返回字符串pong
```

2. 数据

 使用`var Task = require(‘db’).collection(‘Task’)`来获得Task数据集，然后可以用native的方式操作mongodb

 ```
//例如：查询一个Task数据
Task.findOne({title:'onlyonetaskstitleisthisone'},function(err,task){
	//do something
})
```

3. 权限
 在config/default.yml中配置校验规则，然后通过User的roles字段来鉴权
 
 ```
//例如，在default.yml中配置：
passport:
	rules:
		- url: "/user/**" 
		  role: "user"
		- url: "/task/example.html"
		  role: "user"
		- url: "/admin/api/**" 
		  role: "admin"
//用户访问/user/下的所有请求，都需要user角色
//用户访问/task/example.html需要user角色
//用户访问/admin/api/下的所有请求都需要admin角色
```
 权限不足时，用户会得到`403`响应。未登录，则是`401`。

4. 登陆

 **POST**

 ```nodejs
/login
body:{
	username:xxx,
	password:xxx
}
```
 **GET**
 
 ```
/login?username=xxx&password=xxx
```
5. 退出

 **GET**

 ```
/logout
```
默认配置的session有效期为一周

## 提醒
* 用pm2启动时，log的颜色将由pm2的颜色配置接管
* roles根据字符串包含的形式来鉴权，所以也可以视为权限来使用