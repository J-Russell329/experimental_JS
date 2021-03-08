$(function () {
	console.log("Let's get ready to party with jQuery!");
});
$('img').addClass('image-center');
$('article p:last-child').remove();
$('ol').append('<li>Hello World!</li>');
$('h1').css('font-size', Math.random() * 100);
$('ol').after('<p>sorry lists suck! it had to go!</p>');
$('ol').remove();
$('body').on('change', function () {
	const red = $('input').get(0).value;
	const blue = $('input').get(1).value;
	const green = $('input').get(2).value;
	$('body').css('background-color', `rgb(${red},${green},${blue})`);
});
$('body').on('click', 'img', function () {
	this.remove();
});
