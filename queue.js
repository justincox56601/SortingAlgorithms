/**
 * This is a QUEUE datastructure
 */

export default class Queue extends Array{
	Enqueue(val){
		this.push(val);
	}

	Dequeue(){
		return this.shift();
	}

	Peek(){
		return this[0];
	}

	isEmpty(){
		return this.length === 0;
	}
}