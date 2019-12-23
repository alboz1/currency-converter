const selectFrom = document.querySelector('#from-currency');
const selectToCurrencie = document.querySelector('#to-currency');
const form = document.querySelector('form');

function makeRequest(url) {
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', function(res) {
        if (res.target.status === 200) {
            const response = JSON.parse(res.target.response);
            // const rates = Object.entries(response);
            console.log(response);
            showCurrencies({
                base: response.base,
                rates: response.rates
            });
        }
        
    });
    xhr.open('GET', url);
    xhr.send();
}

function showCurrencies(options) {
    const selectCurrencieEl = document.querySelectorAll('select');
    selectCurrencieEl.forEach(element => {
        element.innerHTML = '';
    });
    const currencieNames = Object.keys(options.rates);
    console.log(currencieNames);
    const rate = Object.values(options.rates);
    const baseElement = document.createElement('option');
    console.log(options.rates);
    selectFrom.appendChild(baseElement);
    baseElement.textContent = options.base;
    
    currencieNames.forEach((curName, index) => {
        selectCurrencieEl.forEach(element => {
            const optionEl = document.createElement('option');
            optionEl.setAttribute('value', rate[index]);
            optionEl.textContent = curName;
            element.appendChild(optionEl);
        });
    });
}

function calculate() {
    const showConvertedVal = document.querySelector('.converted-value');
    let convertedValue = 0;
    const convertValue = document.querySelector('#value').value;
    const convertToValue = selectToCurrencie.options[selectToCurrencie.options.selectedIndex].getAttribute('value');
    console.log(convertValue, convertToValue);
    convertedValue = convertValue * convertToValue;
    const convertedCurName = selectToCurrencie.options[selectToCurrencie.options.selectedIndex].textContent;
    showConvertedVal.textContent = `${convertedValue} ${convertedCurName}`;
}

selectFrom.addEventListener('change', function() {
    const base = this.options[this.selectedIndex].textContent;
    makeRequest(`https://api.exchangeratesapi.io/latest?base=${base}`);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    calculate();
});

makeRequest('https://api.exchangeratesapi.io/latest');