function Watcher(vm, node, name){
		Dep.target = this; //将自己赋值给一个全局变量Dep.target,以便在observer中添加订阅者，把this添加到订阅器中
		this.name = name;
		this.vm = vm;
		this.update()
		Dep.target = null //执行完后把Dep.target赋值为null,保证只有一个Dep.target
}
Watcher.prototype = {
	update: function(){
		this.get()
		this.node.nodeValue = this.value;
	},
	get:function(){
		
	}
}