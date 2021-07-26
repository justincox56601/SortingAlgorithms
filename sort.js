import Boxes from './box.js'
import Queue from './queue.js';

export default class Sort{
	constructor(){
		this._list = []
		this._queue = new Queue();
		this._boxes = new Boxes();
		this._fps = 60;
		this._selectedMethod = 'BubbleSort';
		this._methods = {
			BubbleSort : this.BubbleSort,
			QuickSort : this.QuickSort,
			SelectionSort : this.SelectionSort,
			InsertionSort : this.InsertionSort,
			MergeSort : this.MergeSort,
		};
	}

	
	/**
	 * 
	 * @param {*int} size 
	 * @returns an array of random numbers
	 */
	NewList(size){
		size = this._clamp(size * 2.55, 1, 255);
		this._list.length = 0;
		let i;
		for(i=0; i<size; i++){
			this._list.push(Math.floor(Math.random()*255 + 1));
		}

		return this._list;
	}

	/**
	 * This is the callback used on the front end when the sort button is clicked.  Calls the method stored in this._methods
	 */
	Sort(){
		this._methods[this._selectedMethod](this); 
	}

	/**
	 * @param {string} method 
	 * sets the currently selected method that this.Sort() will use
	 */
	SetMethod(method){
		this._selectedMethod = method;
	}

	/**
	 * 
	 * @param {int} value 
	 * sets the this._fps value to be used in the animate method
	 */
	SetFps(value){
		//receives a value between 1 and 100
		this._fps = this._clamp(value *.60, 1, 60);
	}

	/**
	 * ==========================================
	 * 	Bubble Sort
	 * ==========================================
	 */

	BubbleSort(obj){
		//uses the bubble sort to sort a list
		const l2 = [...obj._list];
		const n = l2.length;

		for(var i = 0; i<n; i++){
			for(var j=0; j<n-1; j++){
				if(l2[j] > l2[j+1]){
					
					//call the swap function
					obj._swap(l2, j, j+1);
				}
			}

			// n-1-i is sorted
			//this._sorted(n-1-i);
		}

		obj._animate();
	}

	/**
	 * ==========================================
	 * 	Selection Sort
	 * ==========================================
	 */

	SelectionSort(obj){
		const l2 = [... obj._list]; 
		const n = l2.length;
		let i, j, min;

		for(i=0; i<n; i++){
			min = i;
			for(j = i+1; j<n; j++){
				if(l2[min] > l2[j]){
					min = j;
				}
			}

			
			//perform the swap
			obj._swap(l2, i, min);

			//i is sorted
			//this._sorted(i);
			
			
		}

		obj._animate();
	}

	/**
	 * ==========================================
	 * 	Insertion Sort
	 * ==========================================
	 */

	InsertionSort(obj){
		const l2 = [... obj._list];
		const n = l2.length;
		let i, j, key;

		for(i=1; i<n; i++){
			key = l2[i];
			j = i-1;

			while(j>=0 && l2[j] > key){
				l2[j+1] = l2[j];

				//add the change to the animation queue
				obj._queue.Enqueue({
					callback : obj._pushCallback,
					value: {
						index : j,
					}
				});

				//decrement j
				j--;
			}

			l2[j+1] = key;
			
			//enqueue the insertion for the animation
			obj._queue.Enqueue({
				callback : obj._insertCallback,
				value: {
					index : j+1,
					key : key,
				}
				
			});

			//j+1 is sorted
			//obj._sorted(j+1);
		}

		
		obj._animate();
	}


	_insertCallback(obj, value){

		obj._list[value.index] = value.key;
		obj._boxes.SetBox(obj._list, value.index);

	}

	_pushCallback(obj, value){
		obj._list[value.index +1] = obj._list[value.index];
		obj._boxes.SetBox(obj._list, value.index+1);
		obj._boxes.ClearBox(value.index);
	}



	/**
	 * ==========================================
	 * 	Merge Sort
	 * @note THIS ONE DOES NOT WORK YET SO IT IS NOT INCLUDED IN THE FRONT END.
	 * ==========================================
	 */

	MergeSort(obj){
		const l2 = [...obj._list];
		obj._mergeSortHelper(obj, l2, 0, l2.length-1);
		
	}

