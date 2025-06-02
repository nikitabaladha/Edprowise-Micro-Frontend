document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".features-wrapp");
    const items = document.querySelectorAll(".carousel-itemm");
    const featureItems = document.querySelectorAll('.feature-item-wrap');
    const totalItems = items.length;
    let currentIndex = 0;
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Update carousel position and active state
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Remove 'active' from all feature-item-wrap and add it to the currently visible one
        featureItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
                item.classList.remove('item');
            } else {
                item.classList.remove('active');
                item.classList.add('item');
            }
        });
    }

    // Move to the next slide
    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(moveToNextSlide, intervalTime);
    }

    // Stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Initialize autoplay
    stopAutoplay();

    // Hover behavior for feature items
    // featureItems.forEach(item => 
    //     item.addEventListener('mouseenter', function () {
    //         handleHover(this);
    //     })
    // );

    function handleHover(el) {
        featureItems.forEach(item => {
            item.classList.remove('active');
            item.classList.add('item');
        });
        el.classList.add('active');
    }

    // Start and stop autoplay based on screen size
    window.addEventListener("resize", function () {
        if (window.innerWidth > 570) {
            stopAutoplay();
            carouselContainer.style.transform = "translateX(0)";
        } else {
            startAutoplay();
        }
    });

    // Only start autoplay below 570px
    if (window.innerWidth <= 570) {
        startAutoplay();
        updateCarousel();
    }
});
