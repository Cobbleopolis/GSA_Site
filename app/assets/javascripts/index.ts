var animTime: number = 500;

$(function() {
    $('#slideShow').find('> img:gt(0)').hide();
    setInterval(function() {
        var first = $('#slideShow').find('img:first');
        first.fadeOut(animTime);
        first.next().delay(animTime).fadeIn(animTime);
        first.appendTo('#slideShow');
    }, 4000);
});
