
/**
 * 把需要解析的模板添加到文档碎片中
 * @param {object} node 需要解析的文档
 */
function addToFragment(node, vm){
	var frag = document.createDocumentFragment(); //创建文档碎片
	var child;
	//循环直到把所有的的子节点都添加到文档碎片中
	while (child = node.firstChild) {
		compile(child,vm)
		frag.appendChild(child)  //把节点添加到文档碎片中，并在文档中移除该节点
	}
	return frag
}
/**
 * 把数据添加到文档碎片中
 * @param  {object} node 需要添加的节点
 * @param  {object} vm   实例化的数据
 * @return {object}      null
 */
function compile(node, vm){
	var reg = /\{\{(.*)\}\}/; // 正则匹配{{msg}}
	// 节点类型是元素
	if (node.nodeType === 1) {
		var attr = node.attributes;
		// 解析自定义属性
		for(var i = 0; i < attr.length; i++){
			if (attr[i].nodeName == 'v-model') {
				var name = attr[i].nodeValue;  //解析自定义属性v-model 

				node.addEventListener('keyup', function(e){
					// 给相应的data属性赋值，进而触发该属性的set方法
					vm[name] = e.target.value
				})

				node.value = vm.data[name]; // 并将实例化vm中对应的值赋给该点
				node.removeAttribute('v-model'); //移除自定义属性，防止在页面上显示出来
			}
		}
	}
	// 如果是文档
	if (node.nodeType === 3) {
		if (reg.test(node.nodeValue)) {
			var name = RegExp.$1; // 获取{{msg}} 中的字符串
			name = name.trim();
			//node.nodeValue = vm.data[name] //将vm中的data的值赋给该node
			new Watcher(vm, node, name)
		}
	}
}


function Vue(opt){
	if (!opt) {
		console.warn('需要传入实例化参数')
		return
	}
	this.data = opt.data
	var id = opt.el
	observer(this.data, this)
	var dom = addToFragment(document.getElementById(id),this)
	document.getElementById(id).appendChild(dom) //把文档碎片到文档中
}