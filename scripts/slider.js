/* SLIDER 
====================== */
const checkMouseOver = () => {
    if($('.slider__btn:hover').length != 0) return true
    else return false;
}

const autoSlide = () => {
    clearInterval(window.sliderAnim)
    window.sliderAnim = setInterval(() => {
        if(checkMouseOver()) clearInterval(window.sliderAnim) /* RESER AUTO SLIDE */
        else nextSlide();

        /* UPDATE INDICATORS */
        updateIndicators()
    }, 7000)
}
autoSlide();

$('.slider__btn').mouseleave(() => {
    autoSlide();
})

const getNextPrevElem = () => {
    const currentIndex = $('.slider__item.active').index();
    var next = 0, prev = 0;
    if(currentIndex == $('.slider__item').length-1) next = 0;
    else next = currentIndex+1; 

    if(currentIndex == 0) prev = $('.slider__item').length-1
    else prev = currentIndex-1

    return [next, prev];
}

const setPosition = () => {
    const currentIndex = $('.slider__item.active').index();
    const [next, prev] = getNextPrevElem();
    $('.slider__item').filter(function(index) {
        if(index == currentIndex) {
            $(this).css({ 'transform': 'translateX(0)' })
        } else if(index == prev) {
            $(this).css({ 'transform': 'translateX(-100%)' })
        } else if(index == next) {
            $(this).css({ 'transform': 'translateX(100%)' })
        }
    })
}
setPosition();

$('#slider__next-btn').click(() => {
    nextSlide();
})
const nextSlide = () => { /* NEXT SLIDE */
    const [next, prev] = getNextPrevElem();

    $('.slider__item').removeClass('current')
    $('.slider__item.active')
        .css({ 'transform': 'translateX(-100%)' })
        .addClass('current')
    $('.slider__item').eq(next)
        .css({ 'transform': 'translateX(0%)' })
        .addClass('current')

    updateActiveSlide(next)
    setPosition(); /* SET POSTION OF ITEMS BEFORE CHANGE */
}


$('#slider__prev-btn').click(() => {
    prevSlide()
})
const prevSlide = () => { /* PREV SLIDE */
    const [next, prev] = getNextPrevElem();

    $('.slider__item').removeClass('current')
    $('.slider__item.active')
        .css({ 'transform': 'translateX(100%)' })
        .addClass('current')
    $('.slider__item').eq(prev)
        .css({ 'transform': 'translateX(0%)' })
        .addClass('current')

    updateActiveSlide(prev)
    setPosition(); /* SET POSTION OF ITEMS BEFORE CHANGE */
}

/* UPDATE CLASS ACTIVE ON SLIDE */
const updateActiveSlide = (index) => {
    $('.slider__item')
        .removeClass('active')
        .eq(index).addClass('active')
}

/* INDICATOR */
$(document).on('click', '.indicators__item', function() {
    $('.slider__item').removeClass('current')
    const $this = $(this).index()

    $('.indicators__item').removeClass('active')
    $(this).addClass('active')

    $('.slider__item')
        .removeClass('active')
        .css({ 'transform': 'translateX(-100%)' })
        .eq($this).addClass('active')

    setPosition()
    autoSlide()
})

/* CREATE INDICATORS OF SLIDE */
const createIndicators = () => {
    $('.slider').filter(function() {
        const sliderLength = $(this).find('.slider__item').length;
        for(var i = 0; i < sliderLength; i++) {
            const item = $('<div>').addClass('indicators__item');
            $(this).find('.slider__indicators').append(item)
        }
    })
}
createIndicators();

$('.slider__btn').click(() => updateIndicators())

const updateIndicators = () => {
    const activeSlideIndex = $('.slider__item.active').index();

    $('.indicators__item')
        .removeClass('active')
        .eq(activeSlideIndex).addClass('active')
}
updateIndicators()