isNavShown = false
nav = null
content = null
overlay = null
navButton = null
navLabel = $ '<span id=\'navLabel\'>&nbsp;&nbsp;&nbsp;Navigation</span>'
navLabel.fadeOut

navSlideTime = 350

$(document).ready ->
    content = $('#content')
    content = $('#content')
    overlay = $('#overlay')
    nav = $('#nav')
    navButton = $('#navButton')

    navButton.append(navLabel)

    overlayHeight = window.getComputedStyle(document.getElementById('content'), null).getPropertyValue('height')
    overlay.css('height', if overlayHeight == 'auto' then '100vh' else overlayHeight)

    navButton.click ->
        toggleNav()

    navButton.hover(
        -> navLabel.stop().animate {opacity: 'toggle', width: 'toggle'}
        -> navLabel.stop().animate {opacity: 'toggle', width: 'toggle'}
    )

    overlay.click ->
        if isNavShown
            toggleNav()

openNav = ->
    if !isNavShown
        content.stop().animate {left: nav.outerWidth()}, navSlideTime
        navButton.stop().animate {left: nav.outerWidth()}, navSlideTime
        overlay.stop().css('display', 'inline').animate {left: nav.outerWidth(), opacity: '0.4'}, navSlideTime
        isNavShown = true

closeNav = ->
    if isNavShown
        content.stop().animate {left: 0}, navSlideTime
        navButton.stop().animate {left: 0}, navSlideTime
        overlay.stop().animate {left: 0, opacity: 0}, {
            duration: navSlideTime,
            done: ->
                overlay.css('display', 'none')
        }
        isNavShown = false


toggleNav = ->
    if isNavShown then closeNav() else openNav()