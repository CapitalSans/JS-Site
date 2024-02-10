let siteHeader = document.getElementById('site-header');
let heroVideoWrapper = document.getElementById('home-hero-video-wrapper');
let heroVideo = document.getElementById('home-hero-video');
const cursorHoverHero = document.getElementById('cursor-hover-hero');
const cursorHoverWork = document.getElementById('cursor-hover-work');
let homeHeroMessage = document.getElementById('home-hero-message');

let isHoveringHero;
let isHoveringWork;

// document.addEventListener("DOMContentLoaded", function() {
//     window.scrollTo(1, window.scrollY);
// });

const faqBG = document.getElementById('home-faq-section');

const workItemContent = document.querySelectorAll('.item-content');
const workImageWrappers = document.querySelectorAll('.image-wrapper');

workImageWrappers.forEach(wrapper => {
    wrapper.addEventListener('mouseenter', function() {
        isHoveringWork = true;
        document.body.style.cursor = 'none';

        const itemServices = this.nextElementSibling.querySelector('.item-services');
        itemServices.classList.remove('fade-out');
        itemServices.classList.add('fade-in');

        this.addEventListener('mousemove', function() {
            cursorHoverWork.classList.remove('fade-out');
            cursorHoverWork.classList.add('fade-in');
        });
    });
    wrapper.addEventListener('mouseleave', function() {
        isHoveringWork = false;
        document.body.style.cursor = 'auto';
        cursorHoverWork.classList.remove('fade-in');
        cursorHoverWork.classList.add('fade-out');

        const itemServices = this.nextElementSibling.querySelector('.item-services');
        itemServices.classList.remove('fade-in');
        itemServices.classList.add('fade-out');
    });
});

workItemContent.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const itemServices = this.querySelector('.item-services');
        itemServices.classList.remove('fade-out');
        itemServices.classList.add('fade-in');
    });
    item.addEventListener('mouseleave', function() {
        const itemServices = this.querySelector('.item-services');
        itemServices.classList.remove('fade-in');
        itemServices.classList.add('fade-out');
    });
});

let lastScrollTop = 0;
let minScrollDIstance = 2;

const accordionButton = document.querySelectorAll('.accordion-button');
let openAccordion = null;

accordionButton.forEach(button => {
    const accordionContent = button.nextElementSibling;
    accordionContent.style.maxHeight = '0px';
    button.addEventListener('click', () => {
        if (openAccordion && openAccordion !== accordionContent) {
            openAccordion.style.maxHeight = '0px';
            openAccordion.classList.remove('open');
            openAccordion.previousElementSibling.classList.remove('open');
        }
        if(accordionContent.style.maxHeight === '0px') {
            // faqBG.style.height = '170%';
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            accordionContent.classList.toggle('open');
            button.classList.add('open');
            openAccordion = accordionContent;
        } else {
            // faqBG.style.height = '100%';
            accordionContent.style.maxHeight = '0px';
            accordionContent.classList.toggle('open');
            button.classList.remove('open');
            openAccordion = null;
        }
    });
});

heroVideoWrapper.addEventListener('mouseenter', function() {
    isHoveringHero = true;
    document.body.style.cursor = 'none';

    this.addEventListener('mousemove', function() {
        cursorHoverHero.classList.remove('fade-out');
        cursorHoverHero.classList.add('fade-in');
    });
});

heroVideoWrapper.addEventListener('mouseleave', function() {
    isHoveringHero = false;
    document.body.style.cursor = 'auto';
    cursorHoverHero.classList.remove('fade-in');
    cursorHoverHero.classList.add('fade-out');
});

heroVideoWrapper.addEventListener('click', function() {
    heroVideo.requestFullscreen();
    document.body.style.cursor = 'default';
});

window.addEventListener('mousemove', function(e) {
    if(isHoveringHero) {
        cursorHoverHero.style.left = e.clientX + 'px';
        cursorHoverHero.style.top = e.clientY + 'px';
    }
    if(isHoveringWork) {
        cursorHoverWork.style.left = e.clientX + 'px';
        cursorHoverWork.style.top = e.clientY + 'px';
    }
});

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop + minScrollDIstance) {
        siteHeader.classList.remove('fade-in');
        siteHeader.classList.add('fade-out');
        siteHeader.style.pointerEvents = 'none';
    } else if(scrollTop < lastScrollTop - minScrollDIstance) {
        siteHeader.classList.remove('fade-out');
        siteHeader.classList.add('fade-in');
        siteHeader.style.pointerEvents = 'auto';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

window.addEventListener('scroll', function() {
    let scale = Math.min(1.2, 1.05 + window.scrollY / 2500);
    let value = window.scrollY;
    heroVideoWrapper.style.transform = `scale(${scale})`;
    homeHeroMessage.style.transform = `translate(${value * 0.02}px, -${value * 0.1}px)`;
});