$('#moviesubmit').on('click', function(){
  let movie = $('#movie').val();
  let rating = $('#rating').val();
  $(`<li><button type="button" >X</button> ${movie} ${rating} </li>`).appendTo('#ollist')
  $('#movie').val('');
  $('#rating').val(0)
})
$('#list').on('click', 'BUTTON',function(){
  this.parentElement.remove()
})
$('#rating').on('change',function(){
  const rating = $('#rating').val();
  console.log(rating)
  $('#ratinglabel').text(rating);
})
