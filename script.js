function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);
    const resultContainer = document.getElementById('resultContainer');
    const chartContainer = document.getElementById('chartContainer');
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultContainer.innerHTML = '<div class="error">Please enter valid values</div>';
        return;
    }
    
    const bmi = weight / (height * height);
    let category = '';
    let categoryColor = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryColor = 'var(--success)';
    } else if (bmi < 25) {
        category = 'Healthy Weight';
        categoryColor = '#40916c';
    } else if (bmi < 30) {
        category = 'Overweight';
        categoryColor = 'var(--warning)';
    } else {
        category = 'Obese';
        categoryColor = 'var(--danger)';
    }
    
    document.getElementById('result').innerHTML = `
        Your BMI is <span style="color: ${categoryColor}">${bmi.toFixed(1)}</span><br>
        <span style="font-size: 1rem; color: #495057">${category}</span>
    `;
    
    // Show results
    resultContainer.style.display = 'block';
    chartContainer.style.display = 'block';
    
    // Position indicator (scale represents BMI 15 to 40)
    const minBMI = 15;
    const maxBMI = 40;
    const scale = document.querySelector('.bmi-scale');
    const indicator = document.getElementById('bmiIndicator');
    
    // Calculate position (clamped between min and max)
    const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
    const positionPercentage = (clampedBMI - minBMI) / (maxBMI - minBMI);
    const position = positionPercentage * scale.offsetWidth;
    
    indicator.style.left = `${position}px`;
    indicator.style.display = 'flex';
}