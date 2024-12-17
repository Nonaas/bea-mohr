// Get dynamic mandatory fields
const phoneInput = $("#phone-input");
const emailInput = $("#email-input");


function toggleRequiredAttributes() {
  if (phoneInput.val() || emailInput.val()) {
    // Remove required
    phoneInput.removeAttr("required");
    emailInput.removeAttr("required");
  } else {
    // Add required
    phoneInput.attr("required", "true");
    emailInput.attr("required", "true");
  }
};

// Attach event listeners
phoneInput.on("input", toggleRequiredAttributes);
emailInput.on("input", toggleRequiredAttributes);




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
function showErrorMessage(error) {
    Swal.fire({
        customClass: {
            confirmButton: 'confirm-button-class',
            cancelButton: 'cancel-button-class',
        },
        confirmButtonText: "Erneut versuchen",
        showCancelButton: true,
        cancelButtonText: "Zurück",
        reverseButtons: true,
        icon: "error",
        title: "Oops...",
        html: "<p>Etwas ist schief gelaufen &#128531;</p>"+
              "<p>(<i>"+error+"</i>)</p><br/>"+
              "<p>Bitte versuchen sie es erneut.</p>",
        footer: '<i class="fa fa-envelope" aria-hidden="true"> </i><a href="mailto:kontakt@mut-und-wandel.de" target="_blank"> Stattdessen eine Email schreiben?</a>'
    }).then((result) => {
        if (result.isDismissed) {
            var form = document.getElementById("contact-form");
            form.reset();
        } else if (result.isConfirmed) {
            console.log("Try again selected.");
        }
    });
}

async function submitForm(event) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target).entries());

    try {
        const response = 
        await fetch("https://www.form-to-email.com/api/s/hUmfbrTvCpqp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .catch(error => {
            console.error("Fetch-Error: " + error);
            showErrorMessage(error);
        });
        if (!response.ok) {
            // in case of malformed form data
            console.error("Response-Error: Malformed form data" + response.json);
            showErrorMessage("Fehlerhafte Formulardaten");
        } else {
            // in case of success
            console.log("Success: " + response.json);
            showSuccessMessage();
            event.target.reset();
        }
    } catch (error) {
        // in case of form-to-email server not responding
        console.error("FormToEmail-Error: " + error);
        showErrorMessage(error);
    }
  }
