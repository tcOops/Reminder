##基于Chrome的近期消息提醒插件
<span style="color:red">注意： 本插件基于Chrome开发， 所以只能在Chrome下使用</span>

---


需要准备：请查看request.txt


如何安装该插件： 打开chrome://extensions/, 将reminder文件夹拖入到插件区即完成安装


文件描述：<br>

-css:样式表文件夹

-js:javascript文件夹
	-popup.js: 主要的js文件， 用来向本地的Python服务发ajax请求获取最新消息， 并监听事件， 等待回调显示

-icon.png:-插件显示的图标

-manifest.json:配置文件， Chrome插件开发默认的规则， 用来全局配置

-Popup.html:点击插件图标之后， 显示的页面

-request.txt: 运行插件需要的软件说明

-server.py: python脚本，基于web.py的简单API服务， 用来抓取网页消息并返回给服务请求方



运行框架：
step1： 点击插件图标， popup.js向server.py发API请求服务
step2： server.py抓取页面消息， 返回给popup.js
step3： popup.js正确获取消息之后， 进行页面渲染


注意点：
需要自行启动server.py服务， 并注意防火墙等相关事宜
如果觉得每次手动启动麻烦， 可在开机启动项里面加入该脚本（具体方法各个操作系统方案不同， 请自行查阅）

Ajax请求过程中， 存在调用本地JS服务的情况， 故需要跨域请求， 本插件采用了JSONP的方式， 所以需要注意python脚本的数据返回格式不能单纯的为json文件
同时在Manifest.json里面， 需要注意给localhost加访问权限（具体参考我的做法）

启动过程中， 请设置启动端口号， 目前我在js文件里面设置的访问端口是1235，故Python脚本启动为： 
python server.py 1235

![image](xg.gif)



扩展：
如果想查看自己感兴趣的消息， 可自行开发
（需要懂一些Python， 以及JavaScript， 可仿照我的代码进行简单扩充)
Reference：<br>
[http://www.cnblogs.com/guogangj/p/3235703.html](http://www.cnblogs.com/guogangj/p/3235703.html)
<br>
[https://developer.chrome.com/extensions/getstarted](https://developer.chrome.com/extensions/getstarted)



