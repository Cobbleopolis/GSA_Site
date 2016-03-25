animTime = 500

$ ->
    $('#slideShow').find('> img:gt(0)').hide();
    setInterval( ->
        first = $('#slideShow').find('img:first')
        first.fadeOut(animTime)
        first.next().delay(animTime).fadeIn(animTime)
        first.appendTo('#slideShow')
    , 4000)