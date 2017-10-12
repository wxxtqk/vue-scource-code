/**
 * 	实现数据监听，数据变换触发set函数，通知相应的观察者
 */

function observer(data, vm){
	if (!data ||typeof data !== 'object') return
	Object.keys(data).foeEach(function(key){
		defineReactive(vm, key, data[key])
	})
}
function defineReactive(vm, key, val){
	var dep = new Dep()
	Object.defineProperty(vm, key, {
		enumerable: true, // 可枚举,
		configurable: false,// 不可define
		get: function(){
			return val
		},
		set:function(newValue){
			if (val === newValue) return
			dep.notify() // 数据发生改变通知订阅者更新
		}
	})
}

/**
 * 	定义一个订阅者容器
 */
function Dep(){
	this.subs = []
}
Dep.prototype = {
	addSubs: function(sub){
		this.subs.push(sub)
	},
	notify: function(){
		this.subs.forEach(function(sub){
			sub.update()
		})
	}

}