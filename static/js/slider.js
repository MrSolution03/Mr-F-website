document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderItems = document.querySelectorAll('.slider-item');
    let currentIndex = 0;
    const slideInterval = 3000; // 3 seconds

    function showSlide(index) {
        sliderItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        const offset = -index * 100;
        sliderContainer.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        showSlide(currentIndex);
    }

    // Initialize the first slide
    showSlide(currentIndex);

    // Set interval for automatic sliding
    setInterval(nextSlide, slideInterval);
});
