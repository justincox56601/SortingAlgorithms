/**
 * This class is for making colored boxes
 */

export default class Boxes{
	constructor(){
	}

	CreateBoxes(list){
		const padding = 32; // 32 px of padding for the boxes around border
		let grid = document.createElement("DIV");
		grid.className = "grid";
		grid.id = "grid";
		grid.style.width = '100%';

		let i;
		for(i=0; i<list.length; i++){
			const box = document.createElement("DIV");
			box.className = "box";
			box.id = i;
			box.style.backgroundColor = `rgb(255, 0, ${list[i]})`;
			box.style.width = ((window.innerWidth - padding) / list.length) + 'px';
			console.log(grid.width, window.innerWidth);
			box.style.height = (list[i] + 5) + 'px';

			//const txt = document.createElement('P');
			//txt.className = "boxText";
			//txt.innerHTML = list[i];

			//box.appendChild(txt);
			grid.appendChild(box);
		}

		return grid;
	}

	SetBox(list, index){
		//sets the background color and number inside the box.
		const box = document.getElementById(index);
		box.style.backgroundColor = `rgb(255, 0, ${list[index]})`;

		//box.children[0].innerHTML = list[index];
		box.style.height = (list[index] + 5) + 'px';

		
	}

	SetSorted(list, index){
		const box = document.getElementById(index);
		box.style.backgroundColor = 'black';
	}

	ClearBox(index){
		const box = document.getElementById(index);
		box.children[0].innerHTML = null;
		box.style.backgroundColor = 'transparent';
	}
}