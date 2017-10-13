
/**
 * 建立订阅者,并实现observer和compile之间的桥梁
 * @param {object} vm   实例化的vm
 * @param {object} node 对那个文档节点实施订阅和监管
 * @param {[string} name 文档节点中自定义的属性值
 */
function Watcher(vm, node, name){
		Dep.target = this; //将自己赋值给一个全局变量Dep.target,以便在observer中添加订阅者，把this添加到订阅器中
		this.name = name;
		this.vm = vm;
		this.node = node
		this.update()
		Dep.target = null //执行完后把Dep.target赋值为null,保证只有一个Dep.target
}
Watcher.prototype = {
	update: function(){
		this.get()
		this.node.nodeValue = this.value;
	},
	// 获取vm实例中data的属性值
	get:function(){
		this.value = this.vm[this.name] // 触发相应属性的get函数数,触发后就可以把这个属性添加到订阅者容器中
	}
}