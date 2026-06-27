// Function to calculate BMI
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById('result').innerText = 'Please enter valid height and weight.';
        return;
    }
    
    const bmi = weight / ((height / 100) ** 2);
    displayBMI(bmi);
}

// Function to display BMI
function displayBMI(bmi) {
    const resultContainer = document.getElementById('result');
    const historySection = document.getElementById('historySection');
    const historyList = document.getElementById('historyList');
    
    const bmiResult = document.createElement('div');
    bmiResult.innerText = `Your BMI is: ${bmi.toFixed(2)}`;
    resultContainer.appendChild(bmiResult);
    
    const listItem = document.createElement('li');
    listItem.innerText = `Height: ${document.getElementById('height').value} cm, Weight: ${document.getElementById('weight').value} kg, BMI: ${bmi.toFixed(2)}`;
    historyList.appendChild(listItem);
    
    // Initialize or update the chart
    initializeChart(bmi);
}

// Function to initialize or update the chart
function initializeChart(bmi) {
    const ctx = document.getElementById('bmiChart').getContext('2d');
    let chart;

    if (chart !== undefined && chart !== null) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['BMI'],
            datasets: [{
