$(document).ready(() => {
    /* FIXED HEADER */
    $(window).on('scroll load resize', function() {
        if($(this).scrollTop() > $('.intro').outerHeight()) {
            $('.header').addClass('fixed')
            $('main').css({ 'margin-top': `${$('.header').outerHeight()}px` })
        } else {
            $('.header').removeClass('fixed')
            $('main').css({ 'margin-top': '0' })
        }
    })

    /* BURGER */
    $('.burger').click(function() {
        $('.nav').toggleClass('active')
        if($('.nav').hasClass('active')) $('.header').addClass('border')
        else $('.header').removeClass('border')
    })

    /* NAV LINK (MOBILE) */
    $('.nav__link').click(function() {
        if($('.nav').hasClass('active')) {
            $('.nav').removeClass('active')
            $('.header').removeClass('border')
        }
    })

    /* DROPDOWN MENU */
    $('.dropdown__menu').hide()
    
    $('.dropdown__btn').click(function() {
        $(this).parent().toggleClass('active')
        $(this).next().fadeToggle(100)
    })

    $('.dropdown__item').click(function() {
        $(this).parents('.dropdown').removeClass('active')
    })

    /* NAV TABS */
    $('.nav-tabs__item').click(function() {
        const idx = $(this).index()
        const id = $(this).data('target')
        setContent(idx, id)
    })

    const setContent = (idx, id) => {
        $(`.tab-content#${id}`).children()
            .removeClass('active')
            .eq(idx).addClass('active')
        $('.nav-tabs__item')
            .removeClass('active')
            .eq(idx).addClass('active')
    }
    setContent(0, 'menu-catalog')
})