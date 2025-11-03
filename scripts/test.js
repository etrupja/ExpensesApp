function submitFormData(event) {

    event.preventDefault();

    console.log("Form submitted!");

    // Capture all form field values
    let description = document.getElementById('description').value;
    let amount = document.getElementById('amount').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;

    // Log all the form data
    console.log("=== Form Data ===");
    console.log("Description: " + description);
    console.log("Amount: " + amount);
    console.log("Date: " + date);
    console.log("Category: " + category);
    console.log("=================");
}