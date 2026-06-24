// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<span class="material-icons">light_mode</span>' : '<span class="material-icons">dark_mode</span>';
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
setTheme(savedTheme === 'dark');

themeToggle.addEventListener('click', toggleTheme);

// BMI Calculation
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);
    const resultContainer = document.getElementById('resultContainer');
    const chartContainer = document.getElementById('chartContainer');
    const historySection = document.getElementById('historySection');
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultContainer.innerHTML = '<div class="error">Please enter valid values</div>';
        return;
    }
    
    const bmi = weight / (height * height);
    const date = new Date().toLocaleDateString();
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
        <span style="font-size: 1rem; color: var(--text-secondary)">${category}</span>
    `;
    
    // Show results
    resultContainer.style.display = 'block';
    chartContainer.style.display = 'block';
    historySection.style.display = 'block';
    
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
    
    // Save to history
    saveToHistory(bmi, category, date);
}

// History Management
function saveToHistory(bmi, category, date) {
    let history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
    
    // Add new entry
    history.unshift({
        bmi: bmi.toFixed(1),
        category,
        date
    });
    
    // Keep only last 10 entries
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    localStorage.setItem('bmiHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
    
    historyList.innerHTML = history.length > 0 
        ? history.map(item => `
            <div class="history-item">
                <div>
                    <span class="bmi-value">${item.bmi}</span>
                    <span> (${item.category})</span>
                </div>
                <span class="date">${item.date}</span>
            </div>
        `).join('')
        : '<div class="empty-history">No history yet</div>';
}

function clearHistory() {
    localStorage.removeItem('bmiHistory');
    renderHistory();
}

// Share Functionality
function shareResult() {
    const result = document.getElementById('result').textContent;
    const shareData = {
        title: 'My BMI Result',
        text: `Check out my BMI result: ${result}`,
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback for browsers that don't support Web Share API
            const textArea = document
