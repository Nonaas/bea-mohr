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

function showSuccessMessage() {
    let timerInterval;
    Swal.fire({
        customClass: {
            confirmButton: 'confirm-button-class',
        },
        showConfirmButton: false,
        icon: "success",
        title: "Anfrage erfolgreich versendet!",
        timer: 2500,
        timerProgressBar: true,
        willClose: () => {
            clearInterval(timerInterval);
        }
    })
}

// Logic for submitting contact form
var form = document.getElementById("contact-form");
form.addEventListener('submit', function (event) {
    // Prevent default submission
    event.preventDefault(); 

    showSuccessMessage();

    // Get data
    var formData = new FormData(form);
    var dataObject = {};
    formData.forEach((value, key) => {
        dataObject[key] = value;
    });

    // Send data as JSON to AJAX endpoint
    fetch("https://formsubmit.co/ajax/wahle.jonas@web.de", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dataObject), // Convert to JSON
    })
    .then(response => response.json()) // Parse JSON
    .then(data => {
        if (data.success) {
            form.reset(); // Reset form
        } else {
            console.error("Submission-Error:", data);
            alert("Etwas ist schief gelaufen :-(\n\nBitte versuchen sie es erneut.");
        }
    })
    .catch(error => {
        console.error("Fetch-Error:", error);
        alert("Etwas ist schief gelaufen :-(\n\nBitte versuchen sie es erneut.");
    });
});

