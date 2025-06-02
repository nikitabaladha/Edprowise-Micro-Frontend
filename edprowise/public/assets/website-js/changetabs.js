document.addEventListener("DOMContentLoaded", () => {
  const buyerTab = document.getElementById("buyerTab");
  const supplierTab = document.getElementById("supplierTab");
  const buyerSection = document.getElementById("buyerSection");
  const supplierSection = document.getElementById("supplierSection");

  if (buyerTab && supplierTab && buyerSection && supplierSection) {
    buyerTab.addEventListener("click", () => {
      buyerTab.classList.add("active");
      supplierTab.classList.remove("active");
      buyerSection.classList.add("active");
      supplierSection.classList.remove("active");
    });

    supplierTab.addEventListener("click", () => {
      supplierTab.classList.add("active");
      buyerTab.classList.remove("active");
      supplierSection.classList.add("active");
      buyerSection.classList.remove("active");
    });
  } 
});

function showTab(tabId) {
  // Remove active class from all tabs and sections
  document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.show-tab').forEach(section => section.classList.remove('active'));

  // Add active class to clicked tab and corresponding section
  document.getElementById(tabId).classList.add('active');
  document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Event listener for "Apply Now" buttons

