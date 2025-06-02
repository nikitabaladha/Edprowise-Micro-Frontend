(function () {
  const tabs = {
    gallery: { button: document.getElementById("galleryTab"), section: document.getElementById("gallerySection") },
    edprowise: { button: document.getElementById("edprowiseTab"), section: document.getElementById("edprowiseSection") },
    student: { button: document.getElementById("studentTab"), section: document.getElementById("studentSection") },
    educator: { button: document.getElementById("educatorTab"), section: document.getElementById("educatorSection") }
  };

  function activateTab(tabKey) {
    if (tabs[tabKey] && tabs[tabKey].button && tabs[tabKey].section) {
      Object.values(tabs).forEach(({ button, section }) => {
        if (button && section) {
          button.classList.remove("active");
          section.classList.remove("active");
        }
      });
      tabs[tabKey].button.classList.add("active");
      tabs[tabKey].section.classList.add("active");
    } else {
      // console.warn(`Tab key "${tabKey}" is invalid or missing elements.`);
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const activeTabFromURL = urlParams.get("tab");
  activateTab(activeTabFromURL || "gallery");

  Object.keys(tabs).forEach(tabKey => {
    if (tabs[tabKey].button) {
      tabs[tabKey].button.addEventListener("click", () => {
        activateTab(tabKey);
      });
    }
  });
})();
