# puppeteer

## 踩坑点

基本都是 Linux 部署的问题，本地跑的时候都很顺利

### 检查 puppeteer 所缺少的依赖项

- 查找 puppeteer 在哪

```shell
which puppeteer
```

找到位置后，在当前目录查找所缺少的依赖项

```shell
ldd chrome | grep not
xxx -> not found
```

这是你把哪个文件名复制下来，再执行 yum provides xxx

然后根据相应的提示安装相应的包即可 yum install aaa

参考链接：<https://juejin.cn/post/7114853710433353764>

### 解决 Linux 上的中文字体问题

使用 Puppeteer 进行截图时，会出现部分中文显示方块字乱码的问题。这并不是 Puppeteer 的问题，实际上是 Linux 字体库对中文支持不好的原因。

我们只需要给服务器的 Linux 系统安装支持的中文字体库即可。

这里推荐文泉驿字体 :

> 文泉驿是一个以开发开源、免费中文电子资源－－如汉字字体、词库等－－为目标的公益性组织。她的创办宗旨是实现“任何人在任何地方都可以自由使用汉字和汉语进行交流”。 ——摘自百度百科

这里以 CentOS 为例，其他 Linux 系统也都有自己的包管理器，只是换个包管理器操作，安装步骤基本是一样的：

- 查找文泉驿安装包

```shell
sudo yum search wqy
Loaded plugins: fastestmirror, langpacks
Repodata is over 2 weeks old. Install yum-cron? Or run: yum makecache fast
Determining fastest mirrors
======================================================== N/S matched: wqy =========================================================
wqy-microhei-fonts.noarch : Compact Chinese fonts derived from Droid
wqy-unibit-fonts.noarch : WenQuanYi Unibit Bitmap Font
wqy-zenhei-fonts.noarch : WenQuanYi Zen Hei CJK Font
```

- 安装文泉驿字体

```shell
yum install wqy-microhei-fonts.noarch -y
yum install wqy-unibit-fonts.noarch -y
yum install wqy-zenhei-fonts.noarch -y
```

参考链接：<https://programmerauthor.github.io/2020/02/03/centos-font-wqy/>

## 参考

- <https://github.com/Lete114/WebStack-Screenshot>
- <https://www.npmjs.com/package/puppeteer-cluster>
- <https://juejin.cn/post/6979882586227245093>
- <https://juejin.cn/post/7143596746856202254>
