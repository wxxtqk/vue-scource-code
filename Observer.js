/**
 * 观察者,主要用来监听属性的变动
 * 主要使用的Object.defineProperty()方法监听属性的变化
 * 通过里面setter和getter函数
 * 只要给属性赋值就会触发setter函数
 */
function Observer(data){
	this.data = data
	this.walk(data)
}
Observer.prototype = {
	walk: function(data){
		var me = this
		// 取出所有属性进行遍历,遍历出key值，
		// Object.keys ==  for...in
		Object.keys(data).forEach(function(key){
			me.convert(key,data[key])
		})
	},
	//转换
	convert: function(key,val){
		var me = this
		me.defineReactive(me.data, key, val)
	},
	defineReactive: function(data,key,val){
		var dep = new Dep()
		var childObj = observer(val)
		Object.defineProperty(data, key, {
			enumerable: true, //可枚举
			configurable: false,//不能够在define
			get: function(){
				if (Dep.target) {
					dep.append()
				}
				return val
			},
			set: function(newVal){
				if (val === newVal) {return}
				val = newVal
				//如果新的值是objec进行监听
				childObj = observer(newVal)
				//通知订阅者
				dep.notify()
			}
		})
	}
}



//定义一个消息订阅器
function Dep(){
	this.subs = [] //订阅者
}
Dep.prototype = {
	//添加订阅者
	addSub: function(sub){
		this.subs.push(sub)
	},
	// 依赖
	depend: function(){
		Dep.target.addDep(this)
	},
	//移动订阅者
	removeSubs: function(sub){
		var index = this.subs.indexOf(sub) //获取订阅者的位置
		if (index != -1) {
			this.subs.splice(index,1) //移除订阅者
		}
	},
	//通知订阅者
	notify:function(){
		this.subs.forEach(function(sub){
			sub.update() //让订阅者更新
		})
	}
}
//监听对象中的value是否是对象
function observer(value){
	if (!value || typeof value !== 'object') {
		return
	}
	return new Observer(value)
}

Dep.target = null
