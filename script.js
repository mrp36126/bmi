function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById('result').innerHTML = 'Please enter valid values';
        return;
    }
    
    const bmi = weight / (height * height);
    let category = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }
    
    document.getElementById('result').innerHTML = 
        `Your BMI: ${bmi.toFixed(1)} (${category})`;
}