function helloThere() {
            alert('Hello from test.js file');


            let belowText = document.getElementById('belowText');

            belowText.innerText = "Text changed by test.js file";

            belowText.classList.remove('text-muted');
            belowText.classList.add('font-weight-bold', 'bg-primary', 'text-white', 'p-2', 'rounded');


        }
``
function submitFormData(event) {

    event.preventDefault();

    console.log("Form submitted!");

    let description = document.getElementById('description').value;

    console.log("Description: " + description);
}