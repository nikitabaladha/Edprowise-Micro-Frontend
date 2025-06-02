document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".mission-vision-section");
    const items = document.querySelectorAll(".cart-vm");
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
        if (window.innerWidth > 991) {
            stopAutoplay();
            carouselContainer.style.transform = "translateX(0)";
        } else {
            startAutoplay();
        }
    });

    // Only start autoplay below 991px
    if (window.innerWidth <= 991) {
        startAutoplay();
        updateCarousel();
    }
});