	_mergeSortHelper(obj, list, left, right){
		console.log("entering helper", left, right)
		if(left >= right){
			return;
		}
		let m = left + parseInt((right-left)/2)
		obj._mergeSortHelper(obj, list, left, m);
		obj._mergeSortHelper(obj, list, m+1, right);
		obj._merge(obj, list, left, m, right);
		console.log(list);
	}

	_merge(obj, list, left, middle, right){
		//let tempL = [...left];
		//let tempR = [...right];
		let i, j = 0;
		let k = 1;
		let n1 = middle - left + 1;
		let n2 = right - middle;
		console.log("merge:", n1, n2);

		while(i< n1 && j < n2){
			if(left[i] <= right[j]){
				list[k] = left[i];
				i++;
			}else{
				list[k] = right[j];
				j++;
			}
			k++;
		}

		//copy in any remaing elements
		while(i < n1){
			list[k] = left[i];
			i++;
			k++;
		}

		while(j < n2){
			list[k] = right[j];
			j++;
			k++;
		}
	}

	/**
	 * ==========================================
	 * 	Quick Sort
	 * ==========================================
	 */

	QuickSort(obj){
		const l2 = [...obj._list];
		obj._quickSortHelper(obj, l2, 0, l2.length-1);
		obj._animate();

	}

	_quickSortHelper(obj, list, low, high){
		if(low < high){
			let p = obj._quickSortPartition(obj, list, low, high);

			//p is in its sorted position.  flag it as sorted
			//obj._sorted(p);

			obj._quickSortHelper(obj, list, low, p-1);
			obj._quickSortHelper(obj, list, p+1, high);
		}else{
			//low is in its sorted position.  flag it as sorted
			//obj._sorted(low);
			
		}
	}

	_quickSortPartition(obj, list, low, high){
		const pivot = list[high]; //choosing the last index of the list as the pivot
		let i = low-1, j = low;

		for(j = low; j<high; j++){
			if(list[j] < pivot){
				i++;

				//call the swap function
				obj._swap(list, i, j);
			}
		}

		
		//call the swap function
		this._swap(list, i+1, high);
		return i+1;

	}

	/**
	 * ==========================================
	 * 	Utility
	 * ==========================================
	 */

	_swap(list, first, second){
		//performs the swap on the copied list
		const temp = list[first];
		list[first] = list[second];
		list[second] = temp;	

		//enqueue the swap callback for the animation
		this._queue.Enqueue({
			callback : this._swapCallback,
			value : {
				first : first,
				second : second,
			},
		});
	}

	_swapBoxes(obj){
		//does the swap and box change on the main list.  Used int the swapCallback method
		const temp = this._list[obj.first];
		this._list[obj.first] = this._list[obj.second];
		this._list[obj.second] = temp;

		
		const boxes = new Boxes();
		boxes.SetBox(this._list, obj.first);
		boxes.SetBox(this._list, obj.second);
	}

	_swapCallback(obj, value){
		//because this is a callback, it loses its reference to this object.  need to pass it in. (this)
		
		//create boxes object
		const boxes = new Boxes();

		//perform the swap
		const temp = obj._list[value.first];
		obj._list[value.first] = obj._list[value.second];
		obj._list[value.second] = temp;

		//update the boxes visually
		boxes.SetBox(obj._list, value.first);
		boxes.SetBox(obj._list, value.second);
	}

	_sorted(index){
		this._queue.Enqueue({
			callback : this._sortedCallback,
			value : {
				index : index,
			}
		});
	}

	_sortedCallback(obj, value){
		//set the sorted boxes to a different color
		const boxes = new Boxes();
		boxes.SetSorted(obj._list, value.index);
	}


	_animate(){
		//dequeue and swap the boxes
		setTimeout(()=>{
			if(! this._queue.isEmpty()){
				const q = this._queue.Dequeue();
				q.callback(this, q.value);
				this._raf = requestAnimationFrame(()=>{
					this._animate();
				});
			}else{
				cancelAnimationFrame(this._raf);
			}
		},1000 /this._fps);
		
		
	}

	//cLAmp function to help with the range sliders
	_clamp(num, min, max){
		return Math.min(Math.max(num, min), max);
	}



	
}

