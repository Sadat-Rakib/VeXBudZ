const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const carousel = document.querySelector('.carousel');
const listHTML = document.querySelector('.carousel .list');
const seeMoreButtons = document.querySelectorAll('.seeMore');
const backButton = document.getElementById('back');

let isTransitioning = false;

// Slide control
nextButton.onclick = () => handleSlide('next');
prevButton.onclick = () => handleSlide('prev');

function handleSlide(direction) {
    if (isTransitioning) return;

    isTransitioning = true;
    carousel.classList.remove('next', 'prev');

    const items = document.querySelectorAll('.carousel .list .item');

    if (direction === 'next') {
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }

    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

// Detail toggle
seeMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    });
});

backButton.addEventListener('click', () => {
    carousel.classList.remove('showDetail');
});


// 🔥 Mobile swipe gesture support
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
}, { passive: true });

carousel.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
}, { passive: true });

carousel.addEventListener('touchend', () => {
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50 && !isTransitioning && !carousel.classList.contains('showDetail')) {
        if (deltaX < 0) {
            handleSlide('next'); // Swipe left
        } else {
            handleSlide('prev'); // Swipe right
        }
    }

    // Reset
    startX = 0;
    endX = 0;
});
