$(document).ready(function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function updateSlider() {
        const newTransformValue = `translateX(-${currentSlide * 100}%)`;
        document.querySelector('.slides').style.transform = newTransformValue;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    // Set an interval to automatically transition the slides every 3 seconds
    setInterval(nextSlide, 3000);

    // Initialize the slider
    updateSlider();
});
