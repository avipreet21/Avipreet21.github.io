document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector(".contact__form");
    form.addEventListener("submit", submitContactForm);
});

async function submitContactForm(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (name && email && message) {
        const data = {
            name: name,
            email: email,
            message: message,
        };

        try {
            const response = await fetch('https://portfolio-contact-e9a3f-default-rtdb.firebaseio.com/contact.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error saving data');
            }

            const submitButton = document.getElementById('contact_form_button');
            submitButton.textContent = 'Successful';

            setTimeout(() => {
                submitButton.textContent = 'Submit';
            }, 5000);
            // Optionally, reset the form after successful submission
            document.querySelector(".contact__form").reset();
        } catch (error) {
            console.error('Error saving data:', error.message);
        }
    } else {
        alert('Please fill all fields');
    }
}
