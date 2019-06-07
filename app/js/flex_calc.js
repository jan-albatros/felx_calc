//flex_calc.js

/*
var btn_1 = document.getElementById('btn_1');

btn_1.addEventListener('click', event => {
	console.log(1);
})
*/
window.onload=function(){
	
	var result = 0;
	var firstOperand = null;
	var operator = null;
	var nextOperand = null;

	const btn0 = document.getElementById('btn_0');
	const btn1 = document.getElementById('btn_1');
	const btn2 = document.getElementById('btn_2');
	const btn3 = document.getElementById('btn_3');
	const btn4 = document.getElementById('btn_4');
	const btn5 = document.getElementById('btn_5');
	const btn6 = document.getElementById('btn_6');
	const btn7 = document.getElementById('btn_7');
	const btn8 = document.getElementById('btn_8');
	const btn9 = document.getElementById('btn_9');

	btn0.addEventListener('click', event => {
		console.log(0);
	});
	btn1.addEventListener('click', event => {
		console.log(1);
	});
	btn2.addEventListener('click', event => {
		console.log(2);
	});
	btn3.addEventListener('click', event => {
		console.log(3);
	});
	btn4.addEventListener('click', event => {
		console.log(4);
	});
	btn5.addEventListener('click', event => {
		console.log(5);
	});
	btn6.addEventListener('click', event => {
		console.log(6);
	});
	btn7.addEventListener('click', event => {
		console.log(7);
	});
	btn8.addEventListener('click', event => {
		console.log(8);
	});
	btn9.addEventListener('click', event => {
		console.log(9);
	});
}
