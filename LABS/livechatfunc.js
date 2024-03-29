document.addEventListener('DOMContentLoaded', function () {
    const dataContainer = document.querySelector('.messages'); // Added dataContainer initialization
    displaymessages();

    document.getElementById('PriorityButton').addEventListener('click', function(){
        document.getElementById('category').value = 'Priority';
    });
    
    
    const button = document.getElementById("submitButton");
    button.addEventListener('click', submitForm);
    const databaseRef = new EventSource('https://learning-datbase-default-rtdb.firebaseio.com/Achat.json');
    databaseRef.addEventListener('put', async (event) => {
        try {
            const newData = JSON.parse(event.data);
            const messageData = newData.data;
            if (messageData.name && messageData.feedback && messageData.category == 'General') { // Check if both fields are filled
                dataContainer.innerHTML += `
                    <p><u><strong>Name:</strong> ${messageData.name}</u>
                    <strong>Message:</strong> ${messageData.feedback}</p>
                    <strong>Type:</strong> ${messageData.category}</p>
                    `;
            }
            if (messageData.name && messageData.feedback && messageData.category == 'Priority') { // Check if both fields are filled
                dataContainer.insertAdjacentHTML('afterbegin', `
                <p><u><strong>Name:</strong> ${messageData.name}</u>
                <strong>Message:</strong> ${messageData.feedback}</p>
                <strong>Type:</strong> ${messageData.category}</p>
                `);
            }
        } catch (error) {
            console.error('Error handling real-time update:', error);
        }
    });
    
});

async function displaymessages() {
    const message = document.querySelector('.messages'); // Changed getElementsByClassName to querySelector
    try {
        let response = await fetch('https://learning-datbase-default-rtdb.firebaseio.com/Achat.json');
        const text = await response.json();
        message.innerHTML = "";
        let messages_arr = [];
        let name_arr = [];
        let category_arr =[];
        for (const key in text) {
            const feedbackObj = text[key];
            const feedback = feedbackObj.feedback;
            messages_arr.push(feedback);
            const name = feedbackObj.name;
            name_arr.push(name);
            const type = feedbackObj.category;
            category_arr.push(type);
        }
        for (let i = 0; i < name_arr.length; i++) {
            message.innerHTML += `
                    <p><strong>Name:</strong> ${name_arr[i]}</p>
                    <p><strong>Message:</strong> ${messages_arr[i]}</p>
                    <p><strong>Type:</strong> ${category_arr[i]}</p>
                `;
        }
    } catch (error) {
        console.log("Error occurred:", error);
    }
}

async function submitForm(){
    const name = document.querySelector("#name").value.trim();
    const Text = document.querySelector("#Text").value.trim();
    const category = document.getElementById("category").value.trim();
    if (name && Text){
        const data = {
            name: name,
            feedback: Text,
            category: category
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