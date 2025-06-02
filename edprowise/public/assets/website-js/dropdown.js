document.addEventListener("DOMContentLoaded", () => {
    const leftItems = document.querySelectorAll(".dropdown-item-left .dropdown-item");
    const rightSections = document.querySelectorAll(".dropdown-item-right > .right-items");

    // Show only the first section by default
    if (rightSections.length > 0) {
        rightSections.forEach((section, index) => {
            section.style.display = index === 0 ? "flex" : "none";
        });
        if (leftItems.length > 0) {
            leftItems[0].classList.add("active"); // Optional: Highlight the first left item
        }
    }

    leftItems.forEach((item, index) => {
        item.addEventListener("mouseover", () => {
            // Hide all right-side sections
            rightSections.forEach(section => section.style.display = "none");

            // Remove the active class from all left items
            leftItems.forEach(leftItem => leftItem.classList.remove("active"));

            // Show the corresponding right-side section
            if (rightSections[index]) {
                rightSections[index].style.display = "flex";
                item.classList.add("active"); // Optional: Highlight the active item
            }
        });
    });
});
