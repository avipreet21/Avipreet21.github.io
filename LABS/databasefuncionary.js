document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelector('#messages');
    messages.style.display = 'none';
    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', submitForm);z
});
async  function submitForm() {
    const name = document.querySelector('#name').value.trim();
    const feedback = document.querySelector('#feedback').value.trim();
    if (name || feedback) {
        const data = {
        name: name,
        feedback: feedback
        };
        try {
            const response = await fetch('https://learning-datbase-default-rtdb.firebaseio.com/Achat.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error saving data');
            }
            //hideForm();
            hideFormFetchDataWithAsyncAwait();
        } catch (error) {
            console.error('Error saving data: ', error.message);
        }
    } else {
        alert('Please fill in the field of course feedback.');
    }

}
function hideForm() {
    const submitForm = document.querySelector('#submitForm');
    const messages = document.querySelector('#messages');

    submitForm.style.display = 'none';
    messages.style.display = 'block';
}
async function hideFormFetchDataWithAsyncAwait() {
    hideForm();
    async function makeRequest() {
        const message = document.getElementById("messages");
        try {
            let response = await fetch('https://learning-datbase-default-rtdb.firebaseio.com/Achat.json');
            console.log(response.status);
            let text = await response.json();
            let feedback_arr = [];
            let name_arr = [];
            for (const key in text) {
                const feedbackObj = text[key];
                const feedback = feedbackObj.feedback;
                feedback_arr.push(feedback);
                const name = feedbackObj.name;
                name_arr.push(name);
            }
            for (let i = 0; i < name_arr.length; i++) {
                message.innerHTML += `
                    <p><strong>Name:</strong> ${name_arr[i]}</p>
                    <p><strong>Message:</strong> ${feedback_arr[i]}</p>
                `;
            }
        } catch (error) {
            console.log("Error occurred:", error);
        }
    }
    makeRequest();
}
