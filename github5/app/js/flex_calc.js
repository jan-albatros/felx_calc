/* flex_calc.js –– simple calculator
 *
 *	Adds, substracts, multiplies, divides integer and float numbers up to 8 digits long. Resets prints output.
 *
 *
 */


// Bind actions to keys when window loads and specify our functions
window.onload=function(){

	/* Set global vars */
	var result = 0;				// result of the math operation
	var operand1 = null; 		// first operand
	var operator = null;		// operator +,-,/,%
	var operand2 = null; 		// second/next operand
	var output = document.getElementById('disp_output');		// output result for user
	var hOutput = document.getElementById('disp_hist');			// output result for user
	var cFlag = true;			// "clear output" flag
	var operandReady = 1;		// which operand is ready to assign new value (1 or 2)

	function refreshOutput(){

		// Clear output
		if (cFlag) {
			console.log("Output cleared!");
			output.innerHTML = 0; // clear output
			hOutput.innerHTML = "&nbsp;";
		}
		
		// Print result on display
		if (operand1 != null && operand2 != null) {	 
			if (result.toString().length < 8) { // Handle big numbers
				output.innerHTML = result;
				writeHistory();
			} else {
				hOutput.innerHTML = "Num too big";
				output.innerHTML = "ERR"
			}
		} 
	}

	// Write last operation in small display as history
	function writeHistory(){
		
		hOutput.innerHTML = operand1 + " " +  operator + " " + operand2 + " =";
	}

	// Save value from display to operand 1 or 2
	function saveVal() {
		
		if (operandReady == 1) {
			operand1 = Number(output.innerHTML);
			console.log("operand1 saved as " + operand1);
			operandReady = 2;
		}  else { //operandReady == 2
			operand2 = Number(output.innerHTML);
			console.log("operand2 saved as " + operand2);
			operandReady = 1;
		}
	}

	// Perform math operation on operands
	function calculate(){
		
		console.log('CALCULATE: ' + operand1 + ' ' + operator + ' ' + operand2);
		switch(operator){
			case "+": /* plus */ 
				result = operand1 + operand2;
				break;
			case "-": /* minus */
				result = operand1 - operand2;
				break;
			case "*": /* times / multiply */
				result = operand1 * operand2;
				break;
			case "/": /* divide */
				result = operand1 / operand2;
				break;
			default: /* unknown operation - print Error */
				result = "ERR";
				break;
		}
		return result;
	}	

	// Add listeners to numerals and operators BY TYPE
	document.addEventListener('click', function (event) {
		
		console.log("operandReady = " + operandReady);

		// Process numbers by type (class) or id
		if (event.target.matches('.num')) {
			// Process numerals
			
			//console.log(' Number button clicked ');
			var value = null;
			if(event.target.innerText){
				value = event.target.innerText;
				console.log(value);
				if (cFlag) {	// Write first number of operand to display
					output.innerHTML = value;
					cFlag = false;
				} else {	// Append next numbers operand to display
					if(output.innerHTML.length < 8){ // handle big numbers
						output.innerHTML += value;
					}
				} 
			} else {
				output.innerHTML = "ERR";
			}
		
		} else if (event.target.matches('.op')) {
			// Process operators
			
			saveVal(); // save value from display
			operator = event.target.dataset.operator; // get value of 'data-operator' attr of HTML element
			console.log(operator);
			cFlag = true; // to clear output first
		
		} else if (event.target.matches('#btn_equals')) {	
			// process Equals – calculate

			saveVal(); // save value from display
			if ( operand1 != null && operand1 != null) {
				result = calculate(); // calculate 
				result = result.toLocaleString(); // should work in 2016+ WEb Browsers
			} else {
				result = 0;
			}
			refreshOutput(); // print output
			//output.innerHTML = result;
			console.log('result: ' + result);
			cFlag = true;
		
		}	else if (event.target.matches('#btn_ac')) { 
			// process AC – RESET

			result = 0;
			operand1 = null;
			operator = null;
			operand2 = null;
			operandReady = 1;
			cFlag = true;
			refreshOutput(); // print output
			console.log('RESET. Result: ' + result);
		
		} else if (event.target.matches('#btn_save')) {
			
			var data = new FormData();
			data.append('sum', result);
			
			const url = "php/calculations.php";
			
			var http = new XMLHttpRequest();
			http.open('POST', url, true);
			http.send(data);

			http.onload = function() {
			  console.log(`Loaded: ${http.status} ${http.response}`);
			};

			http.onerror = function() { 
			  console.log(`Network Error`);
			};

			console.log('SAVED. Result saved: ' + result);
		}

	}, false);
}
