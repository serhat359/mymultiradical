
// gets id in int[] format
function searchForId(idArr){

	var foundRadicals = radicals.filter(x => {
		for(var i = 0; i < idArr.length; i++){
			var id = idArr[i];
			
			if(x.RadicalBits[id]){}
			else{ return false; }
		}
		
		return true;
	});
	
	n_results = foundRadicals.length;
	//alert(n_results); // DONE!!!!
	
	var grouped = groupBy(foundRadicals, 'Strokes');
	
	var tempArr = [];
	for(var key in grouped){
		var val = grouped[key];
		
		var binded = key + val.map(x => x.Kanji).join("");
		tempArr.push(binded);
	}
	
	var joined = tempArr.join("");
	//alert(joined); // DONE!!!!
	
	var buttons = [];
	
	for (var i = 1; i <= 253; i++)
	{
		var c;

		if(idArr.some(x => x == i))
			c = 'C';
		else if (foundRadicals.some(x => x.RadicalBits[i]))
			c = 'P';
		else
			c = 'I';

		buttons.push(c);
	}
	
	var buttonJoined = buttons.join("");
	//alert(buttonJoined); // DONE!!!!
	
	var returnObj = {
		n_results: n_results,
		results: joined,
		buttons: buttonJoined
	};
	
	return returnObj;
}

function groupBy(arr, prop) {
	return arr.reduce(function(rv, x) {
		(rv[x[prop]] = rv[x[prop]] || []).push(x);
		return rv;
	}, {});
}

function containsAll(haystack, needles){ 
	for(var i = 0, len = needles.length; i < len; i++){
		if(haystack.indexOf(needles[i]) == -1) return false;
	}
	return true;
}

//var result = searchForId([1,2,3]);