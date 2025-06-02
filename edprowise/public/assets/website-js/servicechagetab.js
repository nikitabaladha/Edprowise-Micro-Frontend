const tabs = {
    digital: { button: document.getElementById("digitalTab"), section: document.getElementById("digitalSection") },
    business: { button: document.getElementById("businessTab"), section: document.getElementById("businessSection") },
    recruitment: { button: document.getElementById("recruitmentTab"), section: document.getElementById("recruitmentSection") },
    procurement: { button: document.getElementById("procurementTab"), section: document.getElementById("procurementSection") }
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
      const urlParams = new URLSearchParams(window.location.search);
  const activeTabFromURL = urlParams.get("tab");
    } else {
      // console.warn(`Tab key "${tabKey}" is invalid or missing elements.`);
    }
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const activeTabFromURL = urlParams.get("tab");
  activateTab(activeTabFromURL || "digital");
  
  Object.keys(tabs).forEach(tabKey => {
    if (tabs[tabKey].button) {
      tabs[tabKey].button.addEventListener("click", () => {
        activateTab(tabKey);
      });
    }
  });
  