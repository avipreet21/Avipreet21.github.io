const input = document.getElementById("calcInput");

document.getElementById("buttons").addEventListener("click", function(event) {
    const target = event.target;

    // Check if the clicked element is a button
    if (target.tagName === "BUTTON") {
        const operationType = target.dataset.operation;
        const operationValue = target.dataset.value;

        // Determine the operation based on the data-operation attribute
        switch (operationType) {
            case "num":
                input.value += operationValue;
                break;
            case "delete":
                input.value = input.value.slice(0, -1);
                break;
            case "clear":
                input.value = "";
                break;
            case "evaluate":
                input.value = input.value + " = " + eval(input.value);
                break;
            default:
                input.value += operationValue;
                break;
        }

        document.getElementById("expre").innerHTML = input.value.split("=")[0];
        document.getElementById("result").innerHTML = eval(input.value);
    }
});
