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

// Logic for preventing refresh on submit
var form = document.getElementById("contact-form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

function showSuccessMessage() {
    let timerInterval;
    Swal.fire({
        customClass: {
            confirmButton: 'confirm-button-class',
        },
        icon: "success",
        title: "Anfrage erfolgreich versendet!",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        window.location.reload();
    });

}