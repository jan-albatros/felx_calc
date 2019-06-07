/* flex_calc.js –– simple calculator
 *
 *	Adds, substracts, multiplies, divides one-digit integer numbers. Resets prints output.
 *
 *	TO DO: 	a) process multi-digit numbers (arrays),
 *			b) process float numbers,
 * 			c) output operands and operator / temp sum in "history" output
 *			d) save result to CSV file (for further processing with PHP).
 *
 */


/* Set global vars */
var result = 0;				// result of the math operation
var firstOperand = null; 	// first operand
var operator = null;		// operator +,-,/,%
var nextOperand = null; 	// second/next operand
var memory = 0;				// temp for saving result
var output;					// output result for user


// Add listeners to numerals and operators by type   
document.addEventListener('click', function (event) {
	
	// Process numerals
	if (event.target.matches('.num')) {
		//console.log(' Number button clicked ');
		console.log(event.target.innerText);

		// if first operand is null write, to it. if it's defined, write to next/second operand
		if (firstOperand == null) {
			firstOperand = Number(event.target.innerText);
		} else {
			nextOperand = Number(event.target.innerText);
		}
		//console.log('firstOperand: ' + firstOperand + ', nextOperand: ' + nextOperand);
	}

	// Process operators
	if (event.target.matches('.opp')) {
		
		if (firstOperand == null) {
			firstOperand = 0;
		} 
		//operator = event.target.innerText;
		operator = event.target.dataset.operator; // get value of 'data-operator' attr of HTML element
		console.log(operator);
	}
}, false);

// Bind actions to other keys when window loads and specify our functions
window.onload=function(){
	
	// Process special keys
	// Equals – get result of the math operation
	document.getElementById('btn_equals').addEventListener('click', event => {
		
		result = calculate(); // calculate 
		refreshOutput(); // print output
		console.log('result: ' + result);
	});

	// AC - reset
	document.getElementById('btn_ac').addEventListener('click', event => {
		
		result = 0;
		firstOperand = null;
		operator = null;
		nextOperand = null;
		refreshOutput(); // print output
		console.log('RESET. Result: ' + result);
	});

	// Save - Save to memory (to be continued – save to CSV file with IP address, browser agent name and datetime)
	document.getElementById('btn_save').addEventListener('click', event => {
		// ...
		memory = result;
		console.log('SAVED. Result saved: ' + result);
	});

	// Perform math operation on operands
	function calculate(){
		
		console.log('CALCULATE: ' + firstOperand + ' ' + operator + ' ' + nextOperand);
		switch(operator){
			case "+": /* plus */ 
				result = firstOperand + nextOperand;
				break;
			case "-": /* minus */
				result = firstOperand - nextOperand;
				break;
			case "*": /* times / multiply */
				result = firstOperand * nextOperand;
				break;
			case "/": /* divide */
				result = firstOperand / nextOperand;
				break;
			default: /* unknown operation - print Error */
				result = "ERR";
				break;
		}
		return result;
	}

	function refreshOutput(){

		output = document.getElementById('disp_output');
		output.innerHTML = result;

	}
}
