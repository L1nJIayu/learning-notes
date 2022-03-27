# Cannot find module 'three'



#### 报错信息

> TS2792: Cannot find module 'three'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

明明已经安装了three包了，为啥引入时会提示找不到？



#### 解决方法

下载@types/three

```shell
npm i @types/three
```



#### 参考文章

[types 和 @types 是什么？](https://zhuanlan.zhihu.com/p/194196536)