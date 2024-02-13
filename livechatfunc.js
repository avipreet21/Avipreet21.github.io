document.addEventListener('DOMContentLoaded', function () {
    displaymessages();
    const button = document.getElementById("submitButton");
    button.addEventListener('click', handleSubmitAndDisplayMessages);
});

async function displaymessages() {
    const message = document.getElementsByClassName("messages")[0]; // Get the first element with class "messages"
    try {
        let response = await fetch('https://learning-datbase-default-rtdb.firebaseio.com/Achat.json');
        const text = await response.json();
        message.innerHTML =""
        let messages_arr = [];
        let name_arr = [];
        for (const key in text) {
            const feedbackObj = text[key];
            const feedback = feedbackObj.feedback;
            messages_arr.push(feedback);
            const name = feedbackObj.name;
            name_arr.push(name);
        }
        for (let i = 0; i < name_arr.length; i++) {
            message.innerHTML += `
                    <p><strong>Name:</strong> ${name_arr[i]}</p>
                    <p><strong>Message:</strong> ${messages_arr[i]}</p>
                `;
        }
    } catch (error) {
        console.log("Error occurred:", error);
    }
}

async function submitForm(){
    const name = document.querySelector("#name").value.trim();
    const Text = document.querySelector("#Text").value.trim();
    if (name && Text){
        const data = {
            name: name,
            feedback: Text
        };
        try{
            const response =  await fetch('https://learning-datbase-default-rtdb.firebaseio.com/Achat.json',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if(!response.ok){
                throw new Error('Error saving data')
            }
        }catch (error){
        console.error('Error saving data:', error.message);
        
        }
    }else{
        alert('Please fill all fields')
    }
}

async function handleSubmitAndDisplayMessages() {
    await submitForm();
    displaymessages();
}