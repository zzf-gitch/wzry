$('.imageWrapper').bind('click', function () {
  $('.detailsWrapper').addClass('active');
})

$('.close').bind('click', function () {
  $('.detailsWrapper').removeClass('active');
})