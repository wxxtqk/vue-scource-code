# vue-scource-code
这两天公司设计出设计图，终于空出点儿时间看看大VUE，之前一直用ng和vue，感觉里面模板，双向数据绑定贼6x，最近稍微闲了那么一丢丢，就静下心来看看里面的一些实现原理，看来一下双向数据绑定是怎么搞出来的。也算对自己能力的一个提升，探索一下我没有掌握的前端未知区域。得更紧前辈们的脚步。

网上说实现数据绑定做法有大概三种

- **发布者-订阅者(backone.js)**
- **脏值检查(angular.js)**
- **数据劫持(vue.js)**

然后只看了vue的中双向数据绑定的原理，ng的就没有去搞了，要支持大国产嘛。backone.js也是在网上不小心看到，根本没有用过，之前都没有听说过（怪我学疏才浅，是个前端菜鸟，也不用去搞那么多，先搞懂一个再说，其它的在慢慢来，说不定以后就不干程序的勾当了呢）

#### 数据劫持 

​	vue.js采用的是数据劫持结合发布者-订阅者模式的方式,通过Object.defineProperty()这个方法来劫持各个属性的getter和setter。如果有对Object.defineProperty()不太懂的，直接百度就行了。这儿就不详细叙述了

本文参考1:http://www.cnblogs.com/kidney/p/6052935.html?utm_source=gold_browser_extension

本文参考2:https://segmentfault.com/a/1190000006599500

废话就不多说了，直接先来上段代码块儿，先通过Object.defineProperty()实现一个简单双向数据绑定,通过Object.defineProperty()来监听属性的变动，然后在触发set函数，从而触发视图的更新

##### 1.简单的双向数据绑定

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<input type="text" name="" id="i-msg">
	<span id="text"></span>
</body>
</html>

<script type="text/javascript">
	var data = {}
	Object.defineProperty(data, 'test', {
		enumerable: true, //可枚举
		configurable: false, //不可从新define
		get: function(){
			return val
		},
		set: function(newvale){
			document.getElementById('i-msg').value = newvale
			document.getElementById('text').innerHTML = newvale
		}
	})
	document.addEventListener('keyup', function(e){
		data.test = e.target.value; //触发data中set函数
	})
</script>
```

![](img/1.gif)

监听文档的keyup事件，每次keyup事件都会触发Object.defineProperty()中的set函数，从而动态的给input和span赋值，从而实现简单双向数据绑定



