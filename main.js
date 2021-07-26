import Sort from './sort.js';
import Boxes from './box.js'

let listDiv = document.getElementById('listUnsort');
const sort = new Sort();
const boxes = new Boxes();

if(listDiv){
	
	const list = sort.NewList(10);
	const b = boxes.CreateBoxes(list);
	listDiv.appendChild(b);
}

if(document.getElementById('range')){
	let r = document.getElementById('range');

	r.addEventListener("change", e=>{
		const list = sort.NewList(r.value);
		const b = boxes.CreateBoxes(list);
		const g = document.getElementById("grid");
		listDiv.removeChild(g);
		listDiv.appendChild(b); 
	});
}

if(document.getElementById('sort_btn')){
	document.getElementById('sort_btn').addEventListener('click', e=>{
		sort.Sort();
		//sort.BubbleSort();
		//sort.QuickSort();
		//sort.SelectionSort();
		//sort.InsertionSort();
		
	});
	
}

if(document.querySelector('#fps')){
	const fps = document.querySelector('#fps');
	fps.addEventListener('change', e=>{
		sort.SetFps(fps.value);
		console.log(fps.value);
	});
}

if(document.querySelector('#method')){
	const method = document.querySelector('#method');
	method.addEventListener('change', e=>{
		sort.SetMethod(method.value);
	});
}


