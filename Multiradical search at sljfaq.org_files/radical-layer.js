
Array.prototype.hasAny = Array.prototype.some;

//enum definition
var C = -57;
var P = -58;
var I = -59;

var cache = {};

// idArr: [1,2,3]
function searchForId(idArr){

	var ids = idArr.join(",");

	var res = cache[ids];

	if(res)
		return res;

	var foundRadicals = radicals.filter(x => containsAll(x.R, idArr));
	
	n_results = foundRadicals.length;
	//alert(n_results); // DONE!!!!
	
	var grouped = groupBy(foundRadicals, 'S');
	
	var tempArr = [];
	for(var key in grouped){
		var val = grouped[key];
		
		var binded = key + val.map(x => x.K).join("");
		tempArr.push(binded);
	}
	
	var joined = tempArr.join("");
	//alert(joined); // DONE!!!!
	
	var buttons = [];
	
	for (var i = 1; i <= 253; i++)
	{
		var c;

		if(idArr.hasAny(x => x == i))
			c = C;
		else if (foundRadicals.hasAny(x => binaryIndexOf(x.R, i) >= 0 ) )
			c = P;
		else
			c = I;

		buttons.push(c);
	}
	
	var returnObj = {
		n_results: n_results,
		results: joined,
		buttons: buttons
	};
	
	cache[ids] = returnObj;

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
		if(binaryIndexOf(haystack,needles[i]) == -1) return false;
	}
	return true;
}

//var result = searchForId([1,2,3]);

setTimeout(function(){
	// cache single radicals
	//for(var i = 1; i <= 253; i++) { searchForId([i]) }
}, 5000);

function binaryIndexOf(arr, searchElement) {
    'use strict';
 
    var minIndex = 0;
    var maxIndex = arr.length - 1;
    var currentIndex;
    var currentElement;
 
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = arr[currentIndex];
 
        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
 
    return -1;
}