const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");

const toggleRequiredAttributes = () => {
if (phoneInput.value.trim() || emailInput.value.trim()) {
    phoneInput.removeAttribute("required");
    emailInput.removeAttribute("required");
} else {
    phoneInput.setAttribute("required", "true");
    emailInput.setAttribute("required", "true");
}
};

phoneInput.addEventListener("input", toggleRequiredAttributes);
emailInput.addEventListener("input", toggleRequiredAttributes);

// Run the toggle function on page load to handle default states
toggleRequiredAttributes();