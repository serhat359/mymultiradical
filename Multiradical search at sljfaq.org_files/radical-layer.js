
// gets id in int format
function searchForId(id){
	
	var foundRadicals = radicals.filter(x => x.Radicals.some(y => y == id));
	
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

		if(i == id)
			c = 'C';
        else if (foundRadicals.some(x => x.Radicals.some(y => y == i)))
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
	
	return JSON.stringify(returnObj);
}

function groupBy(arr, prop) {
	return arr.reduce(function(rv, x) {
		(rv[x[prop]] = rv[x[prop]] || []).push(x);
		return rv;
	}, {});
}

//var result = searchForId(1);