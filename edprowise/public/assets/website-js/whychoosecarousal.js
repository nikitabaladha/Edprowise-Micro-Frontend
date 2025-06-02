document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".choose-wrapp");
    const items = document.querySelectorAll(".carousel-item-choose");
    const totalItems = items.length;
    let currentIndex = 0;
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Update carousel position and active state
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

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
